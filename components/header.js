export function Header() {
  return `
    <header
      class="clinic-header sticky top-0 z-50 w-full border-b border-[#f4e6e6] bg-[#fcf8f8]/95 backdrop-blur-sm dark:bg-[#1c0d0d]/95 dark:border-[#331f1f]"
    >
      <div
        class="clinic-header-inner flex h-16 items-center justify-between px-4 md:px-10 max-w-[1280px] mx-auto"
      >
        <a class="clinic-logo flex items-center" href="/" aria-label="Ir al inicio">
          <img
            src="https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/LogoDrMendoza3.png"
            alt="Logo Clínica Dr. Mendoza"
            class="h-12 md:h-14 w-auto object-contain"
          />
        </a>

        <nav class="clinic-nav hidden md:flex flex-1 items-center justify-end gap-7">
          <a
            class="text-sm font-medium hover:text-primary transition-colors text-[#1c0d0d] dark:text-[#f4e6e6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            href="/"
          >
            Inicio
          </a>
          <a
            class="text-sm font-medium hover:text-primary transition-colors text-[#1c0d0d] dark:text-[#f4e6e6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            href="/#institucional"
          >
            Historia
          </a>
          <a
            class="text-sm font-medium hover:text-primary transition-colors text-[#1c0d0d] dark:text-[#f4e6e6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            href="/estudios.html"
          >
            Diagnóstico por imágenes
          </a>
          <a
            class="text-sm font-medium hover:text-primary transition-colors text-[#1c0d0d] dark:text-[#f4e6e6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            href="/laboratorio.html"
          >
            Laboratorio clínico
          </a>
          <a
            class="text-sm font-medium hover:text-primary transition-colors text-[#1c0d0d] dark:text-[#f4e6e6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            href="/#sedes"
          >
            Sedes y contacto
          </a>
        </nav>

        <a href="https://wa.me/50378205613" target="_blank" rel="noopener noreferrer" class="clinic-nav-cta hidden lg:inline-flex items-center gap-2"><span class="material-symbols-outlined text-base" aria-hidden="true">chat</span> WhatsApp</a>

        <button
          id="menuToggle"
          class="clinic-menu-toggle md:hidden p-2 text-[#1c0d0d] dark:text-white"
          aria-label="Abrir menú"
          aria-expanded="false"
          aria-controls="mobileMenu"
          type="button"
        >
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>

      <div
        id="mobileMenu"
        aria-label="Navegación móvil"
        class="hidden md:hidden border-t border-[#f4e6e6] dark:border-[#331f1f] bg-[#fcf8f8] dark:bg-[#1c0d0d]"
      >
        <nav class="max-w-[1280px] mx-auto px-4 py-4 flex flex-col gap-3">
          <a class="text-sm font-medium hover:text-primary transition-colors" href="/">Inicio</a>
          <a class="text-sm font-medium hover:text-primary transition-colors" href="/#institucional">Historia</a>
          <a class="text-sm font-medium hover:text-primary transition-colors" href="/estudios.html">Diagnóstico por imágenes</a>
          <a class="text-sm font-medium hover:text-primary transition-colors" href="/laboratorio.html">Laboratorio clínico</a>
          <a class="text-sm font-medium hover:text-primary transition-colors" href="/#sedes">Sedes y contacto</a>
        </nav>
      </div>
    </header>
  `;
}
