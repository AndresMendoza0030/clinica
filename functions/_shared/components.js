import { SITE } from "./site.js";

export function header(path = "/") {
  return `
    <header class="site-header">
      <div class="container">
        <a href="/" class="brand">${SITE.name}</a>
        <nav class="nav">
          <a href="/" ${path === "/" ? 'aria-current="page"' : ""}>Inicio</a>
          <a href="/Estudios.html" ${path === "/Estudios.html" ? 'aria-current="page"' : ""}>Estudios</a>
          <a href="/sedes-contacto.html" ${path === "/sedes-contacto.html" ? 'aria-current="page"' : ""}>Sedes y contacto</a>
        </nav>
      </div>
    </header>
  `;
}

export function sedes() {
  const buttons = SITE.branches
    .map(
      (branch, index) => `
        <button class="sede-btn ${index === 0 ? "active" : ""}"
          data-map="${branch.mapEmbed}"
          data-name="${branch.name}">
          ${branch.name}
        </button>
      `
    )
    .join("");

  const cards = SITE.branches
    .map(
      (branch) => `
        <article class="sede-card">
          <h3>${branch.name}</h3>
          <p>${branch.address}</p>
          <p>Tel: ${branch.phone}</p>
          <p><a href="${branch.whatsappUrl}" target="_blank" rel="noopener noreferrer">
            WhatsApp: ${branch.whatsappLabel}
          </a></p>
          <p><a href="${branch.mapsUrl}" target="_blank" rel="noopener noreferrer">Ver en Google Maps</a></p>
        </article>
      `
    )
    .join("");

  return `
    <section class="sedes-section">
      <div class="container">
        <h2>Sedes y contacto</h2>

        <div class="sedes-selector">
          ${buttons}
        </div>

        <div class="sedes-grid">
          <div class="sedes-list">
            ${cards}
          </div>

          <div class="sedes-map">
            <iframe
              id="clinic-map"
              src="${SITE.branches[0].mapEmbed}"
              width="100%"
              height="420"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function footer() {
  const clinics = SITE.branches
    .map(
      (branch) => `
        <div class="footer-clinic">
          <h4>${branch.name}</h4>
          <p>${branch.address}</p>
          <p>${branch.phone}</p>
          <p>
            <a href="${branch.whatsappUrl}" target="_blank" rel="noopener noreferrer">
              WhatsApp: ${branch.whatsappLabel}
            </a>
          </p>
        </div>
      `
    )
    .join("");

  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-info">
          ${clinics}
        </div>
        <div class="footer-bottom">
          <p>© 2026 ${SITE.name}</p>
        </div>
      </div>
    </footer>
  `;
}

export function whatsappFloat() {
  return `
    <a
      href="${SITE.whatsappFloat}"
      class="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp">
      WhatsApp
    </a>
  `;
}