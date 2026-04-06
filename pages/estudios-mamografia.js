import { renderEstudioDetallePage } from "./templates/estudios-detalle.js";

export function renderEstudiosMamografiaPage() {
  return renderEstudioDetallePage({
    title: "Estudios de mamografía",
    breadcrumb: "Mamografía",
    heroImage:
      "https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Mamografia.png",
    badge: "Mamografía",
    sections: [
      {
        id: "mamografia",
        title: "Mamografía",
        icon: "female",
        groups: [
          {
            title: "Opciones disponibles",
            icon: "favorite",
            items: [
              "Mamografía",
              "Mamografía digitalizada",
              "Tomosíntesis",
              "Galactografía",
            ],
          },
        ],
      },
    ],
  });
}