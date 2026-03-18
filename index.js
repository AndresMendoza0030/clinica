import { renderLayout } from "./_shared/layout.js";
import { sedes } from "./_shared/components.js";

export async function onRequest(context) {
  const content = `
    <main>
      <section class="hero">
        <div class="container">
          <h1>Gracias por confiarnos su salud.</h1>
          <p>Diagnóstico por imágenes y laboratorio clínico.</p>
        </div>
      </section>

      <section class="contenido">
        <div class="container">
          <p>Aquí va el resto del contenido de inicio.</p>
        </div>
      </section>

      ${sedes()}
    </main>
  `;

  return new Response(
    renderLayout({
      title: "Inicio",
      path: new URL(context.request.url).pathname,
      content
    }),
    {
      headers: { "content-type": "text/html; charset=UTF-8" }
    }
  );
}