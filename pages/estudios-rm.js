import { renderEstudioDetallePage } from "./templates/estudios-detalle.js";

export function renderEstudiosRMPage() {
  return renderEstudioDetallePage({
    title: "Estudios de resonancia magnética",
    breadcrumb: "Resonancia Magnética",
    heroImage:
      "https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Resonancia%20magnetica.png",
    badge: "Resonancia Magnética",
    preparationNote:
      'Si el estudio requiere contraste, la indicación general es <span class="font-bold text-ink dark:text-white">ayuno de 6 horas</span> y <span class="font-bold text-ink dark:text-white">examen de creatinina</span>.',
    sections: [
      {
        id: "convencional",
        title: "Resonancia Magnética Convencional",
        icon: "featured_play_list",
        groups: [
          {
            title: "General",
            icon: "neurology",
            items: ["Cerebro", "Hipófisis", "Cadera", "Abdomen", "Pelvis", "Otro"],
          },
          {
            title: "Columna",
            icon: "accessibility_new",
            items: [
              "Columna cervical",
              "Columna dorsal",
              "Columna lumbar",
              "Columna cervical + panorámica",
              "Columna dorsal + panorámica",
              "Columna lumbar + panorámica",
            ],
          },
          {
            title: "Extremidades y articulaciones",
            icon: "pan_tool",
            items: ["Hombro", "Codo", "Muñeca", "Rodilla", "Tobillo", "Pie"],
          },
        ],
      },
      {
        id: "especializada",
        title: "Resonancia Magnética Especializada",
        icon: "biotech",
        groups: [
          {
            title: "Neuro",
            icon: "psychology",
            items: ["Difusión cerebral", "Espectroscopia"],
          },
          {
            title: "Vascular y angio",
            icon: "monitor_heart",
            items: ["Angio cerebral (sin contraste)", "Angio resonancia"],
          },
          {
            title: "Otros especializados",
            icon: "healing",
            items: ["Colangio resonancia", "Elastografía hepática"],
          },
        ],
      },
    ],
  });
}