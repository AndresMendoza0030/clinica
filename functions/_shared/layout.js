import { header, footer, whatsappFloat } from "./components.js";

export function renderLayout({ title, path, content }) {
  return `<!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <link rel="stylesheet" href="/css/app.css" />
      <script src="/js/app.js" defer></script>
    </head>
    <body>
      ${header(path)}
      ${content}
      ${footer()}
      ${whatsappFloat()}
    </body>
  </html>`;
}