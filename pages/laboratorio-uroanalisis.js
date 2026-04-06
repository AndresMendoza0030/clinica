import { renderLaboratorioDetallePage } from "./templates/laboratorio-detalle.js";

export function renderLaboratorioUroanalisisPage() {
  return renderLaboratorioDetallePage({
    title: "Exámenes de uroanálisis",
    breadcrumb: "Uroanálisis",
    heroImage:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    badge: "Uroanálisis",
    sections: [
      {
        id: "uroanalisis",
        title: "Uroanálisis",
        icon: "water_drop",
        groups: [
          {
            title: "Exámenes generales",
            icon: "clinical_notes",
            items: [
              "General de orina",
              "Creatinina en orina",
              "Depuración de creatinina",
              "Proteínas en orina de 24 horas",
              "Microalbuminuria",
              "Bence Jones",
            ],
          },
          {
            title: "Sedimento y química urinaria",
            icon: "biotech",
            items: [
              "Sedimento urinario",
              "Sustancias reductoras en orina",
              "Ácido úrico en orina",
              "Calcio en orina",
              "Sodio en orina",
              "Potasio en orina",
              "Cloro en orina",
            ],
          },
          {
            title: "Estudios especiales",
            icon: "experiment",
            items: [
              "Catecolaminas en orina de 24 horas",
              "VMA cuantitativo",
              "VMA cualitativo",
            ],
          },
        ],
      },
    ],
  });
}