import { renderLayout } from "./_shared/layout.js";

export async function onRequest(context) {
  const content = `
    <main>
      <section class="contenido">
        <div class="container">
          <h1>Diagnóstico por imágenes</h1>
          <p>Aquí va el contenido de estudios.</p>
        </div>
      </section>
    </main>
  `;

  return new Response(
    renderLayout({
      title: "Estudios",
      path: new URL(context.request.url).pathname,
      content
    }),
    {
      headers: { "content-type": "text/html; charset=UTF-8" }
    }
  );
}