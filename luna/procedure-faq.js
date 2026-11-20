// Plain-language patient guidance. Local catalog pages take precedence for clinic preparation.
const editorialSource = 'luna/procedure-faq.js';

function faq(id, label, text, href, source = editorialSource) {
  return { id: 'procedimiento_' + id, label, text, source, href, reviewed: '2026-11-19', quick: false };
}

export const procedureFaqs = [
  // https://www.radiologyinfo.org/es/info/bodyct and https://www.radiologyinfo.org/es/info/bodymr
  faq('tac_rm', 'Diferencia entre tomografía y resonancia',
    'La tomografía (TAC o TC) usa rayos X para obtener imágenes por cortes. La resonancia magnética (RM o RMN) usa un imán y ondas de radio. Los dos estudios muestran detalles distintos. Si va a programar una cita, indique cuál aparece en su boleta.',
    '/estudios-tac.html'),
  faq('tac', 'Tomografía (TAC) • cómo se realiza y cómo prepararse',
    'Durante la tomografía, usted se recuesta en una camilla que pasa por el centro de un aro. Le pedirán que permanezca quieto y, a veces, que contenga la respiración unos segundos.\n\nPara prepararse, revise si su boleta dice «con contraste». En ese caso, la indicación general de la clínica es ayuno de 6 horas y examen de creatinina. Si la boleta no lo aclara, recepción puede verificar qué necesita para su cita.',
    '/estudios-tac.html', 'pages/estudios-tac.js'),
  // https://www.radiologyinfo.org/es/info/safety-mr
  faq('rm', 'Resonancia magnética • cómo se realiza, ruidos y claustrofobia',
    'Durante la resonancia, usted permanece acostado mientras el equipo toma imágenes. Oirá golpes o zumbidos fuertes. Si los espacios cerrados le causan ansiedad, avísenos al programar la cita para que el equipo pueda orientarle.\n\nRevise si su boleta dice «con contraste». En ese caso, la indicación general de la clínica es ayuno de 6 horas y examen de creatinina. Si tiene dudas sobre su preparación, consulte con recepción.',
    '/estudios-rm.html', 'pages/estudios-rm.js'),
  // https://www.radiologyinfo.org/es/info/how-to-prepare-your-ct-exam
  faq('tac_contraste', 'TAC con contraste • ayuno, creatinina y preparación',
    'El contraste ayuda a distinguir ciertas estructuras en las imágenes. Para una TAC con contraste, la clínica indica como preparación general 6 horas de ayuno y un examen de creatinina. Antes de acudir, confirme con recepción qué antigüedad aceptan para el resultado. Si tiene enfermedad renal o tuvo una reacción previa al contraste, comuníquelo al equipo al programar su estudio.',
    '/estudios-tac.html', 'pages/estudios-tac.js'),
  // https://www.radiologyinfo.org/es/info/how-to-prepare-for-mri-exam
  faq('rm_contraste', 'RM con contraste • ayuno, creatinina y preparación',
    'El contraste permite ver con más detalle ciertas estructuras durante la resonancia. Si su RM es con contraste, la clínica indica como preparación general 6 horas de ayuno y un examen de creatinina. Recepción puede confirmarle qué antigüedad aceptan para ese resultado. Si tiene enfermedad renal o tuvo una reacción previa al contraste, avise al equipo al programar su estudio.',
    '/estudios-rm.html', 'pages/estudios-rm.js'),
  faq('rm_implantes', 'Resonancia • marcapasos, implantes y fragmentos metálicos',
    'Avise a radiología antes de su cita si tiene marcapasos, implante o algún fragmento metálico en el cuerpo. Si conserva la tarjeta o el documento del implante, téngalo a mano. El personal necesita identificar el modelo y revisar las condiciones de seguridad antes de confirmar si puede realizarse la resonancia.',
    '/estudios-rm.html'),
  // https://www.radiologyinfo.org/es/info/abdominus and https://www.radiologyinfo.org/es/info/pelvus
  faq('us', 'Ultrasonido o ecografía • procedimiento y preparación según la zona',
    'El ultrasonido forma imágenes con ondas de sonido. En los estudios externos se aplica gel sobre la piel y se desliza una sonda sobre la zona. La preparación depende del examen. Por ejemplo, para algunos ultrasonidos de abdomen pueden pedirle ayuno y para el vesical se requiere vejiga llena. Confirme con recepción la indicación para el estudio que figura en su boleta.',
    '/estudios-us.html', 'pages/estudios-us.js'),
  faq('us_vejiga', 'Ultrasonido vesical o ginecológico por abdomen • vejiga llena',
    'Para el ultrasonido vesical (de vejiga) y el ginecológico por vía abdominal, la clínica indica presentarse con la vejiga llena. Recepción puede indicarle cuánta agua tomar y con qué anticipación. Si su boleta dice «transvaginal» o incluye varios estudios, confirme la preparación específica antes de beber agua.',
    '/estudios-us.html', 'pages/estudios-us.js'),
  faq('us_elastografia', 'Elastografía hepática por ultrasonido • preparación',
    'Para la elastografía hepática por ultrasonido, la clínica indica 6 horas de ayuno. Si la orden incluye además un Doppler o ultrasonido abdominal, confirme con recepción las instrucciones para su cita.',
    '/estudios-us.html', 'pages/estudios-us.js'),
  // https://www.radiologyinfo.org/es/info/how-to-prepare-your-x-ray-exam
  faq('rayosx', 'Rayos X • qué esperar de una radiografía simple',
    'Para una radiografía simple, el personal le ayudará a colocar la parte del cuerpo que se va a estudiar y le pedirá que permanezca quieto unos segundos. La mayoría no requiere preparación especial. Es posible que deba quitarse joyas u otros objetos metálicos de la zona. Si existe la posibilidad de embarazo, avise al personal antes del examen.',
    '/estudios-rayosx.html'),
  // https://www.radiologyinfo.org/es/info/mammo
  faq('mamografia', 'Mamografía • preparación, desodorante y compresión',
    'En una mamografía se comprime cada mama durante unos segundos para obtener imágenes claras. Puede sentir presión o molestia. Si le duele, dígaselo al personal.\n\nEse día evite aplicar desodorante, talco o cremas en las axilas y mamas, porque pueden aparecer en la imagen. Si tiene mamografías anteriores, llévelas para que puedan compararlas.',
    '/estudios-mamografia.html'),
  // https://medlineplus.gov/spanish/pruebas-de-laboratorio/ayunar-para-una-prueba-de-sangre/
  faq('laboratorio_ayuno', 'Análisis de sangre • ayuno, agua y medicamentos',
    'Solo algunos análisis de sangre requieren ayuno. Confirme con el laboratorio el nombre de su prueba y cuántas horas necesita. Cuando le indican ayuno para un análisis de sangre, por lo general puede tomar agua sola. Si ya comió o tomó café, avise antes de la extracción. Si toma medicamentos, consulte con su profesional de salud antes de hacer cambios.',
    '/laboratorio.html'),
  // https://medlineplus.gov/spanish/ency/article/007487.htm
  faq('laboratorio_orina', 'Muestra de orina • recipiente y recolección',
    'Primero confirme qué tipo de muestra solicita su boleta. Si le indicaron una muestra limpia de chorro medio, lávese las manos, haga la limpieza indicada, deje salir el primer chorro al inodoro y recoja la parte media en el recipiente indicado sin tocar el interior. Cierre el frasco. Pregunte al laboratorio cuándo entregarlo. La recolección de 24 horas tiene instrucciones diferentes.',
    '/laboratorio.html'),
];
