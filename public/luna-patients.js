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
  let focusAfterClose;
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
  panel.addEventListener('close', () => {
    const target = focusAfterClose; focusAfterClose = null;
    delete panel.dataset.lunaAnimate; reset();
    if (!target) { launch.focus(); return; }
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), {once:true});
    }
    target.focus({preventScroll:true});
  });
  function actionSvg(pathData) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    for (const [name, value] of Object.entries({viewBox:'0 0 24 24', width:'20', height:'20', fill:'none', stroke:'currentColor', 'stroke-width':'1.7', 'stroke-linecap':'round', 'stroke-linejoin':'round', 'aria-hidden':'true', focusable:'false'})) svg.setAttribute(name, value);
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', pathData);
    svg.append(path);
    return svg;
  }
  function actionIcon(external) {
    const svg = actionSvg(external ? 'M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5ZM8 9h8M8 13h5' : 'M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8ZM14 3v5h5M9 12h6M9 16h6');
    const icon = document.createElement('span'); icon.className = 'luna-action-icon'; icon.append(svg);
    return icon;
  }
  function addMessage(text, role, links = []) {
    welcome.hidden = true;
    const message = document.createElement('div'); message.className = 'luna-message luna-message-' + role;
    const label = document.createElement('small'); label.textContent = role === 'user' ? 'Usted' : 'Luna';
    const p = document.createElement('p'); p.textContent = text;
    message.append(label, p);
    const actions = document.createElement('div'); actions.className = 'luna-actions';
    const destinations = new Set();
    for (const link of Array.isArray(links) ? links : []) {
      if (!link || typeof link.href !== 'string' || typeof link.label !== 'string') continue;
      let url; try { url = new URL(link.href, location.origin); } catch { continue; }
      const booking = panel.dataset.bookingOrigin && url.origin === panel.dataset.bookingOrigin
        && url.pathname === '/reservar' && !url.search && /^#estudio=[a-zA-Z0-9_-]{1,100}$/.test(url.hash);
      if (url.origin !== location.origin && url.origin !== 'https://wa.me' && !booking) continue;
      if (destinations.has(url.href)) continue;
      destinations.add(url.href);
      const external = url.origin !== location.origin;
      const a = document.createElement('a'); a.href = url.href; a.className = 'luna-action' + (external ? ' luna-action-external' : '');
      const copy = document.createElement('span'); copy.className = 'luna-action-copy';
      const actionLabel = document.createElement('span'); actionLabel.className = 'luna-action-label'; actionLabel.textContent = link.label;
      const hint = document.createElement('span'); hint.className = 'luna-action-hint'; hint.textContent = booking ? 'Abrir en Citas' : external ? 'Abrir WhatsApp' : 'Ver información';
      copy.append(actionLabel, hint);
      const arrow = actionSvg(external ? 'M7 17 17 7M7 7h10v10' : 'M5 12h14m-6-6 6 6-6 6'); arrow.setAttribute('class', 'luna-action-arrow');
      a.append(actionIcon(external), copy, arrow);
      if (external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      else a.addEventListener('click', event => {
        if (event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (url.pathname === location.pathname && url.search === location.search && url.hash) {
          try {
            const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
            if (target && !panel.contains(target)) focusAfterClose = target;
          } catch { /* An invalid fragment still follows normal browser navigation. */ }
        }
        panel.close();
      });
      actions.append(a);
    }
    if (actions.childElementCount) message.append(actions);
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
      if (response.ok && ['sede', 'estudio', 'preparacion'].includes(result.context)) pendingContext = {id:result.context, expires:Date.now() + 5 * 60 * 1000};
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
