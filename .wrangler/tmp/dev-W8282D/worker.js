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

// worker.js
function renderPage() {
  return `<!DOCTYPE html>
<html class="light" lang="es">
  <head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>Cl\xEDnica Radiol\xF3gica y Laboratorio Cl\xEDnico Dr. Mendoza</title>
    <link rel="icon" type="image/png" href="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/faviconDr.png" />
    <link
      href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      rel="stylesheet"
    />
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"><\/script>

    <script>
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              primary: "#c70505",
              "background-light": "#fcf8f8",
              "background-dark": "#230f0f",
            },
            fontFamily: {
              display: ["Public Sans", "sans-serif"],
            },
            borderRadius: {
              DEFAULT: "0.25rem",
              lg: "0.5rem",
              xl: "0.75rem",
              "2xl": "1rem",
              full: "9999px",
            },
          },
        },
      };
    <\/script>

    <style>
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    </style>
  </head>

  <body
    class="bg-background-light dark:bg-background-dark text-[#1c0d0d] dark:text-[#f4e6e6] font-display overflow-x-hidden"
  >
    ${Header()}

    <!-- HERO -->
    <section id="inicio" class="relative w-full">
      <div
        class="relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden bg-cover bg-center px-4 pt-20 pb-40 md:pb-48 text-center"
        aria-label="Portada"
        style='background-image: linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.65)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAEH9PnRdxXNNIQNOFwUpNyj8bDawbeSklBPQlBXGiBTJ0cNCVPJCwhv2zsWlKWTMTqJQqASnWe1S0Ty0GFrSiVLeskNnEvOQJJTBqLwzB2YFrDrRAoW1VwJyXpBD6C3Jppy0bXD_D9rkqk8SiUX7RbNlvT8yNA2DU-X53QY7AqGttI_Uy1hCUvStivTg6mprNmdSv6IFRbyCJmju90kSRX8sXQfrWRPmhc-kyyJ0PRykZeJtaRaCKONPbBgV-NXPaGYUwc386tifkD");'
      >
        <div class="max-w-4xl flex flex-col items-center gap-5">
          <h2
            class="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl drop-shadow-sm"
          >
            Gracias por confiarnos su salud.
          </h2>

          <p class="text-white/90 text-base md:text-xl max-w-3xl drop-shadow-sm">
            Diagn\xF3stico por im\xE1genes y laboratorio cl\xEDnico con atenci\xF3n cercana, tecnolog\xEDa y resultados confiables.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 mt-2">
            <a
              href="#sedes"
              class="inline-flex items-center justify-center rounded-lg h-11 px-7 bg-primary text-white hover:opacity-95 text-sm font-bold transition-opacity"
            >
              Ver sedes y contacto
              <span class="material-symbols-outlined text-lg ml-2">arrow_forward</span>
            </a>

            <a
              href="#novedades"
              class="inline-flex items-center justify-center rounded-lg h-11 px-7 bg-white/10 text-white border border-white/20 hover:bg-white/15 text-sm font-bold transition-colors"
            >
              Novedades
              <span class="material-symbols-outlined text-lg ml-2">campaign</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- TARJETAS -->
    <section class="relative z-20 px-4 md:px-10 -mt-24 md:-mt-32 pb-16">
      <div class="max-w-[1280px] mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="#imagenes"
            class="group flex flex-col rounded-xl border border-[#e9cece] bg-white dark:bg-[#2a1212] p-6 shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all"
          >
            <div
              class="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors"
            >
              <span class="material-symbols-outlined text-3xl">radiology</span>
            </div>

            <h3 class="text-xl font-bold text-[#1c0d0d] dark:text-white mb-2">
              Diagn\xF3stico por im\xE1genes
            </h3>

            <p class="text-[#634f4f] dark:text-[#d3c1c1] text-sm leading-relaxed mb-4 flex-grow">
              Conozca nuestra oferta de estudios y modalidades disponibles.
            </p>

            <div class="flex items-center text-primary font-bold text-sm mt-auto">
              M\xE1s informaci\xF3n
              <span class="material-symbols-outlined text-lg ml-1">arrow_forward</span>
            </div>
          </a>

          <a
            href="#laboratorio"
            class="group flex flex-col rounded-xl border border-[#e9cece] bg-white dark:bg-[#2a1212] p-6 shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all"
          >
            <div
              class="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors"
            >
              <span class="material-symbols-outlined text-3xl">science</span>
            </div>

            <h3 class="text-xl font-bold text-[#1c0d0d] dark:text-white mb-2">
              Laboratorio cl\xEDnico
            </h3>

            <p class="text-[#634f4f] dark:text-[#d3c1c1] text-sm leading-relaxed mb-4 flex-grow">
              Amplia variedad de ex\xE1menes y perfiles para apoyar su control cl\xEDnico.
            </p>

            <div class="flex items-center text-primary font-bold text-sm mt-auto">
              M\xE1s informaci\xF3n
              <span class="material-symbols-outlined text-lg ml-1">arrow_forward</span>
            </div>
          </a>

          <a
            href="#sedes"
            class="group flex flex-col rounded-xl border border-[#e9cece] bg-white dark:bg-[#2a1212] p-6 shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all"
          >
            <div
              class="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors"
            >
              <span class="material-symbols-outlined text-3xl">location_on</span>
            </div>

            <h3 class="text-xl font-bold text-[#1c0d0d] dark:text-white mb-2">
              Sedes y contacto
            </h3>

            <p class="text-[#634f4f] dark:text-[#d3c1c1] text-sm leading-relaxed mb-4 flex-grow">
              Direcciones, tel\xE9fonos y WhatsApp de nuestras sedes.
            </p>

            <div class="flex items-center text-primary font-bold text-sm mt-auto">
              Ver sedes
              <span class="material-symbols-outlined text-lg ml-1">arrow_forward</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- HISTORIA -->
    <section
      id="institucional"
      class="relative py-20 px-4 md:px-10 bg-white dark:bg-[#1a0a0a] overflow-hidden"
    >
      <div class="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4"></div>

      <div class="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div class="order-2 lg:order-1">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl" aria-label="Imagen de la cl\xEDnica">
            <div
              class="aspect-video w-full bg-cover bg-center"
              style='background-image: url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/plazaFarid.png");'
            ></div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p class="text-white font-medium">Calidad, \xE9tica y responsabilidad m\xE9dica</p>
            </div>
          </div>
        </div>

        <div class="order-1 lg:order-2 flex flex-col gap-6">
          <div>
            <span class="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
              HISTORIA
            </span>
            <h2 class="text-3xl md:text-4xl font-black text-[#1c0d0d] dark:text-white leading-tight">
              Trayectoria y confianza en San Miguel
            </h2>
          </div>

          <p class="text-base text-[#634f4f] dark:text-[#d3c1c1] leading-relaxed">
            Fundada el <strong>5 de abril de 2006</strong>, la Cl\xEDnica Radiol\xF3gica y Laboratorio Cl\xEDnico Dr. Mendoza
            acompa\xF1a a pacientes y m\xE9dicos con resultados confiables y atenci\xF3n cercana.
          </p>

          <p class="text-base text-[#634f4f] dark:text-[#d3c1c1] leading-relaxed">
            Trabajamos con enfoque en <strong>calidad</strong>, <strong>tecnolog\xEDa</strong> y <strong>trato humano</strong>,
            cuidando cada detalle del proceso desde la orientaci\xF3n inicial hasta la entrega de resultados.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div class="rounded-xl border border-[#e9cece] dark:border-[#331f1f] bg-[#fcf8f8] dark:bg-[#2a1212] p-4">
              <p class="text-xs text-[#9e4747] font-semibold mb-1">Fundaci\xF3n</p>
              <p class="text-sm font-bold text-[#1c0d0d] dark:text-white">5 de abril de 2006</p>
            </div>
            <div class="rounded-xl border border-[#e9cece] dark:border-[#331f1f] bg-[#fcf8f8] dark:bg-[#2a1212] p-4">
              <p class="text-xs text-[#9e4747] font-semibold mb-1">Calidad</p>
              <p class="text-sm font-bold text-[#1c0d0d] dark:text-white">Resultados confiables</p>
            </div>
            <div class="rounded-xl border border-[#e9cece] dark:border-[#331f1f] bg-[#fcf8f8] dark:bg-[#2a1212] p-4">
              <p class="text-xs text-[#9e4747] font-semibold mb-1">Atenci\xF3n</p>
              <p class="text-sm font-bold text-[#1c0d0d] dark:text-white">Trato cercano</p>
            </div>
          </div>

          <div class="pt-2">
            <a
              href="#sedes"
              class="inline-flex items-center justify-center rounded-lg h-10 px-6 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold transition-colors"
            >
              Conocer sedes
              <span class="material-symbols-outlined text-lg ml-2">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- DIAGN\xD3STICO POR IM\xC1GENES -->
    <section id="imagenes" class="py-16 px-4 md:px-10 bg-background-light dark:bg-background-dark">
      <div class="max-w-[1280px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div class="flex flex-col gap-4">
            <h2 class="text-2xl md:text-3xl font-black text-[#1c0d0d] dark:text-white">
              Diagn\xF3stico por im\xE1genes
            </h2>
            <p class="text-sm md:text-base text-[#634f4f] dark:text-[#d3c1c1] max-w-xl">
              Conoce la amplia variedad de estudios que realizamos, con tecnolog\xEDa y atenci\xF3n cuidadosa en cada proceso.
            </p>

            <div class="flex flex-wrap gap-2 pt-1">
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#2a1212] border border-[#e9cece] dark:border-[#331f1f]">Rayos X</span>
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#2a1212] border border-[#e9cece] dark:border-[#331f1f]">Mamograf\xEDa</span>
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#2a1212] border border-[#e9cece] dark:border-[#331f1f]">Tomograf\xEDa</span>
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#2a1212] border border-[#e9cece] dark:border-[#331f1f]">Resonancia Magn\xE9tica</span>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="#"
                class="inline-flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white hover:opacity-95 text-sm font-bold transition-opacity"
              >
                M\xE1s informaci\xF3n
                <span class="material-symbols-outlined text-lg ml-2">arrow_forward</span>
              </a>
              <a
                href="#sedes"
                class="inline-flex items-center justify-center rounded-lg h-11 px-6 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold transition-colors"
              >
                Ver sedes
                <span class="material-symbols-outlined text-lg ml-2">location_on</span>
              </a>
            </div>
          </div>

          <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-[#e9cece] dark:border-[#331f1f]">
            <div
              class="aspect-video w-full bg-cover bg-center"
              aria-label="Equipo de diagn\xF3stico por im\xE1genes"
              style='background-image: url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/LogoDrMendoza.png");'
            ></div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p class="text-white font-semibold text-sm">Tecnolog\xEDa y precisi\xF3n</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <div class="rounded-2xl border border-[#e9cece] dark:border-[#331f1f] bg-white dark:bg-[#2a1212] p-6 shadow-sm">
            <div class="flex items-center gap-3 mb-3">
              <span class="material-symbols-outlined text-primary">add_a_photo</span>
              <h3 class="font-black text-[#1c0d0d] dark:text-white">Rayos X</h3>
            </div>
            <p class="text-sm text-[#634f4f] dark:text-[#d3c1c1]">Estudios radiogr\xE1ficos seg\xFAn indicaci\xF3n m\xE9dica.</p>
          </div>

          <div class="rounded-2xl border border-[#e9cece] dark:border-[#331f1f] bg-white dark:bg-[#2a1212] p-6 shadow-sm">
            <div class="flex items-center gap-3 mb-3">
              <span class="material-symbols-outlined text-primary">woman</span>
              <h3 class="font-black text-[#1c0d0d] dark:text-white">Mamograf\xEDa</h3>
            </div>
            <p class="text-sm text-[#634f4f] dark:text-[#d3c1c1]">Evaluaci\xF3n mamaria con orientaci\xF3n previa cuando aplica.</p>
          </div>

          <div class="rounded-2xl border border-[#e9cece] dark:border-[#331f1f] bg-white dark:bg-[#2a1212] p-6 shadow-sm">
            <div class="flex items-center gap-3 mb-3">
              <span class="material-symbols-outlined text-primary">scanner</span>
              <h3 class="font-black text-[#1c0d0d] dark:text-white">Tomograf\xEDa</h3>
            </div>
            <p class="text-sm text-[#634f4f] dark:text-[#d3c1c1]">Tomograf\xEDa computarizada para evaluaci\xF3n cl\xEDnica.</p>
          </div>

          <div class="rounded-2xl border border-[#e9cece] dark:border-[#331f1f] bg-white dark:bg-[#2a1212] p-6 shadow-sm">
            <div class="flex items-center gap-3 mb-3">
              <span class="material-symbols-outlined text-primary">sensors</span>
              <h3 class="font-black text-[#1c0d0d] dark:text-white">Resonancia Magn\xE9tica</h3>
            </div>
            <p class="text-sm text-[#634f4f] dark:text-[#d3c1c1]">Resonancia magn\xE9tica seg\xFAn indicaci\xF3n m\xE9dica.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- LABORATORIO -->
    <section id="laboratorio" class="py-16 px-4 md:px-10 bg-white dark:bg-[#1a0a0a]">
      <div class="max-w-[1280px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-[#e9cece] dark:border-[#331f1f] order-2 lg:order-1">
            <div
              class="aspect-video w-full bg-cover bg-center"
              aria-label="Laboratorio cl\xEDnico"
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBUKLruu28JMqKgi6lPY__qM-1XQDa7r0_--ecA_H0emFqGIuXx7aUdXzPpNqfRpmnY3xSunV9__hHsjtK5WUt5ZR1jj5SsZtCWyGgJyoyEn1QpNyeh5DhlZ4EECKg1wKlGE_1EUYH_wy6wYDtGhGlpFhMP5omsAVbr8Y0GGELowQlotz5eAgRA5Z2iMELpBKy4SEAWFvgC6p38Bvl-y0RVUiFaTl__uLhirWWmdVvl7lbiRJjSNv9W_aEDKRtXt3j4XI53zRiy1tA3");'
            ></div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p class="text-white font-semibold text-sm">Control y seguimiento cl\xEDnico</p>
            </div>
          </div>

          <div class="flex flex-col gap-4 order-1 lg:order-2">
            <h2 class="text-2xl md:text-3xl font-black text-[#1c0d0d] dark:text-white">
              Laboratorio cl\xEDnico
            </h2>
            <p class="text-sm md:text-base text-[#634f4f] dark:text-[#d3c1c1] max-w-xl">
              Ex\xE1menes y perfiles con resultados confiables para apoyar su control de salud y seguimiento m\xE9dico.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div class="rounded-2xl border border-[#e9cece] dark:border-[#331f1f] bg-[#fcf8f8] dark:bg-[#2a1212] p-5">
                <h3 class="font-black text-[#1c0d0d] dark:text-white mb-3 text-base">Categor\xEDas</h3>
                <ul class="text-sm text-[#634f4f] dark:text-[#d3c1c1] space-y-2">
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">check_circle</span> Perfiles cl\xEDnicos</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">check_circle</span> Qu\xEDmica sangu\xEDnea</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">check_circle</span> Hematolog\xEDa</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">check_circle</span> Inmunolog\xEDa</li>
                </ul>
              </div>

              <div class="rounded-2xl border border-[#e9cece] dark:border-[#331f1f] bg-[#fcf8f8] dark:bg-[#2a1212] p-5">
                <h3 class="font-black text-[#1c0d0d] dark:text-white mb-3 text-base">M\xE1s categor\xEDas</h3>
                <ul class="text-sm text-[#634f4f] dark:text-[#d3c1c1] space-y-2">
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">check_circle</span> Coprolog\xEDa</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">check_circle</span> Bacteriolog\xEDa</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">check_circle</span> Uroan\xE1lisis</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">check_circle</span> Pruebas especiales</li>
                </ul>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="#"
                class="inline-flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white hover:opacity-95 text-sm font-bold transition-opacity"
              >
                M\xE1s informaci\xF3n
                <span class="material-symbols-outlined text-lg ml-2">arrow_forward</span>
              </a>
              <a
                href="#sedes"
                class="inline-flex items-center justify-center rounded-lg h-11 px-6 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold transition-colors"
              >
                Ver contacto
                <span class="material-symbols-outlined text-lg ml-2">call</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NOVEDADES -->
    <section id="novedades" class="py-16 px-4 md:px-10 bg-background-light dark:bg-background-dark">
      <div class="max-w-[1280px] mx-auto">
        <div class="flex items-center justify-between mb-10">
          <h2 class="text-2xl md:text-3xl font-black text-[#1c0d0d] dark:text-white">
            Novedades
          </h2>
          <a class="text-primary font-medium hover:underline text-sm md:text-base" href="#">
            Ver todas
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article class="flex flex-col bg-white dark:bg-[#2a1212] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div
              class="h-44 bg-cover bg-center"
              aria-label="Novedad"
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAtR6hlRRp7jViwZMYGrYScVr2gUls2vzjI30_I1tnWIWokf50r98OL1FrniM1igOTYxNL8Ydv12BHlbSjIa_QZAlLJkjuso5_PKamVNn649q2qaZpxylErOUo0YMSQOj46FsOUmPQiSP1QMiw0ZxDiJATeUkLjNGv6gAEMb0njs92_ml2hW2MOl92scGwKRXq7zmLTUrzQNL1qXifE3-2O5vSr-mWD_-KGJPgJzLPPak6L4xhbQzwlt4LenzAOgxFqs3T7Bb-0wdA-");'
            ></div>
            <div class="p-5 flex flex-col flex-1">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs text-[#9e4747] font-semibold">ANUNCIO</span>
                <time class="text-xs text-[#634f4f] dark:text-[#d3c1c1]" datetime="2026-01-09">09 Ene 2026</time>
              </div>
              <h3 class="text-lg font-bold text-[#1c0d0d] dark:text-white mb-3 leading-snug">
                Horarios de atenci\xF3n
              </h3>
              <p class="text-sm text-[#634f4f] dark:text-[#d3c1c1] line-clamp-3 mb-4">
                Lunes a viernes 6:00 AM \u2013 4:30 PM. S\xE1bado 6:00 AM \u2013 12:00 PM.
              </p>
              <a class="mt-auto text-primary text-sm font-bold hover:underline" href="#">Leer m\xE1s</a>
            </div>
          </article>

          <article class="flex flex-col bg-white dark:bg-[#2a1212] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div
              class="h-44 bg-cover bg-center"
              aria-label="Novedad"
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBcO9BfOXuloHuvFQ_jAK9ew_9gl6D1qDyuJG_lcQz1RZhaissm-_9cYZsrie0iPpE0g33VBldGs5EO6aBN_UaS2RHYvXXdkPl1oLsy27KPzK_lwVO7ln5dmPh_Hl_kl-KJZwmDuWWMZSTcXx_pBaFoS9hOlps-USglHUkrDN_aF8bBfTod1UbO7aSu20BAdA-mXaqSQv7QXWRFFYpPWcZ8pDuygEdvbofuphhpJjuANoWyRDwnL9UUZB8VfcS3YZFPijrhXpHNDb8D");'
            ></div>
            <div class="p-5 flex flex-col flex-1">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs text-[#9e4747] font-semibold">AVISO</span>
                <time class="text-xs text-[#634f4f] dark:text-[#d3c1c1]" datetime="2026-01-09">09 Ene 2026</time>
              </div>
              <h3 class="text-lg font-bold text-[#1c0d0d] dark:text-white mb-3 leading-snug">
                Aviso
              </h3>
              <p class="text-sm text-[#634f4f] dark:text-[#d3c1c1] line-clamp-3 mb-4">
                (Contenido por publicar)
              </p>
              <a class="mt-auto text-primary text-sm font-bold hover:underline" href="#">Leer m\xE1s</a>
            </div>
          </article>

          <article class="flex flex-col bg-white dark:bg-[#2a1212] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div
              class="h-44 bg-cover bg-center"
              aria-label="Novedad"
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBUKLruu28JMqKgi6lPY__qM-1XQDa7r0_--ecA_H0emFqGIuXx7aUdXzPpNqfRpmnY3xSunV9__hHsjtK5WUt5ZR1jj5SsZtCWyGgJyoyEn1QpNyeh5DhlZ4EECKg1wKlGE_1EUYH_wy6wYDtGhGlpFhMP5omsAVbr8Y0GGELowQlotz5eAgRA5Z2iMELpBKy4SEAWFvgC6p38Bvl-y0RVUiFaTl__uLhirWWmdVvl7lbiRJjSNv9W_aEDKRtXt3j4XI53zRiy1tA3");'
            ></div>
            <div class="p-5 flex flex-col flex-1">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs text-[#9e4747] font-semibold">AVISO</span>
                <time class="text-xs text-[#634f4f] dark:text-[#d3c1c1]" datetime="2026-01-09">09 Ene 2026</time>
              </div>
              <h3 class="text-lg font-bold text-[#1c0d0d] dark:text-white mb-3 leading-snug">
                Aviso
              </h3>
              <p class="text-sm text-[#634f4f] dark:text-[#d3c1c1] line-clamp-3 mb-4">
                (Contenido por publicar)
              </p>
              <a class="mt-auto text-primary text-sm font-bold hover:underline" href="#">Leer m\xE1s</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    ${Sedes()}
    ${Footer()}
    ${WhatsAppFloat()}

    <script>
      function setMap(lat, lng) {
        const frame = document.getElementById("mapFrame");
        if (frame) {
          frame.src = "https://www.google.com/maps?q=" + lat + "," + lng + "&z=17&output=embed";
        }
      }

      document.addEventListener("click", function (e) {
        const btn = e.target.closest(".map-btn");
        if (btn) {
          const lat = btn.dataset.lat;
          const lng = btn.dataset.lng;
          setMap(lat, lng);
        }
      });

      const menuToggle = document.getElementById("menuToggle");
      const mobileMenu = document.getElementById("mobileMenu");

      if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", function () {
          mobileMenu.classList.toggle("hidden");
        });

        mobileMenu.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", function () {
            mobileMenu.classList.add("hidden");
          });
        });
      }
    <\/script>
  </body>
</html>`;
}
__name(renderPage, "renderPage");
var worker_default = {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "/index" || url.pathname === "/index.html") {
      return new Response(renderPage(), {
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
