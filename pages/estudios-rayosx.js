import { renderEstudioDetallePage } from "./templates/estudios-detalle.js";

export function renderEstudiosRayosXPage() {
  return renderEstudioDetallePage({
    title: "Estudios de rayos X",
    breadcrumb: "Rayos X",
    heroImage:
      "https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Rayos%20X.png",
    badge: "Rayos X",
    sections: [
      {
        id: "cabeza",
        title: "Cabeza",
        icon: "neurology",
        groups: [
          {
            title: "Cráneo y cara",
            icon: "face",
            items: [
              "Cráneo PA",
              "Cráneo lateral",
              "Huesos nasales",
              "Senos paranasales",
              "Macizo facial",
              "Mandíbula",
            ],
          },
          {
            title: "Regiones específicas",
            icon: "visibility",
            items: [
              "Órbitas",
              "Articulación temporomandibular",
              "Cavum",
              "Mastoides",
              "Silla turca",
            ],
          },
        ],
      },
      {
        id: "columna-pelvis",
        title: "Columna y pelvis",
        icon: "accessibility_new",
        groups: [
          {
            title: "Columna",
            icon: "orthopedics",
            items: [
              "Columna cervical AP y lateral",
              "Columna dorsal AP y lateral",
              "Columna lumbar AP y lateral",
              "Columna lumbosacra",
              "Columna cervical oblicuas",
              "Columna lumbar oblicuas",
            ],
          },
          {
            title: "Pelvis y cadera",
            icon: "man_4",
            items: [
              "Pelvis AP",
              "Cadera AP",
              "Cadera lateral",
              "Sacro cóccix",
              "Articulaciones sacroilíacas",
            ],
          },
        ],
      },
      {
        id: "torax",
        title: "Tórax",
        icon: "respiratory_rate",
        groups: [
          {
            title: "Tórax y costillas",
            icon: "air",
            items: [
              "Tórax PA",
              "Tórax AP portátil",
              "Tórax lateral",
              "Costillas unilateral",
              "Costillas bilateral",
              "Esternón",
            ],
          },
          {
            title: "Otras proyecciones",
            icon: "monitor_heart",
            items: [
              "Parrilla costal",
              "Clavículas",
              "Articulaciones esternoclaviculares",
            ],
          },
        ],
      },
      {
        id: "abdomen",
        title: "Abdomen",
        icon: "abdomen",
        groups: [
          {
            title: "Abdomen simple",
            icon: "clinical_notes",
            items: [
              "Abdomen simple",
              "Abdomen de pie",
              "Abdomen acostado",
              "Serie obstructiva",
            ],
          },
        ],
      },
      {
        id: "extremidad-superior",
        title: "Extremidad superior",
        icon: "pan_tool",
        groups: [
          {
            title: "Miembro superior",
            icon: "back_hand",
            items: [
              "Hombro",
              "Clavícula",
              "Escápula",
              "Húmero",
              "Codo",
              "Antebrazo",
              "Muñeca",
              "Mano",
              "Dedos",
            ],
          },
        ],
      },
      {
        id: "extremidad-inferior",
        title: "Extremidad inferior",
        icon: "directions_walk",
        groups: [
          {
            title: "Miembro inferior",
            icon: "footprint",
            items: [
              "Fémur",
              "Rodilla",
              "Pierna",
              "Tobillo",
              "Pie",
              "Calcáneo",
              "Dedos del pie",
            ],
          },
        ],
      },
      {
        id: "especiales",
        title: "Estudios especiales",
        icon: "biotech",
        groups: [
          {
            title: "Contrastes y especializados",
            icon: "science",
            items: [
              "Tubo digestivo superior",
              "Tránsito intestinal",
              "Pielograma",
              "Enema baritado (colon)",
              "Esofagograma",
              "Serie esófago-gastro-duodenal",
              "Otro",
            ],
          },
        ],
      },
      {
        id: "mamografia",
        title: "Mamografía",
        icon: "female",
        groups: [
          {
            title: "Opciones de mamografía",
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