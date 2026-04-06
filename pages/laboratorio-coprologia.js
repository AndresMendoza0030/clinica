import { renderLaboratorioDetallePage } from "./templates/laboratorio-detalle.js";

export function renderLaboratorioCoprologiaPage() {
  return renderLaboratorioDetallePage({
    title: "Exámenes de coprología",
    breadcrumb: "Coprología",
    heroImage:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    badge: "Coprología",
    sections: [
      {
        id: "coprologia",
        title: "Coprología",
        icon: "emoji_nature",
        groups: [
          {
            title: "Exámenes generales",
            icon: "clinical_notes",
            items: [
              "General de heces",
              "Concentrado de heces",
              "Sangre oculta en heces",
              "Sustancias reductoras",
            ],
          },
          {
            title: "Parasitología y coloraciones",
            icon: "science",
            items: [
              "Azul de metileno coloración",
              "Helicobacter pylori en heces",
            ],
          },
          {
            title: "Métodos especiales",
            icon: "biotech",
            items: [
              "Método de Graham (oxiuros)",
              "Rotavirus",
            ],
          },
        ],
      },
    ],
  });
}