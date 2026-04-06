import { renderLaboratorioDetallePage } from "./templates/laboratorio-detalle.js";

export function renderLaboratorioPruebasEspecialesPage() {
  return renderLaboratorioDetallePage({
    title: "Pruebas especiales de laboratorio",
    breadcrumb: "Pruebas especiales",
    heroImage:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    badge: "Pruebas especiales",
    sections: [
      {
        id: "pruebas-especiales",
        title: "Pruebas especiales",
        icon: "experiment",
        groups: [
          {
            title: "Hormonas y endocrinología",
            icon: "endocrinology",
            items: [
              "Insulina basal",
              "Insulina postprandial",
              "Péptido C",
              "TSH",
              "T3",
              "T4",
              "T3 libre",
              "T4 libre",
              "FSH",
              "LH",
              "Progesterona",
              "Prolactina",
              "Estradiol",
              "Testosterona",
              "Cortisol",
            ],
          },
          {
            title: "Marcadores y vitaminas",
            icon: "biotech",
            items: [
              "PSA total",
              "PSA libre",
              "Vitamina B12",
              "Ácido fólico",
              "Ferritina",
              "Hierro sérico",
              "Transferrina",
            ],
          },
          {
            title: "Otros estudios especiales",
            icon: "science",
            items: [
              "Electroforesis de proteínas",
              "Hemoglobina glicosilada",
              "CPK",
              "CPK MB",
              "Troponina",
              "LDH",
              "Homocisteína",
            ],
          },
        ],
      },
    ],
  });
}