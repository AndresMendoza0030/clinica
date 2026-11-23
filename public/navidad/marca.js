(() => {
  const marks = [...document.querySelectorAll('.clinic-seasonal-mark')];
  if (!marks.length) return;
  const visible = new Set();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function play(mark) {
    if (!visible.has(mark) || reduced.matches || document.documentElement.dataset.visualEffects === 'off') return;
    if (document.documentElement.dataset.lighting !== 'led') return;
    if (mark.hasAttribute('data-gift-motion')) return;
    mark.dataset.giftMotion = 'play';
    setTimeout(() => { delete mark.dataset.giftMotion; }, 1640);
  }

  // IDs are scoped per mark because both header and footer render the sack.
  function sack(id) {
    return `<svg class="holiday-gift-sack" aria-hidden="true" focusable="false" viewBox="0 0 68 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${id}-bag" x1="0" x2="1" y1="0" y2=".85" gradientUnits="objectBoundingBox">
          <stop stop-color="#f0866b"/><stop offset=".25" stop-color="#ce3445"/><stop offset=".59" stop-color="#ad1933"/><stop offset=".86" stop-color="#771428"/><stop offset="1" stop-color="#400f21"/>
        </linearGradient>
        <linearGradient id="${id}-gold" x1="0" y1="0" x2="0.8" y2="1">
          <stop stop-color="#fff4bc"/><stop offset=".48" stop-color="#edbe66"/><stop offset="1" stop-color="#ac742e"/>
        </linearGradient>
        <linearGradient id="${id}-green" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#70b19b"/><stop offset=".5" stop-color="#28745d"/><stop offset="1" stop-color="#164e45"/>
        </linearGradient>
      </defs>
      <g class="sack-body">
        <path d="M17 36Q31 30 48 34Q49 40 39 43L21 43Z" fill="#6a322f"/>
        <g class="sack-gifts">
          <g transform="rotate(-12 24 29)">
            <path d="M9 19H35V41H9Z" fill="url(#${id}-green)" stroke="#154b43" stroke-width="1.5"/>
            <path d="M8 18H36V24H8Z" fill="#64a791"/><path d="M19 18H24V41H19Z" fill="url(#${id}-gold)"/>
            <path d="M22 18C7 16 15 4 22 17C24 3 38 11 23 18" fill="none" stroke="#f7ce84" stroke-width="2.9" stroke-linejoin="round"/>
          </g>
          <g transform="rotate(13 41 23)">
            <path d="M30 14H52V37H30Z" fill="url(#${id}-gold)" stroke="#b27b3c" stroke-width="1.5"/>
            <path d="M29 14H53V20H29Z" fill="#ffd991"/><path d="M39 14H44V37H39Z" fill="#b22d40"/>
            <path d="M41 14C29 11 33 2 41 13C42 2 54 6 42 14" fill="none" stroke="#ca4550" stroke-width="2.8" stroke-linejoin="round"/>
          </g>
        </g>
        <path d="M17 35Q22 39 29 38L40 36Q44 34 49 33Q48 39 44 43C48 47 57 53 60 61C65 73 52 77 34 77C19 77 4 75 5 66C6 57 14 48 21 42Q18 40 17 35Z" fill="url(#${id}-bag)" stroke="#722337" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M23 45C20 49 17 56 17 61M43 45C46 49 48 53 48 58" fill="none" stroke="#8b1932" stroke-width="2.6" stroke-linecap="round" opacity=".67"/>
        <path d="M9 65C11 59 14 56 17 53" fill="none" stroke="#f19880" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>
        <path d="M21 42Q31 46 45 40M21 44Q32 47 44 42C50 41 53 47 51 50" fill="none" stroke="url(#${id}-gold)" stroke-width="3.1" stroke-linecap="round"/>
      </g>
    </svg>`;
  }
  marks.forEach((mark, index) => {
    mark.insertAdjacentHTML('beforeend', sack('gift-sack-' + index));
    const link = mark.closest('a');
    link?.addEventListener('pointerenter', () => play(mark));
    link?.addEventListener('focus', () => play(mark));
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) { visible.add(entry.target); play(entry.target); }
        else visible.delete(entry.target);
      }
    }, {threshold:.5});
    marks.forEach(mark => observer.observe(mark));
  } else {
    marks.forEach(mark => {visible.add(mark); play(mark)});
  }
  new MutationObserver(() => marks.forEach(play)).observe(document.documentElement, {
    attributes:true, attributeFilter:['data-lighting']
  });
})();
