import { HomeCarousel, HomeCarouselStyles, HomeCarouselScript } from './home-carousel.js';
import { VisualMotionStyles, VisualMotionScript } from './visual-motion.js';

// Server-rendered visual layer with progressive carousel controls; no dependencies.
const ROOT = '/assets/visuals/';
const CLINIC = 'https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/';
const replacements = {
  'Resonancia%20magnetica.png': 'resonancia',
  'TAC.png': 'tomografia',
  'Ultrasonografia.png': 'ultrasonografia',
  'Rayos%20X.png': 'rayos-x',
  'Mamografia.png': 'mamografia',
  'EstudiosEspeciales.webp': 'radiologo',
  'plazaFarid.png': 'plaza-farid',
};
const visualImage = (name, alt, eager = false) => `<img class="vm-media" src="${ROOT}${name}.webp" srcset="${ROOT}${name}-720.webp 720w, ${ROOT}${name}.webp 1536w" sizes="(max-width: 760px) 100vw, 52vw" width="1536" height="1024" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

export function applyVisualUpgrade(html, path) {
  if (path.startsWith('/portal-pacientes')) return html;
  for (const [old, name] of Object.entries(replacements)) html = html.split(CLINIC + old).join(ROOT + name + '.webp');
  html = html.replace(/https:\/\/images\.unsplash\.com\/photo-1579154204601-01588f351e67\?[^"']+/g, ROOT + 'laboratorio.webp');
  html = html.split(CLINIC + 'LogoDrMendoza3.png').join(ROOT + 'logo.webp');
  html = html.split(CLINIC + 'faviconDr.png').join(ROOT + 'favicon.webp');
  const home = ['/', '/index', '/index.html'].includes(path);
  if (home) {
    html = html.replace('<div class="th-hero-photo" role="img" aria-label="Fotografía de resonancia magnética del catálogo institucional"></div>',
      HomeCarousel());
    html = html.replace('<link rel="preload" as="image" href="/assets/visuals/resonancia.webp" />', '<link rel="preload" as="image" href="/assets/visuals/portada-medico-detalle-v2.webp" imagesrcset="/assets/visuals/portada-medico-detalle-v2-720.webp 720w, /assets/visuals/portada-medico-detalle-v2.webp 1536w" imagesizes="(max-width: 760px) 130vw, 1000px" />');
    html = html.replace('<meta property="og:image" content="/assets/visuals/resonancia.webp" />', '<meta property="og:image" content="/assets/visuals/portada-medico-detalle-v2.webp" />');
    html = html.replace('</body>', `${HomeCarouselScript}</body>`);
    html = html.replace('<span class="th-photo-note" aria-hidden="true">DIAGNÓSTICO POR IMÁGENES / RM</span>', '');
    html = html.replace('<section id="laboratorio"', `<section class="v3-reading" aria-labelledby="reading-title"><div class="vm-stage" data-visual-motion="reading">${visualImage('radiologo', 'Ilustración de un radiólogo revisando estudios desde su estación de trabajo')}</div><div class="v3-reading-copy"><span class="th-section-label">Diagnóstico por Imágenes</span><h2 id="reading-title">Tecnología y experiencia.<br>Una misma mirada.</h2><p>La imagen es parte del proceso. La interpretación médica y la atención cercana completan nuestro compromiso con cada paciente.</p><a class="th-inline-link" href="/estudios.html">Conozca nuestros estudios <span aria-hidden="true">↗</span></a></div></section><section id="laboratorio"`);
  } else {
    // Only the single hero directly below #top; category backgrounds are left intact.
    html = html.replace(/(<section id="top"[^>]*>\s*)<div\s+class="([^"]*)"\s+style='background-image:url\("([^"]+)"\);'\s*>/, (match, section, classes, src) => {
      if (!src.startsWith(ROOT)) return match;
      const name = src.slice(ROOT.length).replace('.webp', '');
      const motion = name === 'laboratorio' ? 'lab' : name === 'radiologo' ? 'reading' : 'scan';
      return `${section}<div class="${classes} v3-page-hero"><figure class="v3-page-art vm-stage" data-visual-motion="${motion}">${visualImage(name, 'Visualización ilustrativa de ' + (name === 'radiologo' ? 'interpretación radiológica' : name.replace('-', ' ')), true)}</figure>`;
    });
  }
  html = html.replace('</head>', `${styles}${home ? HomeCarouselStyles : ''}${VisualMotionStyles}</head>`);
  html = html.replace('</body>', `${VisualMotionScript}</body>`);
  return html;
}

const styles = `<style id="visual-upgrade">
/* Image-first presentation; scoped to the upgraded areas. */
.th-body{background:#faf9f7}.th-home-hero{background:#151b22;min-height:620px;display:block}.th-home-hero::before{display:none}.th-home-hero .th-hero-content{width:100%;max-width:1440px;padding:76px 6vw 60px;margin:auto;pointer-events:none}.th-hero-content>*{max-width:45%;pointer-events:auto}.th-home-hero h1{font-size:clamp(38px,4.4vw,67px);max-width:45%;line-height:1.07}.th-hero-lead{font-size:17px;color:#d1d7dc}.th-hero-proof{margin-top:38px}.th-hero-proof .th-proof{padding-right:25px}.th-hero-content .th-actions{display:flex;flex-wrap:wrap}.th-hero-content .th-button{font-size:12px;padding:14px 17px}.v3-home-art{position:absolute;right:0;top:0;bottom:0;width:49%;margin:0;background:#ece9e5;display:flex;align-items:center;overflow:hidden}.v3-home-art img{display:block;width:100%;height:auto;object-fit:contain}.th-kicker{color:#ed8d8b}.th-modality-strip{grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:#d9d5d1;color:#1b252d;border:0}.th-modality{padding:0 0 25px;min-height:0;border:0;justify-content:flex-start;background:#faf9f7}.th-modality img{position:relative;z-index:auto;inset:auto;width:100%;height:auto;aspect-ratio:3/2;object-fit:contain;filter:none}.th-modality::after{display:none}.th-modality:hover img{filter:none;transform:scale(1.025)}.th-modality-number{display:block;padding:20px 27px 10px;color:#9d2320}.th-modality>div{padding:0 27px}.th-modality h2{font-size:23px;max-width:none;margin-bottom:8px}.th-modality p{font-size:14px;color:#606975;max-width:none}.th-modality-link{color:#9d2320}.th-institution{background:#fff;padding:95px 0}.th-institution-grid{grid-template-columns:.85fr 1.15fr;gap:45px}.th-institution-image{aspect-ratio:3/2;background:#fff;overflow:visible}.th-institution-image img{object-fit:contain}.th-institution-archive{aspect-ratio:4/3;background:#f0eee9}.th-institution-archive img{object-fit:cover}.th-headline{font-size:clamp(31px,3.2vw,46px)}.th-lab-image{background:#e9e6e2}.th-lab-image img{object-fit:contain;filter:none}.th-lab-feature{background:#f1eeeb}.v3-reading{display:grid;grid-template-columns:1.1fr 1fr;align-items:center;background:#f1efeb}.v3-reading>div:first-child{position:relative}.v3-reading img{width:100%;height:auto;display:block}.v3-reading-copy{padding:45px 6vw}.v3-reading h2{font-size:clamp(30px,3vw,44px);line-height:1.14;letter-spacing:-.04em;margin:20px 0}.v3-reading p{font-size:16px;line-height:1.8;color:#5e6570;margin-bottom:28px}
/* Catalog and study heroes keep copy separate from the equipment. */
.v3-page-hero{background:#151b22!important;min-height:470px!important}.v3-page-hero .hero-overlay{display:none}.v3-page-art{margin:0;position:absolute;right:0;top:0;bottom:0;width:49%;background:#ebe8e3;display:flex;align-items:center;overflow:hidden}.v3-page-art img{width:100%;height:auto;display:block}.v3-page-hero>div.relative{min-height:470px!important;position:relative;pointer-events:none}.v3-page-hero>div.relative>div{max-width:46%;pointer-events:auto}.v3-page-hero h1{font-size:clamp(32px,3.5vw,54px)!important}.clinic-image[style*="/assets/visuals/"]{background-size:contain!important;background-repeat:no-repeat;background-color:#eeece9;aspect-ratio:3/2;height:auto!important;min-height:220px}.shadow-soft,.shadow-glow{box-shadow:0 3px 16px #1c23300a!important}.clinic-category-card{border-radius:8px!important;border-color:#dedbd7!important}.clinic-category-card:hover{box-shadow:0 8px 24px #1c233012!important}.clinic-category-card h3{font-size:22px}.v3-page-hero a{position:relative}.v3-page-hero a.h-11{border-radius:3px}
@media(max-width:1000px){.th-home-hero .th-hero-content{padding-left:4vw;padding-right:4vw}.th-hero-lead{font-size:15px}.th-hero-proof{flex-wrap:wrap;gap:14px}.th-modality h2{font-size:20px}.v3-page-hero>div.relative>div{max-width:47%}}
@media(max-width:760px){.th-home-hero{display:flex;flex-direction:column;min-height:0}.th-home-hero .th-hero-content{order:0;padding:45px 6vw 32px}.th-hero-content>*{max-width:100%}.th-home-hero h1{max-width:100%;font-size:42px}.th-hero-lead{font-size:16px}.th-hero-proof{margin-top:28px}.v3-home-art{position:relative;order:1;inset:auto;width:100%;padding-bottom:28px}.th-modality-strip{grid-template-columns:repeat(2,minmax(0,1fr))}.th-modality>div{padding:0 15px}.th-modality-number{padding:16px 15px 9px;font-size:8px}.th-modality h2{font-size:18px;line-height:1.2}.th-modality p{font-size:12px}.th-institution{padding:58px 0}.th-institution-grid,.v3-reading{grid-template-columns:1fr}.v3-reading-copy{padding:35px 6vw 45px}.th-lab-image{min-height:290px}.v3-page-hero{display:flex;flex-direction:column}.v3-page-art{position:relative;order:2;inset:auto;width:100%;padding-bottom:0}.v3-page-hero>div.relative{min-height:0!important;order:1;pointer-events:auto}.v3-page-hero>div.relative>div{max-width:100%;padding-top:40px;padding-bottom:40px}.clinic-image[style*="/assets/visuals/"]{min-height:0}}
@media(prefers-reduced-motion:reduce){.th-modality img{transition:none!important}.th-modality:hover img{transform:none!important}}
</style>`;
