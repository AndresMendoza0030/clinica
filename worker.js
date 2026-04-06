import { renderHomePage } from "./pages/home.js";
import { renderEstudiosPage } from "./pages/estudios.js";
import { renderEstudiosRMPage } from "./pages/estudios-rm.js";
import { renderEstudiosTACPage } from "./pages/estudios-tac.js";
import { renderEstudiosUSPage } from "./pages/estudios-us.js";
import { renderEstudiosRayosXPage } from "./pages/estudios-rayosx.js";
import { renderEstudiosMamografiaPage } from "./pages/estudios-mamografia.js";
import { renderEstudiosEspecialesPage } from "./pages/estudios-especiales.js";
import { renderLaboratorioPage } from "./pages/laboratorio.js";
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/" || path === "/index" || path === "/index.html") {
      return new Response(renderHomePage(), {
        headers: { "content-type": "text/html; charset=UTF-8" },
      });
    }

    if (path === "/estudios" || path === "/estudios.html") {
      return new Response(renderEstudiosPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" },
      });
    }

    if (path === "/estudios-rm" || path === "/estudios-rm.html") {
      return new Response(renderEstudiosRMPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" },
      });
    }
if (path === "/estudios-rm" || path === "/estudios-rm.html") {
  return new Response(renderEstudiosRMPage(), {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}

if (path === "/estudios-tac" || path === "/estudios-tac.html") {
  return new Response(renderEstudiosTACPage(), {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}

if (path === "/estudios-us" || path === "/estudios-us.html") {
  return new Response(renderEstudiosUSPage(), {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}
if (path === "/laboratorio" || path === "/laboratorio.html") {
  return new Response(renderLaboratorioPage(), {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}
if (path === "/estudios-rayosx" || path === "/estudios-rayosx.html") {
  return new Response(renderEstudiosRayosXPage(), {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}

if (path === "/estudios-mamografia" || path === "/estudios-mamografia.html") {
  return new Response(renderEstudiosMamografiaPage(), {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}

if (path === "/estudios-especiales" || path === "/estudios-especiales.html") {
  return new Response(renderEstudiosEspecialesPage(), {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}
    return new Response("Not found", { status: 404 });
  },
};