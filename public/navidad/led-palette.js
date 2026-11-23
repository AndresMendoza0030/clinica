(() => {
  const root = document.documentElement;
  const storageKey = 'mendoza-led-color';
  const options = new Map([
    ['calido', 'Blanco cálido'],
    ['rojo', 'Rojo'],
    ['multicolor', 'Multicolor'],
  ]);
  const groups = [];
  const fallback = 'multicolor';
  const normalize = value => options.has(value) ? value : fallback;
  let current = normalize(root.dataset.ledColor);
  let trigger;
  let closePanel;

  function restore() {
    try {
      apply(localStorage.getItem(storageKey));
    } catch {
      apply(current);
    }
  }

  function apply(value) {
    current = normalize(value);
    if (root.dataset.ledColor !== current) root.dataset.ledColor = current;
    for (const group of groups) {
      for (const button of group.querySelectorAll('button')) {
        button.setAttribute('aria-pressed', String(button.dataset.palette === current));
      }
    }
    if (trigger) {
      trigger.title = 'Color de las luces: ' + options.get(current);
      trigger.setAttribute('aria-label', trigger.title);
    }
  }

  function choose(value) {
    apply(value);
    try {
      localStorage.setItem(storageKey, current);
    } catch {
      // The current page can still show the choice when storage is unavailable.
    }
  }

  function createSwatches() {
    const group = document.createElement('div');
    group.className = 'led-palette-swatches';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', 'Color de las luces');
    for (const [value, label] of options) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'led-palette-choice';
      button.dataset.palette = value;
      button.setAttribute('aria-pressed', String(current === value));
      const swatch = document.createElement('span');
      swatch.className = 'led-palette-swatch';
      swatch.setAttribute('aria-hidden', 'true');
      button.append(swatch, document.createTextNode(label));
      button.addEventListener('click', () => choose(value));
      group.append(button);
    }
    groups.push(group);
    return group;
  }

  function addHeaderSelector(header) {
    const wrap = document.createElement('div');
    wrap.className = 'led-palette-control';
    trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'led-palette-trigger';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'led-palette-panel');
    trigger.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 16c0-1.7-3-3-3-6a6 6 0 0 1 12 0c0 3-3 4.3-3 6Z"/><path d="M9.5 19h5m-4 2h3M2 10h1.5M20.5 10H22M4.2 3.5l1.2 1.2m14.4-1.2-1.2 1.2M12 1v1"/></svg><span>Luces</span>';
    const panel = document.createElement('div');
    panel.id = 'led-palette-panel';
    panel.className = 'led-palette-panel';
    panel.hidden = true;
    const title = document.createElement('strong');
    title.textContent = 'Color de las luces';
    panel.append(title, createSwatches());
    wrap.append(trigger, panel);
    header.insertBefore(wrap, header.querySelector('.th-nav-contact, .th-menu'));

    closePanel = (refocus = false) => {
      if (panel.hidden) return;
      panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      if (refocus) trigger.focus();
    };
    trigger.addEventListener('click', () => {
      if (!panel.hidden) return closePanel();
      const menu = header.querySelector('.th-menu');
      if (menu) menu.open = false;
      panel.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
    });
    panel.addEventListener('click', event => {
      if (event.target.closest('.led-palette-choice')) closePanel(true);
    });
    document.addEventListener('click', event => {
      if (!wrap.contains(event.target)) closePanel();
    });
    document.addEventListener('focusin', event => {
      if (!wrap.contains(event.target)) closePanel();
    });
    document.addEventListener('keydown', event => {
      if (!panel.hidden && event.key === 'Escape') {
        event.preventDefault();
        closePanel(true);
      }
    });
  }

  function init() {
    const header = document.querySelector('.th-header .th-nav-shell');
    if (header) addHeaderSelector(header);
    const heading = document.querySelector('#sedes .cl-heading');
    if (heading) {
      const row = document.createElement('div');
      row.className = 'led-palette-locations';
      const title = document.createElement('strong');
      title.textContent = 'Color de las luces';
      row.append(title, createSwatches());
      heading.after(row);
    }
    document.addEventListener('clinic:facade-show', event => {
      const dialog = event.target;
      if (dialog.id !== 'led-location-viewer' || dialog.querySelector('.led-palette-viewer')) return;
      const nav = dialog.querySelector('nav');
      if (!nav) return;
      const group = createSwatches();
      group.classList.add('led-palette-viewer');
      nav.before(group);
    });
    restore();
    window.addEventListener('pageshow', restore);
    window.addEventListener('storage', event => {
      if (event.key === storageKey || event.key === null) restore();
    });
    new MutationObserver(() => {
      if (root.dataset.lighting !== 'led') closePanel?.();
    }).observe(root, { attributes: true, attributeFilter: ['data-lighting'] });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
