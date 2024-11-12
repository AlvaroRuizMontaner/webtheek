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

export const whatInfoProjects: WhatInfoProps = {
  title: "¿Qué ofrecen los proyectos de Webtheek?",
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

export const whatInfoQuizzes: WhatInfoProps = {
  title: "¿Qué ofrecen los quizzes de Webtheek?",
  cards: [
    {
      name: "Crea y personaliza tus quizzes",
      image: "icons/settings.svg",
      description:
        "Diseña quizzes personalizados para cualquier tema. Configura preguntas, opciones de respuesta y determina cuál es la correcta para hacer el quiz único y adaptado a tus necesidades.",
    },
    {
      name: "Comparte y colabora en tus quizzes",
      image: "/icons/graphic.svg",
      description:
        "Invita a tus amigos, alumnos o compañeros a resolver tus quizzes y descubre cómo interactúan con ellos. Puedes compartir cada quiz fácilmente y obtener sus respuestas.",
    },
    {
      name: "Gestiona y almacena tus quizzes",
      image: "/icons/profile2.svg",
      description:
        "Todos tus quizzes están almacenados de forma segura en tu perfil. Gestiona, actualiza y revisa tus quizzes en cualquier momento desde tu cuenta personal.",
    },
  ],
};
  
export interface WhatInfoProps {
    title: string;
    cards: WhatCardInfoProps[];
  }
  
  export interface WhatCardInfoProps {
    name: string;
    image: string;
    description: string;
  }