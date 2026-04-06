import { renderLaboratorioDetallePage } from "./templates/laboratorio-detalle.js";

export function renderLaboratorioInmunologiaPage() {
  return renderLaboratorioDetallePage({
    title: "Exámenes de inmunología",
    breadcrumb: "Inmunología",
    heroImage:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    badge: "Inmunología",
    sections: [
      {
        id: "inmunologia",
        title: "Inmunología",
        icon: "vaccines",
        groups: [
          {
            title: "Autoinmunidad",
            icon: "shield",
            items: [
              "A.N.A anticuerpos antinucleares",
              "A.N.A anticuerpos antinucleares por IFI",
              "Anti músculo liso",
              "Anticuerpo antimitocondrial",
              "Anticuerpos anticitrulina",
              "Antifosfolípidos IgG / IgM",
              "Anti-streptolisina O",
              "Beta2-glicoproteína",
              "Cardiolipinas IgG / IgM",
              "Células LE",
              "Complemento C3 / C4",
              "P-ANCA",
              "Proteína C reactiva",
              "Proteína C ultrasensible",
              "Latex factor reumatoideo",
            ],
          },
          {
            title: "Infecciosas y serologías",
            icon: "coronavirus",
            items: [
              "Antígenos febriles",
              "Chagas anticuerpos cuantitativo",
              "Cisticercos IgG / IgM",
              "Citomegalovirus IgG / IgM",
              "Clamydia IgG / IgM",
              "Dengue anticuerpos IgG / IgM",
              "FTA-ABS",
              "Helicobacter pylori IgG / IgM",
              "Hepatitis A cualitativo / cuantitativo",
              "Hepatitis B cualitativo / cuantitativo",
              "Hepatitis C cualitativo / cuantitativo",
              "HIV",
              "HIV 4G",
              "Monotest IgG / IgM",
              "Toxoplasma IgG / IgM",
              "VDRL",
            ],
          },
          {
            title: "Hormonas y marcadores relacionados",
            icon: "endocrinology",
            items: [
              "Hormona paratiroidea intacta",
              "Interleucina",
              "Niveles de amonio sérico",
              "Procalcitonina",
              "Prueba de embarazo en sangre",
              "Tipo sanguíneo y RH",
              "Prueba cruzada",
              "Coombs directo / indirecto",
            ],
          },
        ],
      },
    ],
  });
}