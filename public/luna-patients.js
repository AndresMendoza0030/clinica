(() => {
  const panel = document.getElementById('luna-panel');
  const launch = document.getElementById('luna-launch');
  if (!panel || !launch) return;
  const answer = document.getElementById('luna-answer');
  const links = document.getElementById('luna-links');
  const form = document.getElementById('luna-form');
  let active;
  launch.addEventListener('click', () => panel.showModal());
  document.getElementById('luna-close').addEventListener('click', () => panel.close());
  panel.addEventListener('close', () => {
    active?.abort(); active = null;
    answer.textContent = ''; links.replaceChildren(); form.reset();
    panel.querySelectorAll('button').forEach(b => { b.disabled = false; });
    launch.focus();
  });
  async function ask(body) {
    if (active) return;
    const controller = new AbortController(); active = controller;
    const timeout = setTimeout(() => controller.abort(), 12000);
    panel.querySelectorAll('#luna-choices button, #luna-form button').forEach(b => { b.disabled = true; });
    answer.textContent = 'Consultando…'; links.replaceChildren();
    try {
      const response = await fetch('/api/luna-pacientes', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body), signal:controller.signal });
      const result = await response.json();
      if (active !== controller) return;
      answer.textContent = typeof result.text === 'string' ? result.text : 'No pude consultar la información. Contacte a la clínica por WhatsApp.';
      for (const link of result.links || []) {
        const url = new URL(link.href, location.origin);
        if (url.origin !== location.origin && url.origin !== 'https://wa.me') continue;
        const a = document.createElement('a'); a.href = url.href; a.textContent = link.label;
        if (url.origin !== location.origin) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
        links.append(a);
      }
    } catch {
      if (active === controller) answer.textContent = 'No pude consultar la información. Puede usar el enlace de WhatsApp.';
    } finally {
      clearTimeout(timeout);
      if (active === controller) {
        active = null;
        panel.querySelectorAll('button').forEach(b => { b.disabled = false; });
      }
    }
  }
  panel.querySelectorAll('[data-luna-id]').forEach(b => b.addEventListener('click', () => ask({id:b.dataset.lunaId})));
  form.addEventListener('submit', event => { event.preventDefault(); const input = form.elements.message; if (input.value.trim()) { ask({message:input.value}); input.value = ''; } });
})();
