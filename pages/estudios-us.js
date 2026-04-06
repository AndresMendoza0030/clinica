import { renderEstudioDetallePage } from "./templates/estudios-detalle.js";

export function renderEstudiosUSPage() {
  return renderEstudioDetallePage({
    title: "Estudios de ultrasonografía",
    breadcrumb: "Ultrasonografía",
    heroImage:
      "https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Ultrasonografia.png",
    badge: "Ultrasonografía",
    sections: [
      {
        id: "doppler-color",
        title: "US. Doppler Color",
        icon: "monitor_heart",
        groups: [
          {
            title: "Sistema arterial carotídeo y vertebral",
            icon: "neurology",
            items: [
              "Ateromatosis",
              "Vértigo",
            ],
          },
          {
            title: "Vasos periféricos",
            icon: "bloodtype",
            items: [
              "Sistema venoso MID MII",
              "Sistema arterial MID MII",
              "Sistema venoso MSD MSI",
              "Sistema arterial MSD MSI",
            ],
          },
          {
            title: "Escrotal",
            icon: "male",
            items: [
              "Tumores",
              "Varicoceles",
            ],
          },
          {
            title: "Abdomen",
            icon: "monitor_heart",
            items: [
              "Aneurisma aórtico",
              "Arterias renales",
              "Otro",
            ],
          },
          {
            title: "Obstetricia",
            icon: "pregnant_woman",
            items: [
              "Vasos umbilicales",
            ],
          },
        ],
      },
      {
        id: "convencional",
        title: "US. Convencional",
        icon: "ultrasonic_sensor",
        groups: [
          {
            title: "Abdominal",
            icon: "abdomen",
            items: [
              "Hígado",
              "Vesícula y vías biliares",
              "Riñones",
              "Páncreas",
              "Bazo",
              "Retroperitoneo",
            ],
          },
          {
            title: "Pélvica",
            icon: "female",
            items: [
              "Ginecología (requiere vejiga llena)",
              "Vesical (requiere vejiga llena)",
              "Obstetricia",
              "Transvaginal",
            ],
          },
          {
            title: "Otros estudios convencionales",
            icon: "clinical_notes",
            items: [
              "Próstata (transrectal)",
              "Tórax (derrame pleural)",
              "Mama",
              "Tejidos blandos",
              "Cuello (tiroides)",
              "Transfontanelar",
              "Ocular",
              "Vesicoprostático",
            ],
          },
        ],
      },
      {
        id: "musculo-esqueletico",
        title: "US. Músculo Esquelético",
        icon: "orthopedics",
        groups: [
          {
            title: "Articulaciones y músculos",
            icon: "accessibility_new",
            items: [
              "Cadera",
              "Hombro",
              "Rodilla",
              "Músculos",
              "Otro",
            ],
          },
        ],
      },
      {
        id: "elastografia",
        title: "Elastografía",
        icon: "biotech",
        groups: [
          {
            title: "Opciones disponibles",
            icon: "healing",
            items: [
              "Elastografía hepática (ayuno de 6 horas)",
              "Elastografía hepática + USG abdominal",
              "Elastografía hepática + Doppler hepático",
            ],
          },
        ],
      },
    ],
  });
}