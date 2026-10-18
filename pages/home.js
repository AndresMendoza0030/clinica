import { Header } from "../components/header.js";
import { SitePolish } from "../components/site-polish.js";
import { Sedes } from "../components/sedes.js";
import { Footer } from "../components/footer.js";
import { WhatsAppFloat } from "../components/whatsapp.js";

export function renderHomePage() {
  return `<!DOCTYPE html>
<html class="light" lang="es">
  <head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>Clínica Radiológica y Laboratorio Clínico Dr. Mendoza | San Miguel</title>
    <meta name="description" content="Diagnóstico por imágenes y laboratorio clínico en San Miguel. Conozca nuestros estudios, trayectoria y sedes de Clínica Dr. Mendoza." />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_SV" />
    <meta property="og:title" content="Clínica Radiológica y Laboratorio Clínico Dr. Mendoza" />
    <meta property="og:description" content="Diagnóstico por imágenes y laboratorio clínico con experiencia y atención cercana en San Miguel." />
    <meta property="og:image" content="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/banner3.png" />
    <link rel="preload" as="image" href="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/banner3.png" />
    <link rel="icon" type="image/png" href="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/faviconDr.png" />
    <link
      href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      rel="stylesheet"
    />
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

    <script>
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              primary: "#9d2320",
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
    </script>

    <style>
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    </style>
    ${SitePolish()}
  </head>

  <body
    class="bg-background-light dark:bg-background-dark text-[#1c0d0d] dark:text-[#f4e6e6] font-display overflow-x-hidden"
  >
    ${Header()}

    <!-- HERO: fotografía de la institución, sin publicidad de servicios en desarrollo -->
    <section id="inicio" class="relative w-full">
      <div class="clinic-hero-stage relative flex items-center overflow-hidden bg-cover bg-center px-4 md:px-10 pt-20 pb-44 md:pb-48"
           aria-label="Portada de la clínica"
           style='background-image:url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/banner3.png");'>
        <div class="clinic-hero-inner">
          <div class="max-w-[830px] flex flex-col items-start gap-6">
            <span class="clinic-eyebrow text-[#f9d5d1]">Desde 2006 · San Miguel, El Salvador</span>
            <h1 class="clinic-hero-title text-white font-black">Gracias por confiarnos su salud.</h1>
            <p class="clinic-hero-desc text-white/90 text-base md:text-xl max-w-2xl">
              Diagnóstico por imágenes y laboratorio clínico con una trayectoria construida sobre la atención cercana, el compromiso y la confianza.
            </p>
            <div class="flex flex-wrap gap-3 mt-1">
              <a href="/estudios.html" class="clinic-hero-btn inline-flex items-center justify-center bg-primary text-white text-sm font-bold hover:bg-[#81201e] transition-colors">
                Conocer Nuestros Estudios <span class="material-symbols-outlined text-lg ml-1" aria-hidden="true">arrow_forward</span>
              </a>
              <a href="#sedes" class="clinic-hero-btn inline-flex items-center justify-center bg-white/10 border border-white/60 text-white text-sm font-bold hover:bg-white/20 transition-colors">
                Sedes y Contacto <span class="material-symbols-outlined text-lg ml-1" aria-hidden="true">location_on</span>
              </a>
            </div>
            <div class="clinic-hero-trust mt-4" aria-label="Información institucional">
              <span><span class="material-symbols-outlined" aria-hidden="true">verified</span> 20 años de trayectoria</span>
              <span><span class="material-symbols-outlined" aria-hidden="true">location_city</span> Tres sedes en San Miguel</span>
              <span><span class="material-symbols-outlined" aria-hidden="true">favorite</span> Atención cercana</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TARJETAS -->
    <section class="clinic-quick-section px-4 md:px-10 pb-16">
      <div class="max-w-[1280px] mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/estudios.html"
            class="clinic-quick-card group flex flex-col rounded-xl border border-[#e9cece] bg-white dark:bg-[#2a1212] p-6 hover:border-primary/30 transition-all"
          >
            <div
              class="clinic-quick-icon mb-6 flex h-14 w-14 items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors"
            >
              <span class="material-symbols-outlined text-3xl">radiology</span>
            </div>

            <h3 class="text-xl font-bold text-[#1c0d0d] dark:text-white mb-2">
              Diagnóstico por imágenes
            </h3>

            <p class="text-[#634f4f] dark:text-[#d3c1c1] text-sm leading-relaxed mb-4 flex-grow">
              Conozca nuestra oferta de estudios y modalidades disponibles.
            </p>

            <div class="flex items-center text-primary font-bold text-sm mt-auto">
              Más información
              <span class="material-symbols-outlined text-lg ml-1">arrow_forward</span>
            </div>
          </a>

          <a
            href="/laboratorio.html"
            class="clinic-quick-card group flex flex-col rounded-xl border border-[#e9cece] bg-white dark:bg-[#2a1212] p-6 hover:border-primary/30 transition-all"
          >
            <div
              class="clinic-quick-icon mb-6 flex h-14 w-14 items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors"
            >
              <span class="material-symbols-outlined text-3xl">science</span>
            </div>

            <h3 class="text-xl font-bold text-[#1c0d0d] dark:text-white mb-2">
              Laboratorio clínico
            </h3>

            <p class="text-[#634f4f] dark:text-[#d3c1c1] text-sm leading-relaxed mb-4 flex-grow">
              Amplia variedad de exámenes y perfiles para apoyar su control clínico.
            </p>

            <div class="flex items-center text-primary font-bold text-sm mt-auto">
              Más información
              <span class="material-symbols-outlined text-lg ml-1">arrow_forward</span>
            </div>
          </a>

          <a
            href="#sedes"
            class="clinic-quick-card group flex flex-col rounded-xl border border-[#e9cece] bg-white dark:bg-[#2a1212] p-6 hover:border-primary/30 transition-all"
          >
            <div
              class="clinic-quick-icon mb-6 flex h-14 w-14 items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors"
            >
              <span class="material-symbols-outlined text-3xl">location_on</span>
            </div>

            <h3 class="text-xl font-bold text-[#1c0d0d] dark:text-white mb-2">
              Sedes y contacto
            </h3>

            <p class="text-[#634f4f] dark:text-[#d3c1c1] text-sm leading-relaxed mb-4 flex-grow">
              Direcciones, teléfonos y WhatsApp de nuestras sedes.
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
          <div class="clinic-photo-frame relative rounded-2xl overflow-hidden shadow-2xl" aria-label="Instalaciones de Plaza Farid">
            <div
              class="aspect-video w-full bg-cover bg-center"
              style='background-image: url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/plazaFarid.png");'
            ></div>
            <div class="clinic-photo-caption absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p class="text-white font-medium">Calidad, ética y responsabilidad médica</p>
            </div>
          </div>
        </div>

        <div class="order-1 lg:order-2 flex flex-col gap-6">
          <div>
            <span class="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
              HISTORIA
            </span>
            <h2 class="clinic-section-title text-3xl md:text-4xl font-black text-[#1c0d0d] dark:text-white leading-tight">
              Trayectoria y confianza en San Miguel
            </h2>
          </div>

          <p class="text-base text-[#634f4f] dark:text-[#d3c1c1] leading-relaxed">
            Fundada el <strong>5 de abril de 2006</strong>, la Clínica Radiológica y Laboratorio Clínico Dr. Mendoza
            acompaña a pacientes y médicos con resultados confiables y atención cercana.
          </p>

          <p class="text-base text-[#634f4f] dark:text-[#d3c1c1] leading-relaxed">
            Trabajamos con enfoque en <strong>calidad</strong>, <strong>tecnología</strong> y <strong>trato humano</strong>,
            cuidando cada detalle del proceso desde la orientación inicial hasta la entrega de resultados.
          </p>

          <div class="grid grid-cols-3 gap-4 pt-4" aria-label="Trayectoria institucional">
            <div class="clinic-trust-stat"><strong>2006</strong><span>Año de fundación</span></div>
            <div class="clinic-trust-stat"><strong>20 años</strong><span>Trayectoria en San Miguel</span></div>
            <div class="clinic-trust-stat"><strong>3 sedes</strong><span>Ubicaciones para atenderle</span></div>
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

    <!-- DIAGNÓSTICO POR IMÁGENES -->
    <section id="imagenes" class="py-16 px-4 md:px-10 bg-background-light dark:bg-background-dark">
      <div class="max-w-[1280px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div class="flex flex-col gap-4">
            <h2 class="clinic-section-title text-2xl md:text-3xl font-black text-[#1c0d0d] dark:text-white">
              Diagnóstico por imágenes
            </h2>
            <p class="text-sm md:text-base text-[#634f4f] dark:text-[#d3c1c1] max-w-xl">
              Conozca la amplia variedad de estudios que realizamos, con tecnología y atención cuidadosa en cada proceso.
            </p>

            <div class="flex flex-wrap gap-2 pt-1">
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#2a1212] border border-[#e9cece] dark:border-[#331f1f]">Rayos X</span>
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#2a1212] border border-[#e9cece] dark:border-[#331f1f]">Mamografía</span>
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#2a1212] border border-[#e9cece] dark:border-[#331f1f]">Tomografía</span>
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#2a1212] border border-[#e9cece] dark:border-[#331f1f]">Resonancia Magnética</span>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="/estudios.html"
                class="inline-flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white hover:opacity-95 text-sm font-bold transition-opacity"
              >
                Más información
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

          <div class="clinic-photo-frame relative rounded-2xl overflow-hidden shadow-2xl border border-[#e9cece] dark:border-[#331f1f]">
            <div
              class="aspect-video w-full bg-cover bg-center"
              aria-label="Equipo de diagnóstico por imágenes"
              style='background-image: url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/TAC.png");'
            ></div>
            <div class="clinic-photo-caption absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p class="text-white font-semibold text-sm">Tecnología y precisión</p>
            </div>
          </div>
        </div>

        <div class="clinic-modality-grid grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          <a href="/estudios-rayosx.html" class="clinic-modality-card group" aria-label="Ver estudios de Rayos X">
            <div class="photo"><img src="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Rayos%20X.png" loading="lazy" decoding="async" alt="Rayos X · equipo o modalidad diagnóstica"></div>
            <div class="clinic-modality-copy">
              <h3 class="text-[#1c0d0d] dark:text-white">Rayos X</h3>
              <p>Estudios radiográficos</p>
              <span class="clinic-modality-link">Conocer Estudios <span class="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span></span>
            </div>
          </a>
          <a href="/estudios-mamografia.html" class="clinic-modality-card group" aria-label="Ver estudios de Mamografía">
            <div class="photo"><img src="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Mamografia.png" loading="lazy" decoding="async" alt="Mamografía · equipo o modalidad diagnóstica"></div>
            <div class="clinic-modality-copy">
              <h3 class="text-[#1c0d0d] dark:text-white">Mamografía</h3>
              <p>Estudios de diagnóstico mamario</p>
              <span class="clinic-modality-link">Conocer Estudios <span class="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span></span>
            </div>
          </a>
          <a href="/estudios-tac.html" class="clinic-modality-card group" aria-label="Ver estudios de Tomografía">
            <div class="photo"><img src="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/TAC.png" loading="lazy" decoding="async" alt="Tomografía · equipo o modalidad diagnóstica"></div>
            <div class="clinic-modality-copy">
              <h3 class="text-[#1c0d0d] dark:text-white">Tomografía</h3>
              <p>Tomografía computarizada</p>
              <span class="clinic-modality-link">Conocer Estudios <span class="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span></span>
            </div>
          </a>
          <a href="/estudios-rm.html" class="clinic-modality-card group" aria-label="Ver estudios de Resonancia Magnética">
            <div class="photo"><img src="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Resonancia%20magnetica.png" loading="lazy" decoding="async" alt="Resonancia Magnética · equipo o modalidad diagnóstica"></div>
            <div class="clinic-modality-copy">
              <h3 class="text-[#1c0d0d] dark:text-white">Resonancia Magnética</h3>
              <p>Estudios convencionales y especializados</p>
              <span class="clinic-modality-link">Conocer Estudios <span class="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span></span>
            </div>
          </a>
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
              aria-label="Fotografía ilustrativa de laboratorio clínico"
              style='background-image: url("https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=82");'
            ></div>
            <div class="clinic-photo-caption absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p class="text-white font-semibold text-sm">Laboratorio clínico <span class="font-normal opacity-80">· Imagen ilustrativa</span></p>
            </div>
          </div>

          <div class="flex flex-col gap-4 order-1 lg:order-2">
            <h2 class="clinic-section-title text-2xl md:text-3xl font-black text-[#1c0d0d] dark:text-white">
              Laboratorio clínico
            </h2>
            <p class="text-sm md:text-base text-[#634f4f] dark:text-[#d3c1c1] max-w-xl">
              Exámenes y perfiles con resultados confiables para apoyar su control de salud y seguimiento médico.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div class="rounded-2xl border border-[#e9cece] dark:border-[#331f1f] bg-[#fcf8f8] dark:bg-[#2a1212] p-5">
                <h3 class="font-black text-[#1c0d0d] dark:text-white mb-3 text-base">Categorías</h3>
                <ul class="text-sm text-[#634f4f] dark:text-[#d3c1c1] space-y-2">
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">check_circle</span> Perfiles clínicos</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">check_circle</span> Química sanguínea</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">check_circle</span> Hematología</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">check_circle</span> Inmunología</li>
                </ul>
              </div>

              <div class="rounded-2xl border border-[#e9cece] dark:border-[#331f1f] bg-[#fcf8f8] dark:bg-[#2a1212] p-5">
                <h3 class="font-black text-[#1c0d0d] dark:text-white mb-3 text-base">Más categorías</h3>
                <ul class="text-sm text-[#634f4f] dark:text-[#d3c1c1] space-y-2">
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">check_circle</span> Coprología</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">check_circle</span> Bacteriología</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">check_circle</span> Uroanálisis</li>
                  <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-base">check_circle</span> Pruebas especiales</li>
                </ul>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="/laboratorio.html"
                class="inline-flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white hover:opacity-95 text-sm font-bold transition-opacity"
              >
                Más información
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

    <!-- MENSAJE INSTITUCIONAL: servicios reales y vías de contacto -->
    <section class="clinic-institutional-band py-14 md:py-16 px-4 md:px-10" aria-label="Compromiso de atención">
      <div class="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-7">
        <div class="max-w-3xl">
          <span class="clinic-eyebrow text-[#e9aaa5] mb-4">Compromiso Institucional</span>
          <h2 class="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight mb-3">Tecnología diagnóstica y atención humana.</h2>
          <p class="text-sm md:text-base leading-relaxed">Nuestro equipo está a su disposición para orientarle sobre los estudios, exámenes y sedes disponibles.</p>
        </div>
        <a href="#sedes" class="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-[#831f1e] font-extrabold text-sm hover:bg-[#f6e8e5] transition-colors">
          Contactar una Sede <span class="material-symbols-outlined text-lg" aria-hidden="true">arrow_forward</span>
        </a>
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
          const isOpen = !mobileMenu.classList.toggle("hidden");
          menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        mobileMenu.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", function () {
            mobileMenu.classList.add("hidden");
            menuToggle.setAttribute("aria-expanded", "false");
          });
        });
      }
    </script>
  </body>
</html>`;
}