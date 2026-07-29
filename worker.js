import { renderHomePage } from "./pages/home.js";
import { renderEstudiosPage } from "./pages/estudios.js";
import { renderEstudiosRMPage } from "./pages/estudios-rm.js";
import { renderEstudiosTACPage } from "./pages/estudios-tac.js";
import { renderEstudiosUSPage } from "./pages/estudios-us.js";
import { renderEstudiosRayosXPage } from "./pages/estudios-rayosx.js";
import { renderEstudiosMamografiaPage } from "./pages/estudios-mamografia.js";
import { renderEstudiosEspecialesPage } from "./pages/estudios-especiales.js";
import { renderLaboratorioPage } from "./pages/laboratorio.js";
import { renderLaboratorioQuimicaPage } from "./pages/laboratorio-quimica.js";
import { renderLaboratorioHematologiaPage } from "./pages/laboratorio-hematologia.js";
import { renderLaboratorioInmunologiaPage } from "./pages/laboratorio-inmunologia.js";
import { renderLaboratorioCoprologiaPage } from "./pages/laboratorio-coprologia.js";
import { renderLaboratorioBacteriologiaPage } from "./pages/laboratorio-bacteriologia.js";
import { renderLaboratorioUroanalisisPage } from "./pages/laboratorio-uroanalisis.js";
import { renderLaboratorioPruebasEspecialesPage } from "./pages/laboratorio-pruebas-especiales.js";
import { renderLaboratorioPerfilesPage } from "./pages/laboratorio-perfiles.js";
import { renderPortalPacientesPage } from "./pages/portal-pacientes.js";
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/" || path === "/index" || path === "/index.html") {
      return new Response(renderHomePage(), {
        headers: { "content-type": "text/html; charset=UTF-8" },
      });
    }

    if (path === "/portal-pacientes" || path === "/portal-pacientes.html") {
      return new Response(renderPortalPacientesPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" },
      });
    }

    if (path === "/estudios" || path === "/estudios.html") {
      return new Response(renderEstudiosPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" },
      });
    }
if (path === "/laboratorio-inmunologia" || path === "/laboratorio-inmunologia.html") {
  return new Response(renderLaboratorioInmunologiaPage(), {
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
if (path === "/laboratorio-hematologia" || path === "/laboratorio-hematologia.html") {
  return new Response(renderLaboratorioHematologiaPage(), {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}
if (path === "/laboratorio-quimica" || path === "/laboratorio-quimica.html") {
  return new Response(renderLaboratorioQuimicaPage(), {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}
if (path === "/laboratorio-uroanalisis" || path === "/laboratorio-uroanalisis.html") {
  return new Response(renderLaboratorioUroanalisisPage(), {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}
if (path === "/laboratorio-coprologia" || path === "/laboratorio-coprologia.html") {
  return new Response(renderLaboratorioCoprologiaPage(), {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}
if (path === "/laboratorio-bacteriologia" || path === "/laboratorio-bacteriologia.html") {
  return new Response(renderLaboratorioBacteriologiaPage(), {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}
if (path === "/laboratorio-perfiles" || path === "/laboratorio-perfiles.html") {
  return new Response(renderLaboratorioPerfilesPage(), {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}
if (path === "/laboratorio-pruebas-especiales" || path === "/laboratorio-pruebas-especiales.html") {
  return new Response(renderLaboratorioPruebasEspecialesPage(), {
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
