import { Header } from "./components/header.js";
import { Sedes } from "./components/sedes.js";
import { Footer } from "./components/footer.js";
import { WhatsAppFloat } from "./components/whatsapp.js";

function renderPage() {
  return `
    <!DOCTYPE html>
    <html class="light" lang="es">
      <head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Clínica Radiológica y Laboratorio Clínico Dr. Mendoza</title>

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
      </head>

      <body
        class="bg-background-light dark:bg-background-dark text-[#1c0d0d] dark:text-[#f4e6e6] font-display overflow-x-hidden"
      >
        ${Header()}

        <section id="inicio" class="relative w-full">
          <div
            class="relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden bg-cover bg-center px-4 pt-20 pb-40 md:pb-48 text-center"
            aria-label="Portada"
            style='background-image: linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.65)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAEH9PnRdxXNNIQNOFwUpNyj8bDawbeSklBPQlBXGiBTJ0cNCVPJCwhv2zsWlKWTMTqJQqASnWe1S0Ty0GFrSiVLeskNnEvOQJJTBqLwzB2YFrDrRAoW1VwJyXpBD6C3Jppy0bXD_D9rkqk8SiUX7RbNlvT8yNA2DU-X53QY7AqGttI_Uy1hCUvStivTg6mprNmdSv6IFRbyCJmju90kSRX8sXQfrWRPmhc-kyyJ0PRykZeJtaRaCKONPbBgV-NXPaGYUwc386tifkD");'
          >
            <div class="max-w-4xl flex flex-col items-center gap-5">
              <h2 class="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl drop-shadow-sm">
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

        <section class="relative z-20 px-4 md:px-10 -mt-24 md:-mt-32 pb-16">
          <div class="max-w-[1280px] mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="#imagenes"
                class="group flex flex-col rounded-xl border border-[#e9cece] bg-white dark:bg-[#2a1212] p-6 shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all"
              >
                <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span class="material-symbols-outlined text-3xl">radiology</span>
                </div>
                <h3 class="text-xl font-bold text-[#1c0d0d] dark:text-white mb-2">Diagnóstico por imágenes</h3>
                <p class="text-[#634f4f] dark:text-[#d3c1c1] text-sm leading-relaxed mb-4 flex-grow">
                  Conozca nuestra oferta de estudios y modalidades disponibles.
                </p>
                <div class="flex items-center text-primary font-bold text-sm mt-auto">
                  Más información
                  <span class="material-symbols-outlined text-lg ml-1">arrow_forward</span>
                </div>
              </a>

              <a
                href="#laboratorio"
                class="group flex flex-col rounded-xl border border-[#e9cece] bg-white dark:bg-[#2a1212] p-6 shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all"
              >
                <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span class="material-symbols-outlined text-3xl">science</span>
                </div>
                <h3 class="text-xl font-bold text-[#1c0d0d] dark:text-white mb-2">Laboratorio clínico</h3>
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
                <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span class="material-symbols-outlined text-3xl">location_on</span>
                </div>
                <h3 class="text-xl font-bold text-[#1c0d0d] dark:text-white mb-2">Sedes y contacto</h3>
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
    </html>
  `;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/index" || url.pathname === "/index.html") {
      return new Response(renderPage(), {
        headers: {
          "content-type": "text/html; charset=UTF-8",
        },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};
