const slides = [
  {
    image: 'portada-medico-detalle-v3',
    title: 'Atención médica',
    alt: 'Detalle de la gabacha con el logo original de la clínica y manos sosteniendo una tableta, sin mostrar el rostro. Imagen ilustrativa.',
  },
  {
    image: 'portada-recepcion',
    title: 'Recepción y sala de espera',
    alt: 'Recepción de la clínica con el mostrador de madera despejado y las sillas ordenadas, recreada a partir de la fotografía del espacio.',
  },
  {
    image: 'portada-interpretacion-espaldas-v3',
    title: 'Interpretación de estudios',
    alt: 'Radiólogo visto completamente de espaldas mientras revisa estudios en una estación de diagnóstico. Imagen ilustrativa.',
  },
  {
    image: 'portada-laboratorio',
    title: 'Laboratorio Clínico',
    alt: 'Manos con guantes organizando muestras junto a un microscopio y equipo de laboratorio clínico. Imagen ilustrativa.',
  },
];

export function HomeCarousel() {
  return `<div class="v3-home-art hc-carousel" role="region" aria-roledescription="carrusel" aria-label="Conozca nuestra clínica">
    <p id="hc-help" class="hc-sr-only">Deslice para explorar las ${slides.length} imágenes. También puede usar las flechas del teclado.</p>
    <div id="hc-viewport" class="hc-viewport" tabindex="0" aria-label="Imágenes de la clínica" aria-describedby="hc-help">
      ${slides.map((slide, index) => `<figure class="hc-slide hc-slide--${index + 1}" role="group" aria-roledescription="diapositiva" aria-label="${index + 1} de ${slides.length}: ${slide.title}">
        <img src="/assets/visuals/${slide.image}.webp" srcset="/assets/visuals/${slide.image}-720.webp 720w, /assets/visuals/${slide.image}.webp 1536w" sizes="(max-width: 760px) 130vw, 1000px" width="1536" height="1024" alt="${slide.alt}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" draggable="false">
        <figcaption class="hc-caption"><span class="hc-eyebrow">CLÍNICA DR. MENDOZA <span aria-hidden="true">/ ${String(index + 1).padStart(2, '0')}</span></span><strong>${slide.title}</strong></figcaption>
      </figure>`).join('')}
    </div>
    <div class="hc-controls" hidden>
      <button class="hc-arrow" type="button" data-hc-prev aria-label="Imagen anterior" aria-controls="hc-viewport"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m14 5-7 7 7 7"/></svg></button>
      <div class="hc-dots" role="group" aria-label="Elegir imagen">${slides.map((slide, i) => `<button class="hc-dot" type="button" data-hc-go="${i}" aria-label="Ver imagen ${i + 1}: ${slide.title}" aria-controls="hc-viewport" aria-current="${i === 0 ? 'true' : 'false'}"><span></span></button>`).join('')}</div>
      <button class="hc-arrow" type="button" data-hc-next aria-label="Imagen siguiente" aria-controls="hc-viewport"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m10 5 7 7-7 7"/></svg></button>
    </div>
    <span class="hc-sr-only" data-hc-status role="status" aria-live="polite" aria-atomic="true"></span>
  </div>`;
}

export const HomeCarouselStyles = `<style id="home-carousel-style">
.hc-carousel.v3-home-art{display:block;padding:0;background:#d9d6d1;isolation:isolate}
.hc-viewport{display:flex;width:100%;height:100%;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;scrollbar-width:none;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch}
.hc-viewport::-webkit-scrollbar{display:none}
.hc-viewport:focus-visible{outline:3px solid #fff;outline-offset:-5px}
.hc-slide{position:relative;flex:0 0 100%;min-width:0;height:100%;margin:0;scroll-snap-align:start;scroll-snap-stop:always;overflow:hidden}
.hc-carousel .hc-slide img{width:100%;height:100%;object-fit:cover;object-position:center;user-select:none;-webkit-user-drag:none}
.hc-carousel .hc-slide--2 img{object-position:38% center}
.hc-slide::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,transparent 52%,rgba(14,21,27,.2) 64%,rgba(14,21,27,.9) 100%)}
.hc-carousel .hc-caption{position:absolute;left:32px;right:32px;bottom:88px;z-index:1;color:#fff;letter-spacing:normal;font-family:inherit;pointer-events:none}
.hc-eyebrow{display:block;font-size:9px;line-height:1.5;letter-spacing:.17em;font-weight:600;color:#e5e3df}
.hc-caption strong{display:block;margin-top:10px;font-size:clamp(23px,2.1vw,32px);font-weight:500;line-height:1.15;letter-spacing:-.025em}
.hc-controls{position:absolute;bottom:22px;left:32px;right:32px;display:flex;align-items:center;gap:14px;z-index:2;border-top:1px solid #ffffff36;padding-top:14px}
.hc-controls[hidden]{display:none}
.hc-controls button{border:0;cursor:pointer;background:transparent;color:#fff;padding:0;font:inherit;display:flex;align-items:center;justify-content:center;touch-action:manipulation}
.hc-controls .hc-arrow{width:44px;height:44px;border:1px solid #ffffff55;border-radius:50%;transition:background .2s,border-color .2s}
.hc-controls .hc-arrow:hover{background:#ffffff1f;border-color:#fff}
.hc-controls button:focus-visible{outline:2px solid #fff;outline-offset:4px}
.hc-dots{display:flex;align-items:center;justify-content:center;flex:1}
.hc-controls .hc-dot{width:44px;height:44px}
.hc-dot span{width:6px;height:6px;background:#ffffff73;border-radius:5px;transition:width .2s,background .2s}
.hc-dot[aria-current="true"] span{width:25px;background:#fff}
.hc-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.hc-carousel[data-enhanced] .hc-viewport{cursor:grab}
.hc-viewport.hc-dragging{cursor:grabbing!important;scroll-snap-type:none;user-select:none}
@media(max-width:760px){.hc-carousel.v3-home-art{height:auto;aspect-ratio:1;min-height:360px;max-height:580px}.hc-carousel .hc-caption{left:6vw;right:6vw;bottom:88px}.hc-caption strong{font-size:25px}.hc-controls{left:6vw;right:6vw;bottom:18px}.hc-carousel .hc-slide--1 img{object-position:50% 35%}.hc-slide::after{background:linear-gradient(180deg,transparent 38%,rgba(14,21,27,.65) 63%,rgba(14,21,27,.94) 100%)}}
@media(prefers-reduced-motion:reduce){.hc-controls .hc-arrow,.hc-dot span{transition:none}}
</style>`;

// Native scroll snapping preserves touch navigation even when JavaScript is unavailable.
export const HomeCarouselScript = `<script>
(() => {
  const root = document.querySelector('.hc-carousel');
  if (!root) return;
  const viewport = root.querySelector('.hc-viewport');
  const slides = [...root.querySelectorAll('.hc-slide')];
  const dots = [...root.querySelectorAll('[data-hc-go]')];
  const status = root.querySelector('[data-hc-status]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let frame = 0;
  let announcement;
  let drag;
  function sync(announce = true) {
    const next = Math.max(0, Math.min(slides.length - 1, Math.round(viewport.scrollLeft / viewport.clientWidth)));
    const changed = next !== current;
    current = next;
    dots.forEach((dot, index) => dot.setAttribute('aria-current', String(index === current)));
    slides.forEach((slide, index) => slide.setAttribute('aria-hidden', String(index !== current)));
    if (announce && changed) {
      clearTimeout(announcement);
      announcement = setTimeout(() => { status.textContent = slides[current].getAttribute('aria-label'); }, 180);
    }
  }
  function go(index, instant = false) {
    const next = (index + slides.length) % slides.length;
    viewport.scrollTo({left: next * viewport.clientWidth, behavior: instant || reducedMotion.matches ? 'instant' : 'smooth'});
  }
  root.querySelector('[data-hc-prev]').addEventListener('click', () => go(current - 1));
  root.querySelector('[data-hc-next]').addEventListener('click', () => go(current + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => go(index)));
  viewport.addEventListener('scroll', () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => sync()); }, {passive:true});
  viewport.addEventListener('keydown', event => {
    const destinations = {ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: slides.length - 1};
    if (event.key in destinations) { event.preventDefault(); go(destinations[event.key]); }
  });
  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    drag = {x: event.clientX, left: viewport.scrollLeft};
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('hc-dragging');
  });
  viewport.addEventListener('pointermove', event => {
    if (drag) viewport.scrollLeft = drag.left + drag.x - event.clientX;
  });
  function finishDrag() {
    if (!drag) return;
    const next = Math.round(viewport.scrollLeft / viewport.clientWidth);
    drag = null;
    viewport.classList.remove('hc-dragging');
    go(next);
  }
  viewport.addEventListener('pointerup', finishDrag);
  viewport.addEventListener('pointercancel', finishDrag);
  viewport.addEventListener('lostpointercapture', finishDrag);
  new ResizeObserver(() => go(current, true)).observe(viewport);
  root.querySelector('.hc-controls').hidden = false;
  root.dataset.enhanced = 'true';
  sync(false);
})();
</script>`;
