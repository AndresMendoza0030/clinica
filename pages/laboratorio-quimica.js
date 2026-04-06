import { renderLaboratorioDetallePage } from "./templates/laboratorio-detalle.js";

export function renderLaboratorioQuimicaPage() {
  return renderLaboratorioDetallePage({
    title: "Exámenes de química sanguínea",
    breadcrumb: "Química sanguínea",
    heroImage:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    badge: "Química sanguínea",
    sections: [
      {
        id: "quimica",
        title: "Química sanguínea",
        icon: "biotech",
        groups: [
          {
            title: "Bioquímica general",
            icon: "science",
            items: [
              "Glucosa",
              "Urea",
              "Creatinina",
              "Ácido úrico",
              "Calcio sérico",
              "Fósforo en sangre",
              "Magnesio en suero",
            ],
          },
          {
            title: "Perfil hepático y pancreático",
            icon: "monitor_heart",
            items: [
              "Bilirrubinas",
              "Fosfatasa alcalina",
              "Gamma glutamil transferasa GGT",
              "Amilasa pancreática",
              "Lipasa en suero",
            ],
          },
          {
            title: "Lípidos y metabolismo",
            icon: "bloodtype",
            items: [
              "Colesterol HDL",
              "Colesterol LDL",
              "Colesterol VLDL",
              "Colesterol total",
              "Triglicéridos",
              "Lípidos totales",
            ],
          },
        ],
      },
    ],
  });
}