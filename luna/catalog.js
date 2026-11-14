import { locations } from '../components/clinic-locations.js';
// Editorial snapshot: public main c87dd27, reviewed against code and public home 2026-11-14.
// Administrative information only; no clinical instructions or inferred availability.
const entry = (id, label, text, source, href) => ({ id, label, text, source, href, reviewed: '2026-11-14' });
export const catalog = [
  ...locations.map(s => entry('sede_' + s.id, s.name, `Con mucho gusto. Le comparto los datos de ${s.name}:\n\nDirección: ${s.address}\nTeléfono: ${s.phone}.\nWhatsApp: ${s.whatsapp}.\n\nPuede escribir a esta sede desde el enlace de abajo si necesita que nuestro equipo le ayude con su visita.`, 'components/clinic-locations.js', s.whatsappHref)),
  ...[
    ['rm', 'Resonancia Magnética'], ['tac', 'Tomografía'], ['us', 'Ultrasonografía'],
    ['rayosx', 'Rayos X'], ['mamografia', 'Mamografía'], ['especiales', 'Estudios especiales'],
  ].map(([slug, name]) => entry('catalogo_' + slug, name, `Con gusto le ayudo. En el enlace de abajo puede consultar el catálogo público de ${name}.\n\nAntes de su visita, le recomiendo confirmar con nuestro equipo la disponibilidad del estudio y la sede que más le convenga. Puede hacerlo por WhatsApp.`, `pages/estudios-${slug}.js`, `/estudios-${slug}.html`)),
  ...[
    ['quimica', 'Química sanguínea'], ['hematologia', 'Hematología'],
    ['inmunologia', 'Inmunología'], ['coprologia', 'Coprología'],
    ['bacteriologia', 'Bacteriología'], ['uroanalisis', 'Uroanálisis'],
    ['pruebas-especiales', 'Pruebas especiales'], ['perfiles', 'Perfiles de laboratorio'],
  ].map(([slug, name]) => ({...entry('laboratorio_' + slug, name,
    `Con gusto. Le comparto el catálogo público de ${name} para que pueda revisarlo con tranquilidad.\n\nSi busca una prueba en particular, nuestro equipo puede ayudarle a confirmar su disponibilidad y la sede donde puede realizarla. Encontrará el contacto de WhatsApp debajo.`,
    `pages/laboratorio-${slug}.js`, `/laboratorio-${slug}.html`), quick: false})),
  entry('laboratorio', 'Laboratorio Clínico', 'Con mucho gusto. Puede conocer las áreas de nuestro Laboratorio Clínico en el catálogo público que le comparto abajo.\n\nSi ya tiene el nombre de su prueba, nuestro equipo puede ayudarle a confirmar su disponibilidad y la sede que más le convenga por WhatsApp.', 'pages/laboratorio.js', '/laboratorio.html'),
  {...entry('horario_general', 'Horario general de atención', 'Con mucho gusto. Nuestro horario general de atención es:\n\nLunes a viernes: de 6:30 a. m. a 4:30 p. m.\nSábados: de 6:30 a. m. a 12:00 del mediodía.\n\nSi desea confirmar el horario de una sede o de un día festivo, nuestro equipo le atenderá con gusto por WhatsApp.', 'components/footer.js', '/#sedes'), quick:false},
  {...entry('saludo', 'Saludo', 'Hola, con mucho gusto le ayudo. Soy Luna, su asistente de información de la Clínica Dr. Mendoza.\n\nPuede preguntarme por nuestros horarios generales, sedes, contactos o catálogos de estudios y laboratorio. ¿En qué puedo orientarle?', 'luna/catalog.js', '/#sedes'), quick:false},
  {...entry('gracias', 'Agradecimiento', 'Con mucho gusto. Me alegra haberle ayudado. Si le surge otra duda sobre la clínica, aquí estaré para orientarle.', 'luna/catalog.js', '/#sedes'), quick:false},
];
export const fallback = 'Con gusto le orientaré. Por el momento no cuento con información confirmada sobre esa consulta. Nuestro equipo puede ayudarle por WhatsApp; le comparto el enlace para que pueda consultar directamente.';
export const clarifications = {
  sede: 'Con gusto le ayudo. ¿Sobre qué sede desea consultar: Clínica Matriz, Plaza Farid o Advanced Radiology? Así podré compartirle el contacto correspondiente.',
  estudio: 'Con gusto le ayudo a encontrar la información. ¿Cuál es el nombre del estudio indicado en su orden? Basta con escribir el nombre; por favor, no comparta resultados ni otros datos personales.',
};
export const contact = { label: 'WhatsApp de Clínica Matriz', href: locations[0].whatsappHref };
