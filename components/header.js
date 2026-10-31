// Shared identity and navigation; the mobile disclosure also works without JavaScript.
const links = [
  ['home', '/', 'Inicio'],
  ['estudios', '/estudios.html', 'Diagnóstico por Imágenes'],
  ['laboratorio', '/laboratorio.html', 'Laboratorio Clínico'],
  ['historia', '/historia', 'Nuestra Historia'],
  ['sedes', '/#sedes', 'Sedes y Contacto'],
];
export function Header(section = '') {
  const navigation = links.map(([key, href, label]) => `<a href="${href}"${section === key ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `${styles}
  <header class="th-header" id="${section === 'home' ? 'top' : 'site-header'}">
    <div class="th-nav-shell">
      <a href="/" class="th-brand" aria-label="Clínica Radiológica y Laboratorio Clínico Dr. Mendoza, inicio">
        <img src="/assets/visuals/favicon.webp" width="46" height="46" alt="" class="th-brand-icon">
        <span class="th-brand-name"><span>CLÍNICA RADIOLÓGICA</span><span>Y LABORATORIO CLÍNICO</span><strong>Dr. Mendoza</strong></span>
      </a>
      <nav class="th-nav" aria-label="Navegación principal">${navigation}</nav>
      <a class="th-nav-contact" href="https://wa.me/50378205613" target="_blank" rel="noopener noreferrer">Contacto <span aria-hidden="true">↗</span></a>
      <details class="th-menu">
        <summary class="th-menu-button" aria-label="Menú de navegación" aria-controls="site-mobile-nav"><span></span><span></span><span></span></summary>
        <nav class="th-mobile-nav" id="site-mobile-nav" aria-label="Navegación móvil">${navigation}<a href="https://wa.me/50378205613" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></nav>
      </details>
    </div>
  </header>
  <script>(() => {
    const header = document.querySelector('.th-header');
    const menu = header.querySelector('.th-menu');
    const toggle = menu.querySelector('summary');
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.open) { menu.open = false; toggle.focus(); }
    });
    document.addEventListener('click', event => { if (menu.open && !menu.contains(event.target)) menu.open = false; });
    matchMedia('(min-width: 1101px)').addEventListener('change', event => { if (event.matches) menu.open = false; });
  })();</script>`;
}
const styles = `<style id="clinic-header-style">
:root{--site-header-height:80px}
.th-header,.th-header *{box-sizing:border-box}
.th-header{position:sticky;top:0;z-index:50;background:rgba(8,18,28,.985);border-bottom:1px solid #ffffff1f;backdrop-filter:blur(15px);color:#fff;font-family:"Manrope","Segoe UI",Arial,sans-serif;line-height:1.65}
.th-header a{text-decoration:none;color:inherit}
.th-header a:focus-visible,.th-header summary:focus-visible{outline:3px solid #e9938c;outline-offset:4px}
.th-nav-shell{width:min(100% - 100px,1390px);margin-inline:auto;height:var(--site-header-height);display:flex;align-items:center;gap:clamp(12px,1.75vw,30px)}
.th-brand{display:flex;align-items:center;gap:12px;flex:none;min-width:215px;color:#fff}
.th-brand-icon{display:block;width:46px;height:46px;object-fit:contain}
.th-brand-name{display:flex;flex-direction:column;line-height:1.25;letter-spacing:.14em;font-size:9px;font-weight:750;white-space:nowrap}
.th-brand-name strong{display:block;margin-top:2px;font-size:16px;font-weight:800;letter-spacing:.012em;text-transform:none}
.th-nav{display:flex;align-items:center;justify-content:center;flex:1;gap:clamp(15px,2vw,32px);height:100%;white-space:nowrap}
.th-header .th-nav a{height:100%;display:inline-flex;align-items:center;position:relative;color:#d0d9e0;font-size:12px;font-weight:600;transition:color .2s}
.th-header .th-nav a:hover,.th-header .th-nav a[aria-current="page"]{color:#fff}
.th-nav a[aria-current="page"]::after{content:"";position:absolute;left:0;bottom:0;height:2px;width:100%;background:#bb312b}
.th-nav-contact{display:inline-flex;align-items:center;justify-content:center;gap:15px;padding:10px 0 10px 21px;border-left:1px solid #ffffff4d;font-size:12.5px;font-weight:720;white-space:nowrap}
.th-nav-contact span{font-size:17px;font-weight:400;color:#ef9993}
.th-menu{display:none}
.th-menu-button{list-style:none;border:1px solid #53606a;border-radius:6px;height:42px;width:45px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:5px;cursor:pointer}
.th-menu-button::-webkit-details-marker{display:none}
.th-menu-button span{width:20px;height:1.5px;background:#fff;display:block;transition:transform .2s,opacity .2s}
.th-menu[open] .th-menu-button span:first-child{transform:translateY(6.5px) rotate(45deg)}
.th-menu[open] .th-menu-button span:nth-child(2){opacity:0}
.th-menu[open] .th-menu-button span:last-child{transform:translateY(-6.5px) rotate(-45deg)}
.th-mobile-nav{position:absolute;top:100%;left:0;right:0;background:#0d1924;padding:12px 24px 24px;border-top:1px solid #2c3b48;box-shadow:0 16px 24px #0003;max-height:calc(100dvh - var(--site-header-height));overflow-y:auto}
.th-menu[open] .th-mobile-nav{display:flex;flex-direction:column}
.th-header .th-mobile-nav a{padding:13px 4px;color:#edf2f5;border-bottom:1px solid #273640;font-size:14px}
.th-header .th-mobile-nav a[aria-current="page"]{color:#f4b1a9}
@media(max-width:1190px){.th-nav-shell{width:calc(100% - 64px)}.th-nav{gap:15px}.th-header .th-nav a{font-size:11.5px}.th-brand{min-width:200px}}
@media(max-width:1100px){.th-nav,.th-nav-contact{display:none}.th-nav-shell{justify-content:space-between}.th-menu{display:block}}
@media(max-width:670px){:root{--site-header-height:70px}.th-nav-shell{width:calc(100% - 38px)}.th-brand{min-width:0;gap:9px}.th-brand-icon{width:37px;height:37px}.th-brand-name{font-size:8px;letter-spacing:.11em}.th-brand-name strong{font-size:14px}}
@media(prefers-reduced-motion:reduce){.th-header *{transition:none!important}}
</style>`;
