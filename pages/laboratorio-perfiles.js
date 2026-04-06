import { renderLaboratorioDetallePage } from "./templates/laboratorio-detalle.js";

export function renderLaboratorioPerfilesPage() {
  return renderLaboratorioDetallePage({
    title: "Perfiles de laboratorio",
    breadcrumb: "Perfiles de laboratorio",
    heroImage:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
    badge: "Perfiles de laboratorio",
    sections: [
      {
        id: "perfiles",
        title: "Perfiles de laboratorio",
        icon: "playlist_add_check_circle",
        groups: [
          {
            title: "Perfiles metabólicos y básicos",
            icon: "biotech",
            items: [
              "Perfil diabético",
              "Perfil lipídico",
              "Perfil renal",
              "Perfil hepático",
              "Perfil óseo",
            ],
          },
          {
            title: "Perfiles hormonales",
            icon: "endocrinology",
            items: [
              "Perfil tiroideo",
              "Perfil hormonal femenino",
              "Perfil hormonal masculino",
            ],
          },
          {
            title: "Perfiles complementarios",
            icon: "science",
            items: [
              "Perfil prenatal",
              "Perfil reumático",
              "Perfil prostático",
              "Perfil cardíaco",
            ],
          },
        ],
      },
    ],
  });
}