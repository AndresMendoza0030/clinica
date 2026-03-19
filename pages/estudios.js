import { Header } from "../components/header.js";
import { Sedes } from "../components/sedes.js";
import { Footer } from "../components/footer.js";
import { WhatsAppFloat } from "../components/whatsapp.js";

export function renderEstudiosPage() {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Estudios</title>
  </head>
  <body>
    ${Header()}

    <main>
      <section>
        <h1>Estudios</h1>
        <a href="/index.html">Volver al inicio</a>
      </section>
    </main>

    ${Sedes()}
    ${Footer()}
    ${WhatsAppFloat()}
  </body>
</html>`;
}