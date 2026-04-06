import { renderLaboratorioDetallePage } from "./templates/laboratorio-detalle.js";

export function renderLaboratorioHematologiaPage() {
  return renderLaboratorioDetallePage({
    title: "Exámenes de hematología",
    breadcrumb: "Hematología",
    heroImage:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    badge: "Hematología",
    sections: [
      {
        id: "hematologia",
        title: "Hematología",
        icon: "bloodtype",
        groups: [
          {
            title: "Hemograma y recuentos",
            icon: "biotech",
            items: [
              "Hemograma + plaquetas",
              "Hematocrito - hemoglobina",
              "Leucograma",
              "Plaquetas recuento",
              "Reticulocitos",
              "Eritrosedimentación",
            ],
          },
          {
            title: "Frotis y estudios celulares",
            icon: "science",
            items: [
              "Frotis de sangre periférica",
              "Células falciformes",
              "Cristalización en helecho",
              "Eosinófilos nasales",
              "Gota gruesa",
            ],
          },
          {
            title: "Coagulación",
            icon: "monitor_heart",
            items: [
              "Fibrinógeno",
              "Dímero D",
              "Lupus anticoagulante",
              "Tiempo de coagulación",
              "Tiempo de protrombina",
              "Tiempo de sangramiento",
              "Tiempo de trombina",
              "Tiempo de tromboplastina parcial",
            ],
          },
          {
            title: "Estudios especiales hematológicos",
            icon: "experiment",
            items: [
              "Tripanosoma concentrado de Strout",
            ],
          },
        ],
      },
    ],
  });
}