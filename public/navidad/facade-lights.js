(() => {
  const root = document.documentElement;
  const namespace = 'http://www.w3.org/2000/svg';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  // Coordinates follow the fixed 720 × 480 composition of each architectural rendering.
  const outlines = {
    matriz: [[[97,60],[270,45]],[[280,52],[617,22],[660,126]],[[98,242],[266,240]],[[103,408],[103,292],[127,270]],[[217,269],[247,292],[247,406]]],
    farid: [[[98,257],[98,63],[235,52]],[[243,77],[486,62]],[[495,52],[650,44],[678,72]],[[92,263],[109,271],[128,263]],[[147,263],[183,277],[225,264]],[[252,263],[294,276],[333,263]],[[364,263],[407,276],[450,263]],[[480,264],[528,277],[573,263]],[[602,263],[629,272],[650,263]]],
    advanced: [[[88,121],[181,111],[261,99]],[[267,45],[323,33],[392,28],[473,30]],[[479,89],[566,93],[656,94]],[[91,228],[142,226],[246,217]],[[251,213],[359,208],[482,209]],[[498,219],[656,226]],[[198,181]],[[368,164]],[[554,173]]]
  };
  const make = (tag, attributes) => {
    const element = document.createElementNS(namespace, tag);
    for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
    return element;
  };
  let maskSequence = 0;
  function animateLights(frame, branch) {
    frame.querySelector('.facade-sweep')?.remove();
    if (!outlines[branch] || reducedMotion.matches || root.dataset.visualEffects === 'off' || root.dataset.lighting !== 'led') return;
    const maskId = 'led-sweep-' + ++maskSequence;
    const svg = make('svg', {class:'facade-sweep', viewBox:'0 0 720 480', 'aria-hidden':'true', focusable:'false'});
    const defs = make('defs', {});
    const mask = make('mask', {id:maskId, maskUnits:'userSpaceOnUse', x:0, y:0, width:720, height:480});
    for (const [index, points] of outlines[branch].entries()) {
      const [first, ...rest] = points;
      const point = rest.length
        ? make('path', {d:'M'+first.join(' ')+' '+rest.map(pair=>'L'+pair.join(' ')).join(' '), pathLength:1, 'stroke-dasharray':'1 1', stroke:'white', fill:'none', 'stroke-width':8, 'stroke-linecap':'round'})
        : make('circle', {cx:first[0], cy:first[1], r:12, fill:'white'});
      point.style.setProperty('--trail-delay', index * 110 + 'ms');
      mask.append(point);
    }
    defs.append(mask);
    const photo = frame.querySelector('img');
    const litPhoto = make('image', {href:photo.getAttribute('src'), width:720, height:480, mask:'url(#'+maskId+')'});
    svg.append(defs,litPhoto);
    frame.append(svg);
    svg.addEventListener('animationend', event => { if (event.target === svg) svg.remove(); });
  }
  // Observe only the image areas, so lights begin as the branch enters view.
  const seen = new Set();
  let observer;
  function trackCards() {
    observer?.disconnect();
    seen.clear();
    if (root.dataset.lighting !== 'led' || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      for (const {target, isIntersecting} of entries) {
        if (!isIntersecting || seen.has(target)) continue;
        seen.add(target);
        animateLights(target, target.dataset.ledBranch);
      }
    }, { threshold:.18 });
    document.querySelectorAll('.led-location-card-picture').forEach(frame => observer.observe(frame));
  }
  function initialize() {
    trackCards();
    new MutationObserver(trackCards).observe(root, {attributes:true, attributeFilter:['data-lighting','data-led-color']});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, {once:true});
  else initialize();

  document.addEventListener('clinic:facade-show', event => {
    const frame = event.target.querySelector('.led-location-picture');
    if (!frame) return;
    frame.dataset.ledBranch = event.detail.key;
    let replay = frame.querySelector('.facade-replay');
    if (!replay) {
      replay = document.createElement('button');
      replay.className = 'facade-replay';
      replay.type = 'button';
      replay.setAttribute('aria-label', 'Repetir el encendido de la fachada');
      replay.innerHTML = '<svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 10a8 8 0 1 1 0 5M4 4v6h6"/></svg> Encendido';
      replay.addEventListener('click', () => animateLights(frame, frame.dataset.ledBranch));
      frame.append(replay);
    }
    animateLights(frame, event.detail.key);
  });
})();
