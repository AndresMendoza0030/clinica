import { renderEstudioDetallePage } from "./templates/estudios-detalle.js";

export function renderEstudiosEspecialesPage() {
  return renderEstudioDetallePage({
    title: "Estudios especiales",
    breadcrumb: "Estudios especiales",
    heroImage:
      "https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/EstudiosEspeciales.png",
    badge: "Estudios especiales",
    sections: [
      {
        id: "contrastes",
        title: "Estudios contrastados y especiales",
        icon: "biotech",
        groups: [
          {
            title: "Tubo digestivo",
            icon: "clinical_notes",
            items: [
              "Tubo digestivo superior",
              "Tránsito intestinal",
              "Esofagograma",
              "Serie esófago-gastro-duodenal",
            ],
          },
          {
            title: "Sistema urinario",
            icon: "water_drop",
            items: [
              "Pielograma",
            ],
          },
          {
            title: "Colon y otros",
            icon: "science",
            items: [
              "Enema baritado (colon)",
              "Galactografía",
              "Otro",
            ],
          },
        ],
      },
    ],
  });
}