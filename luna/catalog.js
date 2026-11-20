import { locations } from '../components/clinic-locations.js';
import { procedureFaqs } from './procedure-faq.js';

// Branch scope confirmed by the clinic on 2026-11-19. Contact details come from the public directory.
// Matriz services: public/assets/visuals/sede-matriz.webp (clinic signage).
// Matriz laboratory: CSSP, Laboratorio Clínico Dr. Mendoza, 9.ª Avenida Sur #411.
// https://cssp.gob.sv/wp-content/uploads/2021/03/Todos-los-autorizados-para-pruebas-de-antigenos-para-covid-19-07-05-2021.pdf
const advancedScope = 'En Advanced Radiology solo realizamos tomografía computarizada (TAC) y resonancia magnética (RM). Esta sede no cuenta con laboratorio ni toma de muestras.';
const matrizScope = 'Clínica Matriz, en Barrio La Merced, ofrece laboratorio clínico y estudios de imagen como rayos X, ultrasonido y mamografía.';
const branchOverview = {
  matriz: matrizScope,
  farid: 'Plaza Farid está en la avenida Roosevelt Norte, en Barrio San Felipe. Si desea atenderse allí, su recepción puede confirmarle si realizan el estudio que aparece en su boleta.',
  advanced: advancedScope,
};
const labContacts = locations.filter(s => s.id === 'matriz' || s.id === 'farid')
  .map(s => ({ label: 'WhatsApp de ' + s.name, href: s.whatsappHref }));
const entry = (id, label, text, source, href) => ({ id, label, text, source, href, reviewed: '2026-11-14' });
export const catalog = [
  ...locations.map(s => ({
    ...entry('sede_' + s.id, s.name, `${branchOverview[s.id]}\n\n${s.address}\nTeléfono ${s.phone} · WhatsApp ${s.whatsapp}.`, 'components/clinic-locations.js', s.whatsappHref),
    reviewed: '2026-11-19',
  })),
  {
    ...entry('comparar_sedes', 'Diferencias entre las sedes', `${advancedScope}\n\n${matrizScope}\n\nPlaza Farid está en la avenida Roosevelt Norte #412, cerca de Advanced (#411). Si desea un estudio en Plaza Farid, su recepción puede confirmarle la disponibilidad antes de que se traslade.`, 'luna/catalog.js', '/#sedes'),
    reviewed: '2026-11-19', quick: false, links: [{ label: 'Ver direcciones y contactos', href: '/#sedes' }],
  },
  {
    ...entry('donde_laboratorio', 'Sedes para exámenes de laboratorio', `${advancedScope}\n\nPara laboratorio puede acudir a Clínica Matriz, en ${locations.find(s => s.id === 'matriz').address} Si prefiere Plaza Farid, puede escribir a su recepción para confirmar si reciben su prueba.`, 'luna/catalog.js', '/laboratorio.html'),
    reviewed: '2026-11-19', quick: false, links: labContacts,
  },
  ...procedureFaqs,
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
  entry('laboratorio', 'Laboratorio Clínico', 'Puede consultar los exámenes en nuestro catálogo y confirmar su prueba con el laboratorio de Clínica Matriz. Advanced Radiology solo realiza TAC y RM y no cuenta con laboratorio.', 'pages/laboratorio.js', '/laboratorio.html'),
  {...entry('horario_general', 'Horario general de atención', 'Con mucho gusto. Nuestro horario general de atención es:\n\nLunes a viernes: de 6:30 a. m. a 4:30 p. m.\nSábados: de 6:30 a. m. a 12:00 del mediodía.\n\nSi desea confirmar el horario de una sede o de un día festivo, nuestro equipo le atenderá con gusto por WhatsApp.', 'components/footer.js', '/#sedes'), quick:false},
  {...entry('saludo', 'Saludo', 'Hola, con mucho gusto le ayudo. Soy Luna, su asistente de información de la Clínica Dr. Mendoza.\n\nPuede preguntarme por nuestras sedes, horarios, estudios de imagen, laboratorio y la preparación general de su examen. ¿En qué puedo orientarle?', 'luna/catalog.js', '/#sedes'), quick:false},
  {...entry('gracias', 'Agradecimiento', 'Con mucho gusto. Me alegra haberle ayudado. Si le surge otra duda sobre la clínica, aquí estaré para orientarle.', 'luna/catalog.js', '/#sedes'), quick:false},
];
export const fallback = 'Con gusto le orientaré. Por el momento no cuento con información confirmada sobre esa consulta. Nuestro equipo puede ayudarle por WhatsApp; le comparto el enlace para que pueda consultar directamente.';
export const clarifications = {
  sede: 'Con gusto le ayudo. ¿Sobre qué sede desea consultar: Clínica Matriz, Plaza Farid o Advanced Radiology? Así podré compartirle el contacto correspondiente.',
  preparacion: '¿Qué estudio aparece en su boleta? Si es una tomografía o resonancia, indique si dice «con contraste». Basta con el nombre del estudio.',
  estudio: 'Con gusto le ayudo a encontrar la información. ¿Cuál es el nombre del estudio indicado en su orden? Basta con escribir el nombre; por favor, no comparta resultados ni otros datos personales.',
};
export const contact = { label: 'WhatsApp de Clínica Matriz', href: locations[0].whatsappHref };
