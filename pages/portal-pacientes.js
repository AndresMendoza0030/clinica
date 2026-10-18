import { Header } from "../components/header.js";
import { SitePolish } from "../components/site-polish.js";

export function renderPortalPacientesPage() {
  return `<!DOCTYPE html>
<html class="light" lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow, noarchive" />
    <meta name="description" content="Acceso al Portal de Pacientes de Clínica Dr. Mendoza." />
    <title>Portal Pacientes | Clínica Dr. Mendoza</title>
    <link rel="icon" type="image/png" href="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/faviconDr.png" />
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
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
    </script>
    ${SitePolish()}
  </head>
  <body class="bg-background-light text-[#1c0d0d] font-display overflow-hidden">
    ${Header()}

    <main class="h-[calc(100vh-4rem)] bg-[#f4f8fb] p-2 sm:p-4 flex flex-col gap-2">
      <div class="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white border border-[#e4e8ec] px-4 py-3">
        <span class="text-sm text-[#5b646d]">Acceso al portal de resultados RIACS.</span>
        <a href="https://drmendoza.riacs.health/patient/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-primary font-bold text-sm hover:underline">Abrir en otra pestaña <span class="material-symbols-outlined text-base">open_in_new</span></a>
      </div>
      <section class="flex-1 min-h-0 overflow-hidden rounded-lg bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] sm:rounded-xl" aria-label="Portal de Pacientes">
        <iframe
          class="h-full w-full border-0"
          src="https://drmendoza.riacs.health/patient/"
          title="Portal de Pacientes"
          loading="lazy"
          allow="clipboard-read; clipboard-write"
          referrerpolicy="strict-origin-when-cross-origin"
        ></iframe>
      </section>
    </main>

    <script>
      const menuToggle = document.getElementById("menuToggle");
      const mobileMenu = document.getElementById("mobileMenu");
      if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
          const isOpen = !mobileMenu.classList.toggle("hidden");
          menuToggle.setAttribute("aria-expanded", String(isOpen));
        });
        mobileMenu.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            menuToggle.setAttribute("aria-expanded", "false");
          });
        });
      }
    </script>
  </body>
</html>`;
}
