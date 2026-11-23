// A branch is a same-origin document with its own renderer. Release it when
// navigating away, including when the browser retains the page for Back.
export async function startViewer({host, intro, branch = 'advanced'}) {
  let active, pending;
  let suspended = false;
  let controlsBound = false;

  function release(current) {
    if (!current) return;
    current.viewer.dispose();
    current.context?.getExtension('WEBGL_lose_context')?.loseContext();
  }

  function activate() {
    if (pending) return pending;
    pending = openRenderer(host, branch).then(current => {
      if (suspended) {
        release(current);
        return null;
      }
      active = current;
      if (!controlsBound) {
        bindViewerControls();
        controlsBound = true;
      }
      host.classList.add('is-ready');
      if (document.body?.dataset.viewerState === 'ready') {
        host.dispatchEvent(new Event('ornament-reveal'));
      } else {
        intro.dispatchEvent(new Event('ornament-ready'));
      }
      return current.viewer;
    }).finally(() => { pending = null; });
    return pending;
  }

  window.addEventListener('pagehide', () => {
    suspended = true;
    release(active);
    active = null;
  });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    suspended = false;
    if (active) return;
    if (document.body?.dataset.viewerState === 'ready') {
      const auto = document.getElementById('toggleAuto');
      auto.setAttribute('aria-pressed','false');
      auto.title = 'Activar giro automático';
      intro.dispatchEvent(new Event('ornament-restoring'));
    }
    activate().catch(() => intro.dispatchEvent(new CustomEvent('ornament-error', {
      detail: 'No se pudo recuperar la esfera.'
    })));
  });
  return activate();
}

// Probe the actual canvas before importing Three.js or the selected model.
async function openRenderer(host, branch) {
  const canvas = document.createElement('canvas');
  let context;
  try {
    context = canvas.getContext('webgl2', {alpha:true, antialias:true, stencil:false, powerPreference:'high-performance'});
  } catch {
    // Some browsers disable context creation completely.
  }

  let viewer;
  if (context) {
    try {
      const {startNative} = await import('./viewer.js');
      const native = await startNative({host, canvas, context, branch});
      if (context.isContextLost()) {
        native.dispose();
        throw new Error('El contexto gráfico se perdió durante la carga.');
      }
      viewer = native;
      host.prepend(canvas);
      window.ornamentViewer = viewer;
    } catch (error) {
      console.info('Vista 3D no disponible.', error.message);
      canvas.remove();
      context.getExtension('WEBGL_lose_context')?.loseContext();
      context = null;
    }
  }
  if (!viewer) {
    const {startFallback} = await import('./fallback.js');
    viewer = await startFallback({host, branch});
  }

  return {viewer, context};
}

function bindViewerControls() {
  const dialog = document.getElementById('referenceDialog');
  const image = document.getElementById('referenceImage');
  const status = document.getElementById('referenceStatus');
  image.addEventListener('load', () => {
    image.hidden = false;
    status.hidden = true;
  });
  image.addEventListener('error', () => {
    image.removeAttribute('src');
    image.hidden = true;
    status.textContent = 'No se pudo cargar la imagen original.';
    status.hidden = false;
  });
  document.getElementById('toggleReference').addEventListener('click', () => {
    dialog.showModal();
    if (!image.hasAttribute('src')) {
      status.textContent = 'Cargando la imagen original…';
      status.hidden = false;
      image.src = image.dataset.src;
    }
  });
  document.getElementById('closeReference').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const {left, right, top, bottom} = dialog.getBoundingClientRect();
    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) dialog.close();
  });

  const fullscreen = document.getElementById('fullscreen');
  const label = fullscreen.querySelector('.fullscreen-label');
  function updateFullscreen() {
    const expanded = !!document.fullscreenElement || document.body.classList.contains('expanded');
    fullscreen.title = expanded ? 'Salir de pantalla completa' : 'Ver en pantalla completa';
    fullscreen.setAttribute('aria-label', fullscreen.title);
    label.textContent = expanded ? 'Reducir' : 'Ampliar';
  }
  fullscreen.addEventListener('click', async () => {
    if (document.fullscreenElement) {
      try { await document.exitFullscreen(); } catch { /* Browser may have exited already. */ }
      updateFullscreen();
      return;
    }
    if (document.body.classList.contains('expanded')) document.body.classList.remove('expanded');
    else if (document.documentElement.requestFullscreen) {
      try { await document.documentElement.requestFullscreen(); }
      catch { document.body.classList.add('expanded'); }
    } else document.body.classList.add('expanded');
    updateFullscreen();
  });
  document.addEventListener('fullscreenchange', updateFullscreen);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !dialog.open && document.body.classList.contains('expanded')) {
      document.body.classList.remove('expanded');
      updateFullscreen();
    }
  });
}
