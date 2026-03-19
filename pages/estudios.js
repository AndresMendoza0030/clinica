import { Header } from "../components/header.js";
import { Sedes } from "../components/sedes.js";
import { Footer } from "../components/footer.js";
import { WhatsAppFloat } from "../components/whatsapp.js";

export function renderEstudiosPage() {
  return `<!DOCTYPE html>
<html class="light" lang="es">
  <head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>Estudios | Clínica Dr. Mendoza</title>
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
      html { scroll-behavior: smooth; }
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    </style>
  </head>

  <body class="bg-background-light dark:bg-background-dark text-[#1c0d0d] dark:text-[#f4e6e6] font-display overflow-x-hidden">
    ${Header()}

    <section id="top" class="relative">
      <div class="max-w-[1280px] mx-auto px-4 md:px-10 py-12 md:py-16">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2 text-xs font-bold text-[#9e4747]">
            <a href="/index.html" class="hover:text-primary transition-colors">Inicio</a>
            <span class="opacity-60">/</span>
            <span class="text-[#1c0d0d] dark:text-white">Estudios</span>
          </div>

          <h2 class="text-3xl md:text-5xl font-black tracking-tight text-[#1c0d0d] dark:text-white leading-tight">
            Estudios y diagnóstico por imágenes
          </h2>

          <p class="text-sm md:text-base text-[#634f4f] dark:text-[#d3c1c1] max-w-3xl">
            Seleccione una categoría para ver el detalle de estudios disponibles.
          </p>
        </div>
      </div>
    </section>

    <section id="catalogo" class="pb-10">
      <div class="max-w-[1280px] mx-auto px-4 md:px-10">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          <main class="space-y-10">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <article class="bg-white dark:bg-[#2a1212] border border-[#e9cece] dark:border-[#331f1f] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div
                  class="h-44 bg-cover bg-center"
                  style='background-image:url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Resonancia%20magnetica.png");'
                  aria-label="Resonancia Magnética"
                ></div>
                <div class="p-5 flex flex-col gap-3">
                  <h3 class="text-lg font-black text-[#1c0d0d] dark:text-white">Resonancia Magnética</h3>
                  <p class="text-sm text-[#634f4f] dark:text-[#d3c1c1] line-clamp-3">
                    Resonancia magnética convencional y especializada.
                  </p>
                  <a href="/estudios-rm.html" class="inline-flex items-center text-primary font-bold text-sm hover:underline">
                    Ver estudios <span class="material-symbols-outlined text-lg ml-1">arrow_forward</span>
                  </a>
                </div>
              </article>

              <article class="bg-white dark:bg-[#2a1212] border border-[#e9cece] dark:border-[#331f1f] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div
                  class="h-44 bg-cover bg-center"
                  style='background-image:url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/TAC.png");'
                  aria-label="Tomografía"
                ></div>
                <div class="p-5 flex flex-col gap-3">
                  <h3 class="text-lg font-black text-[#1c0d0d] dark:text-white">Tomografía (TAC)</h3>
                  <p class="text-sm text-[#634f4f] dark:text-[#d3c1c1] line-clamp-3">
                    Tomografía multidetectores con opciones de estudio por región anatómica.
                  </p>
                  <a href="/estudios-tac.html" class="inline-flex items-center text-primary font-bold text-sm hover:underline">
                    Ver estudios <span class="material-symbols-outlined text-lg ml-1">arrow_forward</span>
                  </a>
                </div>
              </article>

              <article class="bg-white dark:bg-[#2a1212] border border-[#e9cece] dark:border-[#331f1f] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div
                  class="h-44 bg-cover bg-center"
                  style='background-image:url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Ultrasonografia.png");'
                  aria-label="Ultrasonografía"
                ></div>
                <div class="p-5 flex flex-col gap-3">
                  <h3 class="text-lg font-black text-[#1c0d0d] dark:text-white">Ultrasonografía</h3>
                  <p class="text-sm text-[#634f4f] dark:text-[#d3c1c1] line-clamp-3">
                    Ultrasonido convencional y Doppler color.
                  </p>
                  <a href="/estudios-us.html" class="inline-flex items-center text-primary font-bold text-sm hover:underline">
                    Ver estudios <span class="material-symbols-outlined text-lg ml-1">arrow_forward</span>
                  </a>
                </div>
              </article>

              <article class="bg-white dark:bg-[#2a1212] border border-[#e9cece] dark:border-[#331f1f] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div
                  class="h-44 bg-cover bg-center"
                  style='background-image:url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Rayos%20X.png");'
                  aria-label="Rayos X"
                ></div>
                <div class="p-5 flex flex-col gap-3">
                  <h3 class="text-lg font-black text-[#1c0d0d] dark:text-white">Rayos X</h3>
                  <p class="text-sm text-[#634f4f] dark:text-[#d3c1c1] line-clamp-3">
                    Estudios radiográficos por región: cabeza, columna, tórax, extremidades y más.
                  </p>
                  <a href="/estudios-rayosx.html" class="inline-flex items-center text-primary font-bold text-sm hover:underline">
                    Ver estudios <span class="material-symbols-outlined text-lg ml-1">arrow_forward</span>
                  </a>
                </div>
              </article>

              <article class="bg-white dark:bg-[#2a1212] border border-[#e9cece] dark:border-[#331f1f] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div
                  class="h-44 bg-cover bg-center"
                  style='background-image:url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Mamografia.png");'
                  aria-label="Mamografía"
                ></div>
                <div class="p-5 flex flex-col gap-3">
                  <h3 class="text-lg font-black text-[#1c0d0d] dark:text-white">Mamografía</h3>
                  <p class="text-sm text-[#634f4f] dark:text-[#d3c1c1] line-clamp-3">
                    Opciones de mamografía y tomosíntesis (según disponibilidad).
                  </p>
                  <a href="/estudios-mamografia.html" class="inline-flex items-center text-primary font-bold text-sm hover:underline">
                    Ver estudios <span class="material-symbols-outlined text-lg ml-1">arrow_forward</span>
                  </a>
                </div>
              </article>

              
            </div>
          </main>

          <aside class="space-y-6 lg:sticky lg:top-20">
            <div class="bg-white dark:bg-[#2a1212] border border-[#e9cece] dark:border-[#331f1f] rounded-2xl p-5 shadow-sm">
              <a
                href="https://wa.me/50378205613"
                target="_blank"
                rel="noopener"
                class="w-full inline-flex items-center justify-center rounded-lg h-11 px-5 bg-[#25D366] text-white hover:opacity-95 text-sm font-black transition-opacity"
              >
                Consultas por WhatsApp
                <span class="material-symbols-outlined text-lg ml-2">chat</span>
              </a>
              <p class="text-xs text-[#634f4f] dark:text-[#d3c1c1] mt-3">
                Puede escribirnos para resolver dudas sobre estudios, indicaciones y sedes.
              </p>
            </div>

            <div class="bg-white dark:bg-[#2a1212] border border-[#e9cece] dark:border-[#331f1f] rounded-2xl p-5 shadow-sm">
              <div class="flex items-center gap-2 mb-3">
                <span class="material-symbols-outlined text-primary">schedule</span>
                <h4 class="font-black text-[#1c0d0d] dark:text-white">Horarios de atención</h4>
              </div>
              <div class="text-sm text-[#634f4f] dark:text-[#d3c1c1] space-y-2">
                <div class="flex justify-between border-b border-[#e9cece] dark:border-[#331f1f] pb-2">
                  <span>Lunes a viernes</span><span class="font-bold text-[#1c0d0d] dark:text-white">6:00 AM – 4:30 PM</span>
                </div>
                <div class="flex justify-between">
                  <span>Sábado</span><span class="font-bold text-[#1c0d0d] dark:text-white">6:00 AM – 12:00 PM</span>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-[#2a1212] border border-[#e9cece] dark:border-[#331f1f] rounded-2xl p-5 shadow-sm">
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary mt-0.5">image</span>
                <div>
                  <h4 class="font-black text-[#1c0d0d] dark:text-white">Cambiar imágenes</h4>
                  <p class="text-xs text-[#634f4f] dark:text-[#d3c1c1] mt-1">
                    En cada tarjeta, cambie el
                    <code class="text-xs bg-black/5 dark:bg-white/10 px-1 rounded">background-image:url(...)</code>
                    por la foto real de esa categoría.
                  </p>
                </div>
              </div>
            </div>
          </aside>
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
    </script>
  </body>
</html>`;
}