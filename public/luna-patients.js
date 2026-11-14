(() => {
  const panel = document.getElementById('luna-panel');
  const launch = document.getElementById('luna-launch');
  if (!panel || !launch) return;
  const form = document.getElementById('luna-form');
  const input = document.getElementById('luna-question');
  const send = document.getElementById('luna-send');
  const messages = document.getElementById('luna-messages');
  const status = document.getElementById('luna-status');
  const welcome = document.getElementById('luna-welcome');
  const scroll = document.getElementById('luna-scroll');
  const enabled = panel.dataset.enabled === 'true';
  const state = document.getElementById('luna-state');
  const stateLabels = {attentive: 'Con gusto le ayudo', reading: 'Estoy leyendo su consulta…', thinking: 'Estoy buscando la información…', responding: 'Aquí tiene la información', happy: 'Es un gusto ayudarle'};
  let reactionTimer;
  function setMode(mode = 'attentive', duration = 0) {
    clearTimeout(reactionTimer);
    panel.dataset.lunaMode = mode;
    state.textContent = enabled ? stateLabels[mode] : 'Chat en preparación';
    if (duration) reactionTimer = setTimeout(() => setMode(), duration);
  }
  let active;
  let pendingContext;
  const clearContext = () => { pendingContext = undefined; };
  const scrollToEnd = () => { scroll.scrollTop = scroll.scrollHeight; };
  function reset() {
    active?.abort(); active = null; clearContext();
    messages.replaceChildren(); status.textContent = ''; form.reset();
    welcome.hidden = false; send.disabled = !enabled; setMode();
  }
  launch.addEventListener('click', () => { panel.showModal(); panel.dataset.lunaAnimate = 'true'; if (enabled) { setMode('happy', 2200); input.focus(); } });
  document.getElementById('luna-close').addEventListener('click', () => panel.close());
  document.getElementById('luna-reset').addEventListener('click', () => { reset(); if (enabled) input.focus(); });
  panel.addEventListener('close', () => { delete panel.dataset.lunaAnimate; reset(); launch.focus(); });
  function addMessage(text, role, links = []) {
    welcome.hidden = true;
    const message = document.createElement('div'); message.className = 'luna-message luna-message-' + role;
    const label = document.createElement('small'); label.textContent = role === 'user' ? 'Usted' : 'Luna';
    const p = document.createElement('p'); p.textContent = text;
    message.append(label, p);
    for (const link of Array.isArray(links) ? links : []) {
      if (!link || typeof link.href !== 'string' || typeof link.label !== 'string') continue;
      let url; try { url = new URL(link.href, location.origin); } catch { continue; }
      if (url.origin !== location.origin && url.origin !== 'https://wa.me') continue;
      const a = document.createElement('a'); a.href = url.href; a.textContent = link.label + ' ↗';
      if (url.origin !== location.origin) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      message.append(a);
    }
    messages.append(message);
    // Only the last four visible exchanges; never sent as model history or persisted.
    while (messages.childElementCount > 8) messages.firstElementChild.remove();
    scrollToEnd();
  }
  async function ask(message) {
    if (active || !enabled) return;
    const body = {message};
    if (pendingContext && Date.now() < pendingContext.expires) body.context = pendingContext.id;
    clearContext();
    const controller = new AbortController(); active = controller;
    const timeout = setTimeout(() => controller.abort(), 12000);
    send.disabled = true; input.value = '';
    addMessage(message, 'user'); setMode('reading'); status.textContent = 'Con gusto, permítame revisar su consulta…'; scrollToEnd();
    const thinkingTimer = setTimeout(() => {
      if (active === controller) { setMode('thinking'); status.textContent = 'Estoy buscando la información para ayudarle…'; }
    }, 700);
    try {
      const response = await fetch('/api/luna-pacientes', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body), signal:controller.signal});
      const result = await response.json();
      if (active !== controller) return;
      if (response.ok && ['sede', 'estudio'].includes(result.context)) pendingContext = {id:result.context, expires:Date.now() + 5 * 60 * 1000};
      clearTimeout(thinkingTimer);
      const text = typeof result.text === 'string' ? result.text : 'Con gusto quisiera ayudarle, pero no pude consultar esa información. Si lo desea, puede comunicarse con nuestro equipo mediante el enlace de abajo.';
      addMessage(text, 'assistant', result.links);
      const reaction = response.ok && ['happy', 'responding'].includes(result.reaction) ? result.reaction : response.ok && result.reaction !== 'attentive' && !result.context ? 'responding' : 'attentive';
      setMode(reaction, reaction === 'attentive' ? 0 : Math.min(6000, Math.max(2800, text.length * 25)));
    } catch {
      if (active === controller) {
        addMessage('Gracias por su paciencia. No pude conectarme en este momento. Puede volver a intentarlo o, si prefiere, nuestro equipo le atenderá con gusto por WhatsApp.', 'assistant');
        setMode();
      }
    } finally {
      clearTimeout(timeout); clearTimeout(thinkingTimer);
      if (active === controller) { active = null; status.textContent = ''; send.disabled = !enabled; scrollToEnd(); }
    }
  }
  form.addEventListener('submit', event => { event.preventDefault(); const message = input.value.trim(); if (message) ask(message); });
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); form.requestSubmit(); }
  });
})();
