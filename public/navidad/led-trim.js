(() => {
  function mountStrand() {
    const header = document.querySelector('.th-header');
    if (!header || header.querySelector('.clinic-led-strand')) return;

    const strand = document.createElement('span');
    strand.className = 'clinic-led-strand';
    strand.setAttribute('aria-hidden', 'true');
    header.prepend(strand);

    function makeSegment() {
      const segment = document.createElement('span');
      segment.className = 'clinic-led-segment';
      for (let index = 0; index < 4; index++) {
        const lamp = document.createElement('span');
        lamp.className = 'clinic-led-lamp';
        segment.append(lamp);
      }
      return segment;
    }

    function fitStrand() {
      const availableWidth = strand.clientWidth;
      if (!availableWidth) return;
      if (!strand.firstChild) strand.append(makeSegment());
      const segmentWidth = strand.firstChild.getBoundingClientRect().width;
      if (!segmentWidth) return;
      const count = Math.ceil(availableWidth / segmentWidth);

      while (strand.childElementCount < count) strand.append(makeSegment());
      while (strand.childElementCount > count) strand.lastChild.remove();

      const lampsAcross = Math.max(1, availableWidth * 4 / segmentWidth - 1);
      strand.querySelectorAll('.clinic-led-lamp').forEach((lamp, index) => {
        const delay = Math.round(820 * Math.min(1, index / lampsAcross));
        lamp.style.setProperty('--led-delay', delay + 'ms');
      });
    }

    fitStrand();
    if ('ResizeObserver' in window) {
      new ResizeObserver(fitStrand).observe(strand);
    } else {
      window.addEventListener('resize', fitStrand);
      new MutationObserver(fitStrand).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-lighting']
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountStrand, { once: true });
  } else {
    mountStrand();
  }
})();
