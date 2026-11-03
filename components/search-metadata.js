import { locations } from './clinic-locations.js';

export const SITE_ORIGIN = 'https://clinicadrmendoza.com';
const CLINIC_NAME = 'Clínica Radiológica y Laboratorio Clínico Dr. Mendoza';

// Public catalog only. URLs match the existing navigation; no patient portal.
const catalog = {
  '/': {
    title: `${CLINIC_NAME} | San Miguel`,
    description: 'Diagnóstico por imágenes y laboratorio clínico en San Miguel. Consulte estudios, exámenes, horarios y contacto de nuestras tres sedes.',
    image: 'portada-medico-detalle-v3',
  },
  '/estudios.html': {
    title: 'Diagnóstico por imágenes en San Miguel | Clínica Dr. Mendoza',
    description: 'Consulte el catálogo de resonancia magnética, tomografía, ultrasonografía, rayos X, mamografía y estudios especiales en San Miguel.',
    image: 'resonancia',
  },
  '/estudios-rm.html': {
    title: 'Resonancia magnética en San Miguel | Clínica Dr. Mendoza',
    description: 'Catálogo de resonancia magnética convencional y especializada en San Miguel. Consulte disponibilidad, sede y preparación de su estudio.',
    image: 'resonancia',
  },
  '/estudios-tac.html': {
    title: 'Tomografía en San Miguel | Clínica Dr. Mendoza',
    description: 'Consulte los estudios de tomografía disponibles en San Miguel y comuníquese con nuestro equipo para confirmar sede y preparación.',
    image: 'tomografia',
  },
  '/estudios-us.html': {
    title: 'Ultrasonografía en San Miguel | Clínica Dr. Mendoza',
    description: 'Catálogo de ultrasonografía convencional y Doppler en San Miguel. Consulte disponibilidad, sede y preparación de su estudio.',
    image: 'ultrasonografia',
  },
  '/estudios-rayosx.html': {
    title: 'Rayos X en San Miguel | Clínica Dr. Mendoza',
    description: 'Consulte el catálogo de estudios de rayos X en San Miguel, organizado por región anatómica, y los datos de contacto de nuestras sedes.',
    image: 'rayos-x',
  },
  '/estudios-mamografia.html': {
    title: 'Mamografía en San Miguel | Clínica Dr. Mendoza',
    description: 'Información sobre los estudios de mamografía disponibles en San Miguel. Consulte con nuestro equipo la sede y la preparación correspondiente.',
    image: 'mamografia',
  },
  '/estudios-especiales.html': {
    title: 'Estudios radiológicos especiales en San Miguel | Clínica Dr. Mendoza',
    description: 'Catálogo de estudios radiológicos contrastados y especiales en San Miguel. Consulte disponibilidad, sede y preparación.',
    image: 'radiologo-v2',
  },
  '/laboratorio.html': {
    title: 'Laboratorio clínico en San Miguel | Clínica Dr. Mendoza',
    description: 'Consulte nuestro catálogo de exámenes y perfiles de laboratorio clínico en San Miguel. Confirme la sede y preparación antes de su visita.',
    image: 'laboratorio',
  },
  '/laboratorio-quimica.html': {
    title: 'Química sanguínea en San Miguel | Clínica Dr. Mendoza',
    description: 'Catálogo de exámenes de química sanguínea en San Miguel. Consulte las pruebas disponibles y confirme la preparación con nuestro equipo.',
  },
  '/laboratorio-hematologia.html': {
    title: 'Hematología en San Miguel | Clínica Dr. Mendoza',
    description: 'Consulte los exámenes de hematología disponibles en San Miguel y los datos de contacto para confirmar sede y preparación.',
  },
  '/laboratorio-inmunologia.html': {
    title: 'Inmunología en San Miguel | Clínica Dr. Mendoza',
    description: 'Catálogo de exámenes de inmunología en San Miguel. Consulte las pruebas disponibles y confirme sede y preparación antes de su visita.',
  },
  '/laboratorio-coprologia.html': {
    title: 'Coprología en San Miguel | Clínica Dr. Mendoza',
    description: 'Consulte los exámenes de coprología disponibles en San Miguel. Nuestro equipo puede orientarle sobre la sede y los requisitos de la muestra.',
  },
  '/laboratorio-bacteriologia.html': {
    title: 'Bacteriología en San Miguel | Clínica Dr. Mendoza',
    description: 'Catálogo de exámenes de bacteriología en San Miguel. Confirme con nuestro equipo la sede y los requisitos para la toma o entrega de muestras.',
  },
  '/laboratorio-uroanalisis.html': {
    title: 'Uroanálisis en San Miguel | Clínica Dr. Mendoza',
    description: 'Consulte los exámenes de uroanálisis disponibles en San Miguel y comuníquese con nuestro equipo para confirmar los requisitos de la muestra.',
  },
  '/laboratorio-pruebas-especiales.html': {
    title: 'Pruebas especiales de laboratorio en San Miguel | Clínica Dr. Mendoza',
    description: 'Catálogo de pruebas especiales de laboratorio en San Miguel. Consulte disponibilidad, sede y preparación con nuestro equipo.',
  },
  '/laboratorio-perfiles.html': {
    title: 'Perfiles de laboratorio en San Miguel | Clínica Dr. Mendoza',
    description: 'Consulte los perfiles de laboratorio disponibles en San Miguel y confirme la sede y preparación correspondiente a su solicitud médica.',
  },
};

export const publicPagePaths = Object.keys(catalog);

function canonicalPath(path) {
  const normalized = path.replace(/\/+$/, '') || '/';
  const candidate = ['/', '/index', '/index.html'].includes(normalized)
    ? '/'
    : normalized.endsWith('.html') ? normalized : `${normalized}.html`;
  return Object.hasOwn(catalog, candidate) ? candidate : null;
}

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

function clinicStructuredData() {
  const organizationId = `${SITE_ORIGIN}/#organizacion`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalOrganization',
        '@id': organizationId,
        name: CLINIC_NAME,
        url: `${SITE_ORIGIN}/`,
        logo: `${SITE_ORIGIN}/assets/visuals/logo.webp`,
        foundingDate: '2006-04-05',
        subOrganization: locations.map((location) => ({ '@id': `${SITE_ORIGIN}/#sede-${location.id}` })),
      },
      ...locations.map((location) => ({
        '@type': 'MedicalClinic',
        '@id': `${SITE_ORIGIN}/#sede-${location.id}`,
        name: `${CLINIC_NAME} — ${location.name}`,
        url: `${SITE_ORIGIN}/#sede-${location.id}`,
        parentOrganization: { '@id': organizationId },
        telephone: location.phoneHref.replace('tel:', ''),
        image: `${SITE_ORIGIN}/assets/visuals/${location.image}.webp`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: location.address.replace(/, San Miguel\.$/, ''),
          addressLocality: 'San Miguel',
          addressRegion: 'San Miguel',
          addressCountry: 'SV',
        },
        geo: { '@type': 'GeoCoordinates', latitude: Number(location.lat), longitude: Number(location.lng) },
        hasMap: location.maps,
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '06:30', closes: '16:30' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '06:30', closes: '12:00' },
        ],
      })),
    ],
  };
}

// Called after the visual layer; only the document head is changed.
export function applySearchMetadata(html, path) {
  const canonical = canonicalPath(path);
  if (!canonical) return html;
  const page = catalog[canonical];
  const url = SITE_ORIGIN + canonical;
  const image = `${SITE_ORIGIN}/assets/visuals/${page.image || 'laboratorio'}.webp`;
  const structuredData = canonical === '/'
    ? `<script type="application/ld+json">${JSON.stringify(clinicStructuredData()).replace(/</g, '\\u003c')}</script>`
    : '';
  return html.replace(/<head>([\s\S]*?)<\/head>/i, (_, head) => {
    const cleaned = head
      .replace(/<title>[\s\S]*?<\/title>/gi, '')
      .replace(/<meta\b[^>]*(?:name=["']description["']|property=["']og:[^"']+["'])[^>]*>/gi, '')
      .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, '');
    return `<head>${cleaned}
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_SV" />
    <meta property="og:site_name" content="${CLINIC_NAME}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    ${structuredData}
  </head>`;
  });
}

export function renderSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicPagePaths.map((path) => `  <url><loc>${SITE_ORIGIN}${path}</loc></url>`).join('\n')}
</urlset>\n`;
}

// Cloudflare prepends its managed bot preferences to this origin response.
export const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
