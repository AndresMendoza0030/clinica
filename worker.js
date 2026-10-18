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
// Rutas centralizadas: conservan las direcciones .html y las rutas limpias.
const pageRoutes = {
  "/": renderHomePage,
  "/index": renderHomePage,
  "/index.html": renderHomePage,
  "/portal-pacientes": renderPortalPacientesPage,
  "/portal-pacientes.html": renderPortalPacientesPage,
  "/estudios": renderEstudiosPage,
  "/estudios.html": renderEstudiosPage,
  "/estudios-rm": renderEstudiosRMPage,
  "/estudios-rm.html": renderEstudiosRMPage,
  "/estudios-tac": renderEstudiosTACPage,
  "/estudios-tac.html": renderEstudiosTACPage,
  "/estudios-us": renderEstudiosUSPage,
  "/estudios-us.html": renderEstudiosUSPage,
  "/estudios-rayosx": renderEstudiosRayosXPage,
  "/estudios-rayosx.html": renderEstudiosRayosXPage,
  "/estudios-mamografia": renderEstudiosMamografiaPage,
  "/estudios-mamografia.html": renderEstudiosMamografiaPage,
  "/estudios-especiales": renderEstudiosEspecialesPage,
  "/estudios-especiales.html": renderEstudiosEspecialesPage,
  "/laboratorio": renderLaboratorioPage,
  "/laboratorio.html": renderLaboratorioPage,
  "/laboratorio-quimica": renderLaboratorioQuimicaPage,
  "/laboratorio-quimica.html": renderLaboratorioQuimicaPage,
  "/laboratorio-hematologia": renderLaboratorioHematologiaPage,
  "/laboratorio-hematologia.html": renderLaboratorioHematologiaPage,
  "/laboratorio-inmunologia": renderLaboratorioInmunologiaPage,
  "/laboratorio-inmunologia.html": renderLaboratorioInmunologiaPage,
  "/laboratorio-coprologia": renderLaboratorioCoprologiaPage,
  "/laboratorio-coprologia.html": renderLaboratorioCoprologiaPage,
  "/laboratorio-bacteriologia": renderLaboratorioBacteriologiaPage,
  "/laboratorio-bacteriologia.html": renderLaboratorioBacteriologiaPage,
  "/laboratorio-uroanalisis": renderLaboratorioUroanalisisPage,
  "/laboratorio-uroanalisis.html": renderLaboratorioUroanalisisPage,
  "/laboratorio-pruebas-especiales": renderLaboratorioPruebasEspecialesPage,
  "/laboratorio-pruebas-especiales.html": renderLaboratorioPruebasEspecialesPage,
  "/laboratorio-perfiles": renderLaboratorioPerfilesPage,
  "/laboratorio-perfiles.html": renderLaboratorioPerfilesPage,
};

const baseHeaders = {
  "content-type": "text/html; charset=UTF-8",
  "x-content-type-options": "nosniff",
};

export default {
  async fetch(request) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Método no permitido", {
        status: 405,
        headers: { Allow: "GET, HEAD", "x-content-type-options": "nosniff" },
      });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    const render = pageRoutes[path];

    if (render) {
      const isPrivatePortal = path === "/portal-pacientes" || path === "/portal-pacientes.html";
      return new Response(request.method === "HEAD" ? null : render(), {
        headers: isPrivatePortal
          ? { ...baseHeaders, "x-robots-tag": "noindex, nofollow, noarchive" }
          : baseHeaders,
      });
    }

    if (path === "/favicon.ico") {
      return Response.redirect(
        "https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/faviconDr.png",
        302
      );
    }

    const missing = '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Página no encontrada | Clínica Dr. Mendoza</title></head><body style="font-family:Arial,sans-serif;background:#fcf8f8;color:#301d1d;display:grid;place-items:center;min-height:90vh;text-align:center"><main><h1 style="color:#a52b28">Página no encontrada</h1><p>La dirección que buscaba no está disponible.</p><p><a href="/" style="color:#a52b28;font-weight:bold">Regresar al inicio</a></p></main></body></html>';
    return new Response(request.method === "HEAD" ? null : missing, {
      status: 404,
      headers: baseHeaders,
    });
  },
};
