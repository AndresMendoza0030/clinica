import { Header } from "../components/header.js";
import { Sedes } from "../components/sedes.js";
import { Footer } from "../components/footer.js";
import { WhatsAppFloat } from "../components/whatsapp.js";

export function renderHomePage() {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Inicio</title>
  </head>
  <body>
    ${Header()}
    
    <main>
      <section>
        <h1>Inicio</h1>
        <a href="/estudios.html">Ir a estudios</a>
      </section>
    </main>

    ${Sedes()}
    ${Footer()}
    ${WhatsAppFloat()}
  </body>
</html>`;
}