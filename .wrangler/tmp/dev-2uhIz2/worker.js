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
        <a class="flex items-center" href="/" aria-label="Ir al inicio">
          <img
            src="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/LogoDrMendoza3.png"
            alt="Logo Cl\xEDnica Dr. Mendoza"
            class="h-12 md:h-14 w-auto object-contain"
          />
        </a>

        <nav class="hidden md:flex flex-1 items-center justify-end gap-8">
          <a
            class="text-sm font-medium hover:text-primary transition-colors text-[#1c0d0d] dark:text-[#f4e6e6]"
            href="/"
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
            href="estudios"
          >
            Diagn\xF3stico por im\xE1genes
          </a>
          <a
            class="text-sm font-medium hover:text-primary transition-colors text-[#1c0d0d] dark:text-[#f4e6e6]"
            href="laboratorio"
          >
            Laboratorio cl\xEDnico
          </a>
          <a
            class="text-sm font-medium hover:text-primary transition-colors text-[#1c0d0d] dark:text-[#f4e6e6]"
            href="/portal-pacientes"
          >
            Portal Pacientes
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
          <a class="text-sm font-medium hover:text-primary transition-colors" href="/portal-pacientes">Portal Pacientes</a>
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
                  <img
    src="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/wha.png"
    alt="WhatsApp"
    class="w-6 h-6 object-contain"
  />
                  <a class="hover:underline" href="https://wa.me/50378205613" target="_blank" rel="noopener">
                    WhatsApp: 7820-5613
                  </a>
                </div>
              </div>

              <div class="mt-5 flex flex-wrap gap-3">
            

                <a
                  class="inline-flex items-center justify-center rounded-lg h-10 px-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold transition-colors"
                  href="https://maps.app.goo.gl/cXRW57bte2G2VioK6"
                  target="_blank"
                  rel="noopener"
                >
                  Google Maps
                  <span class="material-symbols-outlined text-lg ml-2">open_in_new</span>
                </a>

                <a
  class="group inline-flex items-center justify-center gap-2 rounded-lg h-10 px-4 border border-[#7adfff] bg-[#33CCFF] text-black text-sm font-extrabold tracking-[0.01em] shadow-[0_6px_16px_rgba(51,204,255,0.35)] hover:bg-[#28b8e6] hover:border-[#28b8e6] hover:shadow-[0_10px_24px_rgba(51,204,255,0.45)] hover:-translate-y-[2px] active:translate-y-0 active:shadow-[0_4px_12px_rgba(51,204,255,0.3)] transition-all duration-200"
  href="https://waze.com/ul?ll=13.477069,-88.182489&navigate=yes
  target="_blank"
  rel="noopener"
>
  <img
    src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/waze-icon.png"
    alt="Waze"
    class="w-5 h-5 object-contain transition-transform duration-200 group-hover:scale-110"
  />
  Waze
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
                  <img
    src="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/wha.png"
    alt="WhatsApp"
    class="w-6 h-6 object-contain"
  />
                  <a class="hover:underline" href="https://wa.me/50378195960" target="_blank" rel="noopener">
                    WhatsApp: 7819-5960
                  </a>
                </div>
              </div>

              <div class="mt-5 flex flex-wrap gap-3">
               

                <a
                  class="inline-flex items-center justify-center rounded-lg h-10 px-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold transition-colors"
                  href="https://maps.app.goo.gl/1KysDJYFLpXdvZMi6"
                  target="_blank"
                  rel="noopener"
                >
                  Google Maps
                  <span class="material-symbols-outlined text-lg ml-2">open_in_new</span>
                </a>

                <a
  class="group inline-flex items-center justify-center gap-2 rounded-lg h-10 px-4 border border-[#7adfff] bg-[#33CCFF] text-black text-sm font-extrabold tracking-[0.01em] shadow-[0_6px_16px_rgba(51,204,255,0.35)] hover:bg-[#28b8e6] hover:border-[#28b8e6] hover:shadow-[0_10px_24px_rgba(51,204,255,0.45)] hover:-translate-y-[2px] active:translate-y-0 active:shadow-[0_4px_12px_rgba(51,204,255,0.3)] transition-all duration-200"
  href="https://waze.com/ul?ll=13.4847581,-88.1853542&navigate=yes
  target="_blank"
  rel="noopener"
>
  <img
    src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/waze-icon.png"
    alt="Waze"
    class="w-5 h-5 object-contain transition-transform duration-200 group-hover:scale-110"
  />
  Waze
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
                  <img
    src="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/wha.png"
    alt="WhatsApp"
    class="w-6 h-6 object-contain"
  />
                  <a class="hover:underline" href="https://wa.me/50378448608" target="_blank" rel="noopener">
                    WhatsApp: 7844-8608
                  </a>
                </div>
              </div>

              <div class="mt-5 flex flex-wrap gap-3">
              

                <a
                  class="inline-flex items-center justify-center rounded-lg h-10 px-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold transition-colors"
                  href="https://maps.app.goo.gl/RGyf8VcgsaMdJWHx5"
                  target="_blank"
                  rel="noopener"
                >
                  Google Maps
                  <span class="material-symbols-outlined text-lg ml-2">open_in_new</span>
                </a>

                <a
  class="group inline-flex items-center justify-center gap-2 rounded-lg h-10 px-4 border border-[#7adfff] bg-[#33CCFF] text-black text-sm font-extrabold tracking-[0.01em] shadow-[0_6px_16px_rgba(51,204,255,0.35)] hover:bg-[#28b8e6] hover:border-[#28b8e6] hover:shadow-[0_10px_24px_rgba(51,204,255,0.45)] hover:-translate-y-[2px] active:translate-y-0 active:shadow-[0_4px_12px_rgba(51,204,255,0.3)] transition-all duration-200"
  href="https://waze.com/ul?ll=13.4846653,-88.1857434&navigate=yes"
  target="_blank"
  rel="noopener"
>
  <img
    src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/waze-icon.png"
    alt="Waze"
    class="w-5 h-5 object-contain transition-transform duration-200 group-hover:scale-110"
  />
  Waze
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
        style='background-image: linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.65)), url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/banner3.png");'
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
            href="/estudios.html"
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
                href="/estudios.html"
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
__name(renderHomePage, "renderHomePage");

// pages/estudios.js
function renderEstudiosPage() {
  return `<!DOCTYPE html>
<html class="light" lang="es">
  <head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>Estudios | Cl\xEDnica Dr. Mendoza</title>
    <meta
      name="description"
      content="Conozca las categor\xEDas de estudios de diagn\xF3stico por im\xE1genes disponibles en Cl\xEDnica Dr. Mendoza."
    />
    <link
      rel="icon"
      type="image/png"
      href="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/faviconDr.png"
    />

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
              ink: "#1c0d0d",
              soft: "#6f5a5a",
            },
            fontFamily: {
              display: ["Public Sans", "sans-serif"],
            },
            boxShadow: {
              soft: "0 10px 30px rgba(80, 20, 20, 0.08)",
              card: "0 14px 38px rgba(60, 10, 10, 0.10)",
              glow: "0 18px 45px rgba(199, 5, 5, 0.14)",
            },
            borderRadius: {
              DEFAULT: "0.25rem",
              lg: "0.5rem",
              xl: "0.75rem",
              "2xl": "1rem",
              "3xl": "1.5rem",
              full: "9999px",
            },
          },
        },
      };
    <\/script>

    <style>
      html {
        scroll-behavior: smooth;
      }

      .hero-overlay {
        background:
          linear-gradient(90deg, rgba(25, 10, 10, 0.78) 0%, rgba(25, 10, 10, 0.62) 38%, rgba(25, 10, 10, 0.30) 100%),
          linear-gradient(180deg, rgba(199, 5, 5, 0.10) 0%, rgba(199, 5, 5, 0.03) 100%);
      }
    </style>
  </head>

  <body class="bg-background-light dark:bg-background-dark text-ink dark:text-[#f4e6e6] font-display overflow-x-hidden">
    ${Header()}

    <section id="top" class="relative overflow-hidden">
      <div
        class="relative min-h-[380px] md:min-h-[460px] bg-cover bg-center"
        style='background-image:url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Resonancia%20magnetica.png");'
      >
        <div class="absolute inset-0 hero-overlay"></div>

        <div class="relative max-w-[1280px] mx-auto px-4 md:px-10 h-full min-h-[380px] md:min-h-[460px] flex items-center">
          <div class="max-w-3xl py-14 md:py-20 flex flex-col gap-5">
            <div class="flex items-center gap-2 text-xs font-bold text-[#f2d6d6]">
              <a href="/index.html" class="hover:text-white transition-colors">Inicio</a>
              <span class="opacity-70">/</span>
              <span class="text-white">Estudios</span>
            </div>

            <div class="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold text-white backdrop-blur-sm">
              <span class="material-symbols-outlined text-base">radiology</span>
              Diagn\xF3stico por im\xE1genes
            </div>

            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.02]">
              Categor\xEDas de estudios
            </h1>

            <div class="flex flex-wrap gap-3 pt-2">
              <a
                href="#categorias"
                class="inline-flex items-center justify-center rounded-full h-11 px-6 bg-primary text-white text-sm font-black shadow-glow hover:opacity-95 transition-opacity"
              >
                Ver categor\xEDas
              </a>

              <a
                href="https://wa.me/50378205613"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center justify-center rounded-full h-11 px-6 border border-white/25 bg-white/10 text-white text-sm font-black backdrop-blur-sm hover:bg-white/15 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="categorias" class="relative py-10 md:py-14">
      <div class="max-w-[1280px] mx-auto px-4 md:px-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <article class="group overflow-hidden rounded-3xl border border-[#ead0d0] dark:border-[#3a1e1e] bg-white dark:bg-[#2a1212] shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div class="relative">
              <div class="absolute inset-x-0 top-0 h-1 bg-primary z-10"></div>
              <div
                class="h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                style='background-image:url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Resonancia%20magnetica.png");'
                aria-label="Resonancia Magn\xE9tica"
              ></div>
            </div>
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-black text-ink dark:text-white">Resonancia Magn\xE9tica</h2>
                <span class="rounded-full bg-[#f9ecec] dark:bg-[#341818] p-2 text-primary">
                  <span class="material-symbols-outlined text-[20px]">radiology</span>
                </span>
              </div>
              <a href="/estudios-rm.html" class="inline-flex items-center gap-1 text-primary text-sm font-black hover:underline">
                Ver categor\xEDa
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </article>

          <article class="group overflow-hidden rounded-3xl border border-[#ead0d0] dark:border-[#3a1e1e] bg-white dark:bg-[#2a1212] shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div class="relative">
              <div class="absolute inset-x-0 top-0 h-1 bg-primary z-10"></div>
              <div
                class="h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                style='background-image:url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/TAC.png");'
                aria-label="Tomograf\xEDa"
              ></div>
            </div>
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-black text-ink dark:text-white">Tomograf\xEDa (TAC)</h2>
                <span class="rounded-full bg-[#f9ecec] dark:bg-[#341818] p-2 text-primary">
                  <span class="material-symbols-outlined text-[20px]">scanner</span>
                </span>
              </div>
              <a href="/estudios-tac.html" class="inline-flex items-center gap-1 text-primary text-sm font-black hover:underline">
                Ver categor\xEDa
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </article>

          <article class="group overflow-hidden rounded-3xl border border-[#ead0d0] dark:border-[#3a1e1e] bg-white dark:bg-[#2a1212] shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div class="relative">
              <div class="absolute inset-x-0 top-0 h-1 bg-primary z-10"></div>
              <div
                class="h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                style='background-image:url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Ultrasonografia.png");'
                aria-label="Ultrasonograf\xEDa"
              ></div>
            </div>
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-black text-ink dark:text-white">Ultrasonograf\xEDa</h2>
                <span class="rounded-full bg-[#f9ecec] dark:bg-[#341818] p-2 text-primary">
                  <span class="material-symbols-outlined text-[20px]">sound_detection_dog_barking</span>
                </span>
              </div>
              <a href="/estudios-us.html" class="inline-flex items-center gap-1 text-primary text-sm font-black hover:underline">
                Ver categor\xEDa
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </article>

          <article class="group overflow-hidden rounded-3xl border border-[#ead0d0] dark:border-[#3a1e1e] bg-white dark:bg-[#2a1212] shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div class="relative">
              <div class="absolute inset-x-0 top-0 h-1 bg-primary z-10"></div>
              <div
                class="h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                style='background-image:url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Rayos%20X.png");'
                aria-label="Rayos X"
              ></div>
            </div>
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-black text-ink dark:text-white">Rayos X</h2>
                <span class="rounded-full bg-[#f9ecec] dark:bg-[#341818] p-2 text-primary">
                  <span class="material-symbols-outlined text-[20px]">medical_services</span>
                </span>
              </div>
              <a href="/estudios-rayosx.html" class="inline-flex items-center gap-1 text-primary text-sm font-black hover:underline">
                Ver categor\xEDa
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </article>

          <article class="group overflow-hidden rounded-3xl border border-[#ead0d0] dark:border-[#3a1e1e] bg-white dark:bg-[#2a1212] shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div class="relative">
              <div class="absolute inset-x-0 top-0 h-1 bg-primary z-10"></div>
              <div
                class="h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                style='background-image:url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Mamografia.png");'
                aria-label="Mamograf\xEDa"
              ></div>
            </div>
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-black text-ink dark:text-white">Mamograf\xEDa</h2>
                <span class="rounded-full bg-[#f9ecec] dark:bg-[#341818] p-2 text-primary">
                  <span class="material-symbols-outlined text-[20px]">female</span>
                </span>
              </div>
              <a href="/estudios-mamografia.html" class="inline-flex items-center gap-1 text-primary text-sm font-black hover:underline">
                Ver categor\xEDa
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </article>

          <article class="group overflow-hidden rounded-3xl border border-[#ead0d0] dark:border-[#3a1e1e] bg-white dark:bg-[#2a1212] shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div class="relative">
              <div class="absolute inset-x-0 top-0 h-1 bg-primary z-10"></div>
              <div
                class="h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                style='background-image:url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/EstudiosEspeciales.webp");'
                aria-label="Estudios especiales"
              ></div>
            </div>
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-black text-ink dark:text-white">Estudios especiales</h2>
                <span class="rounded-full bg-[#f9ecec] dark:bg-[#341818] p-2 text-primary">
                  <span class="material-symbols-outlined text-[20px]">biotech</span>
                </span>
              </div>
              <a href="/estudios-especiales.html" class="inline-flex items-center gap-1 text-primary text-sm font-black hover:underline">
                Ver categor\xEDa
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="pb-12 md:pb-16">
      <div class="max-w-[1280px] mx-auto px-4 md:px-10">
        <div class="rounded-3xl border border-[#ead4d4] dark:border-[#392020] bg-gradient-to-r from-white to-[#fff7f7] dark:from-[#2a1212] dark:to-[#241010] p-6 md:p-8 shadow-soft">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <h2 class="text-2xl md:text-3xl font-black text-ink dark:text-white tracking-tight">
              Consulta informaci\xF3n general por WhatsApp
            </h2>

            <a
              href="https://wa.me/50378205613"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center rounded-full h-11 px-6 bg-[#25D366] text-white text-sm font-black shadow-soft hover:opacity-95 transition-opacity"
            >
              WhatsApp
            </a>
          </div>
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
__name(renderEstudiosPage, "renderEstudiosPage");

// pages/templates/estudios-detalle.js
function renderEstudioDetallePage({
  title,
  breadcrumb,
  heroImage,
  badge = "Diagn\xF3stico por im\xE1genes",
  ctaHref = "https://wa.me/50378205613",
  ctaText = "Consultar por WhatsApp",
  preparationNote = "",
  sections = []
}) {
  const preparationHtml = preparationNote ? `
      <section class="py-8 md:py-10">
        <div class="max-w-[1280px] mx-auto px-4 md:px-10">
          <div class="rounded-3xl border border-[#ead4d4] dark:border-[#392020] bg-white dark:bg-[#2a1212] p-5 md:p-6 shadow-soft">
            <div class="flex flex-wrap items-center gap-3">
              <span class="inline-flex items-center gap-2 rounded-full bg-[#f8eaea] dark:bg-[#341818] px-4 py-2 text-sm font-black text-primary">
                <span class="material-symbols-outlined text-[18px]">info</span>
                Preparaci\xF3n general
              </span>
              <p class="text-sm md:text-base text-soft dark:text-[#d3c1c1]">
                ${preparationNote}
              </p>
            </div>
          </div>
        </div>
      </section>
    ` : "";
  const sectionsHtml = sections.map(
    (section) => `
      <section id="${section.id || ""}" class="pb-10 md:pb-14">
        <div class="max-w-[1280px] mx-auto px-4 md:px-10">
          <div class="mb-6">
            <div class="inline-flex items-center gap-2 rounded-full bg-[#f8eaea] dark:bg-[#341818] px-4 py-2 text-xs font-extrabold text-primary">
              <span class="material-symbols-outlined text-base">${section.icon || "featured_play_list"}</span>
              ${section.title}
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            ${section.groups.map(
      (group) => `
                <article class="rounded-3xl border border-[#ead0d0] dark:border-[#3a1e1e] bg-white dark:bg-[#2a1212] shadow-soft overflow-hidden">
                  <div class="h-1 bg-primary"></div>
                  <div class="p-6">
                    <div class="flex items-center gap-3 mb-5">
                      <span class="rounded-full bg-[#f9ecec] dark:bg-[#341818] p-2 text-primary">
                        <span class="material-symbols-outlined text-[20px]">${group.icon || "radio_button_checked"}</span>
                      </span>
                      <h2 class="text-xl font-black text-ink dark:text-white">${group.title}</h2>
                    </div>

                    <ul class="space-y-3 text-sm md:text-base text-soft dark:text-[#d3c1c1] font-medium">
                      ${group.items.map((item) => `<li>${item}</li>`).join("")}
                    </ul>
                  </div>
                </article>
              `
    ).join("")}
          </div>
        </div>
      </section>
    `
  ).join("");
  return `<!DOCTYPE html>
<html class="light" lang="es">
  <head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>${title} | Cl\xEDnica Dr. Mendoza</title>
    <meta
      name="description"
      content="Consulte los estudios disponibles de ${title} en Cl\xEDnica Dr. Mendoza."
    />
    <link
      rel="icon"
      type="image/png"
      href="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/faviconDr.png"
    />

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
              ink: "#1c0d0d",
              soft: "#6f5a5a",
            },
            fontFamily: {
              display: ["Public Sans", "sans-serif"],
            },
            boxShadow: {
              soft: "0 10px 30px rgba(80, 20, 20, 0.08)",
              card: "0 14px 38px rgba(60, 10, 10, 0.10)",
              glow: "0 18px 45px rgba(199, 5, 5, 0.14)",
            },
            borderRadius: {
              DEFAULT: "0.25rem",
              lg: "0.5rem",
              xl: "0.75rem",
              "2xl": "1rem",
              "3xl": "1.5rem",
              full: "9999px",
            },
          },
        },
      };
    <\/script>

    <style>
      html { scroll-behavior: smooth; }

      .hero-overlay {
        background:
          linear-gradient(90deg, rgba(25, 10, 10, 0.80) 0%, rgba(25, 10, 10, 0.58) 42%, rgba(25, 10, 10, 0.24) 100%),
          linear-gradient(180deg, rgba(199, 5, 5, 0.12) 0%, rgba(199, 5, 5, 0.03) 100%);
      }
    </style>
  </head>

  <body class="bg-background-light dark:bg-background-dark text-ink dark:text-[#f4e6e6] font-display overflow-x-hidden">
    ${Header()}

    <section id="top" class="relative overflow-hidden">
      <div
        class="relative min-h-[360px] md:min-h-[440px] bg-cover bg-center"
        style='background-image:url("${heroImage}");'
      >
        <div class="absolute inset-0 hero-overlay"></div>

        <div class="relative max-w-[1280px] mx-auto px-4 md:px-10 min-h-[360px] md:min-h-[440px] flex items-center">
          <div class="max-w-3xl py-14 md:py-20 flex flex-col gap-5">
            <div class="flex items-center gap-2 text-xs font-bold text-[#f2d6d6]">
              <a href="/index.html" class="hover:text-white transition-colors">Inicio</a>
              <span class="opacity-70">/</span>
              <a href="/estudios.html" class="hover:text-white transition-colors">Estudios</a>
              <span class="opacity-70">/</span>
              <span class="text-white">${breadcrumb || title}</span>
            </div>

            <div class="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold text-white backdrop-blur-sm">
              <span class="material-symbols-outlined text-base">radiology</span>
              ${badge}
            </div>

            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.02]">
              ${title}
            </h1>

            <div class="flex flex-wrap gap-3 pt-2">
              <a
                href="#detalle"
                class="inline-flex items-center justify-center rounded-full h-11 px-6 bg-primary text-white text-sm font-black shadow-glow hover:opacity-95 transition-opacity"
              >
                Ver estudios
              </a>

              <a
                href="${ctaHref}"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center justify-center rounded-full h-11 px-6 border border-white/25 bg-white/10 text-white text-sm font-black backdrop-blur-sm hover:bg-white/15 transition-colors"
              >
                ${ctaText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${preparationHtml}

    <div id="detalle">
      ${sectionsHtml}
    </div>

    <section class="pb-12 md:pb-16">
      <div class="max-w-[1280px] mx-auto px-4 md:px-10">
        <div class="rounded-3xl border border-[#ead4d4] dark:border-[#392020] bg-gradient-to-r from-white to-[#fff7f7] dark:from-[#2a1212] dark:to-[#241010] p-6 md:p-8 shadow-soft">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl md:text-3xl font-black text-ink dark:text-white tracking-tight">
                \xBFDesea consultar disponibilidad?
              </h2>
              <p class="mt-2 text-sm md:text-base text-soft dark:text-[#d3c1c1]">
                Puede escribirnos para confirmar informaci\xF3n general, sede y preparaci\xF3n del estudio.
              </p>
            </div>

            <a
              href="${ctaHref}"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center rounded-full h-11 px-6 bg-[#25D366] text-white text-sm font-black shadow-soft hover:opacity-95 transition-opacity"
            >
              WhatsApp
            </a>
          </div>
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
__name(renderEstudioDetallePage, "renderEstudioDetallePage");

// pages/estudios-rm.js
function renderEstudiosRMPage() {
  return renderEstudioDetallePage({
    title: "Estudios de resonancia magn\xE9tica",
    breadcrumb: "Resonancia Magn\xE9tica",
    heroImage: "https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Resonancia%20magnetica.png",
    badge: "Resonancia Magn\xE9tica",
    preparationNote: 'Si el estudio requiere contraste, la indicaci\xF3n general es <span class="font-bold text-ink dark:text-white">ayuno de 6 horas</span> y <span class="font-bold text-ink dark:text-white">examen de creatinina</span>.',
    sections: [
      {
        id: "convencional",
        title: "Resonancia Magn\xE9tica Convencional",
        icon: "featured_play_list",
        groups: [
          {
            title: "General",
            icon: "neurology",
            items: ["Cerebro", "Hip\xF3fisis", "Cadera", "Abdomen", "Pelvis", "Otro"]
          },
          {
            title: "Columna",
            icon: "accessibility_new",
            items: [
              "Columna cervical",
              "Columna dorsal",
              "Columna lumbar",
              "Columna cervical + panor\xE1mica",
              "Columna dorsal + panor\xE1mica",
              "Columna lumbar + panor\xE1mica"
            ]
          },
          {
            title: "Extremidades y articulaciones",
            icon: "pan_tool",
            items: ["Hombro", "Codo", "Mu\xF1eca", "Rodilla", "Tobillo", "Pie"]
          }
        ]
      },
      {
        id: "especializada",
        title: "Resonancia Magn\xE9tica Especializada",
        icon: "biotech",
        groups: [
          {
            title: "Neuro",
            icon: "psychology",
            items: ["Difusi\xF3n cerebral", "Espectroscopia"]
          },
          {
            title: "Vascular y angio",
            icon: "monitor_heart",
            items: ["Angio cerebral (sin contraste)", "Angio resonancia"]
          },
          {
            title: "Otros especializados",
            icon: "healing",
            items: ["Colangio resonancia", "Elastograf\xEDa hep\xE1tica"]
          }
        ]
      }
    ]
  });
}
__name(renderEstudiosRMPage, "renderEstudiosRMPage");

// pages/estudios-tac.js
function renderEstudiosTACPage() {
  return renderEstudioDetallePage({
    title: "Estudios de tomograf\xEDa",
    breadcrumb: "Tomograf\xEDa (TAC)",
    heroImage: "https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/TAC.png",
    badge: "Tomograf\xEDa Multidetectores",
    preparationNote: 'Si el estudio requiere contraste, la indicaci\xF3n general es <span class="font-bold text-ink dark:text-white">ayuno de 6 horas</span> y <span class="font-bold text-ink dark:text-white">examen de creatinina</span>.',
    sections: [
      {
        id: "tomografia-multidetectores",
        title: "Tomograf\xEDa Multidetectores",
        icon: "scanner",
        groups: [
          {
            title: "Cr\xE1neo y cuello",
            icon: "neurology",
            items: [
              "Cerebral",
              "\xD3rbitas",
              "Senos paranasales",
              "Silla turca",
              "O\xEDdo",
              "Cuello"
            ]
          },
          {
            title: "T\xF3rax",
            icon: "respiratory_rate",
            items: [
              "T\xF3rax alta resoluci\xF3n",
              "T\xF3rax simple",
              "T\xF3rax contrastado"
            ]
          },
          {
            title: "Abdomen y pelvis",
            icon: "monitor_heart",
            items: [
              "Abdomen",
              "Pelvis",
              "Abdomen y pelvis"
            ]
          },
          {
            title: "Columna",
            icon: "accessibility_new",
            items: [
              "Columna cervical",
              "Columna dorsal",
              "Columna lumbar"
            ]
          },
          {
            title: "Angio y uro-TAC",
            icon: "biotech",
            items: [
              "Angio-TAC",
              "Uro-TAC simple (pieloTAC)",
              "Uro-TAC contrastado"
            ]
          },
          {
            title: "Estudios especiales de TAC",
            icon: "clinical_notes",
            items: [
              "Osteo-TAC (densidad de columna)",
              "Otro"
            ]
          }
        ]
      }
    ]
  });
}
__name(renderEstudiosTACPage, "renderEstudiosTACPage");

// pages/estudios-us.js
function renderEstudiosUSPage() {
  return renderEstudioDetallePage({
    title: "Estudios de ultrasonograf\xEDa",
    breadcrumb: "Ultrasonograf\xEDa",
    heroImage: "https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Ultrasonografia.png",
    badge: "Ultrasonograf\xEDa",
    sections: [
      {
        id: "doppler-color",
        title: "US. Doppler Color",
        icon: "monitor_heart",
        groups: [
          {
            title: "Sistema arterial carot\xEDdeo y vertebral",
            icon: "neurology",
            items: [
              "Ateromatosis",
              "V\xE9rtigo"
            ]
          },
          {
            title: "Vasos perif\xE9ricos",
            icon: "bloodtype",
            items: [
              "Sistema venoso MID MII",
              "Sistema arterial MID MII",
              "Sistema venoso MSD MSI",
              "Sistema arterial MSD MSI"
            ]
          },
          {
            title: "Escrotal",
            icon: "male",
            items: [
              "Tumores",
              "Varicoceles"
            ]
          },
          {
            title: "Abdomen",
            icon: "monitor_heart",
            items: [
              "Aneurisma a\xF3rtico",
              "Arterias renales",
              "Otro"
            ]
          },
          {
            title: "Obstetricia",
            icon: "pregnant_woman",
            items: [
              "Vasos umbilicales"
            ]
          }
        ]
      },
      {
        id: "convencional",
        title: "US. Convencional",
        icon: "ultrasonic_sensor",
        groups: [
          {
            title: "Abdominal",
            icon: "abdomen",
            items: [
              "H\xEDgado",
              "Ves\xEDcula y v\xEDas biliares",
              "Ri\xF1ones",
              "P\xE1ncreas",
              "Bazo",
              "Retroperitoneo"
            ]
          },
          {
            title: "P\xE9lvica",
            icon: "female",
            items: [
              "Ginecolog\xEDa (requiere vejiga llena)",
              "Vesical (requiere vejiga llena)",
              "Obstetricia",
              "Transvaginal"
            ]
          },
          {
            title: "Otros estudios convencionales",
            icon: "clinical_notes",
            items: [
              "Pr\xF3stata (transrectal)",
              "T\xF3rax (derrame pleural)",
              "Mama",
              "Tejidos blandos",
              "Cuello (tiroides)",
              "Transfontanelar",
              "Ocular",
              "Vesicoprost\xE1tico"
            ]
          }
        ]
      },
      {
        id: "musculo-esqueletico",
        title: "US. M\xFAsculo Esquel\xE9tico",
        icon: "orthopedics",
        groups: [
          {
            title: "Articulaciones y m\xFAsculos",
            icon: "accessibility_new",
            items: [
              "Cadera",
              "Hombro",
              "Rodilla",
              "M\xFAsculos",
              "Otro"
            ]
          }
        ]
      },
      {
        id: "elastografia",
        title: "Elastograf\xEDa",
        icon: "biotech",
        groups: [
          {
            title: "Opciones disponibles",
            icon: "healing",
            items: [
              "Elastograf\xEDa hep\xE1tica (ayuno de 6 horas)",
              "Elastograf\xEDa hep\xE1tica + USG abdominal",
              "Elastograf\xEDa hep\xE1tica + Doppler hep\xE1tico"
            ]
          }
        ]
      }
    ]
  });
}
__name(renderEstudiosUSPage, "renderEstudiosUSPage");

// pages/estudios-rayosx.js
function renderEstudiosRayosXPage() {
  return renderEstudioDetallePage({
    title: "Estudios de rayos X",
    breadcrumb: "Rayos X",
    heroImage: "https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Rayos%20X.png",
    badge: "Rayos X",
    sections: [
      {
        id: "cabeza",
        title: "Cabeza",
        icon: "neurology",
        groups: [
          {
            title: "Cr\xE1neo y cara",
            icon: "face",
            items: [
              "Cr\xE1neo PA",
              "Cr\xE1neo lateral",
              "Huesos nasales",
              "Senos paranasales",
              "Macizo facial",
              "Mand\xEDbula"
            ]
          },
          {
            title: "Regiones espec\xEDficas",
            icon: "visibility",
            items: [
              "\xD3rbitas",
              "Articulaci\xF3n temporomandibular",
              "Cavum",
              "Mastoides",
              "Silla turca"
            ]
          }
        ]
      },
      {
        id: "columna-pelvis",
        title: "Columna y pelvis",
        icon: "accessibility_new",
        groups: [
          {
            title: "Columna",
            icon: "orthopedics",
            items: [
              "Columna cervical AP y lateral",
              "Columna dorsal AP y lateral",
              "Columna lumbar AP y lateral",
              "Columna lumbosacra",
              "Columna cervical oblicuas",
              "Columna lumbar oblicuas"
            ]
          },
          {
            title: "Pelvis y cadera",
            icon: "man_4",
            items: [
              "Pelvis AP",
              "Cadera AP",
              "Cadera lateral",
              "Sacro c\xF3ccix",
              "Articulaciones sacroil\xEDacas"
            ]
          }
        ]
      },
      {
        id: "torax",
        title: "T\xF3rax",
        icon: "respiratory_rate",
        groups: [
          {
            title: "T\xF3rax y costillas",
            icon: "air",
            items: [
              "T\xF3rax PA",
              "T\xF3rax AP port\xE1til",
              "T\xF3rax lateral",
              "Costillas unilateral",
              "Costillas bilateral",
              "Estern\xF3n"
            ]
          },
          {
            title: "Otras proyecciones",
            icon: "monitor_heart",
            items: [
              "Parrilla costal",
              "Clav\xEDculas",
              "Articulaciones esternoclaviculares"
            ]
          }
        ]
      },
      {
        id: "abdomen",
        title: "Abdomen",
        icon: "abdomen",
        groups: [
          {
            title: "Abdomen simple",
            icon: "clinical_notes",
            items: [
              "Abdomen simple",
              "Abdomen de pie",
              "Abdomen acostado",
              "Serie obstructiva"
            ]
          }
        ]
      },
      {
        id: "extremidad-superior",
        title: "Extremidad superior",
        icon: "pan_tool",
        groups: [
          {
            title: "Miembro superior",
            icon: "back_hand",
            items: [
              "Hombro",
              "Clav\xEDcula",
              "Esc\xE1pula",
              "H\xFAmero",
              "Codo",
              "Antebrazo",
              "Mu\xF1eca",
              "Mano",
              "Dedos"
            ]
          }
        ]
      },
      {
        id: "extremidad-inferior",
        title: "Extremidad inferior",
        icon: "directions_walk",
        groups: [
          {
            title: "Miembro inferior",
            icon: "footprint",
            items: [
              "F\xE9mur",
              "Rodilla",
              "Pierna",
              "Tobillo",
              "Pie",
              "Calc\xE1neo",
              "Dedos del pie"
            ]
          }
        ]
      },
      {
        id: "especiales",
        title: "Estudios especiales",
        icon: "biotech",
        groups: [
          {
            title: "Contrastes y especializados",
            icon: "science",
            items: [
              "Tubo digestivo superior",
              "Tr\xE1nsito intestinal",
              "Pielograma",
              "Enema baritado (colon)",
              "Esofagograma",
              "Serie es\xF3fago-gastro-duodenal",
              "Otro"
            ]
          }
        ]
      },
      {
        id: "mamografia",
        title: "Mamograf\xEDa",
        icon: "female",
        groups: [
          {
            title: "Opciones de mamograf\xEDa",
            icon: "favorite",
            items: [
              "Mamograf\xEDa",
              "Mamograf\xEDa digitalizada",
              "Tomos\xEDntesis",
              "Galactograf\xEDa"
            ]
          }
        ]
      }
    ]
  });
}
__name(renderEstudiosRayosXPage, "renderEstudiosRayosXPage");

// pages/estudios-mamografia.js
function renderEstudiosMamografiaPage() {
  return renderEstudioDetallePage({
    title: "Estudios de mamograf\xEDa",
    breadcrumb: "Mamograf\xEDa",
    heroImage: "https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Mamografia.png",
    badge: "Mamograf\xEDa",
    sections: [
      {
        id: "mamografia",
        title: "Mamograf\xEDa",
        icon: "female",
        groups: [
          {
            title: "Opciones disponibles",
            icon: "favorite",
            items: [
              "Mamograf\xEDa",
              "Mamograf\xEDa digitalizada",
              "Tomos\xEDntesis",
              "Galactograf\xEDa"
            ]
          }
        ]
      }
    ]
  });
}
__name(renderEstudiosMamografiaPage, "renderEstudiosMamografiaPage");

// pages/estudios-especiales.js
function renderEstudiosEspecialesPage() {
  return renderEstudioDetallePage({
    title: "Estudios especiales",
    breadcrumb: "Estudios especiales",
    heroImage: "https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/EstudiosEspeciales.webp",
    badge: "Estudios especiales",
    sections: [
      {
        id: "contrastes",
        title: "Estudios contrastados y especiales",
        icon: "biotech",
        groups: [
          {
            title: "Tubo digestivo",
            icon: "clinical_notes",
            items: [
              "Tubo digestivo superior",
              "Tr\xE1nsito intestinal",
              "Esofagograma",
              "Serie es\xF3fago-gastro-duodenal"
            ]
          },
          {
            title: "Sistema urinario",
            icon: "water_drop",
            items: [
              "Pielograma"
            ]
          },
          {
            title: "Colon y otros",
            icon: "science",
            items: [
              "Enema baritado (colon)",
              "Galactograf\xEDa",
              "Otro"
            ]
          }
        ]
      }
    ]
  });
}
__name(renderEstudiosEspecialesPage, "renderEstudiosEspecialesPage");

// pages/laboratorio.js
function renderLaboratorioPage() {
  return `<!DOCTYPE html>
<html class="light" lang="es">
  <head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>Laboratorio Cl\xEDnico | Cl\xEDnica Dr. Mendoza</title>
    <meta
      name="description"
      content="Conozca las categor\xEDas de ex\xE1menes de laboratorio cl\xEDnico disponibles en Cl\xEDnica Dr. Mendoza."
    />
    <link
      rel="icon"
      type="image/png"
      href="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/faviconDr.png"
    />

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
              ink: "#1c0d0d",
              soft: "#6f5a5a",
            },
            fontFamily: {
              display: ["Public Sans", "sans-serif"],
            },
            boxShadow: {
              soft: "0 10px 30px rgba(80, 20, 20, 0.08)",
              card: "0 14px 38px rgba(60, 10, 10, 0.10)",
              glow: "0 18px 45px rgba(199, 5, 5, 0.14)",
            },
            borderRadius: {
              DEFAULT: "0.25rem",
              lg: "0.5rem",
              xl: "0.75rem",
              "2xl": "1rem",
              "3xl": "1.5rem",
              full: "9999px",
            },
          },
        },
      };
    <\/script>

    <style>
      html {
        scroll-behavior: smooth;
      }

      .hero-overlay {
        background:
          linear-gradient(90deg, rgba(25, 10, 10, 0.82) 0%, rgba(25, 10, 10, 0.62) 40%, rgba(25, 10, 10, 0.28) 100%),
          linear-gradient(180deg, rgba(199, 5, 5, 0.10) 0%, rgba(199, 5, 5, 0.03) 100%);
      }
    </style>
  </head>

  <body class="bg-background-light dark:bg-background-dark text-ink dark:text-[#f4e6e6] font-display overflow-x-hidden">
    ${Header()}

    <section id="top" class="relative overflow-hidden">
      <div
        class="relative min-h-[380px] md:min-h-[460px] bg-cover bg-center"
        style='background-image:url("https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80");'
      >
        <div class="absolute inset-0 hero-overlay"></div>

        <div class="relative max-w-[1280px] mx-auto px-4 md:px-10 h-full min-h-[380px] md:min-h-[460px] flex items-center">
          <div class="max-w-3xl py-14 md:py-20 flex flex-col gap-5">
            <div class="flex items-center gap-2 text-xs font-bold text-[#f2d6d6]">
              <a href="/index.html" class="hover:text-white transition-colors">Inicio</a>
              <span class="opacity-70">/</span>
              <span class="text-white">Laboratorio cl\xEDnico</span>
            </div>

            <div class="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold text-white backdrop-blur-sm">
              <span class="material-symbols-outlined text-base">science</span>
              Laboratorio cl\xEDnico
            </div>

            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.02]">
              Categor\xEDas de ex\xE1menes de laboratorio
            </h1>

            <div class="flex flex-wrap gap-3 pt-2">
              <a
                href="#categorias"
                class="inline-flex items-center justify-center rounded-full h-11 px-6 bg-primary text-white text-sm font-black shadow-glow hover:opacity-95 transition-opacity"
              >
                Ver categor\xEDas
              </a>

              <a
                href="https://wa.me/50378205613"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center justify-center rounded-full h-11 px-6 border border-white/25 bg-white/10 text-white text-sm font-black backdrop-blur-sm hover:bg-white/15 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="categorias" class="relative py-10 md:py-14">
      <div class="max-w-[1280px] mx-auto px-4 md:px-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <article class="group overflow-hidden rounded-3xl border border-[#ead0d0] dark:border-[#3a1e1e] bg-white dark:bg-[#2a1212] shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div class="relative">
              <div class="absolute inset-x-0 top-0 h-1 bg-primary z-10"></div>
              <div class="h-56 bg-gradient-to-br from-[#fff3f3] to-[#f9dcdc] dark:from-[#341818] dark:to-[#241010] flex items-center justify-center">
                <span class="material-symbols-outlined text-primary !text-[84px]">biotech</span>
              </div>
            </div>
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-black text-ink dark:text-white">Qu\xEDmica sangu\xEDnea</h2>
                <span class="rounded-full bg-[#f9ecec] dark:bg-[#341818] p-2 text-primary">
                  <span class="material-symbols-outlined text-[20px]">biotech</span>
                </span>
              </div>
              <a href="/laboratorio-quimica.html" class="inline-flex items-center gap-1 text-primary text-sm font-black hover:underline">
                Ver categor\xEDa
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </article>

          <article class="group overflow-hidden rounded-3xl border border-[#ead0d0] dark:border-[#3a1e1e] bg-white dark:bg-[#2a1212] shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div class="relative">
              <div class="absolute inset-x-0 top-0 h-1 bg-primary z-10"></div>
              <div class="h-56 bg-gradient-to-br from-[#fff3f3] to-[#f9dcdc] dark:from-[#341818] dark:to-[#241010] flex items-center justify-center">
                <span class="material-symbols-outlined text-primary !text-[84px]">bloodtype</span>
              </div>
            </div>
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-black text-ink dark:text-white">Hematolog\xEDa</h2>
                <span class="rounded-full bg-[#f9ecec] dark:bg-[#341818] p-2 text-primary">
                  <span class="material-symbols-outlined text-[20px]">bloodtype</span>
                </span>
              </div>
              <a href="/laboratorio-hematologia.html" class="inline-flex items-center gap-1 text-primary text-sm font-black hover:underline">
                Ver categor\xEDa
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </article>

          <article class="group overflow-hidden rounded-3xl border border-[#ead0d0] dark:border-[#3a1e1e] bg-white dark:bg-[#2a1212] shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div class="relative">
              <div class="absolute inset-x-0 top-0 h-1 bg-primary z-10"></div>
              <div class="h-56 bg-gradient-to-br from-[#fff3f3] to-[#f9dcdc] dark:from-[#341818] dark:to-[#241010] flex items-center justify-center">
                <span class="material-symbols-outlined text-primary !text-[84px]">vaccines</span>
              </div>
            </div>
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-black text-ink dark:text-white">Inmunolog\xEDa</h2>
                <span class="rounded-full bg-[#f9ecec] dark:bg-[#341818] p-2 text-primary">
                  <span class="material-symbols-outlined text-[20px]">vaccines</span>
                </span>
              </div>
              <a href="/laboratorio-inmunologia.html" class="inline-flex items-center gap-1 text-primary text-sm font-black hover:underline">
                Ver categor\xEDa
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </article>

          <article class="group overflow-hidden rounded-3xl border border-[#ead0d0] dark:border-[#3a1e1e] bg-white dark:bg-[#2a1212] shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div class="relative">
              <div class="absolute inset-x-0 top-0 h-1 bg-primary z-10"></div>
              <div class="h-56 bg-gradient-to-br from-[#fff3f3] to-[#f9dcdc] dark:from-[#341818] dark:to-[#241010] flex items-center justify-center">
                <span class="material-symbols-outlined text-primary !text-[84px]">emoji_nature</span>
              </div>
            </div>
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-black text-ink dark:text-white">Coprolog\xEDa</h2>
                <span class="rounded-full bg-[#f9ecec] dark:bg-[#341818] p-2 text-primary">
                  <span class="material-symbols-outlined text-[20px]">emoji_nature</span>
                </span>
              </div>
              <a href="/laboratorio-coprologia.html" class="inline-flex items-center gap-1 text-primary text-sm font-black hover:underline">
                Ver categor\xEDa
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </article>

          <article class="group overflow-hidden rounded-3xl border border-[#ead0d0] dark:border-[#3a1e1e] bg-white dark:bg-[#2a1212] shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div class="relative">
              <div class="absolute inset-x-0 top-0 h-1 bg-primary z-10"></div>
              <div class="h-56 bg-gradient-to-br from-[#fff3f3] to-[#f9dcdc] dark:from-[#341818] dark:to-[#241010] flex items-center justify-center">
                <span class="material-symbols-outlined text-primary !text-[84px]">coronavirus</span>
              </div>
            </div>
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-black text-ink dark:text-white">Bacteriolog\xEDa</h2>
                <span class="rounded-full bg-[#f9ecec] dark:bg-[#341818] p-2 text-primary">
                  <span class="material-symbols-outlined text-[20px]">coronavirus</span>
                </span>
              </div>
              <a href="/laboratorio-bacteriologia.html" class="inline-flex items-center gap-1 text-primary text-sm font-black hover:underline">
                Ver categor\xEDa
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </article>

          <article class="group overflow-hidden rounded-3xl border border-[#ead0d0] dark:border-[#3a1e1e] bg-white dark:bg-[#2a1212] shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div class="relative">
              <div class="absolute inset-x-0 top-0 h-1 bg-primary z-10"></div>
              <div class="h-56 bg-gradient-to-br from-[#fff3f3] to-[#f9dcdc] dark:from-[#341818] dark:to-[#241010] flex items-center justify-center">
                <span class="material-symbols-outlined text-primary !text-[84px]">water_drop</span>
              </div>
            </div>
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-black text-ink dark:text-white">Uroan\xE1lisis</h2>
                <span class="rounded-full bg-[#f9ecec] dark:bg-[#341818] p-2 text-primary">
                  <span class="material-symbols-outlined text-[20px]">water_drop</span>
                </span>
              </div>
              <a href="/laboratorio-uroanalisis.html" class="inline-flex items-center gap-1 text-primary text-sm font-black hover:underline">
                Ver categor\xEDa
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </article>

          <article class="group overflow-hidden rounded-3xl border border-[#ead0d0] dark:border-[#3a1e1e] bg-white dark:bg-[#2a1212] shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div class="relative">
              <div class="absolute inset-x-0 top-0 h-1 bg-primary z-10"></div>
              <div class="h-56 bg-gradient-to-br from-[#fff3f3] to-[#f9dcdc] dark:from-[#341818] dark:to-[#241010] flex items-center justify-center">
                <span class="material-symbols-outlined text-primary !text-[84px]">experiment</span>
              </div>
            </div>
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-black text-ink dark:text-white">Pruebas especiales</h2>
                <span class="rounded-full bg-[#f9ecec] dark:bg-[#341818] p-2 text-primary">
                  <span class="material-symbols-outlined text-[20px]">experiment</span>
                </span>
              </div>
              <a href="/laboratorio-pruebas-especiales.html" class="inline-flex items-center gap-1 text-primary text-sm font-black hover:underline">
                Ver categor\xEDa
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </article>

          <article class="group overflow-hidden rounded-3xl border border-[#ead0d0] dark:border-[#3a1e1e] bg-white dark:bg-[#2a1212] shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div class="relative">
              <div class="absolute inset-x-0 top-0 h-1 bg-primary z-10"></div>
              <div class="h-56 bg-gradient-to-br from-[#fff3f3] to-[#f9dcdc] dark:from-[#341818] dark:to-[#241010] flex items-center justify-center">
                <span class="material-symbols-outlined text-primary !text-[84px]">playlist_add_check_circle</span>
              </div>
            </div>
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center justify-between gap-3">
                <h2 class="text-xl font-black text-ink dark:text-white">Perfiles de laboratorio</h2>
                <span class="rounded-full bg-[#f9ecec] dark:bg-[#341818] p-2 text-primary">
                  <span class="material-symbols-outlined text-[20px]">playlist_add_check_circle</span>
                </span>
              </div>
              <a href="/laboratorio-perfiles.html" class="inline-flex items-center gap-1 text-primary text-sm font-black hover:underline">
                Ver categor\xEDa
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="pb-12 md:pb-16">
      <div class="max-w-[1280px] mx-auto px-4 md:px-10">
        <div class="rounded-3xl border border-[#ead4d4] dark:border-[#392020] bg-gradient-to-r from-white to-[#fff7f7] dark:from-[#2a1212] dark:to-[#241010] p-6 md:p-8 shadow-soft">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <h2 class="text-2xl md:text-3xl font-black text-ink dark:text-white tracking-tight">
              Consulta informaci\xF3n general por WhatsApp
            </h2>

            <a
              href="https://wa.me/50378205613"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center rounded-full h-11 px-6 bg-[#25D366] text-white text-sm font-black shadow-soft hover:opacity-95 transition-opacity"
            >
              WhatsApp
            </a>
          </div>
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
__name(renderLaboratorioPage, "renderLaboratorioPage");

// pages/templates/laboratorio-detalle.js
function renderLaboratorioDetallePage({
  title,
  breadcrumb,
  heroImage,
  badge = "Laboratorio cl\xEDnico",
  ctaHref = "https://wa.me/50378205613",
  ctaText = "Consultar por WhatsApp",
  note = "",
  sections = []
}) {
  const noteHtml = note ? `
      <section class="py-8 md:py-10">
        <div class="max-w-[1280px] mx-auto px-4 md:px-10">
          <div class="rounded-3xl border border-[#ead4d4] dark:border-[#392020] bg-white dark:bg-[#2a1212] p-5 md:p-6 shadow-soft">
            <div class="flex flex-wrap items-center gap-3">
              <span class="inline-flex items-center gap-2 rounded-full bg-[#f8eaea] dark:bg-[#341818] px-4 py-2 text-sm font-black text-primary">
                <span class="material-symbols-outlined text-[18px]">info</span>
                Informaci\xF3n general
              </span>
              <p class="text-sm md:text-base text-soft dark:text-[#d3c1c1]">
                ${note}
              </p>
            </div>
          </div>
        </div>
      </section>
    ` : "";
  const sectionsHtml = sections.map(
    (section) => `
      <section id="${section.id || ""}" class="pb-10 md:pb-14">
        <div class="max-w-[1280px] mx-auto px-4 md:px-10">
          <div class="mb-6">
            <div class="inline-flex items-center gap-2 rounded-full bg-[#f8eaea] dark:bg-[#341818] px-4 py-2 text-xs font-extrabold text-primary">
              <span class="material-symbols-outlined text-base">${section.icon || "science"}</span>
              ${section.title}
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            ${section.groups.map(
      (group) => `
                <article class="rounded-3xl border border-[#ead0d0] dark:border-[#3a1e1e] bg-white dark:bg-[#2a1212] shadow-soft overflow-hidden">
                  <div class="h-1 bg-primary"></div>
                  <div class="p-6">
                    <div class="flex items-center gap-3 mb-5">
                      <span class="rounded-full bg-[#f9ecec] dark:bg-[#341818] p-2 text-primary">
                        <span class="material-symbols-outlined text-[20px]">${group.icon || "check_circle"}</span>
                      </span>
                      <h2 class="text-xl font-black text-ink dark:text-white">${group.title}</h2>
                    </div>

                    <ul class="space-y-3 text-sm md:text-base text-soft dark:text-[#d3c1c1] font-medium">
                      ${group.items.map((item) => `<li>${item}</li>`).join("")}
                    </ul>
                  </div>
                </article>
              `
    ).join("")}
          </div>
        </div>
      </section>
    `
  ).join("");
  return `<!DOCTYPE html>
<html class="light" lang="es">
  <head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>${title} | Cl\xEDnica Dr. Mendoza</title>
    <meta
      name="description"
      content="Consulte los ex\xE1menes disponibles de ${title} en Cl\xEDnica Dr. Mendoza."
    />
    <link
      rel="icon"
      type="image/png"
      href="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/faviconDr.png"
    />

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
              ink: "#1c0d0d",
              soft: "#6f5a5a",
            },
            fontFamily: {
              display: ["Public Sans", "sans-serif"],
            },
            boxShadow: {
              soft: "0 10px 30px rgba(80, 20, 20, 0.08)",
              card: "0 14px 38px rgba(60, 10, 10, 0.10)",
              glow: "0 18px 45px rgba(199, 5, 5, 0.14)",
            },
            borderRadius: {
              DEFAULT: "0.25rem",
              lg: "0.5rem",
              xl: "0.75rem",
              "2xl": "1rem",
              "3xl": "1.5rem",
              full: "9999px",
            },
          },
        },
      };
    <\/script>

    <style>
      html {
        scroll-behavior: smooth;
      }

      .hero-overlay {
        background:
          linear-gradient(90deg, rgba(25, 10, 10, 0.82) 0%, rgba(25, 10, 10, 0.62) 40%, rgba(25, 10, 10, 0.28) 100%),
          linear-gradient(180deg, rgba(199, 5, 5, 0.10) 0%, rgba(199, 5, 5, 0.03) 100%);
      }
    </style>
  </head>

  <body class="bg-background-light dark:bg-background-dark text-ink dark:text-[#f4e6e6] font-display overflow-x-hidden">
    ${Header()}

    <section id="top" class="relative overflow-hidden">
      <div
        class="relative min-h-[360px] md:min-h-[440px] bg-cover bg-center"
        style='background-image:url("${heroImage}");'
      >
        <div class="absolute inset-0 hero-overlay"></div>

        <div class="relative max-w-[1280px] mx-auto px-4 md:px-10 min-h-[360px] md:min-h-[440px] flex items-center">
          <div class="max-w-3xl py-14 md:py-20 flex flex-col gap-5">
            <div class="flex items-center gap-2 text-xs font-bold text-[#f2d6d6]">
              <a href="/index.html" class="hover:text-white transition-colors">Inicio</a>
              <span class="opacity-70">/</span>
              <a href="/laboratorio.html" class="hover:text-white transition-colors">Laboratorio cl\xEDnico</a>
              <span class="opacity-70">/</span>
              <span class="text-white">${breadcrumb || title}</span>
            </div>

            <div class="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold text-white backdrop-blur-sm">
              <span class="material-symbols-outlined text-base">science</span>
              ${badge}
            </div>

            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.02]">
              ${title}
            </h1>

            <div class="flex flex-wrap gap-3 pt-2">
              <a
                href="#detalle"
                class="inline-flex items-center justify-center rounded-full h-11 px-6 bg-primary text-white text-sm font-black shadow-glow hover:opacity-95 transition-opacity"
              >
                Ver ex\xE1menes
              </a>

              <a
                href="${ctaHref}"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center justify-center rounded-full h-11 px-6 border border-white/25 bg-white/10 text-white text-sm font-black backdrop-blur-sm hover:bg-white/15 transition-colors"
              >
                ${ctaText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${noteHtml}

    <div id="detalle">
      ${sectionsHtml}
    </div>

    <section class="pb-12 md:pb-16">
      <div class="max-w-[1280px] mx-auto px-4 md:px-10">
        <div class="rounded-3xl border border-[#ead4d4] dark:border-[#392020] bg-gradient-to-r from-white to-[#fff7f7] dark:from-[#2a1212] dark:to-[#241010] p-6 md:p-8 shadow-soft">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl md:text-3xl font-black text-ink dark:text-white tracking-tight">
                \xBFDesea consultar disponibilidad?
              </h2>
              <p class="mt-2 text-sm md:text-base text-soft dark:text-[#d3c1c1]">
                Puede escribirnos para confirmar informaci\xF3n general sobre ex\xE1menes y perfiles.
              </p>
            </div>

            <a
              href="${ctaHref}"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center rounded-full h-11 px-6 bg-[#25D366] text-white text-sm font-black shadow-soft hover:opacity-95 transition-opacity"
            >
              WhatsApp
            </a>
          </div>
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
__name(renderLaboratorioDetallePage, "renderLaboratorioDetallePage");

// pages/laboratorio-quimica.js
function renderLaboratorioQuimicaPage() {
  return renderLaboratorioDetallePage({
    title: "Ex\xE1menes de qu\xEDmica sangu\xEDnea",
    breadcrumb: "Qu\xEDmica sangu\xEDnea",
    heroImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    badge: "Qu\xEDmica sangu\xEDnea",
    sections: [
      {
        id: "quimica",
        title: "Qu\xEDmica sangu\xEDnea",
        icon: "biotech",
        groups: [
          {
            title: "Bioqu\xEDmica general",
            icon: "science",
            items: [
              "Glucosa",
              "Urea",
              "Creatinina",
              "\xC1cido \xFArico",
              "Calcio s\xE9rico",
              "F\xF3sforo en sangre",
              "Magnesio en suero"
            ]
          },
          {
            title: "Perfil hep\xE1tico y pancre\xE1tico",
            icon: "monitor_heart",
            items: [
              "Bilirrubinas",
              "Fosfatasa alcalina",
              "Gamma glutamil transferasa GGT",
              "Amilasa pancre\xE1tica",
              "Lipasa en suero"
            ]
          },
          {
            title: "L\xEDpidos y metabolismo",
            icon: "bloodtype",
            items: [
              "Colesterol HDL",
              "Colesterol LDL",
              "Colesterol VLDL",
              "Colesterol total",
              "Triglic\xE9ridos",
              "L\xEDpidos totales"
            ]
          }
        ]
      }
    ]
  });
}
__name(renderLaboratorioQuimicaPage, "renderLaboratorioQuimicaPage");

// pages/laboratorio-hematologia.js
function renderLaboratorioHematologiaPage() {
  return renderLaboratorioDetallePage({
    title: "Ex\xE1menes de hematolog\xEDa",
    breadcrumb: "Hematolog\xEDa",
    heroImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    badge: "Hematolog\xEDa",
    sections: [
      {
        id: "hematologia",
        title: "Hematolog\xEDa",
        icon: "bloodtype",
        groups: [
          {
            title: "Hemograma y recuentos",
            icon: "biotech",
            items: [
              "Hemograma + plaquetas",
              "Hematocrito - hemoglobina",
              "Leucograma",
              "Plaquetas recuento",
              "Reticulocitos",
              "Eritrosedimentaci\xF3n"
            ]
          },
          {
            title: "Frotis y estudios celulares",
            icon: "science",
            items: [
              "Frotis de sangre perif\xE9rica",
              "C\xE9lulas falciformes",
              "Cristalizaci\xF3n en helecho",
              "Eosin\xF3filos nasales",
              "Gota gruesa"
            ]
          },
          {
            title: "Coagulaci\xF3n",
            icon: "monitor_heart",
            items: [
              "Fibrin\xF3geno",
              "D\xEDmero D",
              "Lupus anticoagulante",
              "Tiempo de coagulaci\xF3n",
              "Tiempo de protrombina",
              "Tiempo de sangramiento",
              "Tiempo de trombina",
              "Tiempo de tromboplastina parcial"
            ]
          },
          {
            title: "Estudios especiales hematol\xF3gicos",
            icon: "experiment",
            items: [
              "Tripanosoma concentrado de Strout"
            ]
          }
        ]
      }
    ]
  });
}
__name(renderLaboratorioHematologiaPage, "renderLaboratorioHematologiaPage");

// pages/laboratorio-inmunologia.js
function renderLaboratorioInmunologiaPage() {
  return renderLaboratorioDetallePage({
    title: "Ex\xE1menes de inmunolog\xEDa",
    breadcrumb: "Inmunolog\xEDa",
    heroImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    badge: "Inmunolog\xEDa",
    sections: [
      {
        id: "inmunologia",
        title: "Inmunolog\xEDa",
        icon: "vaccines",
        groups: [
          {
            title: "Autoinmunidad",
            icon: "shield",
            items: [
              "A.N.A anticuerpos antinucleares",
              "A.N.A anticuerpos antinucleares por IFI",
              "Anti m\xFAsculo liso",
              "Anticuerpo antimitocondrial",
              "Anticuerpos anticitrulina",
              "Antifosfol\xEDpidos IgG / IgM",
              "Anti-streptolisina O",
              "Beta2-glicoprote\xEDna",
              "Cardiolipinas IgG / IgM",
              "C\xE9lulas LE",
              "Complemento C3 / C4",
              "P-ANCA",
              "Prote\xEDna C reactiva",
              "Prote\xEDna C ultrasensible",
              "Latex factor reumatoideo"
            ]
          },
          {
            title: "Infecciosas y serolog\xEDas",
            icon: "coronavirus",
            items: [
              "Ant\xEDgenos febriles",
              "Chagas anticuerpos cuantitativo",
              "Cisticercos IgG / IgM",
              "Citomegalovirus IgG / IgM",
              "Clamydia IgG / IgM",
              "Dengue anticuerpos IgG / IgM",
              "FTA-ABS",
              "Helicobacter pylori IgG / IgM",
              "Hepatitis A cualitativo / cuantitativo",
              "Hepatitis B cualitativo / cuantitativo",
              "Hepatitis C cualitativo / cuantitativo",
              "HIV",
              "HIV 4G",
              "Monotest IgG / IgM",
              "Toxoplasma IgG / IgM",
              "VDRL"
            ]
          },
          {
            title: "Hormonas y marcadores relacionados",
            icon: "endocrinology",
            items: [
              "Hormona paratiroidea intacta",
              "Interleucina",
              "Niveles de amonio s\xE9rico",
              "Procalcitonina",
              "Prueba de embarazo en sangre",
              "Tipo sangu\xEDneo y RH",
              "Prueba cruzada",
              "Coombs directo / indirecto"
            ]
          }
        ]
      }
    ]
  });
}
__name(renderLaboratorioInmunologiaPage, "renderLaboratorioInmunologiaPage");

// pages/laboratorio-coprologia.js
function renderLaboratorioCoprologiaPage() {
  return renderLaboratorioDetallePage({
    title: "Ex\xE1menes de coprolog\xEDa",
    breadcrumb: "Coprolog\xEDa",
    heroImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    badge: "Coprolog\xEDa",
    sections: [
      {
        id: "coprologia",
        title: "Coprolog\xEDa",
        icon: "emoji_nature",
        groups: [
          {
            title: "Ex\xE1menes generales",
            icon: "clinical_notes",
            items: [
              "General de heces",
              "Concentrado de heces",
              "Sangre oculta en heces",
              "Sustancias reductoras"
            ]
          },
          {
            title: "Parasitolog\xEDa y coloraciones",
            icon: "science",
            items: [
              "Azul de metileno coloraci\xF3n",
              "Helicobacter pylori en heces"
            ]
          },
          {
            title: "M\xE9todos especiales",
            icon: "biotech",
            items: [
              "M\xE9todo de Graham (oxiuros)",
              "Rotavirus"
            ]
          }
        ]
      }
    ]
  });
}
__name(renderLaboratorioCoprologiaPage, "renderLaboratorioCoprologiaPage");

// pages/laboratorio-bacteriologia.js
function renderLaboratorioBacteriologiaPage() {
  return renderLaboratorioDetallePage({
    title: "Ex\xE1menes de bacteriolog\xEDa",
    breadcrumb: "Bacteriolog\xEDa",
    heroImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    badge: "Bacteriolog\xEDa",
    sections: [
      {
        id: "bacteriologia",
        title: "Bacteriolog\xEDa",
        icon: "coronavirus",
        groups: [
          {
            title: "Cultivos",
            icon: "science",
            items: [
              "Coprocultivo",
              "Cultivo de esputo",
              "Cultivo de heces",
              "Cultivo de secreci\xF3n",
              "Cultivo vaginal",
              "Hemocultivo",
              "Urocultivo"
            ]
          },
          {
            title: "Tinciones y observaci\xF3n directa",
            icon: "biotech",
            items: [
              "BAAR en esputo",
              "BAAR en orina",
              "Gram",
              "KOH"
            ]
          },
          {
            title: "Otros estudios microbiol\xF3gicos",
            icon: "experiment",
            items: [
              "Antibiograma"
            ]
          }
        ]
      }
    ]
  });
}
__name(renderLaboratorioBacteriologiaPage, "renderLaboratorioBacteriologiaPage");

// pages/laboratorio-uroanalisis.js
function renderLaboratorioUroanalisisPage() {
  return renderLaboratorioDetallePage({
    title: "Ex\xE1menes de uroan\xE1lisis",
    breadcrumb: "Uroan\xE1lisis",
    heroImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    badge: "Uroan\xE1lisis",
    sections: [
      {
        id: "uroanalisis",
        title: "Uroan\xE1lisis",
        icon: "water_drop",
        groups: [
          {
            title: "Ex\xE1menes generales",
            icon: "clinical_notes",
            items: [
              "General de orina",
              "Creatinina en orina",
              "Depuraci\xF3n de creatinina",
              "Prote\xEDnas en orina de 24 horas",
              "Microalbuminuria",
              "Bence Jones"
            ]
          },
          {
            title: "Sedimento y qu\xEDmica urinaria",
            icon: "biotech",
            items: [
              "Sedimento urinario",
              "Sustancias reductoras en orina",
              "\xC1cido \xFArico en orina",
              "Calcio en orina",
              "Sodio en orina",
              "Potasio en orina",
              "Cloro en orina"
            ]
          },
          {
            title: "Estudios especiales",
            icon: "experiment",
            items: [
              "Catecolaminas en orina de 24 horas",
              "VMA cuantitativo",
              "VMA cualitativo"
            ]
          }
        ]
      }
    ]
  });
}
__name(renderLaboratorioUroanalisisPage, "renderLaboratorioUroanalisisPage");

// pages/laboratorio-pruebas-especiales.js
function renderLaboratorioPruebasEspecialesPage() {
  return renderLaboratorioDetallePage({
    title: "Pruebas especiales de laboratorio",
    breadcrumb: "Pruebas especiales",
    heroImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    badge: "Pruebas especiales",
    sections: [
      {
        id: "pruebas-especiales",
        title: "Pruebas especiales",
        icon: "experiment",
        groups: [
          {
            title: "Hormonas y endocrinolog\xEDa",
            icon: "endocrinology",
            items: [
              "Insulina basal",
              "Insulina postprandial",
              "P\xE9ptido C",
              "TSH",
              "T3",
              "T4",
              "T3 libre",
              "T4 libre",
              "FSH",
              "LH",
              "Progesterona",
              "Prolactina",
              "Estradiol",
              "Testosterona",
              "Cortisol"
            ]
          },
          {
            title: "Marcadores y vitaminas",
            icon: "biotech",
            items: [
              "PSA total",
              "PSA libre",
              "Vitamina B12",
              "\xC1cido f\xF3lico",
              "Ferritina",
              "Hierro s\xE9rico",
              "Transferrina"
            ]
          },
          {
            title: "Otros estudios especiales",
            icon: "science",
            items: [
              "Electroforesis de prote\xEDnas",
              "Hemoglobina glicosilada",
              "CPK",
              "CPK MB",
              "Troponina",
              "LDH",
              "Homociste\xEDna"
            ]
          }
        ]
      }
    ]
  });
}
__name(renderLaboratorioPruebasEspecialesPage, "renderLaboratorioPruebasEspecialesPage");

// pages/laboratorio-perfiles.js
function renderLaboratorioPerfilesPage() {
  return renderLaboratorioDetallePage({
    title: "Perfiles de laboratorio",
    breadcrumb: "Perfiles de laboratorio",
    heroImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    badge: "Perfiles de laboratorio",
    sections: [
      {
        id: "perfiles",
        title: "Perfiles de laboratorio",
        icon: "playlist_add_check_circle",
        groups: [
          {
            title: "Perfiles metab\xF3licos y b\xE1sicos",
            icon: "biotech",
            items: [
              "Perfil diab\xE9tico",
              "Perfil lip\xEDdico",
              "Perfil renal",
              "Perfil hep\xE1tico",
              "Perfil \xF3seo"
            ]
          },
          {
            title: "Perfiles hormonales",
            icon: "endocrinology",
            items: [
              "Perfil tiroideo",
              "Perfil hormonal femenino",
              "Perfil hormonal masculino"
            ]
          },
          {
            title: "Perfiles complementarios",
            icon: "science",
            items: [
              "Perfil prenatal",
              "Perfil reum\xE1tico",
              "Perfil prost\xE1tico",
              "Perfil card\xEDaco"
            ]
          }
        ]
      }
    ]
  });
}
__name(renderLaboratorioPerfilesPage, "renderLaboratorioPerfilesPage");

// pages/portal-pacientes.js
function renderPortalPacientesPage() {
  return `<!DOCTYPE html>
<html class="light" lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Acceso al Portal de Pacientes de Cl\xEDnica Dr. Mendoza." />
    <title>Portal Pacientes | Cl\xEDnica Dr. Mendoza</title>
    <link rel="icon" type="image/png" href="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/faviconDr.png" />
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"><\/script>
    <script>
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: { primary: "#c70505", "background-light": "#fcf8f8", "background-dark": "#230f0f" },
            fontFamily: { display: ["Public Sans", "sans-serif"] },
          },
        },
      };
    <\/script>
  </head>
  <body class="bg-background-light text-[#1c0d0d] font-display overflow-hidden">
    ${Header()}

    <main class="h-[calc(100vh-4rem)] bg-[#f4f8fb] p-2 sm:p-4">
      <section class="h-full overflow-hidden rounded-lg bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] sm:rounded-xl" aria-label="Portal de Pacientes">
        <iframe
          class="h-full w-full border-0"
          src="https://drmendoza.riacs.health/patient/"
          title="Portal de Pacientes"
          loading="lazy"
          allow="clipboard-read; clipboard-write"
        ></iframe>
      </section>
    </main>

    <script>
      const menuToggle = document.getElementById("menuToggle");
      const mobileMenu = document.getElementById("mobileMenu");
      if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
        mobileMenu.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
        });
      }
    <\/script>
  </body>
</html>`;
}
__name(renderPortalPacientesPage, "renderPortalPacientesPage");

// worker.js
var worker_default = {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path === "/" || path === "/index" || path === "/index.html") {
      return new Response(renderHomePage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/portal-pacientes" || path === "/portal-pacientes.html") {
      return new Response(renderPortalPacientesPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/estudios" || path === "/estudios.html") {
      return new Response(renderEstudiosPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/laboratorio-inmunologia" || path === "/laboratorio-inmunologia.html") {
      return new Response(renderLaboratorioInmunologiaPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/estudios-rm" || path === "/estudios-rm.html") {
      return new Response(renderEstudiosRMPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/estudios-rm" || path === "/estudios-rm.html") {
      return new Response(renderEstudiosRMPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/estudios-tac" || path === "/estudios-tac.html") {
      return new Response(renderEstudiosTACPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/estudios-us" || path === "/estudios-us.html") {
      return new Response(renderEstudiosUSPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/laboratorio" || path === "/laboratorio.html") {
      return new Response(renderLaboratorioPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/estudios-rayosx" || path === "/estudios-rayosx.html") {
      return new Response(renderEstudiosRayosXPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/estudios-mamografia" || path === "/estudios-mamografia.html") {
      return new Response(renderEstudiosMamografiaPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/laboratorio-hematologia" || path === "/laboratorio-hematologia.html") {
      return new Response(renderLaboratorioHematologiaPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/laboratorio-quimica" || path === "/laboratorio-quimica.html") {
      return new Response(renderLaboratorioQuimicaPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/laboratorio-uroanalisis" || path === "/laboratorio-uroanalisis.html") {
      return new Response(renderLaboratorioUroanalisisPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/laboratorio-coprologia" || path === "/laboratorio-coprologia.html") {
      return new Response(renderLaboratorioCoprologiaPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/laboratorio-bacteriologia" || path === "/laboratorio-bacteriologia.html") {
      return new Response(renderLaboratorioBacteriologiaPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/laboratorio-perfiles" || path === "/laboratorio-perfiles.html") {
      return new Response(renderLaboratorioPerfilesPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/laboratorio-pruebas-especiales" || path === "/laboratorio-pruebas-especiales.html") {
      return new Response(renderLaboratorioPruebasEspecialesPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
      });
    }
    if (path === "/estudios-especiales" || path === "/estudios-especiales.html") {
      return new Response(renderEstudiosEspecialesPage(), {
        headers: { "content-type": "text/html; charset=UTF-8" }
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

// .wrangler/tmp/bundle-WDYZbd/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-WDYZbd/middleware-loader.entry.ts
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
