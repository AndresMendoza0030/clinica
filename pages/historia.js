import { Header } from '../components/header.js';
import { Footer } from '../components/footer.js';
import { HomeTechStyle } from '../components/home-tech-style.js';

const milestones = [
  { year: '2006', date: '5 de abril de 2006', label: 'El comienzo', name: 'Clínica Matriz', image: 'sede-matriz', target: 'matriz', text: 'Nuestra historia comienza en San Miguel, con el compromiso de acompañar a pacientes y médicos en el cuidado de la salud.' },
  { year: '2015', date: '2015', label: 'Una nueva sede', name: 'Plaza Farid', image: 'plaza-farid', target: 'farid', text: 'Abrimos nuestra segunda sede en Plaza Farid. Una nueva etapa para estar más cerca de las personas que confían en nosotros.' },
  { year: '2023', date: '2023', label: 'Seguimos creciendo', name: 'Advanced Radiology', image: 'sede-advanced', target: 'advanced', text: 'Advanced Radiology se incorpora a nuestra trayectoria. Tres sedes en San Miguel, unidas por una misma vocación de servicio.' },
];

const newspaper = '/assets/visuals/clinica-la-paz-restaurada.webp';
const expandIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7"/></svg>';

export function renderHistoriaPage() {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#0a131d">
  <title>Nuestra Historia | Clínica Dr. Mendoza</title>
  <meta name="description" content="Conozca la historia de Clínica Dr. Mendoza en San Miguel: Clínica Matriz en 2006, Plaza Farid en 2015 y Advanced Radiology en 2023.">
  <link rel="canonical" href="https://www.clinicadrmendoza.com/historia">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_SV">
  <meta property="og:title" content="Nuestra Historia | Clínica Dr. Mendoza">
  <meta property="og:description" content="Desde 2006, cerca de usted. Un recorrido por nuestra historia en San Miguel.">
  <meta property="og:url" content="https://www.clinicadrmendoza.com/historia">
  <meta property="og:image" content="https://www.clinicadrmendoza.com/assets/visuals/sede-matriz.webp">
  <link rel="icon" type="image/webp" href="/assets/visuals/favicon.webp">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  ${HomeTechStyle()}
  ${styles}
</head>
<body class="th-body history-page">
  <a class="history-skip" href="#contenido">Saltar al contenido</a>
  ${Header('historia')}
  <main id="contenido">
    <section class="history-intro" id="top" aria-labelledby="history-title">
      <div class="th-shell">
        <a class="history-back" href="/"><span aria-hidden="true">←</span> Volver al inicio</a>
        <div class="history-intro-grid">
          <div>
            <span class="th-section-label">Nuestra Historia</span>
            <h1 id="history-title">Desde 2006,<br>cerca de usted.</h1>
          </div>
          <div class="history-intro-copy">
            <p>Comenzamos el 5 de abril de 2006. Hoy, tres sedes en San Miguel forman parte de una misma historia de atención y confianza.</p>
            <span class="history-place">San Miguel, El Salvador</span>
          </div>
        </div>
        <nav class="history-chapters" aria-label="Recorra nuestra historia">
          ${milestones.map(m => `<a href="#historia-${m.year}"><span>${m.year}</span><strong>${m.name}</strong><span class="history-chapter-arrow" aria-hidden="true">↓</span></a>`).join('')}
        </nav>
      </div>
    </section>

    <section class="history-journey th-shell" aria-label="Línea de tiempo de nuestras sedes">
      <ol class="history-timeline">
        ${milestones.map((m, i) => `<li class="history-milestone" id="historia-${m.year}">
          <div class="history-rail"><time datetime="${i === 0 ? '2006-04-05' : m.year}">${m.year}</time><span class="history-dot" aria-hidden="true"></span></div>
          <article class="history-event" aria-labelledby="milestone-${m.year}">
            <div class="history-event-copy">
              <span class="history-eyebrow">${m.label}</span>
              <h2 id="milestone-${m.year}">${m.name}</h2>
              ${i === 0 ? `<p class="history-date">${m.date}</p>` : ''}
              <p>${m.text}</p>
              <a class="history-link" href="/#sede-${m.target}">Conozca esta sede <span aria-hidden="true">↗</span></a>
            </div>
            <div class="history-building-wrap" data-visual-motion="clinic">
              <a class="history-building vm-stage" href="/#sede-${m.target}" aria-label="Ver ubicación y contacto de ${m.name}">
                <img class="vm-media" src="/assets/visuals/${m.image}.webp" srcset="/assets/visuals/${m.image}-720.webp 720w, /assets/visuals/${m.image}.webp 1536w" sizes="(max-width: 760px) 88vw, 45vw" width="1536" height="1024" alt="Fachada de ${m.name}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
              </a>
              <span class="history-building-index" aria-hidden="true">0${i + 1} / 03</span>
            </div>
          </article>
        </li>`).join('')}
      </ol>
    </section>

    <section class="history-archive" aria-labelledby="archive-title">
      <div class="th-shell history-archive-grid">
        <div class="history-archive-copy">
          <span class="th-section-label">Archivo de prensa</span>
          <h2 id="archive-title">Una imagen de<br>nuestros inicios.</h2>
          <p>El Dr. Francisco Antonio Mendoza en la Clínica de Ultrasonografía de La Paz. Un recuerdo conservado como parte de nuestra trayectoria.</p>
          <p class="history-archive-note">Anuncio histórico</p>
          <a class="history-link" href="${newspaper}" target="_blank" rel="noopener" data-history-open>Ampliar publicación ${expandIcon}</a>
        </div>
        <figure class="history-newspaper">
          <a href="${newspaper}" target="_blank" rel="noopener" data-history-open aria-label="Ampliar anuncio histórico del Dr. Francisco Antonio Mendoza">
            <img src="${newspaper}" width="1086" height="1448" alt="Anuncio de periódico de la Clínica de Ultrasonografía: el Dr. Francisco Antonio Mendoza sentado frente a su equipo de ultrasonografía" loading="lazy" decoding="async">
            <span class="history-expand">${expandIcon}<span>Ampliar</span></span>
          </a>
          <figcaption>Dr. Francisco Antonio Mendoza · Clínica de Ultrasonografía</figcaption>
        </figure>
      </div>
    </section>

    <section class="history-close th-shell" aria-labelledby="history-close-title">
      <div><span class="th-section-label">Nuestra trayectoria continúa</span><h2 id="history-close-title">Gracias por confiarnos su salud.</h2></div>
      <a class="history-link" href="/#sedes">Sedes y contacto <span aria-hidden="true">↗</span></a>
    </section>
  </main>
  ${Footer()}
  <dialog class="history-viewer" aria-labelledby="history-viewer-title">
    <div class="history-viewer-head"><h2 id="history-viewer-title">Archivo de prensa · Dr. Mendoza</h2><button type="button" data-history-close aria-label="Cerrar publicación" autofocus>×</button></div>
    <div class="history-viewer-stage"><img data-history-full width="1086" height="1448" alt="Anuncio histórico de la Clínica de Ultrasonografía del Dr. Francisco Antonio Mendoza"></div>
    <div class="history-viewer-tools"><button type="button" data-history-zoom aria-pressed="false">Acercar <span aria-hidden="true">+</span></button><a href="${newspaper}" target="_blank" rel="noopener">Abrir original ${expandIcon}</a></div>
  </dialog>
  ${viewerScript}
</body>
</html>`;
}

const styles = `<style id="history-page-style">
.history-page{background:#fff}.history-page .th-shell{max-width:1260px}
.history-skip{position:fixed;z-index:100;left:20px;top:-80px;padding:12px 20px;background:#fff;color:#19242d}.history-skip:focus{top:12px}
.history-intro{padding:32px 0 0;background:#f3f1ed;border-bottom:1px solid #dddcd6;scroll-margin-top:80px}
.history-back{display:inline-flex;gap:12px;align-items:center;min-height:44px;font-size:12px;color:#636c70!important}.history-back span{font-size:20px}.history-back:hover{color:#9d2320!important}
.history-intro-grid{display:grid;grid-template-columns:1.1fr 1fr;align-items:end;gap:80px;padding:52px 0 58px}
.history-intro h1{font-size:clamp(42px,5.3vw,76px);font-weight:600;line-height:1.09;letter-spacing:-.055em;margin:23px 0 0;color:#19242d;text-wrap:balance}
.history-intro-copy{padding-bottom:5px;max-width:420px}.history-intro-copy p{font-size:16px;line-height:1.9;color:#626c72;margin:0 0 26px}
.history-place{font:500 10px/1.7 var(--th-mono);color:#6d7578;letter-spacing:.1em;text-transform:uppercase}
.history-chapters{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid #cececa}
.history-chapters a{display:flex;align-items:center;gap:18px;padding:25px 28px;border-right:1px solid #cececa;min-height:86px}.history-chapters a:first-child{padding-left:0}.history-chapters a:last-child{border-right:0;padding-right:0}
.history-chapters a>span:first-child{font:500 20px/1 var(--th-mono);letter-spacing:-.055em;color:#9d2320}.history-chapters strong{font-size:12px;line-height:1.5;font-weight:600}.history-chapter-arrow{margin-left:auto;color:#9d2320;font-size:20px;transition:transform .2s}.history-chapters a:hover .history-chapter-arrow{transform:translateY(4px)}
.history-journey{padding-top:38px;padding-bottom:42px}.history-timeline{list-style:none;margin:0;padding:0}
.history-milestone{display:grid;grid-template-columns:135px minmax(0,1fr);position:relative;scroll-margin-top:105px}
.history-rail{position:relative;padding-top:75px;border-right:1px solid #d9d4ce}.history-rail time{font:500 clamp(25px,3vw,38px)/1 var(--th-mono);letter-spacing:-.07em;color:#9d2320;display:block}
.history-dot{position:absolute;right:-5px;top:88px;width:9px;height:9px;border-radius:50%;background:#9d2320;box-shadow:0 0 0 6px #fff}
.history-event{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.15fr);gap:35px;align-items:center;margin-left:45px;padding:38px 0;border-bottom:1px solid #e7e6e1;min-width:0}
.history-milestone:last-child .history-event{border-bottom:0}.history-milestone:last-child .history-rail{border-image:linear-gradient(#d9d4ce 30%,#fff) 1}
.history-eyebrow{font:500 10px/1.6 var(--th-mono);text-transform:uppercase;color:#9d2320;letter-spacing:.1em}
.history-event h2{font-size:clamp(25px,2.7vw,38px);line-height:1.2;letter-spacing:-.04em;font-weight:600;margin:16px 0 17px}
.history-event-copy>p{font-size:14px;line-height:1.85;color:#667078;max-width:350px;margin:0 0 18px}.history-event-copy .history-date{font:500 11px/1.6 var(--th-mono);color:#6c7376;margin-bottom:17px}
.history-link{display:inline-flex;align-items:center;gap:17px;min-height:44px;color:#9d2320!important;font-size:12px;font-weight:700}.history-link>span{font-size:21px;font-weight:400}.history-link:hover{text-decoration:underline;text-underline-offset:5px}
.history-building-wrap{position:relative;min-width:0;padding-bottom:22px}.history-building{display:block;aspect-ratio:3/2;position:relative;background:#fff;border-radius:3px}
.history-building img{width:100%;height:100%;display:block;object-fit:contain}.history-building-index{position:absolute;right:12px;bottom:0;font:500 9px var(--th-mono);letter-spacing:.1em;color:#8e9597}
.history-archive{background:#f0ede7;border-block:1px solid #e2ddd4;padding:65px 0}
.history-archive-grid{display:grid;grid-template-columns:1fr 1fr;gap:10%;align-items:center}
.history-archive h2{font-size:clamp(32px,3.6vw,49px);font-weight:600;line-height:1.15;letter-spacing:-.045em;margin:22px 0}
.history-archive-copy>p{font-size:15px;line-height:1.9;color:#626c72;max-width:370px;margin:0 0 22px}.history-archive-copy .history-archive-note{font:500 10px var(--th-mono);text-transform:uppercase;letter-spacing:.08em;color:#837b6e;margin:27px 0 6px}
.history-newspaper{margin:0;max-width:410px;justify-self:center;width:100%}.history-newspaper>a{display:block;position:relative;padding:13px;background:#fffcf6;box-shadow:0 12px 32px #382c191a;transition:transform .25s,box-shadow .25s}
.history-newspaper>a:hover{transform:translateY(-4px);box-shadow:0 18px 36px #382c1925}.history-newspaper img{width:100%;height:auto;display:block}
.history-expand{position:absolute;right:23px;bottom:23px;display:flex;align-items:center;gap:8px;color:#fff;background:#14212bef;border:1px solid #ffffff50;border-radius:3px;padding:10px 12px;font-size:11px}
.history-newspaper figcaption{font-size:10px;line-height:1.6;color:#6f736f;margin-top:16px;text-align:center}
.history-close{padding-top:65px;padding-bottom:65px;display:flex;align-items:center;justify-content:space-between;gap:35px}.history-close h2{font-size:clamp(25px,3vw,37px);line-height:1.3;font-weight:600;letter-spacing:-.035em;margin:17px 0 0}.history-close>.history-link{flex-shrink:0}
.history-viewer{padding:0;border:1px solid #45515b;border-radius:6px;width:min(960px,calc(100vw - 32px));max-width:none;max-height:94dvh;background:#111a22;color:#fff;box-shadow:0 20px 80px #0007;font-family:var(--th-font)}
.history-viewer::backdrop{background:#051018e8;backdrop-filter:blur(5px)}
.history-viewer-head{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;gap:15px;border-bottom:1px solid #ffffff20}.history-viewer h2{font-size:14px;font-weight:500;line-height:1.5;margin:0}
.history-viewer button{border:1px solid #ffffff50;background:transparent;color:#fff;cursor:pointer;border-radius:3px;font:500 12px var(--th-font);min-height:44px;padding:10px 14px}.history-viewer button:hover{background:#ffffff15}.history-viewer-head button{border:0;font-size:30px;line-height:1;min-width:44px;padding:5px}
.history-viewer-stage{height:68dvh;overflow:auto;overscroll-behavior:contain;padding:12px;background:#0b1219;text-align:center}.history-viewer-stage img{width:100%;height:100%;object-fit:contain;display:block;margin:auto}
.history-viewer-stage.is-zoomed img{width:1086px;height:1448px;max-width:none;object-fit:initial;margin:0 auto}.history-viewer-tools{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:10px 16px}.history-viewer-tools button{display:flex;gap:16px;align-items:center}.history-viewer-tools button span{font-size:20px;line-height:1}.history-viewer-tools a{display:inline-flex;align-items:center;gap:9px;color:#fff;font-size:12px;min-height:44px;text-decoration:none}
.history-viewer button:focus-visible,.history-viewer a:focus-visible{outline:3px solid #e9938c;outline-offset:3px}
@media(min-width:1100px){.history-milestone:nth-child(2) .history-building-wrap{grid-column:1;grid-row:1}.history-milestone:nth-child(2) .history-event-copy{grid-column:2;grid-row:1;padding-left:20px}.history-milestone:nth-child(2) .history-event{grid-template-columns:minmax(0,1.15fr) minmax(0,.9fr)}}
@media(max-width:1000px){.history-intro-grid{gap:40px}.history-intro-copy p{font-size:14px}.history-chapters a{gap:12px;padding-inline:19px}.history-chapters strong{font-size:11px}.history-milestone{grid-template-columns:100px minmax(0,1fr)}.history-event{margin-left:30px;gap:20px}.history-rail time{font-size:30px}.history-event h2{font-size:28px}.history-event-copy>p{font-size:13px}.history-archive-grid{gap:7%}}
@media(max-width:760px){.history-intro{padding-top:15px}.history-intro-grid{grid-template-columns:1fr;gap:24px;padding:30px 0 35px}.history-intro h1{font-size:clamp(41px,9vw,60px);margin-top:18px}.history-intro-copy{max-width:510px}.history-intro-copy p{font-size:14px;line-height:1.8;margin-bottom:18px}.history-place{font-size:9px}.history-chapters a{display:flex;flex-direction:column;align-items:flex-start;gap:12px;padding:20px 14px}.history-chapters a>span:first-child{font-size:20px}.history-chapters strong{font-size:10px}.history-chapter-arrow{display:none}.history-chapters a:last-child{padding-right:0}.history-chapters a:first-child{padding-left:0}
.history-journey{padding-top:35px;padding-bottom:36px}.history-milestone{display:block;border-left:1px solid #d9d4ce;padding-left:25px;margin-left:4px}.history-rail{border:0;padding-top:9px}.history-rail time{font-size:38px}.history-dot{left:-30px;right:auto;top:23px}.history-event{grid-template-columns:1fr;margin:0;padding:25px 0 35px;gap:21px}.history-event h2{font-size:30px;margin:10px 0 14px}.history-event-copy>p{font-size:14px;max-width:520px;margin-bottom:13px}.history-event-copy .history-date{font-size:11px;margin-bottom:13px}.history-milestone:last-child .history-rail{border:0}.history-milestone:last-child{border-image:linear-gradient(#d9d4ce 35%,#fff) 1}.history-building-wrap{padding-bottom:12px}.history-building-index{right:4px;font-size:8px}.history-building{aspect-ratio:3/2}.history-archive{padding:45px 0}.history-archive-grid{grid-template-columns:1fr;gap:32px}.history-archive h2{font-size:36px;margin:18px 0}.history-archive-copy>p{font-size:14px;max-width:510px}.history-archive-copy .history-archive-note{margin-top:20px}.history-newspaper{max-width:370px}.history-newspaper>a{padding:10px}.history-newspaper figcaption{font-size:9px}.history-close{padding-top:42px;padding-bottom:42px;align-items:flex-start;flex-direction:column;gap:16px}.history-close h2{font-size:29px}.history-viewer{width:calc(100vw - 16px)}.history-viewer-head{padding:8px 10px}.history-viewer h2{font-size:12px}.history-viewer-stage{height:66dvh;padding:8px}.history-viewer-tools{padding:8px 10px}.history-viewer-tools a{font-size:11px}}
@media(prefers-reduced-motion:reduce){.history-chapter-arrow,.history-newspaper>a{transition:none!important}.history-chapters a:hover .history-chapter-arrow,.history-newspaper>a:hover{transform:none}}
</style>`;

const viewerScript = `<script>(()=>{
  const dialog=document.querySelector('.history-viewer');
  if(!dialog || typeof dialog.showModal!=='function')return;
  const full=dialog.querySelector('[data-history-full]');
  const stage=dialog.querySelector('.history-viewer-stage');
  const zoom=dialog.querySelector('[data-history-zoom]');
  let opener=null,previousOverflow='';
  const setZoom=enabled=>{
    stage.classList.toggle('is-zoomed',enabled);
    zoom.setAttribute('aria-pressed',String(enabled));
    zoom.innerHTML=enabled?'Ajustar <span aria-hidden="true">−</span>':'Acercar <span aria-hidden="true">+</span>';
    stage.scrollTo(0,0);
  };
  document.querySelectorAll('[data-history-open]').forEach(link=>link.addEventListener('click',event=>{
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();opener=link;full.src=link.href;setZoom(false);
    previousOverflow=document.body.style.overflow;dialog.showModal();document.body.style.overflow='hidden';
  }));
  zoom.addEventListener('click',()=>setZoom(zoom.getAttribute('aria-pressed')!=='true'));
  dialog.querySelector('[data-history-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;
    const r=dialog.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
  });
  dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;setZoom(false);opener?.focus({preventScroll:true});});
})();</script>`;
