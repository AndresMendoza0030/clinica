import { locations } from '../components/clinic-locations.js';
// Editorial snapshot: public main cf74d3e1, reviewed against code 2026-11-14.
// Administrative information only; no clinical instructions or inferred availability.
const entry = (id, label, text, source, href) => ({ id, label, text, source, href, reviewed: '2026-11-14' });
export const catalog = [
  ...locations.map(s => entry('sede_' + s.id, s.name, `${s.name}: ${s.address} Teléfono: ${s.phone}. WhatsApp: ${s.whatsapp}.`, 'components/clinic-locations.js', s.whatsappHref)),
  ...[
    ['rm', 'Resonancia Magnética'], ['tac', 'Tomografía'], ['us', 'Ultrasonografía'],
    ['rayosx', 'Rayos X'], ['mamografia', 'Mamografía'], ['especiales', 'Estudios especiales'],
  ].map(([slug, name]) => entry('catalogo_' + slug, name, `Puede consultar el catálogo público de ${name} en este enlace. Confirme con la clínica la disponibilidad de su estudio y sede.`, `pages/estudios-${slug}.js`, `/estudios-${slug}.html`)),
  ...[
    ['quimica', 'Química sanguínea'], ['hematologia', 'Hematología'],
    ['inmunologia', 'Inmunología'], ['coprologia', 'Coprología'],
    ['bacteriologia', 'Bacteriología'], ['uroanalisis', 'Uroanálisis'],
    ['pruebas-especiales', 'Pruebas especiales'], ['perfiles', 'Perfiles de laboratorio'],
  ].map(([slug, name]) => ({...entry('laboratorio_' + slug, name,
    `Puede consultar el catálogo público de ${name} en este enlace. Confirme con la clínica su prueba y sede.`,
    `pages/laboratorio-${slug}.js`, `/laboratorio-${slug}.html`), quick: false})),
  entry('laboratorio', 'Laboratorio Clínico', 'Puede consultar las áreas del laboratorio en el catálogo público. Confirme con la clínica su prueba y sede.', 'pages/laboratorio.js', '/laboratorio.html'),
];
export const fallback = 'No tengo información verificada para responder esa consulta. Puede comunicarse con la clínica por WhatsApp.';
export const clarifications = {
  sede: '¿Sobre qué sede desea consultar: Clínica Matriz, Plaza Farid o Advanced Radiology?',
  estudio: '¿Cuál es el nombre del estudio indicado en su orden? No comparta resultados ni otros datos personales.',
};
export const contact = { label: 'WhatsApp de Clínica Matriz', href: locations[0].whatsappHref };
