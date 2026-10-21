// Mejoras compartidas que conservan la identidad actual del sitio.
export function SitePolish() {
  return `
    <style>
      html { scroll-behavior: smooth; scroll-padding-top: 5.4rem; }
      body { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 430, 'GRAD' 0, 'opsz' 24;
        flex-shrink: 0;
        vertical-align: middle;
      }
      a:focus-visible, button:focus-visible {
        outline: 3px solid #e9938c;
        outline-offset: 3px;
        border-radius: 5px;
      }
      .clinic-image {
        background-size: cover;
        background-position: center;
        background-color: #eadfdf;
      }
      .clinic-lab-visual {
        position: relative;
        isolation: isolate;
        overflow: hidden;
      }
      .clinic-lab-visual::after {
        content: "";
        position: absolute;
        border: 1px solid currentColor;
        opacity: .13;
        width: 168px; height: 168px;
        border-radius: 50%;
        transform: translate(54px, 32px);
        pointer-events: none;
      }
      .clinic-lab-visual > .material-symbols-outlined { z-index: 1; }
      .clinic-lab-card:nth-child(2n) .clinic-lab-visual {
        background: linear-gradient(135deg, #f2f4ff, #e5ebfa);
        color: #526eac;
      }
      .clinic-lab-card:nth-child(3n) .clinic-lab-visual {
        background: linear-gradient(135deg, #f3f9f6, #e3f2e9);
        color: #3f8070;
      }
      .clinic-lab-card:nth-child(5n) .clinic-lab-visual {
        background: linear-gradient(135deg, #fff9f0, #f9eddc);
        color: #a97637;
      }

      /* Refinamiento institucional: fotografías, composición editorial y tarjetas. */
      :root { --clinic-red:#9d2320; --clinic-deep:#711c1c; --clinic-ink:#19242d; --clinic-soft:#606a71; --clinic-line:#dce0dd; }
      .clinic-eyebrow { display:inline-flex; align-items:center; gap:10px;
        font-size:11px; font-weight:800; letter-spacing:.17em; text-transform:uppercase; }
      .clinic-eyebrow:before { content:""; width:27px; height:2px; flex-shrink:0;
        background:currentColor; border-radius:6px; }
      .clinic-section-title { font-size:clamp(30px,3.2vw,45px); line-height:1.17;
        font-weight:850; letter-spacing:-.044em; }
      .clinic-lead { line-height:1.8; }
      .clinic-hero-stage { isolation:isolate; min-height:645px; background-color:#251d21;
        background-position:center 45%; }
      .clinic-hero-stage:before { content:""; position:absolute; inset:0; z-index:0;
        background:linear-gradient(90deg,rgba(20,14,18,.87),rgba(27,16,21,.74) 42%,rgba(27,16,21,.40)); }
      .clinic-hero-stage:after { content:""; position:absolute; inset:0; z-index:0;
        background:linear-gradient(0deg,rgba(19,13,17,.38),transparent 45%); pointer-events:none; }
      .clinic-hero-inner { width:min(1280px,100%); margin-inline:auto; position:relative; z-index:1; }
      .clinic-hero-title { font-size:clamp(45px,5.4vw,78px); max-width:790px;
        line-height:1.055; letter-spacing:-.055em; text-wrap:balance;
        text-shadow:0 6px 35px rgba(0,0,0,.17); }
      .clinic-hero-desc { max-width:640px; line-height:1.77; }
      .clinic-hero-btn { min-height:52px; padding-inline:25px; border-radius:10px;
        box-shadow:0 8px 28px rgba(0,0,0,.14); font-weight:800; }
      .clinic-hero-trust { display:flex; flex-wrap:wrap; align-items:center;
        gap:18px; color:#f4e8e7; font-size:12px; font-weight:650; }
      .clinic-hero-trust span { display:inline-flex; align-items:center; gap:6px; }
      .clinic-hero-trust .material-symbols-outlined { font-size:18px; color:#f2c0ba; }
      .clinic-quick-section { position:relative; z-index:3; margin-top:-94px; }
      .clinic-quick-card { position:relative; overflow:hidden; padding:29px; border-radius:19px;
        border:1px solid #ead9d5; box-shadow:0 18px 45px rgba(40,18,20,.095);
        transition:transform .24s ease,box-shadow .24s ease,border-color .24s ease; }
      .clinic-quick-card:before { content:""; position:absolute; top:0; left:29px; width:40px; height:3px; background:var(--clinic-red); }
      .clinic-quick-card:hover { transform:translateY(-4px); box-shadow:0 23px 47px rgba(40,18,20,.15); border-color:#d8b6b1; }
      .clinic-quick-icon { width:58px; height:58px; border-radius:16px!important; }
      .clinic-quick-card h3 { font-size:19px; letter-spacing:-.025em; }
      .clinic-quick-card p { line-height:1.7; }
      .clinic-photo-frame { border-radius:22px; overflow:hidden; box-shadow:0 18px 50px rgba(47,22,24,.12); }
      .clinic-photo-frame > .aspect-video { aspect-ratio:1.30; }
      .clinic-photo-frame .clinic-photo-caption { background:linear-gradient(0deg,rgba(18,11,15,.80),transparent); }
      .clinic-trust-stat { padding:18px 2px 4px; border-top:2px solid #ead3ce; display:flex; flex-direction:column; gap:7px; }
      .clinic-trust-stat strong { font-size:clamp(22px,2.4vw,32px); font-weight:850; color:var(--clinic-red); letter-spacing:-.045em; line-height:1.1; }
      .clinic-trust-stat span { font-size:12px; color:#76696b; line-height:1.55; }
      .clinic-modality-grid { gap:18px; }
      .clinic-modality-card { display:flex; flex-direction:column; overflow:hidden;
        border:1px solid var(--clinic-line); border-radius:18px; background:white;
        box-shadow:0 6px 23px rgba(47,20,20,.04);
        transition:transform .24s ease,box-shadow .24s ease; }
      .clinic-modality-card:hover { transform:translateY(-4px); box-shadow:0 18px 35px rgba(47,20,20,.12); }
      .clinic-modality-card .photo { overflow:hidden; background:#ece4e2; }
      .clinic-modality-card img { width:100%; height:169px; object-fit:cover; display:block;
        transition:transform .3s ease; }
      .clinic-modality-card:hover img { transform:scale(1.035); }
      .clinic-modality-copy { padding:18px 19px 20px; }
      .clinic-modality-copy h3 { font-size:17px; font-weight:820; letter-spacing:-.02em; }
      .clinic-modality-copy p { font-size:12px; color:#74696b; line-height:1.65; margin-top:8px; }
      .clinic-modality-link { font-size:12px; font-weight:800; color:var(--clinic-red);
        display:inline-flex; align-items:center; gap:5px; margin-top:15px; }
      .clinic-category-card { overflow:hidden; transition:box-shadow .25s ease,transform .25s ease; }
      .clinic-category-card:hover { box-shadow:0 18px 40px rgba(47,20,20,.12); }
      .clinic-category-desc { min-height:40px; font-size:13px; color:#766d70; line-height:1.6; }
      .clinic-category-card .clinic-image { transform:scale(1); transition:transform .35s ease; }
      .clinic-category-card:hover .clinic-image { transform:scale(1.025); }
      .clinic-lab-card .clinic-lab-visual { height:152px; }
      .clinic-lab-card .clinic-lab-visual .material-symbols-outlined { font-size:60px!important; }
      .clinic-lab-card .clinic-lab-visual:before { content:""; position:absolute; width:250px; height:250px;
        border:1px solid currentColor; border-radius:50%; top:-155px; left:-80px; opacity:.1; }
      .clinic-lab-card .clinic-lab-visual:after { width:225px; height:225px; opacity:.07; }
      .clinic-category-intro { border-left:3px solid var(--clinic-red); padding-left:16px; margin-bottom:27px; }
      .clinic-institutional-band { background:#281e22; color:white; }
      .clinic-institutional-band p { color:#e0cecb; }
      @media(max-width:767px) {
        .clinic-hero-stage { min-height:635px; background-position:58% center; }
        .clinic-hero-stage:before { background:linear-gradient(90deg,rgba(21,15,19,.89),rgba(21,15,19,.66)); }
        .clinic-hero-title { font-size:clamp(41px,10vw,60px); }
        .clinic-quick-section { margin-top:-63px; }
        .clinic-quick-card { padding:23px; }
        .clinic-photo-frame > .aspect-video { aspect-ratio:1.4; }
        .clinic-modality-card img { height:132px; }
        .clinic-hero-trust { gap:11px; }
      }
      @media(max-width:420px) {
        .clinic-hero-title { font-size:41px; }
        .clinic-modality-grid { grid-template-columns:1fr 1fr; gap:12px; }
        .clinic-modality-card img { height:105px; }
        .clinic-modality-copy { padding:12px; }
        .clinic-modality-copy h3 { font-size:14px; }
      }
      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
      }
    </style>
  `;
}
