<?php
if (!isset($pageTitle)) {
  $pageTitle = 'Clínica Radiológica y Laboratorio Clínico Dr. Mendoza';
}
?>
<!DOCTYPE html>
<html class="light" lang="es">
  <head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title><?= htmlspecialchars($pageTitle) ?></title>

    <link
      href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      rel="stylesheet"
    />
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

    <script id="tailwind-config">
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
      html {
        scroll-behavior: smooth;
      }

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