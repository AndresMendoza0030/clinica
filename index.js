import { renderPage, renderSedesBlock, SITE } from "./_shared/site.js";

export async function onRequest(context) {
  const content = `
    <main>
      <section class="hero">
        <div class="container">
          <div class="hero-card">
            <p class="eyebrow">INICIO</p>
            <h1>Gracias por confiarnos su salud.</h1>
            <p class="lead">
              Diagnóstico por imágenes y laboratorio clínico con atención cercana,
              tecnología y resultados confiables.
            </p>

            <div class="actions">
              <a class="btn btn-primary" href="/sedes-contacto.html">Ver sedes y contacto</a>
              <a class="btn btn-secondary" href="/Estudios.html">Diagnóstico por imágenes</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="historia">
        <div class="container">
          <p class="eyebrow">HISTORIA</p>
          <h2>Trayectoria y confianza en San Miguel</h2>
          <p class="section-intro">
            Fundada el ${SITE.founded}, la Clínica Radiológica y Laboratorio Clínico Dr. Mendoza
            acompaña a pacientes y médicos con resultados confiables y atención cercana.
          </p>

          <div class="grid-3">
            <article class="card">
              <h3>Fundación</h3>
              <p class="muted">${SITE.founded}</p>
            </article>

            <article class="card">
              <h3>Calidad</h3>
              <p class="muted">Resultados confiables</p>
            </article>

            <article class="card">
              <h3>Atención</h3>
              <p class="muted">Trato cercano</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2>Diagnóstico por imágenes</h2>
          <p class="section-intro">
            Conoce la amplia variedad de estudios que realizamos, con tecnología
            y atención cuidadosa en cada proceso.
          </p>

          <div class="grid-3">
            <article class="card">
              <h3>Rayos X</h3>
              <p class="muted">Estudios radiográficos según indicación médica.</p>
            </article>

            <article class="card">
              <h3>Mamografía</h3>
              <p class="muted">Evaluación mamaria con orientación previa cuando aplica.</p>
            </article>

            <article class="card">
              <h3>Tomografía</h3>
              <p class="muted">Tomografía computarizada para evaluación clínica.</p>
            </article>
          </div>

          <div class="actions">
            <a class="btn btn-primary" href="/Estudios.html">Más información</a>
            <a class="btn btn-secondary" href="/sedes-contacto.html">Ver sedes</a>
          </div>
        </div>
      </section>

      <section class="section" id="laboratorio">
        <div class="container">
          <h2>Laboratorio clínico</h2>
          <p class="section-intro">
            Exámenes y perfiles con resultados confiables para apoyar su control de salud y seguimiento médico.
          </p>

          <div class="grid-3">
            <article class="card">
              <h3>Categorías</h3>
              <ul class="list-clean">
                <li>Perfiles clínicos</li>
                <li>Química sanguínea</li>
                <li>Hematología</li>
                <li>Inmunología</li>
              </ul>
            </article>

            <article class="card">
              <h3>Más categorías</h3>
              <ul class="list-clean">
                <li>Coprología</li>
                <li>Bacteriología</li>
                <li>Uroanálisis</li>
                <li>Pruebas especiales</li>
              </ul>
            </article>

            <article class="card">
              <h3>Contacto</h3>
              <p class="muted">
                Puede escribirnos para resolver dudas sobre exámenes, indicaciones y sedes.
              </p>
              <a class="btn btn-secondary" href="${SITE.branches[0].whatsappUrl}" target="_blank" rel="noopener noreferrer">
                Consultas por WhatsApp
              </a>
            </article>
          </div>
        </div>
      </section>

      ${renderSedesBlock({ compact: false })}
    </main>
  `;

  return renderPage({
    title: SITE.name,
    path: new URL(context.request.url).pathname,
    content,
  });
}