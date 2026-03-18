export const SITE = {
  name: "Clínica Radiológica y Laboratorio Clínico Dr. Mendoza",
  shortName: "Clínica Dr. Mendoza",
  description:
    "Diagnóstico por imágenes y laboratorio clínico con atención cercana, tecnología y resultados confiables.",
  hours: {
    weekdays: "Lunes a viernes 6:00 AM – 4:30 PM",
    saturday: "Sábado 6:00 AM – 12:00 PM",
    full: "Lunes a viernes 6:00 AM – 4:30 PM. Sábado 6:00 AM – 12:00 PM.",
  },
  founded: "5 de abril de 2006",
  branches: [
    {
      id: "matriz",
      name: "Clínica Matriz",
      badge: "Principal",
      address: "9° Av. Sur #411, Barrio La Merced, San Miguel",
      phone: "2661-2345",
      whatsappLabel: "7820-5613",
      whatsappUrl: "https://wa.me/50378205613",
      mapsUrl: "https://maps.app.goo.gl/",
      note: "",
    },
    {
      id: "plaza-farid",
      name: "Plaza Farid",
      badge: "",
      address: "Av. Roosevelt Norte #412, Barrio San Felipe, San Miguel",
      phone: "2669-7475",
      whatsappLabel: "7819-5960",
      whatsappUrl: "https://wa.me/50378195960",
      mapsUrl: "https://maps.app.goo.gl/",
      note: "",
    },
    {
      id: "advanced-radiology",
      name: "Advanced Radiology",
      badge: "",
      address: "Av. Roosevelt Norte #411, San Miguel",
      phone: "2669-7988",
      whatsappLabel: "7844-8608",
      whatsappUrl: "https://wa.me/50378448608",
      mapsUrl: "https://maps.app.goo.gl/",
      note: "Servicio de resonancia magnética",
    },
  ],
  legalLinks: [
    { label: "Aviso de Privacidad", href: "#" },
    { label: "Términos y Condiciones", href: "#" },
  ],
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function navItems(currentPath) {
  const items = [
    { label: "Inicio", href: "/" },
    { label: "Historia", href: "/#historia" },
    { label: "Diagnóstico por imágenes", href: "/Estudios.html" },
    { label: "Laboratorio clínico", href: "/#laboratorio" },
    { label: "Sedes y contacto", href: "/sedes-contacto.html" },
  ];

  return items
    .map((item) => {
      const active =
        currentPath === item.href ||
        (item.href !== "/" && currentPath.startsWith(item.href));
      return `
        <a
          href="${item.href}"
          class="nav-link ${active ? "is-active" : ""}"
          ${active ? 'aria-current="page"' : ""}
        >
          ${escapeHtml(item.label)}
        </a>
      `;
    })
    .join("");
}

function renderHeader(currentPath = "/") {
  return `
    <header class="site-header">
      <div class="container header-inner">
        <a href="/" class="brand" aria-label="${escapeHtml(SITE.shortName)}">
          <span class="brand-mark">+</span>
          <span class="brand-text">
            <strong>${escapeHtml(SITE.shortName)}</strong>
            <small>San Miguel</small>
          </span>
        </a>

        <nav class="site-nav" aria-label="Principal">
          ${navItems(currentPath)}
        </nav>
      </div>
    </header>
  `;
}

function renderWhatsappButton() {
  return `
    <a
      href="${SITE.branches[0].whatsappUrl}"
      class="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      title="Escribir por WhatsApp"
    >
      WhatsApp
    </a>
  `;
}

function renderBranchesSection({ compact = false } = {}) {
  const cards = SITE.branches
    .map(
      (branch) => `
        <article class="branch-card" id="${escapeHtml(branch.id)}">
          <div class="branch-head">
            <h3>${escapeHtml(branch.name)}</h3>
            ${
              branch.badge
                ? `<span class="badge">${escapeHtml(branch.badge)}</span>`
                : ""
            }
          </div>

          ${branch.note ? `<p class="muted">${escapeHtml(branch.note)}</p>` : ""}

          <ul class="branch-list">
            <li><strong>Dirección:</strong> ${escapeHtml(branch.address)}</li>
            <li><strong>Teléfono:</strong> ${escapeHtml(branch.phone)}</li>
            <li>
              <strong>WhatsApp:</strong>
              <a href="${branch.whatsappUrl}" target="_blank" rel="noopener noreferrer">
                ${escapeHtml(branch.whatsappLabel)}
              </a>
            </li>
            <li>
              <strong>Mapa:</strong>
              <a href="${branch.mapsUrl}" target="_blank" rel="noopener noreferrer">
                Ver en Google Maps
              </a>
            </li>
          </ul>
        </article>
      `
    )
    .join("");

  return `
    <section class="section">
      <div class="container">
        ${compact ? "" : `<p class="eyebrow">SEDES</p>`}
        <h2>Sedes y contacto</h2>
        <p class="section-intro">${escapeHtml(SITE.hours.full)}</p>
        <div class="branch-grid">
          ${cards}
        </div>
      </div>
    </section>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <h3>${escapeHtml(SITE.shortName)}</h3>
          <p>${escapeHtml(SITE.description)}</p>
          <p>Fundada el ${escapeHtml(SITE.founded)}</p>
        </div>

        <div>
          <h4>Horarios de atención</h4>
          <ul class="footer-list">
            <li>${escapeHtml(SITE.hours.weekdays)}</li>
            <li>${escapeHtml(SITE.hours.saturday)}</li>
          </ul>
        </div>

        <div>
          <h4>Contacto principal</h4>
          <ul class="footer-list">
            <li>${escapeHtml(SITE.branches[0].address)}</li>
            <li>${escapeHtml(SITE.branches[0].phone)}</li>
            <li>
              <a href="${SITE.branches[0].whatsappUrl}" target="_blank" rel="noopener noreferrer">
                WhatsApp: ${escapeHtml(SITE.branches[0].whatsappLabel)}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="container footer-bottom">
        <p>© 2026 ${escapeHtml(SITE.name)}. Todos los derechos reservados.</p>
        <nav class="footer-legal" aria-label="Legal">
          ${SITE.legalLinks
            .map(
              (link) =>
                `<a href="${link.href}">${escapeHtml(link.label)}</a>`
            )
            .join("")}
        </nav>
      </div>
    </footer>
  `;
}

function renderStyles() {
  return `
    <style>
      :root {
        --primary: #c70505;
        --text: #1f2937;
        --muted: #6b7280;
        --line: #e5e7eb;
        --bg: #fcf8f8;
        --card: #ffffff;
        --soft: #f5f6f7;
        --shadow: 0 12px 30px rgba(0,0,0,.08);
        --radius: 22px;
        --container: 1180px;
      }

      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        color: var(--text);
        background: var(--bg);
        line-height: 1.55;
      }

      a { color: inherit; text-decoration: none; }
      img { max-width: 100%; display: block; }

      .container {
        width: min(var(--container), calc(100% - 32px));
        margin: 0 auto;
      }

      .site-header {
        position: sticky;
        top: 0;
        z-index: 50;
        background: rgba(255,255,255,.92);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--line);
      }

      .header-inner {
        min-height: 76px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
      }

      .brand {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
      }

      .brand-mark {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: var(--primary);
        color: #fff;
        display: grid;
        place-items: center;
        font-weight: 700;
        font-size: 22px;
        box-shadow: var(--shadow);
      }

      .brand-text {
        display: flex;
        flex-direction: column;
        line-height: 1.1;
      }

      .brand-text strong { font-size: 15px; }
      .brand-text small { color: var(--muted); font-size: 12px; }

      .site-nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 10px;
      }

      .nav-link {
        padding: 10px 14px;
        border-radius: 999px;
        color: var(--muted);
        font-weight: 600;
        transition: .2s ease;
      }

      .nav-link:hover,
      .nav-link.is-active {
        background: #fdecec;
        color: var(--primary);
      }

      .hero {
        padding: 58px 0 28px;
      }

      .hero-card {
        background:
          linear-gradient(135deg, rgba(199,5,5,.10), rgba(255,255,255,.92)),
          #fff;
        border: 1px solid #f0d7d7;
        border-radius: 28px;
        box-shadow: var(--shadow);
        padding: 34px;
      }

      .eyebrow {
        margin: 0 0 10px;
        color: var(--primary);
        font-weight: 800;
        letter-spacing: .08em;
        font-size: 12px;
      }

      h1, h2, h3, h4, p { margin-top: 0; }
      h1 { font-size: clamp(32px, 5vw, 52px); line-height: 1.05; margin-bottom: 12px; }
      h2 { font-size: clamp(26px, 4vw, 36px); line-height: 1.1; margin-bottom: 12px; }
      h3 { font-size: 22px; margin-bottom: 8px; }
      .lead { font-size: 18px; color: #374151; max-width: 760px; }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 22px;
      }

      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 48px;
        padding: 0 18px;
        border-radius: 999px;
        font-weight: 700;
        border: 1px solid transparent;
      }

      .btn-primary {
        background: var(--primary);
        color: #fff;
      }

      .btn-secondary {
        background: #fff;
        border-color: var(--line);
      }

      .section {
        padding: 26px 0 14px;
      }

      .section-intro {
        color: var(--muted);
        max-width: 820px;
      }

      .grid-3 {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 18px;
      }

      .card,
      .branch-card,
      .study-card {
        background: var(--card);
        border: 1px solid var(--line);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        padding: 22px;
      }

      .card h3,
      .study-card h3,
      .branch-card h3 {
        margin-bottom: 10px;
      }

      .muted { color: var(--muted); }

      .list-clean,
      .branch-list,
      .footer-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .list-clean li,
      .branch-list li,
      .footer-list li {
        padding: 7px 0;
      }

      .branch-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 18px;
      }

      .branch-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }

      .badge {
        background: #fdecec;
        color: var(--primary);
        border-radius: 999px;
        padding: 6px 10px;
        font-size: 12px;
        font-weight: 800;
        white-space: nowrap;
      }

      .site-footer {
        margin-top: 34px;
        background: #111827;
        color: #f9fafb;
      }

      .footer-grid {
        display: grid;
        grid-template-columns: 1.2fr 1fr 1fr;
        gap: 22px;
        padding: 32px 0;
      }

      .site-footer a { color: #fff; text-decoration: underline; }
      .footer-bottom {
        border-top: 1px solid rgba(255,255,255,.12);
        padding: 16px 0 28px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 12px;
      }

      .footer-legal {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
      }

      .whatsapp-float {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 80;
        min-height: 50px;
        padding: 0 18px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #25d366;
        color: #fff;
        font-weight: 800;
        box-shadow: var(--shadow);
      }

      .breadcrumbs {
        color: var(--muted);
        margin-bottom: 14px;
        font-size: 14px;
      }

      .study-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;
      }

      @media (max-width: 980px) {
        .grid-3,
        .branch-grid,
        .footer-grid,
        .study-grid {
          grid-template-columns: 1fr;
        }

        .header-inner {
          align-items: flex-start;
          padding: 12px 0;
          flex-direction: column;
        }

        .site-nav {
          justify-content: flex-start;
        }

        .hero-card,
        .card,
        .study-card,
        .branch-card {
          padding: 20px;
        }
      }
    </style>
  `;
}

export function renderPage({ title, path = "/", content, metaDescription = SITE.description }) {
  const html = `<!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${escapeHtml(title)}</title>
      <meta name="description" content="${escapeHtml(metaDescription)}" />
      ${renderStyles()}
    </head>
    <body>
      ${renderHeader(path)}
      ${content}
      ${renderFooter()}
      ${renderWhatsappButton()}
    </body>
  </html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "public, max-age=300",
    },
  });
}

export function renderSedesBlock(options = {}) {
  return renderBranchesSection(options);
}