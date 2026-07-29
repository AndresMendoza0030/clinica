import { Header } from "../components/header.js";

export function renderPortalPacientesPage() {
  return `<!DOCTYPE html>
<html class="light" lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
    </script>
  </body>
</html>`;
}
