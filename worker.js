import { renderHomePage } from "./pages/home.js";
import { renderEstudiosPage } from "./pages/estudios.js";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/index" || url.pathname === "/index.html") {
      return new Response(renderHomePage(), {
        headers: {
          "content-type": "text/html; charset=UTF-8",
        },
      });
    }

    if (url.pathname === "/estudios" || url.pathname === "/estudios.html") {
      return new Response(renderEstudiosPage(), {
        headers: {
          "content-type": "text/html; charset=UTF-8",
        },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};