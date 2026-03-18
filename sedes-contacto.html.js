import { renderLayout } from "./_shared/layout.js";
import { sedes } from "./_shared/components.js";

export async function onRequest(context) {
  const content = `
    <main>
      ${sedes()}
    </main>
  `;

  return new Response(
    renderLayout({
      title: "Sedes y contacto",
      path: new URL(context.request.url).pathname,
      content
    }),
    {
      headers: { "content-type": "text/html; charset=UTF-8" }
    }
  );
}