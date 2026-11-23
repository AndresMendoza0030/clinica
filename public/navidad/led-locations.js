(() => {
  const locations = [
    { key: 'matriz', name: 'Casa Matriz' },
    { key: 'farid', name: 'Plaza Farid' },
    { key: 'advanced', name: 'Advanced Radiology' }
  ];
  const lightingColors = {
    calido: { suffix: '', label: 'Luces cálidas' },
    rojo: { suffix: '-rojo', label: 'Luces rojas' },
    multicolor: { suffix: '-multicolor', label: 'Luces multicolores' }
  };
  const currentColor = () => lightingColors[document.documentElement.dataset.ledColor] || lightingColors.multicolor;
  const imagePath = key => '/navidad/fachadas/' + key + currentColor().suffix + '.webp';
  const imageDescription = name => 'Fachada de ' + name + ' con ' + currentColor().label.toLowerCase() + ' de Navidad';
  const isLed = () => document.documentElement.dataset.lighting === 'led';
  const expandIcon = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6m-6 0 6-6M10 20H4v-6m6 0-6 6"/></svg>';

  let dialog;
  let returnFocus;
  let displayedIndex;
  const cardImages = [];

  function installCards() {
    for (const { key, name } of locations) {
      const classicCard = document.getElementById('sede-' + key)?.querySelector('.cl-photo');
      const historyCard = document.querySelector('.history-building[href$="#sede-' + key + '"]');
      for (const frame of [classicCard, historyCard]) {
        const image = frame?.querySelector('img');
        if (!image) continue;
        const original = Object.fromEntries(['src', 'srcset', 'alt'].map(attr => [attr, image.getAttribute(attr)]));
        cardImages.push({ key, name, image, original });
        const picture = document.createElement('span');
        picture.className = 'led-location-card-picture';
        picture.dataset.ledBranch = key;
        image.replaceWith(picture);
        picture.append(image);

        const controls = document.createElement('div');
        controls.className = 'led-location-actions';
        controls.setAttribute('role', 'group');
        controls.setAttribute('aria-label', 'Vistas de ' + name);

        const globe = document.createElement('a');
        globe.className = 'led-globe-open';
        globe.href = '/esferas/?sede=' + key;
        globe.dataset.reviewGlobe = key;
        globe.setAttribute('aria-haspopup', 'dialog');
        globe.setAttribute('aria-label', 'Ver esfera navideña de ' + name);
        globe.textContent = 'Ver esfera navideña';
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'led-location-enlarge';
        button.dataset.ledOpen = key;
        button.setAttribute('aria-haspopup', 'dialog');
        button.setAttribute('aria-label', 'Ampliar fachada de ' + name);
        button.innerHTML = expandIcon + '<span>Ampliar fachada</span>';
        // The image on the history page already links to the branch contact details.
        controls.append(globe, button);
        (frame === historyCard ? frame.parentElement : frame).append(controls);
      }
    }
  }

  function syncAppearance() {
    const led = isLed();
    for (const { key, name, image, original } of cardImages) {
      if (led) {
        image.removeAttribute('srcset');
        image.setAttribute('src', imagePath(key));
        image.alt = imageDescription(name);
      } else {
        for (const [attr, value] of Object.entries(original)) {
          if (value === null) image.removeAttribute(attr);
          else image.setAttribute(attr, value);
        }
      }
    }
    if (dialog?.open) {
      if (led) showLocation(displayedIndex);
      else dialog.close();
    }
  }

  function showLocation(index) {
    displayedIndex = (index + locations.length) % locations.length;
    const { name, key } = locations[displayedIndex];
    const image = dialog.querySelector('img');
    image.alt = imageDescription(name);
    image.src = imagePath(key);
    dialog.querySelector('h2').textContent = name;
    dialog.querySelector('.led-location-color').textContent = currentColor().label + ' · ' + (displayedIndex + 1) + ' de ' + locations.length;
    for (const button of dialog.querySelectorAll('[data-step]')) {
      const step = Number(button.dataset.step);
      const nextLocation = locations[(displayedIndex + step + locations.length) % locations.length];
      button.setAttribute('aria-label', (step < 0 ? 'Fachada anterior, ' : 'Fachada siguiente, ') + nextLocation.name);
    }
    dialog.dispatchEvent(new CustomEvent('clinic:facade-show', { bubbles: true, detail: { key } }));
  }

  function createDialog() {
    dialog = document.createElement('dialog');
    dialog.id = 'led-location-viewer';
    dialog.setAttribute('aria-labelledby', 'led-location-title');
    dialog.innerHTML = '<header><div aria-live="polite" aria-atomic="true"><h2 id="led-location-title"></h2><p class="led-location-color"></p></div><button class="led-location-close" type="button" autofocus>Cerrar <span aria-hidden="true">×</span></button></header>' +
      '<div class="led-location-picture"><img alt=""></div>' +
      '<nav aria-label="Otras fachadas"><button type="button" data-step="-1" aria-label="Fachada anterior"><span aria-hidden="true">←</span> Anterior</button><button type="button" data-step="1" aria-label="Fachada siguiente">Siguiente <span aria-hidden="true">→</span></button></nav>';
    dialog.querySelector('.led-location-close').addEventListener('click', () => dialog.close());
    for (const button of dialog.querySelectorAll('[data-step]')) {
      button.addEventListener('click', () => showLocation(displayedIndex + Number(button.dataset.step)));
    }
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      showLocation(displayedIndex + (event.key === 'ArrowRight' ? 1 : -1));
    });
    dialog.addEventListener('close', () => {
      if (returnFocus?.isConnected && returnFocus.getClientRects().length) returnFocus.focus({ preventScroll: true });
    });
    document.body.append(dialog);
  }

  function openFromPage(event) {
    const button = event.target.closest?.('[data-led-open]');
    if (!isLed() || !button) return;
    const index = locations.findIndex(location => location.key === button.dataset.ledOpen);
    if (index < 0) return;
    event.preventDefault();
    if (!dialog) createDialog();
    if (typeof dialog.showModal !== 'function') {
      window.open(imagePath(locations[index].key), '_blank', 'noopener');
      return;
    }
    returnFocus = button;
    showLocation(index);
    if (!dialog.open) dialog.showModal();
  }

  function initialize() {
    installCards();
    if (isLed()) syncAppearance();
    new MutationObserver(syncAppearance).observe(document.documentElement, { attributes: true, attributeFilter: ['data-lighting', 'data-led-color'] });
    document.addEventListener('click', openFromPage);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
