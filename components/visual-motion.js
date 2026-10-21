// Image-based depth and light effects, activated by real mouse or keyboard input.
export const VisualMotionStyles = `<style id="visual-motion">
[data-visual-motion] .vm-stage,.vm-stage[data-visual-motion]{isolation:isolate;overflow:hidden}
.cl-photo.vm-stage,.th-modality>.vm-stage,.th-lab-image.vm-stage{position:relative;display:block}
.th-modality>.vm-stage{padding:0;flex:none;width:100%}
[data-visual-motion] .vm-media{transform-origin:50% 65%;transform:none!important;transition:none!important}
.cl-card[data-visual-motion] .cl-photo{padding:18px 16px 12px;background:#fff}
.vm-stage::after{pointer-events:none}
[data-visual-motion="clinic"] .vm-stage::after{content:"";position:absolute;z-index:1;left:20%;right:20%;bottom:7%;height:9%;border-radius:50%;background:radial-gradient(ellipse,#18273330,transparent 68%);opacity:0;transform:scale(.8)}
[data-visual-motion="scan"] .vm-stage::after,.vm-stage[data-visual-motion="scan"]::after{content:"";position:absolute;z-index:2;inset:0;background:linear-gradient(110deg,transparent 35%,#fff9 49%,#b6473b33 50%,transparent 55%);transform:translateX(-110%);opacity:0}
[data-visual-motion="lab"] .vm-stage::after,.vm-stage[data-visual-motion="lab"]::after{content:"";position:absolute;z-index:2;width:38%;aspect-ratio:1;left:31%;top:20%;border:1px solid #9d232073;border-radius:50%;box-shadow:0 0 0 12px #fff2;opacity:0;transform:scale(.8)}
/* One shared state respects the system preference until the visitor overrides it.
   Do not gate this on the primary pointer: hybrid computers can report touch. */
html[data-visual-effects="on"] [data-visual-motion] .vm-media{transition:transform .55s cubic-bezier(.2,.7,.2,1)!important}
html[data-visual-effects="on"] .cl-card[data-visual-motion]{transition:box-shadow .4s,border-color .4s!important}
html[data-visual-effects="on"] [data-visual-motion] .vm-stage::after,html[data-visual-effects="on"] .vm-stage[data-visual-motion]::after{transition:opacity .5s,transform .7s!important}
html[data-visual-effects="on"] [data-vm-active] .vm-media{transform:perspective(900px) translateY(-5px) rotateX(var(--vm-rx,1deg)) rotateY(var(--vm-ry,-1deg)) scale(1.045)!important}
html[data-visual-effects="on"] [data-visual-motion="clinic"][data-vm-active]{border-color:#b8aaa2;box-shadow:0 15px 35px #17263214}
html[data-visual-effects="on"] [data-visual-motion="clinic"][data-vm-active] .vm-media{transform:perspective(900px) translateY(-8px) rotateX(var(--vm-rx,2deg)) rotateY(var(--vm-ry,-1deg)) scale(1.055)!important}
html[data-visual-effects="on"] [data-visual-motion="clinic"][data-vm-active] .vm-stage::after{opacity:.7;transform:scale(1.1)}
html[data-visual-effects="on"] [data-visual-motion="scan"][data-vm-active] .vm-stage::after,html[data-visual-effects="on"] .vm-stage[data-visual-motion="scan"][data-vm-active]::after{animation:vm-scan 1.1s ease-out both!important}
html[data-visual-effects="on"] [data-visual-motion="lab"][data-vm-active] .vm-media{transform:perspective(900px) rotateX(var(--vm-rx,0deg)) rotateY(var(--vm-ry,0deg)) scale(1.065)!important}
html[data-visual-effects="on"] [data-visual-motion="lab"][data-vm-active] .vm-stage::after,html[data-visual-effects="on"] .vm-stage[data-visual-motion="lab"][data-vm-active]::after{opacity:.7;transform:scale(1)}
html[data-visual-effects="on"] [data-visual-motion="reading"][data-vm-active] .vm-media{transform:perspective(900px) rotateX(var(--vm-rx,0deg)) rotateY(var(--vm-ry,0deg)) scale(1.035)!important}
@keyframes vm-scan{0%{transform:translateX(-110%);opacity:0}15%{opacity:.65}85%{opacity:.65}100%{transform:translateX(110%);opacity:0}}
html:not([data-visual-effects="on"]) [data-visual-motion] .vm-stage::after,html:not([data-visual-effects="on"]) .vm-stage[data-visual-motion]::after{animation:none!important;transition:none!important;opacity:0!important}
</style>`;

export const VisualMotionScript = `<script>(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const storageKey = 'clinic-visual-effects';
  const controls = [...document.querySelectorAll('[data-visual-effects-toggle]')];
  let preference = null;
  try { preference = localStorage.getItem(storageKey); } catch (_) {}
  let enabled = false;
  const hosts = [...document.querySelectorAll('[data-visual-motion]')];
  const resetters = hosts.map(host => {
    let frame = 0, mouseInside = false, keyboardInside = false;
    const clearAngles = () => {
      cancelAnimationFrame(frame); frame = 0;
      host.style.removeProperty('--vm-rx'); host.style.removeProperty('--vm-ry');
    };
    const updateActive = () => host.toggleAttribute('data-vm-active', enabled && (mouseInside || keyboardInside));
    const reset = () => {
      mouseInside = false; keyboardInside = false;
      clearAngles(); updateActive();
    };
    const move = event => {
      if (!enabled || event.pointerType !== 'mouse') return;
      mouseInside = true; updateActive();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = host.getBoundingClientRect();
        if (rect.width && rect.height) {
          const x = Math.max(-.5, Math.min(.5, (event.clientX - rect.left) / rect.width - .5));
          const y = Math.max(-.5, Math.min(.5, (event.clientY - rect.top) / rect.height - .5));
          host.style.setProperty('--vm-rx', (-y * 4).toFixed(2) + 'deg');
          host.style.setProperty('--vm-ry', (x * 5).toFixed(2) + 'deg');
        }
        frame = 0;
      });
    };
    host.addEventListener('pointerenter', move, {passive: true});
    host.addEventListener('pointermove', move, {passive: true});
    host.addEventListener('pointerleave', () => { mouseInside = false; clearAngles(); updateActive(); });
    host.addEventListener('pointercancel', reset);
    host.addEventListener('pointerdown', event => { if (event.pointerType !== 'mouse') reset(); }, {passive: true});
    const updateFocus = () => {
      keyboardInside = host.contains(document.activeElement) && document.activeElement.matches(':focus-visible');
      updateActive();
    };
    host.addEventListener('focusin', updateFocus);
    host.addEventListener('focusout', () => queueMicrotask(updateFocus));
    return reset;
  });
  const resetAll = () => resetters.forEach(reset => reset());
  const applyPreference = () => {
    enabled = preference === 'on' || (preference !== 'off' && !reducedMotion.matches);
    root.dataset.visualEffects = enabled ? 'on' : 'off';
    resetAll();
    controls.forEach(button => {
      button.hidden = false;
      button.setAttribute('aria-pressed', String(enabled));
      button.querySelector('[data-visual-effects-state]').textContent = enabled ? 'activadas' : 'reducidas';
    });
  };
  controls.forEach(button => button.addEventListener('click', () => {
    preference = enabled ? 'off' : 'on';
    try { localStorage.setItem(storageKey, preference); } catch (_) {}
    applyPreference();
  }));
  applyPreference();
  reducedMotion.addEventListener('change', applyPreference);
  window.addEventListener('blur', resetAll);
  document.addEventListener('visibilitychange', () => { if (document.hidden) resetAll(); });
})();</script>`;
