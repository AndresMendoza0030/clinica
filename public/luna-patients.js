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
  let active;
  let pendingContext;
  const clearContext = () => { pendingContext = undefined; };
  const scrollToEnd = () => { scroll.scrollTop = scroll.scrollHeight; };
  function reset() {
    active?.abort(); active = null; clearContext();
    messages.replaceChildren(); status.textContent = ''; form.reset();
    welcome.hidden = false; send.disabled = !enabled;
  }
  launch.addEventListener('click', () => { panel.showModal(); if (enabled) input.focus(); });
  document.getElementById('luna-close').addEventListener('click', () => panel.close());
  document.getElementById('luna-reset').addEventListener('click', () => { reset(); if (enabled) input.focus(); });
  panel.addEventListener('close', () => { reset(); launch.focus(); });
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
    addMessage(message, 'user'); status.textContent = 'Luna está consultando…'; scrollToEnd();
    try {
      const response = await fetch('/api/luna-pacientes', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body), signal:controller.signal});
      const result = await response.json();
      if (active !== controller) return;
      if (response.ok && ['sede', 'estudio'].includes(result.context)) pendingContext = {id:result.context, expires:Date.now() + 5 * 60 * 1000};
      addMessage(typeof result.text === 'string' ? result.text : 'No pude consultar esa información. Puede hablar con la clínica usando el enlace de abajo.', 'assistant', result.links);
    } catch {
      if (active === controller) addMessage('No pude conectarme en este momento. Puede volver a escribir o hablar con la clínica.', 'assistant');
    } finally {
      clearTimeout(timeout);
      if (active === controller) { active = null; status.textContent = ''; send.disabled = !enabled; scrollToEnd(); }
    }
  }
  form.addEventListener('submit', event => { event.preventDefault(); const message = input.value.trim(); if (message) ask(message); });
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); form.requestSubmit(); }
  });
})();
