export const whatInfo: WhatInfoProps = {
    title: "¿Qué ofrece Webtheek?",
    cards: [
      {
        /* name: "Herramientas de archivos e imágenes", */
        name: "Crear y gestionar tus proyectos",
        image: "icons/settings.svg",
        description:
          "Crea proyectos para tus quehaceres, asigna tareas y notas, trae colaboradores, y elige quién puede verlo y ayudar",
      },
      {
        /* name: "Simulaciones y gráficos", */
        name: "Creación de quizzes",
        image: "/icons/graphic.svg",
        description:
         /*  "Tú y tu equipo juntos podréis coordinaros con la realización de tareas e interactuar con notas", */
          "Coloca preguntas y las posibles respuestas, comparte el link y deja que quien quieras lo resuelva",
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