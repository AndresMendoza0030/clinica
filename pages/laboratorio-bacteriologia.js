import { renderLaboratorioDetallePage } from "./templates/laboratorio-detalle.js";

export function renderLaboratorioBacteriologiaPage() {
  return renderLaboratorioDetallePage({
    title: "Exámenes de bacteriología",
    breadcrumb: "Bacteriología",
    heroImage:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    badge: "Bacteriología",
    sections: [
      {
        id: "bacteriologia",
        title: "Bacteriología",
        icon: "coronavirus",
        groups: [
          {
            title: "Cultivos",
            icon: "science",
            items: [
              "Coprocultivo",
              "Cultivo de esputo",
              "Cultivo de heces",
              "Cultivo de secreción",
              "Cultivo vaginal",
              "Hemocultivo",
              "Urocultivo",
            ],
          },
          {
            title: "Tinciones y observación directa",
            icon: "biotech",
            items: [
              "BAAR en esputo",
              "BAAR en orina",
              "Gram",
              "KOH",
            ],
          },
          {
            title: "Otros estudios microbiológicos",
            icon: "experiment",
            items: [
              "Antibiograma",
            ],
          },
        ],
      },
    ],
  });
}