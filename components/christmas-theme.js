// Load seasonal assets only on the clinic's public information pages.
const assets = '/navidad/';
const styles = [
  'temporada', 'led-trim', 'led-locations', 'led-palette', 'marca',
  'esferas-dialog', 'facade-lights',
];
const scripts = [
  'led-palette', 'led-locations', 'led-trim', 'marca',
  'esferas-dialog', 'facade-lights',
];
const seasonalHead = [
  '<script>try{const color=localStorage.getItem("mendoza-led-color");if(["calido","rojo","multicolor"].includes(color))document.documentElement.dataset.ledColor=color}catch{}</script>',
  ...styles.map(name => '<link rel="stylesheet" href="' + assets + name + '.css">'),
  ...scripts.map(name => '<script defer src="' + assets + name + '.js"></script>'),
].join('\n');

export function applyChristmasTheme(html) {
  return html
    .replace(/<html\b/i, '<html data-lighting="led" data-led-color="multicolor"')
    .replace('</head>', seasonalHead + '\n</head>');
}
