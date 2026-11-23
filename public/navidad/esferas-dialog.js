(() => {
  const branches = new Set(['matriz', 'farid', 'advanced']);
  let dialog;
  let frame;
  let opener;

  function bindFrameKeyboard() {
    const inner = frame.contentDocument;
    if (!inner) return;
    inner.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || event.repeat || event.defaultPrevented) return;
      if (inner.fullscreenElement || document.fullscreenElement || inner.body?.classList.contains('expanded') || inner.querySelector('dialog[open]')) return;
      event.preventDefault();
      dialog.close();
    }, { capture: true });
  }

  function createDialog() {
    dialog = document.createElement('dialog');
    dialog.id = 'navidad-esferas-dialog';
    dialog.setAttribute('aria-labelledby', 'navidad-esferas-title');
    dialog.innerHTML = '<div class="esferas-dialog-bar"><h2 id="navidad-esferas-title">Esferas de las sedes</h2><button type="button" autofocus>Cerrar</button></div>';
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    frame = document.createElement('iframe');
    frame.title = 'Esferas navideñas interactivas de las tres sedes';
    frame.allow = 'fullscreen; accelerometer; gyroscope';
    frame.allowFullscreen = true;
    frame.addEventListener('load', bindFrameKeyboard);
    dialog.append(frame);
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      // Unload the WebGL context and animation loop between visits.
      frame.removeAttribute('src');
      if (opener?.isConnected && opener.getClientRects().length) opener.focus({ preventScroll: true });
      opener = null;
    });
    document.body.append(dialog);
  }

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const trigger = event.target.closest?.('[data-review-globe]');
    const key = trigger?.dataset.reviewGlobe;
    if (!branches.has(key)) return;
    const url = '/esferas/?sede=' + key;
    if (typeof HTMLDialogElement === 'undefined' || typeof HTMLDialogElement.prototype.showModal !== 'function') {
      if (!trigger.matches('a[href]')) window.location.assign(url);
      return;
    }
    event.preventDefault();
    if (!dialog) createDialog();
    opener = trigger;
    frame.src = url;
    if (!dialog.open) dialog.showModal();
  });
})();
