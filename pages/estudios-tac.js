import { renderEstudioDetallePage } from "./templates/estudios-detalle.js";

export function renderEstudiosTACPage() {
  return renderEstudioDetallePage({
    title: "Estudios de tomografía",
    breadcrumb: "Tomografía (TAC)",
    heroImage:
      "https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/TAC.png",
    badge: "Tomografía Multidetectores",
    preparationNote:
      'Si el estudio requiere contraste, la indicación general es <span class="font-bold text-ink dark:text-white">ayuno de 6 horas</span> y <span class="font-bold text-ink dark:text-white">examen de creatinina</span>.',
    sections: [
      {
        id: "tomografia-multidetectores",
        title: "Tomografía Multidetectores",
        icon: "scanner",
        groups: [
          {
            title: "Cráneo y cuello",
            icon: "neurology",
            items: [
              "Cerebral",
              "Órbitas",
              "Senos paranasales",
              "Silla turca",
              "Oído",
              "Cuello",
            ],
          },
          {
            title: "Tórax",
            icon: "respiratory_rate",
            items: [
              "Tórax alta resolución",
              "Tórax simple",
              "Tórax contrastado",
            ],
          },
          {
            title: "Abdomen y pelvis",
            icon: "monitor_heart",
            items: [
              "Abdomen",
              "Pelvis",
              "Abdomen y pelvis",
            ],
          },
          {
            title: "Columna",
            icon: "accessibility_new",
            items: [
              "Columna cervical",
              "Columna dorsal",
              "Columna lumbar",
            ],
          },
          {
            title: "Angio y uro-TAC",
            icon: "biotech",
            items: [
              "Angio-TAC",
              "Uro-TAC simple (pieloTAC)",
              "Uro-TAC contrastado",
            ],
          },
          {
            title: "Estudios especiales de TAC",
            icon: "clinical_notes",
            items: [
              "Osteo-TAC (densidad de columna)",
              "Otro",
            ],
          },
        ],
      },
    ],
  });
}