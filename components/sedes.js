export function Sedes() {
  return `
    <section id="sedes" class="py-16 px-4 md:px-10 bg-white dark:bg-[#1a0a0a]">
      <div class="max-w-[1280px] mx-auto">
        <div class="flex flex-col gap-3 mb-10">
          <h2 class="text-2xl md:text-3xl font-black text-[#1c0d0d] dark:text-white">
            Sedes y contacto
          </h2>
          <p class="text-sm md:text-base text-[#634f4f] dark:text-[#d3c1c1] max-w-3xl">
            Lunes a viernes 6:00 AM – 4:30 PM. Sábado 6:00 AM – 12:00 PM.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div class="grid grid-cols-1 gap-6">

            <div class="rounded-2xl border border-[#e9cece] dark:border-[#331f1f] bg-[#fcf8f8] dark:bg-[#2a1212] p-6">
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-lg font-black text-[#1c0d0d] dark:text-white">Clínica Matriz</h3>
                <span class="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                  <span class="material-symbols-outlined text-base">verified</span> Principal
                </span>
              </div>

              <div class="mt-4 space-y-3 text-sm text-[#634f4f] dark:text-[#d3c1c1]">
                <div class="flex items-start gap-3">
                  <span class="material-symbols-outlined text-primary mt-0.5">location_on</span>
                  <span>9° Av. Sur #411, Barrio La Merced, San Miguel</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary">call</span>
                  <a class="hover:underline" href="tel:+50326612345">2661-2345</a>
                </div>
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-green-500">chat</span>
                  <a class="hover:underline" href="https://wa.me/50378205613" target="_blank" rel="noopener">
                    WhatsApp: 7820-5613
                  </a>
                </div>
              </div>

              <div class="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  data-lat="13.477069"
                  data-lng="-88.182489"
                  class="map-btn inline-flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white hover:opacity-95 text-sm font-bold transition-opacity"
                >
                  Ver en el mapa
                  <span class="material-symbols-outlined text-lg ml-2">map</span>
                </button>

                <a
                  class="inline-flex items-center justify-center rounded-lg h-10 px-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold transition-colors"
                  href="https://maps.app.goo.gl/cXRW57bte2G2VioK6"
                  target="_blank"
                  rel="noopener"
                >
                  Ver en Google Maps
                  <span class="material-symbols-outlined text-lg ml-2">open_in_new</span>
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
                  <span class="material-symbols-outlined text-green-500">chat</span>
                  <a class="hover:underline" href="https://wa.me/50378195960" target="_blank" rel="noopener">
                    WhatsApp: 7819-5960
                  </a>
                </div>
              </div>

              <div class="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  data-lat="13.4847581"
                  data-lng="-88.1853542"
                  class="map-btn inline-flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white hover:opacity-95 text-sm font-bold transition-opacity"
                >
                  Ver en el mapa
                  <span class="material-symbols-outlined text-lg ml-2">map</span>
                </button>

                <a
                  class="inline-flex items-center justify-center rounded-lg h-10 px-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold transition-colors"
                  href="https://maps.app.goo.gl/1KysDJYFLpXdvZMi6"
                  target="_blank"
                  rel="noopener"
                >
                  Ver en Google Maps
                  <span class="material-symbols-outlined text-lg ml-2">open_in_new</span>
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
                  <span class="material-symbols-outlined text-green-500">chat</span>
                  <a class="hover:underline" href="https://wa.me/50378448608" target="_blank" rel="noopener">
                    WhatsApp: 7844-8608
                  </a>
                </div>
              </div>

              <div class="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  data-lat="13.4846653"
                  data-lng="-88.1857434"
                  class="map-btn inline-flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white hover:opacity-95 text-sm font-bold transition-opacity"
                >
                  Ver en el mapa
                  <span class="material-symbols-outlined text-lg ml-2">map</span>
                </button>

                <a
                  class="inline-flex items-center justify-center rounded-lg h-10 px-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold transition-colors"
                  href="https://maps.app.goo.gl/RGyf8VcgsaMdJWHx5"
                  target="_blank"
                  rel="noopener"
                >
                  Ver en Google Maps
                  <span class="material-symbols-outlined text-lg ml-2">open_in_new</span>
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