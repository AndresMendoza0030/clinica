import { Header } from "../../components/header.js";
import { Sedes } from "../../components/sedes.js";
import { Footer } from "../../components/footer.js";
import { WhatsAppFloat } from "../../components/whatsapp.js";

export function renderLaboratorioDetallePage({
  title,
  breadcrumb,
  heroImage,
  badge = "Laboratorio clínico",
  ctaHref = "https://wa.me/50378205613",
  ctaText = "Consultar por WhatsApp",
  note = "",
  sections = [],
}) {
  const noteHtml = note
    ? `
      <section class="py-8 md:py-10">
        <div class="max-w-[1280px] mx-auto px-4 md:px-10">
          <div class="rounded-3xl border border-[#ead4d4] dark:border-[#392020] bg-white dark:bg-[#2a1212] p-5 md:p-6 shadow-soft">
            <div class="flex flex-wrap items-center gap-3">
              <span class="inline-flex items-center gap-2 rounded-full bg-[#f8eaea] dark:bg-[#341818] px-4 py-2 text-sm font-black text-primary">
                <span class="material-symbols-outlined text-[18px]">info</span>
                Información general
              </span>
              <p class="text-sm md:text-base text-soft dark:text-[#d3c1c1]">
                ${note}
              </p>
            </div>
          </div>
        </div>
      </section>
    `
    : "";

  const sectionsHtml = sections
    .map(
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
            ${section.groups
              .map(
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
              )
              .join("")}
          </div>
        </div>
      </section>
    `
    )
    .join("");

  return `<!DOCTYPE html>
<html class="light" lang="es">
  <head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>${title} | Clínica Dr. Mendoza</title>
    <meta
      name="description"
      content="Consulte los exámenes disponibles de ${title} en Clínica Dr. Mendoza."
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
    </script>

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
              <a href="/laboratorio.html" class="hover:text-white transition-colors">Laboratorio clínico</a>
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
                Ver exámenes
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
                ¿Desea consultar disponibilidad?
              </h2>
              <p class="mt-2 text-sm md:text-base text-soft dark:text-[#d3c1c1]">
                Puede escribirnos para confirmar información general sobre exámenes y perfiles.
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
    </script>
  </body>
</html>`;
}