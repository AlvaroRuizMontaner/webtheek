export const whatInfo: WhatInfoProps = {
    title: "¿Qué ofrece a día de hoy?",
    cards: [
      {
        /* name: "Herramientas de archivos e imágenes", */
        name: "Crear y gestionar tus proyectos",
        image: "icons/settings.svg",
        description:
          "Crea proyectos para tus quehaceres, dales forma, trae colaboradores, y elige quién puede verlo y ayudarte",
      },
      {
        /* name: "Simulaciones y gráficos", */
        name: "Asignación de tareas y notas",
        image: "/icons/graphic.svg",
        description:
         /*  "Tú y tu equipo juntos podréis coordinaros con la realización de tareas e interactuar con notas", */
          "Asigna, mueve o elimina tareas a realizar, interactúa o puntualiza lo que quieras usando notas en cada tarea",
      },
      {
        name: "Tu perfil donde almacenarlos",
        image: "/icons/profile2.svg",
        description:
          "Tu trabajo quedará ligado a tu cuenta, la cual quedará aquí almacenada en un sistema seguro de autenticación",
      },
    ],
  };
  
  interface WhatInfoProps {
    title: string;
    cards: WhatCardInfoProps[];
  }
  
  export interface WhatCardInfoProps {
    name: string;
    image: string;
    description: string;
  }