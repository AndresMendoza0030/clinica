// Image-based depth and light effects. No loops, dependencies or touch gestures.
export const VisualMotionStyles = `<style id="visual-motion">
[data-visual-motion] .vm-stage,.vm-stage[data-visual-motion]{isolation:isolate;overflow:hidden}
.cl-photo.vm-stage,.th-modality>.vm-stage,.th-lab-image.vm-stage{position:relative;display:block}
.th-modality>.vm-stage{padding:0;flex:none;width:100%}
[data-visual-motion] .vm-media{transform-origin:50% 65%;transition:transform .55s cubic-bezier(.2,.7,.2,1)}
.cl-card[data-visual-motion]{transition:box-shadow .4s,border-color .4s}
.cl-card[data-visual-motion] .cl-photo{padding:18px 16px 12px;background:#fff}
.vm-stage::after{pointer-events:none}
@media(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference){
  [data-visual-motion]:is(:hover,:focus-within) .vm-media{transform:perspective(900px) translateY(-5px) rotateX(var(--vm-rx,1deg)) rotateY(var(--vm-ry,-1deg)) scale(1.045)!important}
  [data-visual-motion="clinic"]:is(:hover,:focus-within){border-color:#b8aaa2;box-shadow:0 15px 35px #17263214}
  [data-visual-motion="clinic"]:is(:hover,:focus-within) .vm-media{transform:perspective(900px) translateY(-8px) rotateX(var(--vm-rx,2deg)) rotateY(var(--vm-ry,-1deg)) scale(1.055)!important}
  [data-visual-motion="clinic"] .vm-stage::after{content:"";position:absolute;z-index:1;left:20%;right:20%;bottom:7%;height:9%;border-radius:50%;background:radial-gradient(ellipse,#18273330,transparent 68%);opacity:0;transform:scale(.8);transition:opacity .5s,transform .5s}
  [data-visual-motion="clinic"]:is(:hover,:focus-within) .vm-stage::after{opacity:.7;transform:scale(1.1)}
  [data-visual-motion="scan"] .vm-stage::after,.vm-stage[data-visual-motion="scan"]::after{content:"";position:absolute;z-index:2;inset:0;background:linear-gradient(110deg,transparent 35%,#fff9 49%,#b6473b33 50%,transparent 55%);transform:translateX(-110%);opacity:0}
  [data-visual-motion="scan"]:is(:hover,:focus-within) .vm-stage::after,.vm-stage[data-visual-motion="scan"]:is(:hover,:focus-within)::after{animation:vm-scan 1.1s ease-out both}
  [data-visual-motion="lab"]:is(:hover,:focus-within) .vm-media{transform:perspective(900px) rotateX(var(--vm-rx,0deg)) rotateY(var(--vm-ry,0deg)) scale(1.065)!important}
  [data-visual-motion="lab"] .vm-stage::after,.vm-stage[data-visual-motion="lab"]::after{content:"";position:absolute;z-index:2;width:38%;aspect-ratio:1;left:31%;top:20%;border:1px solid #9d232073;border-radius:50%;box-shadow:0 0 0 12px #fff2;opacity:0;transform:scale(.8);transition:opacity .5s,transform .7s}
  [data-visual-motion="lab"]:is(:hover,:focus-within) .vm-stage::after,.vm-stage[data-visual-motion="lab"]:is(:hover,:focus-within)::after{opacity:.7;transform:scale(1)}
  [data-visual-motion="reading"]:is(:hover,:focus-within) .vm-media{transform:perspective(900px) rotateX(var(--vm-rx,0deg)) rotateY(var(--vm-ry,0deg)) scale(1.035)!important}
}
@keyframes vm-scan{0%{transform:translateX(-110%);opacity:0}15%{opacity:.65}85%{opacity:.65}100%{transform:translateX(110%);opacity:0}}
@media(prefers-reduced-motion:reduce),(hover:none),(pointer:coarse){
  [data-visual-motion] .vm-media{transform:none!important;transition:none!important}
  [data-visual-motion] .vm-stage::after,.vm-stage[data-visual-motion]::after{animation:none!important;transition:none!important;opacity:0!important}
  .cl-card[data-visual-motion],.clinic-category-card[data-visual-motion]{transform:none!important;transition:none!important}
}
</style>`;

export const VisualMotionScript = `<script>(() => {
  const allowed = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  const hosts = [...document.querySelectorAll('[data-visual-motion]')];
  const resetters = hosts.map(host => {
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame); frame = 0;
      host.style.removeProperty('--vm-rx'); host.style.removeProperty('--vm-ry');
    };
    host.addEventListener('pointermove', event => {
      if (!allowed.matches || event.pointerType !== 'mouse') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = host.getBoundingClientRect();
        const x = Math.max(-.5, Math.min(.5, (event.clientX - rect.left) / rect.width - .5));
        const y = Math.max(-.5, Math.min(.5, (event.clientY - rect.top) / rect.height - .5));
        host.style.setProperty('--vm-rx', (-y * 4).toFixed(2) + 'deg');
        host.style.setProperty('--vm-ry', (x * 5).toFixed(2) + 'deg');
        frame = 0;
      });
    }, {passive: true});
    host.addEventListener('pointerleave', reset);
    host.addEventListener('pointercancel', reset);
    return reset;
  });
  const resetAll = () => resetters.forEach(reset => reset());
  allowed.addEventListener('change', resetAll);
  window.addEventListener('blur', resetAll);
  document.addEventListener('visibilitychange', () => { if (document.hidden) resetAll(); });
})();</script>`;
