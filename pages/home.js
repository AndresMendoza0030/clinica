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
    <title>Clínica Radiológica y Laboratorio Clínico Dr. Mendoza</title>
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
            Diagnóstico por imágenes y laboratorio clínico con atención cercana, tecnología y resultados confiables.
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
              href="/portal-pacientes"
              class="inline-flex items-center justify-center rounded-lg h-11 px-7 bg-white/10 text-white border border-white/20 hover:bg-white/15 text-sm font-bold transition-colors"
            >
              Portal de Pacientes
              <span class="material-symbols-outlined text-lg ml-2">clinical_notes</span>
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
            class="group flex flex-col rounded-xl border border-[#e9cece] bg-white dark:bg-[#2a1212] p-6 shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all"
          >
            <div
              class="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors"
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
          <div class="relative rounded-2xl overflow-hidden shadow-2xl" aria-label="Imagen de la clínica">
            <div
              class="aspect-video w-full bg-cover bg-center"
              style='background-image: url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/plazaFarid.png");'
            ></div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p class="text-white font-medium">Calidad, ética y responsabilidad médica</p>
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
            Fundada el <strong>5 de abril de 2006</strong>, la Clínica Radiológica y Laboratorio Clínico Dr. Mendoza
            acompaña a pacientes y médicos con resultados confiables y atención cercana.
          </p>

          <p class="text-base text-[#634f4f] dark:text-[#d3c1c1] leading-relaxed">
            Trabajamos con enfoque en <strong>calidad</strong>, <strong>tecnología</strong> y <strong>trato humano</strong>,
            cuidando cada detalle del proceso desde la orientación inicial hasta la entrega de resultados.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div class="rounded-xl border border-[#e9cece] dark:border-[#331f1f] bg-[#fcf8f8] dark:bg-[#2a1212] p-4">
              <p class="text-xs text-[#9e4747] font-semibold mb-1">Fundación</p>
              <p class="text-sm font-bold text-[#1c0d0d] dark:text-white">5 de abril de 2006</p>
            </div>
            <div class="rounded-xl border border-[#e9cece] dark:border-[#331f1f] bg-[#fcf8f8] dark:bg-[#2a1212] p-4">
              <p class="text-xs text-[#9e4747] font-semibold mb-1">Calidad</p>
              <p class="text-sm font-bold text-[#1c0d0d] dark:text-white">Resultados confiables</p>
            </div>
            <div class="rounded-xl border border-[#e9cece] dark:border-[#331f1f] bg-[#fcf8f8] dark:bg-[#2a1212] p-4">
              <p class="text-xs text-[#9e4747] font-semibold mb-1">Atención</p>
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

    <!-- DIAGNÓSTICO POR IMÁGENES -->
    <section id="imagenes" class="py-16 px-4 md:px-10 bg-background-light dark:bg-background-dark">
      <div class="max-w-[1280px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div class="flex flex-col gap-4">
            <h2 class="text-2xl md:text-3xl font-black text-[#1c0d0d] dark:text-white">
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

          <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-[#e9cece] dark:border-[#331f1f]">
            <div
              class="aspect-video w-full bg-cover bg-center"
              aria-label="Equipo de diagnóstico por imágenes"
              style='background-image: url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/TAC.png");'
            ></div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p class="text-white font-semibold text-sm">Tecnología y precisión</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <div class="rounded-2xl border border-[#e9cece] dark:border-[#331f1f] bg-white dark:bg-[#2a1212] p-6 shadow-sm">
            <div class="flex items-center gap-3 mb-3">
              <span class="material-symbols-outlined text-primary">radiology</span>
              <h3 class="font-black text-[#1c0d0d] dark:text-white">Rayos X</h3>
            </div>
            <p class="text-sm text-[#634f4f] dark:text-[#d3c1c1]">Estudios radiográficos según indicación médica.</p>
          </div>

          <div class="rounded-2xl border border-[#e9cece] dark:border-[#331f1f] bg-white dark:bg-[#2a1212] p-6 shadow-sm">
            <div class="flex items-center gap-3 mb-3">
              <span class="material-symbols-outlined text-primary">woman</span>
              <h3 class="font-black text-[#1c0d0d] dark:text-white">Mamografía</h3>
            </div>
            <p class="text-sm text-[#634f4f] dark:text-[#d3c1c1]">Evaluación mamaria con orientación previa cuando aplica.</p>
          </div>

          <div class="rounded-2xl border border-[#e9cece] dark:border-[#331f1f] bg-white dark:bg-[#2a1212] p-6 shadow-sm">
            <div class="flex items-center gap-3 mb-3">
              <span class="material-symbols-outlined text-primary">scanner</span>
              <h3 class="font-black text-[#1c0d0d] dark:text-white">Tomografía</h3>
            </div>
            <p class="text-sm text-[#634f4f] dark:text-[#d3c1c1]">Tomografía computarizada para evaluación clínica.</p>
          </div>

          <div class="rounded-2xl border border-[#e9cece] dark:border-[#331f1f] bg-white dark:bg-[#2a1212] p-6 shadow-sm">
            <div class="flex items-center gap-3 mb-3">
              <span class="material-symbols-outlined text-primary">radiology</span>
              <h3 class="font-black text-[#1c0d0d] dark:text-white">Resonancia Magnética</h3>
            </div>
            <p class="text-sm text-[#634f4f] dark:text-[#d3c1c1]">Resonancia magnética según indicación médica.</p>
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
              aria-label="Laboratorio clínico"
              style='background-image: url("https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=82");'
            ></div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p class="text-white font-semibold text-sm">Control y seguimiento clínico</p>
            </div>
          </div>

          <div class="flex flex-col gap-4 order-1 lg:order-2">
            <h2 class="text-2xl md:text-3xl font-black text-[#1c0d0d] dark:text-white">
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

    <!-- INFORMACIÓN ÚTIL: sin novedades de relleno -->
    <section id="novedades" class="py-16 px-4 md:px-10 bg-background-light dark:bg-background-dark">
      <div class="max-w-[1280px] mx-auto">
        <div class="mb-9">
          <span class="inline-flex items-center gap-2 text-primary text-xs font-extrabold tracking-wide uppercase mb-3"><span class="material-symbols-outlined text-lg" aria-hidden="true">info</span>Orientación al paciente</span>
          <h2 class="text-2xl md:text-3xl font-black text-[#1c0d0d] dark:text-white mb-3">Información útil</h2>
          <p class="text-sm md:text-base text-[#634f4f] dark:text-[#d3c1c1] max-w-2xl">Acceda a sus resultados, conozca los estudios disponibles y encuentre su sede.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/portal-pacientes" class="group flex flex-col overflow-hidden bg-white dark:bg-[#2a1212] rounded-2xl border border-[#ead0d0] dark:border-[#3a1e1e] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div class="h-44 overflow-hidden flex items-center justify-center bg-[#f6eaea] dark:bg-[#341818]">
              <span class="flex items-center justify-center rounded-3xl w-24 h-24 bg-white/75 dark:bg-white/10 shadow-sm text-primary"><span class="material-symbols-outlined !text-[58px]">clinical_notes</span></span>
            </div>
            <div class="p-6 flex flex-col flex-1">
              <span class="text-xs text-primary font-bold mb-2">PORTAL DE PACIENTES</span>
              <h3 class="text-lg font-black text-[#1c0d0d] dark:text-white mb-3">Consulte sus resultados</h3>
              <p class="text-sm leading-relaxed text-[#634f4f] dark:text-[#d3c1c1] flex-1 mb-4">Acceda al portal digital de pacientes para revisar sus resultados de estudios.</p>
              <span class="text-primary text-sm font-bold flex items-center gap-1">Acceder al portal<span class="material-symbols-outlined text-base">arrow_forward</span></span>
            </div>
          </a>
          <a href="/estudios.html" class="group flex flex-col overflow-hidden bg-white dark:bg-[#2a1212] rounded-2xl border border-[#ead0d0] dark:border-[#3a1e1e] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div class="h-44 overflow-hidden flex items-center justify-center bg-[#f6eaea] dark:bg-[#341818]">
              <img class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/TAC.png" alt="Conozca nuestros estudios" loading="lazy" decoding="async">
            </div>
            <div class="p-6 flex flex-col flex-1">
              <span class="text-xs text-primary font-bold mb-2">DIAGNÓSTICO POR IMÁGENES</span>
              <h3 class="text-lg font-black text-[#1c0d0d] dark:text-white mb-3">Conozca nuestros estudios</h3>
              <p class="text-sm leading-relaxed text-[#634f4f] dark:text-[#d3c1c1] flex-1 mb-4">Explore las modalidades de diagnóstico por imágenes y los estudios disponibles.</p>
              <span class="text-primary text-sm font-bold flex items-center gap-1">Ver estudios<span class="material-symbols-outlined text-base">arrow_forward</span></span>
            </div>
          </a>
          <a href="/#sedes" class="group flex flex-col overflow-hidden bg-white dark:bg-[#2a1212] rounded-2xl border border-[#ead0d0] dark:border-[#3a1e1e] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div class="h-44 overflow-hidden flex items-center justify-center bg-[#f6eaea] dark:bg-[#341818]">
              <img class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/plazaFarid.png" alt="Planifique su visita" loading="lazy" decoding="async">
            </div>
            <div class="p-6 flex flex-col flex-1">
              <span class="text-xs text-primary font-bold mb-2">SEDES Y CONTACTO</span>
              <h3 class="text-lg font-black text-[#1c0d0d] dark:text-white mb-3">Planifique su visita</h3>
              <p class="text-sm leading-relaxed text-[#634f4f] dark:text-[#d3c1c1] flex-1 mb-4">Encuentre direcciones y formas de contacto de las tres sedes en San Miguel.</p>
              <span class="text-primary text-sm font-bold flex items-center gap-1">Ver sedes<span class="material-symbols-outlined text-base">arrow_forward</span></span>
            </div>
          </a>
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