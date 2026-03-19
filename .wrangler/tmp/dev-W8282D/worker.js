var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// components/header.js
function Header() {
  return `
    <header
      class="sticky top-0 z-50 w-full border-b border-[#f4e6e6] bg-[#fcf8f8]/95 backdrop-blur-sm dark:bg-[#1c0d0d]/95 dark:border-[#331f1f]"
    >
      <div
        class="flex h-16 items-center justify-between px-4 md:px-10 max-w-[1280px] mx-auto"
      >
        <a class="flex items-center" href="#inicio" aria-label="Ir al inicio">
          <img
            src="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/LogoDrMendoza3.png"
            alt="Logo Cl\xEDnica Dr. Mendoza"
            class="h-12 md:h-14 w-auto object-contain"
          />
        </a>

        <nav class="hidden md:flex flex-1 items-center justify-end gap-8">
          <a
            class="text-sm font-medium hover:text-primary transition-colors text-[#1c0d0d] dark:text-[#f4e6e6]"
            href="#inicio"
          >
            Inicio
          </a>
          <a
            class="text-sm font-medium hover:text-primary transition-colors text-[#1c0d0d] dark:text-[#f4e6e6]"
            href="#institucional"
          >
            Historia
          </a>
          <a
            class="text-sm font-medium hover:text-primary transition-colors text-[#1c0d0d] dark:text-[#f4e6e6]"
            href="#imagenes"
          >
            Diagn\xF3stico por im\xE1genes
          </a>
          <a
            class="text-sm font-medium hover:text-primary transition-colors text-[#1c0d0d] dark:text-[#f4e6e6]"
            href="#laboratorio"
          >
            Laboratorio cl\xEDnico
          </a>
          <a
            class="text-sm font-medium hover:text-primary transition-colors text-[#1c0d0d] dark:text-[#f4e6e6]"
            href="#sedes"
          >
            Sedes y contacto
          </a>
        </nav>

        <button
          id="menuToggle"
          class="md:hidden p-2 text-[#1c0d0d] dark:text-white"
          aria-label="Abrir men\xFA"
          type="button"
        >
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>

      <div
        id="mobileMenu"
        class="hidden md:hidden border-t border-[#f4e6e6] dark:border-[#331f1f] bg-[#fcf8f8] dark:bg-[#1c0d0d]"
      >
        <nav class="max-w-[1280px] mx-auto px-4 py-4 flex flex-col gap-3">
          <a class="text-sm font-medium hover:text-primary transition-colors" href="#inicio">Inicio</a>
          <a class="text-sm font-medium hover:text-primary transition-colors" href="#institucional">Historia</a>
          <a class="text-sm font-medium hover:text-primary transition-colors" href="#imagenes">Diagn\xF3stico por im\xE1genes</a>
          <a class="text-sm font-medium hover:text-primary transition-colors" href="#laboratorio">Laboratorio cl\xEDnico</a>
          <a class="text-sm font-medium hover:text-primary transition-colors" href="#sedes">Sedes y contacto</a>
        </nav>
      </div>
    </header>
  `;
}
__name(Header, "Header");

// components/sedes.js
function Sedes() {
  return `
    <section id="sedes" class="py-16 px-4 md:px-10 bg-white dark:bg-[#1a0a0a]">
      <div class="max-w-[1280px] mx-auto">
        <div class="flex flex-col gap-3 mb-10">
          <h2 class="text-2xl md:text-3xl font-black text-[#1c0d0d] dark:text-white">
            Sedes y contacto
          </h2>
          <p class="text-sm md:text-base text-[#634f4f] dark:text-[#d3c1c1] max-w-3xl">
            Lunes a viernes 6:00 AM \u2013 4:30 PM. S\xE1bado 6:00 AM \u2013 12:00 PM.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div class="grid grid-cols-1 gap-6">

            <div class="rounded-2xl border border-[#e9cece] dark:border-[#331f1f] bg-[#fcf8f8] dark:bg-[#2a1212] p-6">
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-lg font-black text-[#1c0d0d] dark:text-white">Cl\xEDnica Matriz</h3>
                <span class="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                  <span class="material-symbols-outlined text-base">verified</span> Principal
                </span>
              </div>

              <div class="mt-4 space-y-3 text-sm text-[#634f4f] dark:text-[#d3c1c1]">
                <div class="flex items-start gap-3">
                  <span class="material-symbols-outlined text-primary mt-0.5">location_on</span>
                  <span>9\xB0 Av. Sur #411, Barrio La Merced, San Miguel</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary">call</span>
                  <a class="hover:underline" href="tel:+50326612345">2661-2345</a>
                </div>
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-green-500">chat</span>
                  <a class="hover:underline" href="https://wa.me/50378205613" target="_blank" rel="noopener">
                    WhatsApp: 7820-5613
                  </a>
                </div>
              </div>

              <div class="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  data-lat="13.477069"
                  data-lng="-88.182489"
                  class="map-btn inline-flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white hover:opacity-95 text-sm font-bold transition-opacity"
                >
                  Ver en el mapa
                  <span class="material-symbols-outlined text-lg ml-2">map</span>
                </button>

                <a
                  class="inline-flex items-center justify-center rounded-lg h-10 px-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold transition-colors"
                  href="https://maps.app.goo.gl/cXRW57bte2G2VioK6"
                  target="_blank"
                  rel="noopener"
                >
                  Ver en Google Maps
                  <span class="material-symbols-outlined text-lg ml-2">open_in_new</span>
                </a>
              </div>
            </div>

            <div class="rounded-2xl border border-[#e9cece] dark:border-[#331f1f] bg-[#fcf8f8] dark:bg-[#2a1212] p-6">
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-lg font-black text-[#1c0d0d] dark:text-white">Plaza Farid</h3>
              </div>

              <div class="mt-4 space-y-3 text-sm text-[#634f4f] dark:text-[#d3c1c1]">
                <div class="flex items-start gap-3">
                  <span class="material-symbols-outlined text-primary mt-0.5">location_on</span>
                  <span>Av. Roosevelt Norte #412, Barrio San Felipe, San Miguel</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary">call</span>
                  <a class="hover:underline" href="tel:+50326697475">2669-7475</a>
                </div>
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-green-500">chat</span>
                  <a class="hover:underline" href="https://wa.me/50378195960" target="_blank" rel="noopener">
                    WhatsApp: 7819-5960
                  </a>
                </div>
              </div>

              <div class="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  data-lat="13.4847581"
                  data-lng="-88.1853542"
                  class="map-btn inline-flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white hover:opacity-95 text-sm font-bold transition-opacity"
                >
                  Ver en el mapa
                  <span class="material-symbols-outlined text-lg ml-2">map</span>
                </button>

                <a
                  class="inline-flex items-center justify-center rounded-lg h-10 px-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold transition-colors"
                  href="https://maps.app.goo.gl/1KysDJYFLpXdvZMi6"
                  target="_blank"
                  rel="noopener"
                >
                  Ver en Google Maps
                  <span class="material-symbols-outlined text-lg ml-2">open_in_new</span>
                </a>
              </div>
            </div>

            <div class="rounded-2xl border border-[#e9cece] dark:border-[#331f1f] bg-[#fcf8f8] dark:bg-[#2a1212] p-6">
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-lg font-black text-[#1c0d0d] dark:text-white">Advanced Radiology</h3>
              </div>

              <div class="mt-4 space-y-3 text-sm text-[#634f4f] dark:text-[#d3c1c1]">
                <div class="flex items-start gap-3">
                  <span class="material-symbols-outlined text-primary mt-0.5">location_on</span>
                  <span>Av. Roosevelt Norte #411, San Miguel</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary">call</span>
                  <a class="hover:underline" href="tel:+50326697988">2669-7988</a>
                </div>
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-green-500">chat</span>
                  <a class="hover:underline" href="https://wa.me/50378448608" target="_blank" rel="noopener">
                    WhatsApp: 7844-8608
                  </a>
                </div>
              </div>

              <div class="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  data-lat="13.4846653"
                  data-lng="-88.1857434"
                  class="map-btn inline-flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white hover:opacity-95 text-sm font-bold transition-opacity"
                >
                  Ver en el mapa
                  <span class="material-symbols-outlined text-lg ml-2">map</span>
                </button>

                <a
                  class="inline-flex items-center justify-center rounded-lg h-10 px-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold transition-colors"
                  href="https://maps.app.goo.gl/RGyf8VcgsaMdJWHx5"
                  target="_blank"
                  rel="noopener"
                >
                  Ver en Google Maps
                  <span class="material-symbols-outlined text-lg ml-2">open_in_new</span>
                </a>
              </div>
            </div>
          </div>

          <div class="rounded-2xl overflow-hidden border border-[#e9cece] dark:border-[#331f1f] bg-white dark:bg-[#2a1212] shadow-sm">
            <div class="p-4 border-b border-[#e9cece] dark:border-[#331f1f] flex items-center justify-between gap-3">
              <h3 class="font-black text-[#1c0d0d] dark:text-white">Mapa</h3>
              <div class="hidden sm:flex gap-2">
                <button
                  type="button"
                  data-lat="13.477069"
                  data-lng="-88.182489"
                  class="map-btn text-xs font-bold px-3 h-9 rounded-lg border border-[#e9cece] dark:border-[#331f1f] bg-white dark:bg-[#2a1212] hover:border-primary/40 hover:text-primary transition-colors"
                >
                  Matriz
                </button>
                <button
                  type="button"
                  data-lat="13.4847581"
                  data-lng="-88.1853542"
                  class="map-btn text-xs font-bold px-3 h-9 rounded-lg border border-[#e9cece] dark:border-[#331f1f] bg-white dark:bg-[#2a1212] hover:border-primary/40 hover:text-primary transition-colors"
                >
                  Plaza Farid
                </button>
                <button
                  type="button"
                  data-lat="13.4846653"
                  data-lng="-88.1857434"
                  class="map-btn text-xs font-bold px-3 h-9 rounded-lg border border-[#e9cece] dark:border-[#331f1f] bg-white dark:bg-[#2a1212] hover:border-primary/40 hover:text-primary transition-colors"
                >
                  Advanced
                </button>
              </div>
            </div>

            <iframe
              id="mapFrame"
              title="Mapa - Sedes"
              class="w-full h-[520px]"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=13.477069,-88.182489&z=17&output=embed"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  `;
}
__name(Sedes, "Sedes");

// components/footer.js
function Footer() {
  return `
    <footer class="bg-[#1c0d0d] text-white pt-16 pb-8">
      <div class="max-w-[1280px] mx-auto px-4 md:px-10">
        <div class="flex flex-col md:flex-row justify-between mb-12 border-b border-gray-800 pb-10 gap-8">
          <div class="max-w-xs">
            <div class="flex items-center gap-2 mb-4">
              <div class="size-6 text-primary">
                <span class="material-symbols-outlined text-2xl">local_hospital</span>
              </div>
              <h2 class="text-lg font-bold tracking-tight text-white">Cl\xEDnica Dr. Mendoza</h2>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed">
              Cl\xEDnica Radiol\xF3gica y Laboratorio Cl\xEDnico Dr. Mendoza \u2014 Gracias por confiarnos su salud.
            </p>
            <p class="text-gray-500 text-xs mt-3">Fundada el 5 de abril de 2006</p>
          </div>

          <div>
            <h3 class="font-bold text-white mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">schedule</span>
              Horarios de atenci\xF3n
            </h3>
            <ul class="text-gray-300 text-sm space-y-2">
              <li class="flex justify-between w-72 border-b border-gray-800 pb-1">
                <span>Lunes a Viernes:</span>
                <span class="text-white font-medium">6:00 AM \u2013 4:30 PM</span>
              </li>
              <li class="flex justify-between w-72">
                <span>S\xE1bado:</span>
                <span class="text-white font-medium">6:00 AM \u2013 12:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 class="text-primary font-black text-lg mb-4">Cl\xEDnica Matriz</h4>
            <ul class="space-y-3 text-sm text-gray-300">
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-gray-500 text-lg mt-0.5">location_on</span>
                <span>9\xB0 Av. Sur #411, Barrio La Merced, San Miguel</span>
              </li>
              <li class="flex items-center gap-3">
                <span class="material-symbols-outlined text-gray-500 text-lg">call</span>
                <a class="hover:text-white transition-colors" href="tel:+50326612345">2661-2345</a>
              </li>
              <li class="flex items-center gap-3">
                <span class="material-symbols-outlined text-green-500 text-lg">chat</span>
                <a class="hover:text-white transition-colors" href="https://wa.me/50378205613" target="_blank" rel="noopener">
                  WhatsApp: 7820-5613
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-primary font-black text-lg mb-4">Plaza Farid</h4>
            <ul class="space-y-3 text-sm text-gray-300">
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-gray-500 text-lg mt-0.5">location_on</span>
                <span>Av. Roosevelt Norte #412, Barrio San Felipe, San Miguel</span>
              </li>
              <li class="flex items-center gap-3">
                <span class="material-symbols-outlined text-gray-500 text-lg">call</span>
                <a class="hover:text-white transition-colors" href="tel:+50326697475">2669-7475</a>
              </li>
              <li class="flex items-center gap-3">
                <span class="material-symbols-outlined text-green-500 text-lg">chat</span>
                <a class="hover:text-white transition-colors" href="https://wa.me/50378195960" target="_blank" rel="noopener">
                  WhatsApp: 7819-5960
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-primary font-black text-lg mb-4">Advanced Radiology</h4>
            <ul class="space-y-3 text-sm text-gray-300">
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-gray-500 text-lg mt-0.5">location_on</span>
                <span>Av. Roosevelt Norte #411, San Miguel</span>
              </li>
              <li class="flex items-center gap-3">
                <span class="material-symbols-outlined text-gray-500 text-lg">call</span>
                <a class="hover:text-white transition-colors" href="tel:+50326697988">2669-7988</a>
              </li>
              <li class="flex items-center gap-3">
                <span class="material-symbols-outlined text-green-500 text-lg">chat</span>
                <a class="hover:text-white transition-colors" href="https://wa.me/50378448608" target="_blank" rel="noopener">
                  WhatsApp: 7844-8608
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>\xA9 2026 Cl\xEDnica Radiol\xF3gica y Laboratorio Cl\xEDnico Dr. Mendoza. Todos los derechos reservados.</p>
          <div class="flex gap-6">
            <a class="hover:text-white transition-colors" href="#">Aviso de Privacidad</a>
            <a class="hover:text-white transition-colors" href="#">T\xE9rminos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
__name(Footer, "Footer");

// components/whatsapp.js
function WhatsAppFloat() {
  return `
    <a
      aria-label="Contactar por WhatsApp"
      class="fixed bottom-6 right-6 bg-[#25D366] text-white p-3 rounded-full shadow-xl hover:scale-110 transition-transform z-50 flex items-center justify-center"
      href="https://wa.me/50378205613"
      target="_blank"
      rel="noopener"
    >
      <span class="material-symbols-outlined text-3xl">chat</span>
    </a>
  `;
}
__name(WhatsAppFloat, "WhatsAppFloat");

// pages/home.js
function renderHomePage() {
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
__name(renderHomePage, "renderHomePage");

// pages/estudios.js
function renderEstudiosPage() {
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
__name(renderEstudiosPage, "renderEstudiosPage");

// worker.js
var worker_default = {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(renderHomePage(), {
        headers: {
          "content-type": "text/html; charset=UTF-8"
        }
      });
    }
    if (url.pathname === "/estudios" || url.pathname === "/estudios.html") {
      return new Response(renderEstudiosPage(), {
        headers: {
          "content-type": "text/html; charset=UTF-8"
        }
      });
    }
    return new Response("Not found", { status: 404 });
  }
};

// ../../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-11WpFP/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// ../../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-11WpFP/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=worker.js.map
