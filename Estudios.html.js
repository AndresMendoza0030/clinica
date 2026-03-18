import { renderPage, renderSedesBlock, SITE } from "./_shared/site.js";

export async function onRequest(context) {
  const studies = [
    {
      title: "Resonancia Magnética",
      description: "Resonancia magnética convencional y especializada.",
      details: [
        "Estudios por región anatómica",
        "Apoyo diagnóstico según indicación médica",
        "Atención en sede especializada"
      ]
    },
    {
      title: "Tomografía (TAC)",
      description: "Tomografía multidetectores con opciones de estudio por región anatómica.",
      details: [
        "Protocolos según solicitud médica",
        "Evaluación clínica por diferentes áreas",
        "Orientación previa cuando aplica"
      ]
    },
    {
      title: "Ultrasonografía",
      description: "Ultrasonido convencional y Doppler color.",
      details: [
        "Estudios generales y por especialidad",
        "Doppler color según necesidad",
        "Atención programada y orientación"
      ]
    },
    {
      title: "Rayos X",
      description: "Estudios radiográficos por región: cabeza, columna, tórax, extremidades y más.",
      details: [
        "Radiografías según indicación",
        "Cobertura por múltiples regiones",
        "Apoyo al control clínico"
      ]
    },
    {
      title: "Mamografía",
      description: "Opciones de mamografía y tomosíntesis (según disponibilidad).",
      details: [
        "Evaluación mamaria",
        "Orientación previa cuando corresponde",
        "Atención con enfoque preventivo"
      ]
    },
    {
      title: "Estudios especiales",
      description: "Serie ósea, edad ósea, histerosalpingograma y otros.",
      details: [
        "Estudios específicos por solicitud médica",
        "Disponibilidad según sede",
        "Coordinación e indicaciones previas"
      ]
    }
  ];

  const content = `
    <main>
      <section class="hero">
        <div class="container">
          <div class="hero-card">
            <div class="breadcrumbs">
              <a href="/">Inicio</a> / <span>Estudios</span>
            </div>

            <p class="eyebrow">DIAGNÓSTICO POR IMÁGENES</p>
            <h1>Estudios y diagnóstico por imágenes</h1>
            <p class="lead">
              Seleccione una categoría para conocer los estudios disponibles
              y resolver dudas sobre indicaciones, horarios y sedes.
            </p>

            <div class="actions">
              <a class="btn btn-primary" href="${SITE.branches[0].whatsappUrl}" target="_blank" rel="noopener noreferrer">
                Consultas por WhatsApp
              </a>
              <a class="btn btn-secondary" href="/sedes-contacto.html">Ver sedes y contacto</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="study-grid">
            ${studies
              .map(
                (study) => `
                  <article class="study-card">
                    <h3>${study.title}</h3>
                    <p class="muted">${study.description}</p>
                    <ul class="list-clean">
                      ${study.details.map((item) => `<li>${item}</li>`).join("")}
                    </ul>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="grid-3">
            <article class="card">
              <h3>Horarios de atención</h3>
              <ul class="list-clean">
                <li>${SITE.hours.weekdays}</li>
                <li>${SITE.hours.saturday}</li>
              </ul>
            </article>

            <article class="card">
              <h3>Consultas</h3>
              <p class="muted">
                Puede escribirnos para resolver dudas sobre estudios, indicaciones y sedes.
              </p>
              <a class="btn btn-secondary" href="${SITE.branches[0].whatsappUrl}" target="_blank" rel="noopener noreferrer">
                Escribir por WhatsApp
              </a>
            </article>

            <article class="card">
              <h3>Nota</h3>
              <p class="muted">
                Luego podrás reemplazar estos textos por listados más detallados
                de estudios específicos por categoría.
              </p>
            </article>
          </div>
        </div>
      </section>

      ${renderSedesBlock({ compact: false })}
    </main>
  `;

  return renderPage({
    title: "Estudios | Clínica Dr. Mendoza",
    path: new URL(context.request.url).pathname,
    content,
    metaDescription:
      "Estudios y diagnóstico por imágenes en Clínica Dr. Mendoza: resonancia, tomografía, ultrasonografía, rayos X, mamografía y más.",
  });
}