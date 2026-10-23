const milestones = [
  { year: '2006', date: '5 de abril · Fundación', name: 'Clínica Matriz', image: 'sede-matriz', target: 'matriz', text: 'El inicio de nuestra historia, al servicio de las familias de San Miguel.' },
  { year: '2015', date: 'Apertura · Segunda sede', name: 'Plaza Farid', image: 'plaza-farid', target: 'farid', text: 'Crecemos con una nueva sede en la Avenida Roosevelt.' },
  { year: '2023', date: 'Apertura · Tercera sede', name: 'Advanced Radiology', image: 'sede-advanced', target: 'advanced', text: 'Una nueva etapa en nuestra trayectoria de diagnóstico por imágenes.' },
];

const memories = [
  { image: 'matriz-primeros-anos-restaurada', width: 1448, height: 1086, title: 'La primera Matriz', label: 'Nuestros primeros años', alt: 'Fotografía histórica restaurada de la fachada de Clínica Matriz', type: 'photo' },
  { image: 'clinica-la-paz-restaurada', width: 1086, height: 1448, title: 'Clínica de Ultrasonografía', label: 'Archivo histórico · La Paz', alt: 'Anuncio histórico restaurado del Dr. Francisco Antonio Mendoza en Clínicas de Especialidades Nuestra Señora de la Paz', type: 'document' },
  { image: 'segundo-aniversario-restaurado', width: 1410, height: 1115, title: 'Nuestro segundo aniversario', label: 'Archivo de prensa', alt: 'Recorte de prensa restaurado de la celebración del segundo aniversario de la clínica', type: 'document' },
  { image: 'advanced-sala-espera-limpia', width: 1600, height: 1200, title: 'Advanced por dentro', label: 'Sala de espera', alt: 'Sala de espera y recepción de Advanced Radiology', type: 'photo' },
];

const expand = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7"/></svg>';

export function HistoryTimeline() {
  return `${styles}
  <section id="institucional" class="history-section" aria-labelledby="inst-title">
    <div class="th-shell">
      <header class="history-heading">
        <div><span class="th-section-label">Nuestra Historia</span><h2 id="inst-title">Una historia que<br>sigue creciendo.</h2></div>
        <p>Desde el 5 de abril de 2006, acompañamos a pacientes y médicos de San Miguel. Tres sedes forman hoy parte de una misma historia de atención y confianza.</p>
      </header>
      <ol class="history-timeline" aria-label="Apertura de nuestras sedes">
        ${milestones.map(m => `<li class="history-milestone">
          <div class="history-year"><time datetime="${m.year}">${m.year}</time><span class="history-point" aria-hidden="true"></span></div>
          <article data-visual-motion="clinic">
            <a class="history-building vm-stage" href="#sede-${m.target}" aria-label="Ver ubicación y contacto de ${m.name}">
              <img class="vm-media" src="/assets/visuals/${m.image}.webp" srcset="/assets/visuals/${m.image}-720.webp 720w, /assets/visuals/${m.image}.webp 1536w" sizes="(max-width: 680px) 90vw, 32vw" width="1536" height="1024" alt="Fachada de ${m.name}, visualización tridimensional" loading="lazy" decoding="async">
            </a>
            <div class="history-milestone-copy"><span class="history-date">${m.date}</span><h3>${m.name}</h3><p>${m.text}</p><a class="history-site-link" href="#sede-${m.target}">Conozca esta sede <span aria-hidden="true">↗</span></a></div>
          </article>
        </li>`).join('')}
      </ol>
      <div class="history-archive" aria-labelledby="archive-title">
        <div class="history-archive-heading"><h3 id="archive-title">Momentos de nuestra trayectoria</h3><span>Un recorrido en imágenes</span></div>
        <div class="history-gallery">
          ${memories.map((m, i) => `<a class="history-memory history-memory--${m.type}" href="/assets/visuals/${m.image}.webp" target="_blank" rel="noopener" data-history-photo="${i}" data-title="${m.title}" aria-label="Ampliar: ${m.title}">
            <figure><div class="history-memory-image"><img src="/assets/visuals/${m.image}-720.webp" width="${m.width}" height="${m.height}" alt="${m.alt}" loading="lazy" decoding="async"><span class="history-expand">${expand}</span></div><figcaption><small>${m.label}</small><strong>${m.title}</strong></figcaption></figure>
          </a>`).join('')}
        </div>
      </div>
    </div>
    <dialog class="history-viewer" aria-labelledby="history-viewer-title">
      <div class="history-viewer-head"><h3 id="history-viewer-title"></h3><button type="button" data-history-close aria-label="Cerrar imagen" autofocus>×</button></div>
      <div class="history-viewer-stage"><img data-history-full alt=""></div>
      <div class="history-viewer-footer"><button type="button" data-history-prev aria-label="Imagen anterior">←</button><span data-history-count aria-live="polite"></span><button type="button" data-history-next aria-label="Imagen siguiente">→</button><a data-history-original target="_blank" rel="noopener">Abrir imagen ${expand}</a></div>
    </dialog>
  </section>${script}`;
}

const styles = `<style id="history-timeline-style">
.history-section{padding:90px 0 80px;background:#fff;color:#19242d;scroll-margin-top:80px}
.history-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:50px;margin-bottom:48px}
.history-heading h2{font-size:clamp(34px,3.5vw,51px);font-weight:650;letter-spacing:-.045em;line-height:1.12;margin:18px 0 0}
.history-heading p{font-size:15px;line-height:1.85;color:#606a71;max-width:435px;margin:0 0 4px}
.history-timeline{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0}
.history-milestone{min-width:0}.history-year{position:relative;padding:0 25px 28px;border-bottom:1px solid #c8b5b1}
.history-year time{font:500 clamp(36px,4vw,57px)/1 var(--th-mono);letter-spacing:-.06em;color:#9d2320}
.history-point{position:absolute;bottom:-5px;left:25px;width:9px;height:9px;border-radius:50%;background:#9d2320;box-shadow:0 0 0 5px #fff}
.history-milestone article{margin-top:18px;padding:0 20px 0 0;border:0;box-shadow:none!important}
.history-building{display:block;position:relative;aspect-ratio:3/2;background:#fff}
.history-building img{display:block;width:100%;height:100%;object-fit:contain}
.history-milestone-copy{padding:20px 25px 0}.history-date{font:500 10px/1.6 var(--th-mono);text-transform:uppercase;letter-spacing:.08em;color:#8e3530}
.history-milestone h3{font-size:clamp(21px,2vw,28px);font-weight:650;line-height:1.2;letter-spacing:-.035em;margin:10px 0 12px}
.history-milestone p{font-size:14px;line-height:1.8;color:#667078;max-width:340px;margin:0 0 15px;min-height:51px}
.history-site-link{display:inline-flex;align-items:center;gap:14px;font-size:12px;font-weight:700;color:#9d2320!important;min-height:44px}
.history-site-link span{font-size:18px;font-weight:400}.history-site-link:hover{color:#c13730!important}
.history-archive{margin-top:55px;padding-top:30px;border-top:1px solid #dfe1dc}
.history-archive-heading{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:23px}
.history-archive-heading h3{font-size:22px;font-weight:600;letter-spacing:-.03em;margin:0}.history-archive-heading>span{font-size:12px;color:#717975}
.history-gallery{display:grid;grid-template-columns:1fr .85fr 1.2fr 1.15fr;gap:20px}
.history-memory{min-width:0;display:block}.history-memory figure{margin:0}.history-memory-image{position:relative;height:220px;overflow:hidden;background:#f3f0e9}
.history-memory img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .4s}.history-memory--document img{object-fit:contain;padding:10px}
.history-memory:hover img{transform:scale(1.025)}.history-expand{position:absolute;right:10px;bottom:10px;background:#fff;color:#253139;width:32px;height:32px;display:grid;place-items:center;box-shadow:0 2px 8px #0001}
.history-memory figcaption{padding:14px 0 0}.history-memory small{display:block;font:500 9px/1.7 var(--th-mono);color:#8a423b;text-transform:uppercase;letter-spacing:.06em}
.history-memory strong{display:block;font-size:14px;line-height:1.5;font-weight:600;margin-top:4px}
.history-viewer{padding:0;border:1px solid #41505a;border-radius:6px;width:min(1080px,calc(100vw - 40px));max-width:none;max-height:94dvh;background:#111a22;color:#fff;box-shadow:0 20px 80px #0007}
.history-viewer::backdrop{background:#051018df;backdrop-filter:blur(5px)}
.history-viewer-head{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;gap:20px;border-bottom:1px solid #ffffff20}
.history-viewer h3{font:500 16px/1.5 var(--th-font);margin:0}.history-viewer button{font:400 24px/1 var(--th-font);border:1px solid #ffffff40;min-width:44px;height:44px;border-radius:3px;background:transparent;color:#fff;cursor:pointer}
.history-viewer button:hover{background:#ffffff18}.history-viewer-head button{border:0;font-size:32px}
.history-viewer-stage{height:min(68dvh,780px);display:grid;place-items:center;padding:14px;background:#0b1219}
.history-viewer-stage img{width:100%;height:100%;min-height:0;object-fit:contain}
.history-viewer-footer{display:flex;align-items:center;gap:12px;padding:12px 18px}.history-viewer-footer span{font:12px var(--th-mono);min-width:42px;text-align:center}
.history-viewer-footer a{display:inline-flex;align-items:center;gap:10px;margin-left:auto;font-size:12px;color:#fff;min-height:44px}
@media(max-width:1000px){.history-heading{gap:32px}.history-heading p{max-width:360px}.history-gallery{grid-template-columns:repeat(2,minmax(0,1fr));gap:25px}.history-memory-image{height:240px}.history-milestone article{padding-right:10px}.history-milestone-copy{padding:15px 12px 0}.history-milestone p{min-height:76px}.history-year{padding-left:12px}.history-point{left:12px}}
@media(max-width:680px){.history-section{padding:58px 0}.history-heading{display:block;margin-bottom:36px}.history-heading p{max-width:none;font-size:14px;margin-top:22px}.history-timeline{display:block;border-left:1px solid #c8b5b1;margin-left:5px}.history-milestone{position:relative;padding:0 0 38px 22px}.history-milestone:last-child{padding-bottom:0}.history-year{padding:0;border:0}.history-year time{font-size:43px}.history-point{left:-27px;top:16px;bottom:auto}.history-milestone article{margin-top:12px;padding:0}.history-milestone-copy{padding:15px 0 0}.history-milestone p{min-height:0;max-width:none}.history-milestone h3{font-size:27px}.history-gallery{gap:24px 16px}.history-memory-image{height:180px}.history-archive{margin-top:35px;padding-top:25px}.history-archive-heading{display:block}.history-archive-heading>span{display:block;margin-top:6px}.history-archive-heading h3{font-size:22px}.history-memory strong{font-size:13px}.history-viewer{width:calc(100vw - 20px)}.history-viewer-head{padding:10px 12px}.history-viewer h3{font-size:14px}.history-viewer-stage{height:65dvh;padding:8px}.history-viewer-footer{gap:8px;padding:10px 12px}}
@media(max-width:380px){.history-gallery{grid-template-columns:1fr}.history-memory-image{height:240px}}
@media(prefers-reduced-motion:reduce){.history-memory img{transition:none}}
</style>`;

const script = `<script>(()=>{
  const section=document.getElementById('institucional');
  const dialog=section.querySelector('.history-viewer');
  if(typeof dialog.showModal!=='function')return;
  const links=[...section.querySelectorAll('[data-history-photo]')];
  const full=dialog.querySelector('[data-history-full]');
  const title=dialog.querySelector('#history-viewer-title');
  let current=0,opener=null,previousOverflow='';
  const show=index=>{
    current=(index+links.length)%links.length;
    const link=links[current];
    full.src=link.href;full.alt=link.querySelector('img').alt;
    title.textContent=link.dataset.title;
    dialog.querySelector('[data-history-count]').textContent=(current+1)+' / '+links.length;
    dialog.querySelector('[data-history-original]').href=link.href;
  };
  links.forEach((link,index)=>link.addEventListener('click',event=>{
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();opener=link;show(index);previousOverflow=document.body.style.overflow;
    dialog.showModal();document.body.style.overflow='hidden';
  }));
  dialog.querySelector('[data-history-close]').addEventListener('click',()=>dialog.close());
  dialog.querySelector('[data-history-prev]').addEventListener('click',()=>show(current-1));
  dialog.querySelector('[data-history-next]').addEventListener('click',()=>show(current+1));
  dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();show(current-1);}if(event.key==='ArrowRight'){event.preventDefault();show(current+1);}});
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
  dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;opener?.focus({preventScroll:true});});
})();</script>`;
