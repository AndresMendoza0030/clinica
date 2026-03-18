import { renderPage, renderSedesBlock, SITE } from "./_shared/site.js";

export async function onRequest(context) {
  const content = `
    <main>
      <section class="hero">
        <div class="container">
          <div class="hero-card">
            <div class="breadcrumbs">
              <a href="/">Inicio</a> / <span>Sedes y contacto</span>
            </div>

            <p class="eyebrow">CONTACTO</p>
            <h1>Sedes y contacto</h1>
            <p class="lead">
              ${SITE.hours.full}
            </p>

            <div class="actions">
              <a class="btn btn-primary" href="${SITE.branches[0].whatsappUrl}" target="_blank" rel="noopener noreferrer">
                WhatsApp principal
              </a>
              <a class="btn btn-secondary" href="/Estudios.html">
                Ver estudios
              </a>
            </div>
          </div>
        </div>
      </section>

      ${renderSedesBlock({ compact: true })}

      <section class="section">
        <div class="container">
          <div class="grid-3">
            <article class="card">
              <h3>Clínica Matriz</h3>
              <p class="muted">${SITE.branches[0].address}</p>
              <ul class="list-clean">
                <li>${SITE.branches[0].phone}</li>
                <li>
                  <a href="${SITE.branches[0].whatsappUrl}" target="_blank" rel="noopener noreferrer">
                    WhatsApp: ${SITE.branches[0].whatsappLabel}
                  </a>
                </li>
              </ul>
            </article>

            <article class="card">
              <h3>Plaza Farid</h3>
              <p class="muted">${SITE.branches[1].address}</p>
              <ul class="list-clean">
                <li>${SITE.branches[1].phone}</li>
                <li>
                  <a href="${SITE.branches[1].whatsappUrl}" target="_blank" rel="noopener noreferrer">
                    WhatsApp: ${SITE.branches[1].whatsappLabel}
                  </a>
                </li>
              </ul>
            </article>

            <article class="card">
              <h3>Advanced Radiology</h3>
              <p class="muted">${SITE.branches[2].address}</p>
              <ul class="list-clean">
                <li>${SITE.branches[2].phone}</li>
                <li>
                  <a href="${SITE.branches[2].whatsappUrl}" target="_blank" rel="noopener noreferrer">
                    WhatsApp: ${SITE.branches[2].whatsappLabel}
                  </a>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </main>
  `;

  return renderPage({
    title: "Sedes y contacto | Clínica Dr. Mendoza",
    path: new URL(context.request.url).pathname,
    content,
    metaDescription:
      "Sedes, teléfonos, horarios y contacto de Clínica Dr. Mendoza en San Miguel.",
  });
}