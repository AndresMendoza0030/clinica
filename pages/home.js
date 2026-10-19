import { HomeTechHeader, HomeTechFooter, HomeTechStyle } from "../components/home-tech-style.js";

const IMG = "https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/";
const LAB_IMAGE = "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=82";

export function renderHomePage() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#0a131d" />
  <title>Clínica Radiológica y Laboratorio Clínico Dr. Mendoza | San Miguel</title>
  <meta name="description" content="Diagnóstico por imágenes y laboratorio clínico en San Miguel. Resonancia, tomografía, ultrasonografía, rayos X, mamografía y pruebas de laboratorio." />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="es_SV" />
  <meta property="og:title" content="Clínica Radiológica y Laboratorio Clínico Dr. Mendoza" />
  <meta property="og:description" content="Tecnología diagnóstica y atención cercana en San Miguel desde 2006." />
  <meta property="og:image" content="${IMG}Resonancia%20magnetica.png" />
  <link rel="icon" type="image/png" href="${IMG}faviconDr.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preconnect" href="https://lwjusnpkibgoxkcvrvww.supabase.co" />
  <link rel="preload" as="image" href="${IMG}Resonancia%20magnetica.png" />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  ${HomeTechStyle()}
</head>
<body class="th-body">
  <a href="#contenido" class="th-skip-link" style="position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden" onfocus="this.style.cssText='position:fixed;top:12px;left:12px;background:white;color:black;padding:10px;z-index:90'" onblur="this.style.cssText='position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden'">Saltar al contenido</a>
  ${HomeTechHeader()}
  <main id="contenido">
    <section id="inicio" class="th-home-hero" aria-labelledby="hero-title">
      <div class="th-hero-photo" role="img" aria-label="Fotografía de resonancia magnética del catálogo institucional"></div>
      <div class="th-shell th-hero-content">
        <div class="th-kicker">Diagnóstico por Imágenes · Laboratorio Clínico</div>
        <h1 id="hero-title">Tecnología para un diagnóstico preciso.</h1>
        <p class="th-hero-lead">
          Diagnóstico por imágenes con equipamiento Siemens y servicios de laboratorio clínico,
          respaldados por experiencia, compromiso y atención cercana en San Miguel.
        </p>
        <div class="th-actions">
          <a href="/estudios.html" class="th-button th-button-primary">Conozca Nuestros Estudios <span class="th-arrow" aria-hidden="true">→</span></a>
          <a href="#sedes" class="th-button th-button-outline">Sedes y Contacto <span class="th-arrow" aria-hidden="true">↗</span></a>
        </div>
        <div class="th-hero-proof" aria-label="Datos institucionales">
          <div class="th-proof"><strong>Desde 2006</strong><span>Trayectoria</span></div>
          <div class="th-proof"><strong>3 sedes</strong><span>San Miguel</span></div>
          <div class="th-proof"><strong>Siemens</strong><span>Equipos de imagen</span></div>
        </div>
      </div>
      <span class="th-photo-note" aria-hidden="true">DIAGNÓSTICO POR IMÁGENES / RM</span>
    </section>

    <nav class="th-modality-strip" aria-label="Nuestros servicios">
      <a class="th-modality" href="/estudios-rm.html">
        <img src="${IMG}Resonancia%20magnetica.png" alt="" loading="lazy" decoding="async" />
        <span class="th-modality-number">01 / IMAGENOLOGÍA</span>
        <div><h2>Resonancia Magnética</h2><p>Estudios convencionales y especializados.</p><span class="th-modality-link" aria-hidden="true">→</span></div>
      </a>
      <a class="th-modality" href="/estudios-tac.html">
        <img src="${IMG}TAC.png" alt="" loading="lazy" decoding="async" />
        <span class="th-modality-number">02 / IMAGENOLOGÍA</span>
        <div><h2>Tomografía</h2><p>Tomografía multidetectores y otras modalidades.</p><span class="th-modality-link" aria-hidden="true">→</span></div>
      </a>
      <a class="th-modality" href="/estudios-rayosx.html">
        <img src="${IMG}Rayos%20X.png" alt="" loading="lazy" decoding="async" />
        <span class="th-modality-number">03 / IMAGENOLOGÍA</span>
        <div><h2>Rayos X</h2><p>Estudios radiográficos según indicación médica.</p><span class="th-modality-link" aria-hidden="true">→</span></div>
      </a>
      <a class="th-modality" href="/estudios-mamografia.html">
        <img src="${IMG}Mamografia.png" alt="" loading="lazy" decoding="async" />
        <span class="th-modality-number">04 / IMAGENOLOGÍA</span>
        <div><h2>Mamografía</h2><p>Estudios de imagen para evaluación mamaria.</p><span class="th-modality-link" aria-hidden="true">→</span></div>
      </a>
      <a class="th-modality" href="/estudios-us.html">
        <img src="${IMG}Ultrasonografia.png" alt="" loading="lazy" decoding="async" />
        <span class="th-modality-number">05 / IMAGENOLOGÍA</span>
        <div><h2>Ultrasonografía</h2><p>Ultrasonido convencional y Doppler.</p><span class="th-modality-link" aria-hidden="true">→</span></div>
      </a>
      <a class="th-modality th-modality--lab" href="/laboratorio.html">
        <img src="${LAB_IMAGE}" alt="" loading="lazy" decoding="async" />
        <span class="th-modality-number">06 / LABORATORIO</span>
        <div><h2>Laboratorio Clínico</h2><p>Exámenes y perfiles para el seguimiento clínico.</p><span class="th-modality-link" aria-hidden="true">→</span></div>
      </a>
    </nav>

    <section id="institucional" class="th-institution" aria-labelledby="inst-title">
      <div class="th-shell th-institution-grid">
        <div>
          <div class="th-section-label">Nuestra Clínica</div>
          <h2 id="inst-title" class="th-headline">Más de dos décadas de compromiso con su salud.</h2>
          <p class="th-body-copy">
            Fundada el 5 de abril de 2006, la Clínica Radiológica y Laboratorio Clínico Dr. Mendoza
            acompaña a pacientes y médicos de San Miguel con servicios de diagnóstico
            y una atención basada en la confianza.
          </p>
          <p class="th-body-copy">
            Nuestra trayectoria integra imagenología, laboratorio clínico y un compromiso continuo
            con la calidad de la atención.
          </p>
          <a class="th-inline-link" href="#sedes">Conozca Nuestras Sedes <span class="th-arrow" aria-hidden="true">→</span></a>
          <div class="th-facts" aria-label="Nuestra trayectoria">
            <div class="th-fact"><strong>2006</strong><span>Año de fundación</span></div>
            <div class="th-fact"><strong>20 años</strong><span>De trayectoria</span></div>
            <div class="th-fact"><strong>3</strong><span>Sedes en San Miguel</span></div>
          </div>
        </div>
        <figure class="th-institution-image" style="margin:0">
          <img src="${IMG}plazaFarid.png" alt="Instalaciones de la clínica en Plaza Farid" loading="lazy" decoding="async" />
          <figcaption>PLAZA FARID / CLÍNICA DR. MENDOZA</figcaption>
        </figure>
      </div>
    </section>

    <section id="laboratorio" class="th-lab-feature" aria-labelledby="lab-title">
      <div class="th-lab-image">
        <img src="${LAB_IMAGE}" alt="Material de laboratorio clínico, imagen ilustrativa" loading="lazy" decoding="async" />
        <span>IMAGEN ILUSTRATIVA</span>
      </div>
      <div class="th-lab-content">
        <div class="th-section-label">Laboratorio Clínico</div>
        <h2 id="lab-title">Análisis para acompañar cada etapa de su atención.</h2>
        <p>
          Consulte nuestro catálogo de exámenes y perfiles clínicos, organizados por especialidad
          para facilitar su búsqueda.
        </p>
        <a class="th-inline-link" href="/laboratorio.html">Explore el Laboratorio <span class="th-arrow" aria-hidden="true">→</span></a>
      </div>
    </section>

    <section id="sedes" class="th-locations" aria-labelledby="sedes-title">
      <div class="th-shell">
        <div class="th-locations-head">
          <div><div class="th-section-label">Sedes y Contacto</div><h2 id="sedes-title">Siempre cerca de usted.</h2></div>
          <p>Consulte dónde se realiza el estudio que necesita antes de visitar nuestras instalaciones.</p>
        </div>
        <div class="th-location-grid">
          <article class="th-location">
            <span class="th-location-number">01 / SEDE PRINCIPAL</span>
            <h3>Clínica Matriz</h3>
            <p>9.ª Avenida Sur #411, Barrio La Merced, San Miguel.</p>
            <a href="tel:+50326612345" class="th-location-phone">2661-2345</a>
            <div class="th-location-actions">
              <a href="https://maps.app.goo.gl/cXRW57bte2G2VioK6" target="_blank" rel="noopener noreferrer">Google Maps ↗</a>
              <a href="https://wa.me/50378205613" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
            </div>
          </article>
          <article class="th-location">
            <span class="th-location-number">02 / SEDE</span>
            <h3>Plaza Farid</h3>
            <p>Avenida Roosevelt Norte #412, Barrio San Felipe, San Miguel.</p>
            <a href="tel:+50326697475" class="th-location-phone">2669-7475</a>
            <div class="th-location-actions">
              <a href="https://maps.app.goo.gl/1KysDJYFLpXdvZMi6" target="_blank" rel="noopener noreferrer">Google Maps ↗</a>
              <a href="https://wa.me/50378195960" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
            </div>
          </article>
          <article class="th-location">
            <span class="th-location-number">03 / SEDE</span>
            <h3>Advanced Radiology</h3>
            <p>Avenida Roosevelt Norte #411, San Miguel.</p>
            <a href="tel:+50326697988" class="th-location-phone">2669-7988</a>
            <div class="th-location-actions">
              <a href="https://maps.app.goo.gl/RGyf8VcgsaMdJWHx5" target="_blank" rel="noopener noreferrer">Google Maps ↗</a>
              <a href="https://wa.me/50378448608" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
  ${HomeTechFooter()}
  <script>
    (() => {
      const toggle = document.getElementById("techMenuToggle");
      const menu = document.getElementById("techMobileNav");
      if (!toggle || !menu) return;
      const setOpen = (open) => {
        menu.hidden = !open;
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación");
      };
      toggle.addEventListener("click", () => setOpen(menu.hidden));
      menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
      document.addEventListener("keydown", (event) => { if (event.key === "Escape") setOpen(false); });
      document.addEventListener("click", (event) => {
        if (!menu.hidden && !menu.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
      });
    })();
  </script>
</body>
</html>`;
}
