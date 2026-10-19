// Componentes exclusivos del Inicio: estética médica tecnológica, sin iconografía decorativa.
// Se utiliza el favicon institucional y no se modifica el encabezado del resto de páginas.
const ASSETS = "https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/";

export function HomeTechHeader() {
  return `
    <header class="th-header" id="top">
      <div class="th-shell th-nav-shell">
        <a href="/" class="th-brand" aria-label="Clínica Radiológica y Laboratorio Clínico Dr. Mendoza, inicio">
          <img src="${ASSETS}faviconDr.png" width="52" height="52" alt="" class="th-brand-icon" />
          <span class="th-brand-name">
            <span>CLÍNICA RADIOLÓGICA</span>
            <span>Y LABORATORIO CLÍNICO</span>
            <strong>Dr. Mendoza</strong>
          </span>
        </a>
        <nav class="th-nav" aria-label="Navegación principal">
          <a href="/" aria-current="page">Inicio</a>
          <a href="/estudios.html">Diagnóstico por Imágenes</a>
          <a href="/laboratorio.html">Laboratorio Clínico</a>
          <a href="#institucional">Nuestra Clínica</a>
          <a href="#sedes">Sedes</a>
        </nav>
        <a class="th-nav-contact" href="https://wa.me/50378205613" target="_blank" rel="noopener noreferrer">Contacto <span aria-hidden="true">↗</span></a>
        <button type="button" class="th-menu-button" id="techMenuToggle"
          aria-label="Abrir menú de navegación" aria-controls="techMobileNav" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav class="th-mobile-nav" id="techMobileNav" aria-label="Navegación móvil" hidden>
        <a href="/">Inicio</a>
        <a href="/estudios.html">Diagnóstico por Imágenes</a>
        <a href="/laboratorio.html">Laboratorio Clínico</a>
        <a href="#institucional">Nuestra Clínica</a>
        <a href="#sedes">Sedes y Contacto</a>
        <a href="https://wa.me/50378205613" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
      </nav>
    </header>
  `;
}

export function HomeTechFooter() {
  return `
    <footer class="th-footer">
      <div class="th-shell th-footer-grid">
        <div class="th-footer-identity">
          <img src="${ASSETS}faviconDr.png" alt="" width="35" height="35" loading="lazy" />
          <div><strong>Dr. Mendoza</strong><span>Clínica Radiológica y Laboratorio Clínico</span></div>
        </div>
        <div class="th-footer-hours">
          <strong>Horario de atención</strong>
          <span>Lunes a viernes · 6:30 a. m. – 4:30 p. m.</span>
          <span>Sábado · 6:30 a. m. – 12:00 m.</span>
        </div>
        <div class="th-footer-links">
          <a href="/estudios.html">Imagenología</a>
          <a href="/laboratorio.html">Laboratorio</a>
          <a href="#sedes">Contacto</a>
        </div>
      </div>
      <div class="th-shell th-footer-bottom">
        <span>© 2026 Clínica Radiológica y Laboratorio Clínico Dr. Mendoza</span>
        <span>San Miguel, El Salvador · Fundada en 2006</span>
      </div>
    </footer>
  `;
}

export function HomeTechStyle() {
  return `
  <style>
    :root {
      --th-night: #0a131d;
      --th-night-2: #111e2a;
      --th-slate: #263440;
      --th-ink: #16232d;
      --th-red: #9d2320;
      --th-red-hover: #bb312b;
      --th-border: #dce2e6;
      --th-paper: #f6f8f9;
      --th-secondary: #67727c;
      --th-font: "Manrope", "Segoe UI", Arial, sans-serif;
      --th-mono: "IBM Plex Mono", monospace;
    }
    *, *::before, *::after { box-sizing:border-box; }
    html { scroll-behavior:smooth; scroll-padding-top:88px; }
    body.th-body { margin:0; background:#fff; color:var(--th-ink); font:400 15px/1.65 var(--th-font); -webkit-font-smoothing:antialiased; overflow-x:hidden; }
    .th-body a { text-decoration:none; color:inherit; }
    .th-body a:focus-visible, .th-body button:focus-visible { outline:3px solid #e9938c; outline-offset:4px; }
    .th-shell { width:min(100% - 100px, 1390px); margin-inline:auto; }
    .th-header { position:sticky; top:0; z-index:50; background:rgba(8,18,28,.985); border-bottom:1px solid rgba(255,255,255,.12); backdrop-filter:blur(15px); color:#fff; }
    .th-nav-shell { height:80px; display:flex; align-items:center; gap:clamp(12px,1.75vw,30px); }
    .th-brand { display:flex; align-items:center; gap:12px; flex:none; min-width:215px; color:#fff; }
    .th-brand-icon { display:block; width:46px; height:46px; object-fit:contain; }
    .th-brand-name { display:flex; flex-direction:column; line-height:1.25; letter-spacing:.14em; font-size:9px; font-weight:750; white-space:nowrap; }
    .th-brand-name strong { display:block; margin-top:2px; font-size:16px; font-weight:800; letter-spacing:.012em; text-transform:none; }
    .th-nav { display:flex; align-items:center; justify-content:center; flex:1; gap:clamp(15px,2.2vw,38px); height:100%; white-space:nowrap; }
    .th-nav a { height:100%; display:inline-flex; align-items:center; position:relative; color:#d0d9e0; font-size:12.5px; font-weight:580; transition:color .2s ease; }
    .th-nav a:hover, .th-nav a[aria-current="page"] { color:#fff; }
    .th-nav a[aria-current="page"]::after { content:""; position:absolute; left:0; bottom:0; height:2px; width:100%; background:var(--th-red-hover); }
    .th-nav-contact { display:inline-flex; align-items:center; justify-content:center; gap:15px; padding:10px 0 10px 21px; border-left:1px solid rgba(255,255,255,.30); font-size:12.5px; font-weight:720; white-space:nowrap; }
    .th-nav-contact span { font-size:17px; font-weight:400; color:#ef9993; }
    .th-menu-button { display:none; background:none; border:1px solid #53606a; border-radius:6px; height:42px; width:45px; color:#fff; align-items:center; justify-content:center; flex-direction:column; gap:5px; cursor:pointer; }
    .th-menu-button span { width:20px; height:1.5px; background:#fff; display:block; }
    .th-mobile-nav { display:none; background:#0d1924; padding:12px 24px 24px; border-top:1px solid #2c3b48; }
    .th-mobile-nav:not([hidden]) { display:flex; flex-direction:column; }
    .th-mobile-nav a { padding:13px 4px; color:#edf2f5; border-bottom:1px solid #273640; font-size:14px; }
    .th-home-hero { position:relative; isolation:isolate; min-height:615px; overflow:hidden; background-color:#13202d; display:flex; align-items:center; color:white; }
    .th-home-hero::before { content:""; position:absolute; inset:0; z-index:-1; background:linear-gradient(90deg,rgba(5,15,23,.97) 0%,rgba(6,17,26,.92) 31%,rgba(7,20,29,.55) 54%,rgba(4,14,24,.10) 82%),linear-gradient(0deg,rgba(2,12,19,.26),transparent 50%); }
    .th-hero-photo { position:absolute; inset:0; z-index:-2; background-image:url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Resonancia%20magnetica.png"); background-size:cover; background-position:center 46%; filter:saturate(.75) contrast(1.08); }
    .th-hero-photo::after { content:""; position:absolute; inset:0; background:linear-gradient(90deg,#0c1b29 0%,transparent 70%); }
    .th-hero-content { position:relative; padding-block:88px 105px; }
    .th-kicker { display:flex; align-items:center; gap:13px; color:#d3dfe8; font-family:var(--th-mono); font-size:10.5px; letter-spacing:.17em; font-weight:500; text-transform:uppercase; }
    .th-kicker::before { content:""; flex:none; width:31px; height:2px; background:var(--th-red-hover); }
    .th-home-hero h1 { font-size:clamp(45px,5.1vw,76px); line-height:1.095; font-weight:700; letter-spacing:-.048em; margin:22px 0 20px; max-width:680px; text-wrap:balance; }
    .th-hero-lead { font-size:clamp(14px,1.3vw,18px); line-height:1.75; color:#dfebf2; max-width:570px; margin:0; font-weight:450; }
    .th-actions { display:flex; flex-wrap:wrap; gap:13px; margin-top:31px; }
    .th-button { display:inline-flex; align-items:center; justify-content:center; gap:21px; min-height:52px; padding:14px 22px; border-radius:3px; font-weight:760; font-size:12px; letter-spacing:.04em; transition:transform .2s, background .2s, border-color .2s; }
    .th-button:hover { transform:translateY(-2px); }
    .th-button-primary { background:var(--th-red); color:#fff!important; }
    .th-button-primary:hover { background:var(--th-red-hover); }
    .th-button-outline { border:1px solid #91a2ad; color:white!important; }
    .th-button-outline:hover { background:#ffffff15; border-color:#fff; }
    .th-arrow { font-family:Arial,sans-serif; font-size:21px; font-weight:400; line-height:1; }
    .th-hero-proof { margin-top:60px; display:flex; align-items:stretch; gap:0; }
    .th-proof { display:flex; flex-direction:column; gap:6px; padding:0 24px; border-left:1px solid rgba(215,229,239,.38); min-width:139px; }
    .th-proof:first-child { padding-left:0; border-left:0; }
    .th-proof strong { font-size:12px; line-height:1.3; font-weight:800; letter-spacing:.06em; }
    .th-proof span { color:#aebecb; text-transform:uppercase; font:500 9px/1.4 var(--th-mono); letter-spacing:.12em; }
    .th-photo-note { position:absolute; right:26px; bottom:20px; z-index:1; color:#d5dee4; background:#09151ca8; padding:5px 9px; font:500 10px/1.5 var(--th-mono); letter-spacing:.06em; }
    .th-modality-strip { display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); background:#0e1a26; border-top:1px solid #32414b; border-bottom:1px solid #263541; color:#fff; }
    .th-modality { position:relative; display:flex; flex-direction:column; justify-content:space-between; min-height:218px; padding:23px 22px 19px; overflow:hidden; border-right:1px solid #ffffff4a; isolation:isolate; }
    .th-modality:last-child { border-right:0; }
    .th-modality img { position:absolute; z-index:-2; inset:0; width:100%; height:100%; object-fit:cover; filter:saturate(.60) brightness(.72); transition:transform .35s,filter .35s; }
    .th-modality::after { content:""; position:absolute; inset:0; z-index:-1; background:linear-gradient(90deg,rgba(4,17,26,.86),rgba(5,17,26,.31)),linear-gradient(0deg,rgba(4,12,19,.70),transparent 65%); transition:background .2s; }
    .th-modality:hover img { transform:scale(1.06); filter:saturate(.86) brightness(.87); }
    .th-modality:hover::after { background:linear-gradient(90deg,rgba(4,17,26,.72),rgba(5,17,26,.15)),linear-gradient(0deg,rgba(4,12,19,.60),transparent 65%); }
    .th-modality--lab::after { background:linear-gradient(90deg,rgba(105,17,19,.95),rgba(65,16,20,.54)); }
    .th-modality-number { font:500 10px var(--th-mono); color:#c0cbd2; letter-spacing:.15em; }
    .th-modality h2 { font-size:clamp(14px,1.45vw,19px); letter-spacing:-.028em; line-height:1.22; font-weight:730; margin:0 0 10px; max-width:205px; }
    .th-modality p { font-size:11.5px; line-height:1.53; color:#d4dfe5; margin:0; max-width:185px; }
    .th-modality-link { display:inline-block; margin-top:12px; font-size:22px; line-height:1; font-family:Arial,sans-serif; }
    .th-section-label { display:flex; align-items:center; gap:11px; color:var(--th-red); letter-spacing:.19em; font:600 10px/1.4 var(--th-mono); text-transform:uppercase; }
    .th-section-label::after { content:""; width:30px; height:1px; background:currentColor; }
    .th-institution { background:#f7f9fa; padding:88px 0 94px; }
    .th-institution-grid { display:grid; grid-template-columns:minmax(0,1.02fr) minmax(0,.98fr); gap:clamp(40px,5vw,84px); align-items:center; }
    .th-headline { font-size:clamp(34px,3.5vw,52px); line-height:1.15; letter-spacing:-.045em; font-weight:720; color:#1b2932; margin:18px 0 21px; }
    .th-body-copy { color:#596772; font-size:14.5px; line-height:1.85; max-width:595px; margin:0 0 18px; }
    .th-inline-link { display:inline-flex; align-items:center; gap:13px; color:var(--th-red)!important; font-size:12px; font-weight:780; letter-spacing:.025em; border-bottom:1px solid #beaaa9; padding-bottom:7px; }
    .th-inline-link:hover { color:#bf2927!important; }
    .th-facts { display:grid; grid-template-columns:repeat(3,1fr); margin-top:38px; border-top:1px solid #d2dade; padding-top:25px; }
    .th-fact { padding:0 22px; border-left:1px solid #d2dade; }
    .th-fact:first-child { padding-left:0; border-left:0; }
    .th-fact strong { display:block; color:#1b2a34; letter-spacing:-.04em; font-size:clamp(19px,2vw,30px); line-height:1.2; }
    .th-fact span { display:block; margin-top:5px; color:#6b7780; font:500 10px/1.6 var(--th-mono); text-transform:uppercase; letter-spacing:.035em; }
    .th-institution-image { position:relative; overflow:hidden; aspect-ratio:1.18; background:#cdd6da; }
    .th-institution-image img { width:100%; height:100%; display:block; object-fit:cover; object-position:center; }
    .th-institution-image figcaption { position:absolute; left:0; bottom:0; right:0; padding:24px; background:linear-gradient(transparent,#08141cc9); color:white; font-size:12px; letter-spacing:.04em; }
    .th-lab-feature { display:grid; grid-template-columns:1fr 1fr; min-height:358px; background:#e8eff3; overflow:hidden; }
    .th-lab-image { position:relative; overflow:hidden; background:#b6c6d1; }
    .th-lab-image img { width:100%; height:100%; object-fit:cover; position:absolute; inset:0; filter:saturate(.7); }
    .th-lab-image span { position:absolute; bottom:18px; left:25px; font:500 10px var(--th-mono); background:#0d1b27b5; color:#fff; padding:6px 9px; }
    .th-lab-content { padding:58px clamp(30px,6vw,105px); display:flex; flex-direction:column; justify-content:center; align-items:flex-start; }
    .th-lab-content h2 { font-size:clamp(33px,3vw,47px); font-weight:750; line-height:1.16; letter-spacing:-.044em; margin:18px 0 17px; }
    .th-lab-content p { margin:0 0 22px; max-width:450px; color:#586772; line-height:1.8; font-size:14px; }
    .th-locations { padding:80px 0 94px; background:#fff; }
    .th-locations-head { display:flex; justify-content:space-between; align-items:flex-end; gap:35px; margin-bottom:30px; }
    .th-locations-head h2 { font-size:clamp(32px,3vw,46px); letter-spacing:-.044em; margin:12px 0 0; line-height:1.2; }
    .th-locations-head p { color:#6a7780; max-width:360px; font-size:13px; margin:0; line-height:1.7; }
    .th-location-grid { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid #cbd4d9; border-bottom:1px solid #cbd4d9; }
    .th-location { padding:28px 26px 29px; border-left:1px solid #cbd4d9; }
    .th-location:first-child { border-left:0; padding-left:0; }
    .th-location-number { font:500 10px var(--th-mono); color:#a33532; letter-spacing:.12em; }
    .th-location h3 { font-size:19px; font-weight:790; letter-spacing:-.03em; margin:15px 0 10px; }
    .th-location p { color:#5c6973; line-height:1.7; font-size:12.8px; min-height:64px; margin:0 0 11px; }
    .th-location-phone { font-weight:720; font-size:13px; color:#26333c!important; }
    .th-location-actions { display:flex; flex-wrap:wrap; align-items:center; gap:16px; margin-top:17px; }
    .th-location-actions a { color:var(--th-red); font-weight:750; font-size:12px; border-bottom:1px solid #c8afac; padding-bottom:3px; }
    .th-footer { color:#d4e0e7; background:#0a141e; border-top:1px solid #2a3945; padding:40px 0 18px; }
    .th-footer-grid { display:grid; grid-template-columns:1.5fr 1fr auto; align-items:start; gap:30px; }
    .th-footer-identity { display:flex; align-items:center; gap:12px; }
    .th-footer-identity img { width:35px; height:35px; object-fit:contain; }
    .th-footer-identity div, .th-footer-hours { display:flex; flex-direction:column; gap:3px; }
    .th-footer-identity strong { color:#fff; font-size:16px; }
    .th-footer-identity span, .th-footer-hours span { color:#a3b1bb; font-size:11.5px; }
    .th-footer-hours strong { color:#fff; font-size:12px; margin-bottom:6px; }
    .th-footer-links { display:flex; gap:18px; font-size:12px; }
    .th-footer-links a:hover { color:white; }
    .th-footer-bottom { display:flex; justify-content:space-between; gap:18px; border-top:1px solid #31404b; padding-top:16px; margin-top:36px; font-size:10px; color:#80929d; }
    @media(max-width:1190px) {
      .th-shell { width:min(100% - 64px,1390px); }
      .th-nav { gap:15px; }
      .th-nav a { font-size:11.5px; }
      .th-brand { min-width:200px; }
      .th-modality { padding:20px 16px; }
    }
    @media(max-width:980px) {
      .th-nav, .th-nav-contact { display:none; }
      .th-nav-shell { justify-content:space-between; }
      .th-menu-button { display:flex; }
      .th-home-hero { min-height:585px; }
      .th-hero-photo { background-position:62% center; }
      .th-modality-strip { grid-template-columns:repeat(3,minmax(0,1fr)); }
      .th-modality { min-height:210px; }
      .th-institution-grid { grid-template-columns:1fr 1fr; gap:32px; }
      .th-fact { padding-inline:11px; }
      .th-footer-grid { grid-template-columns:1fr 1fr; }
      .th-footer-links { grid-column:1/-1; }
    }
    @media(max-width:670px) {
      .th-shell { width:calc(100% - 38px); }
      .th-nav-shell { height:70px; }
      .th-brand { min-width:0; gap:9px; }
      .th-brand-icon { width:37px; height:37px; }
      .th-brand-name { font-size:8px; letter-spacing:.11em; }
      .th-brand-name strong { font-size:14px; }
      .th-home-hero { min-height:595px; }
      .th-home-hero::before { background:linear-gradient(90deg,rgba(5,15,23,.93),rgba(5,15,23,.76) 62%,rgba(5,15,23,.48)); }
      .th-hero-photo { background-position:64% center; }
      .th-hero-content { padding:74px 0 85px; }
      .th-home-hero h1 { font-size:clamp(40px,9vw,56px); max-width:540px; }
      .th-hero-proof { margin-top:42px; flex-wrap:wrap; row-gap:18px; }
      .th-proof { padding:0 14px; min-width:125px; }
      .th-proof:first-child { padding-left:0; }
      .th-modality-strip { grid-template-columns:repeat(2,minmax(0,1fr)); }
      .th-modality { min-height:195px; padding:18px; }
      .th-modality h2 { font-size:17px; }
      .th-institution { padding:65px 0; }
      .th-institution-grid { grid-template-columns:1fr; gap:35px; }
      .th-institution-image { aspect-ratio:1.35; }
      .th-lab-feature { grid-template-columns:1fr; }
      .th-lab-image { min-height:245px; }
      .th-lab-content { padding:47px 24px 50px; }
      .th-locations { padding:60px 0; }
      .th-locations-head { display:block; }
      .th-locations-head p { margin-top:16px; }
      .th-location-grid { grid-template-columns:1fr; }
      .th-location { padding:24px 0!important; border-left:0; border-top:1px solid #d6dfe2; }
      .th-location:first-child { border-top:0; }
      .th-location p { min-height:0; }
      .th-footer-grid { grid-template-columns:1fr; }
      .th-footer-links { grid-column:auto; }
      .th-footer-bottom { flex-direction:column; }
    }
    @media(max-width:395px) {
      .th-home-hero h1 { font-size:37px; }
      .th-actions { flex-direction:column; align-items:stretch; }
      .th-proof { padding-inline:10px; min-width:auto; }
      .th-modality { min-height:188px; padding:15px; }
      .th-modality h2 { font-size:15px; }
      .th-modality p { font-size:11px; }
      .th-facts { gap:9px; }
      .th-fact { padding-inline:9px; }
      .th-fact strong { font-size:19px; }
    }
    @media(prefers-reduced-motion:reduce) {
      html { scroll-behavior:auto; }
      .th-body *, .th-body *::before, .th-body *::after { transition:none!important; animation:none!important; }
    }
  </style>
  `;
}
