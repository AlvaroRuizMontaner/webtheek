export const whatInfo: WhatInfoProps = {
    title: "¿Qué ofrece este sitio web?",
    cards: [
      {
        name: "Herramientas de archivos e imágenes",
        image: "icons/settings.svg",
        description:
          "Nostrud fugiat aliquip fugiat in dolore est voluptate ipsum do Lorem elit. sit ea quis incididunt est anim ea aliquip.",
      },
      {
        name: "Simulaciones y gráficos",
        image: "/icons/graphic.svg",
        description:
          "Nostrud fugiat aliquip fugiat in dolore est voluptate ipsum do Lorem elit. sit ea quis incididunt est anim ea aliquip.",
      },
      {
        name: "Tu perfil donde almacenarlos",
        image: "/icons/profile2.svg",
        description:
          "Nostrud fugiat aliquip fugiat in dolore est voluptate ipsum do Lorem elit. sit ea quis incididunt est anim ea aliquip.",
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