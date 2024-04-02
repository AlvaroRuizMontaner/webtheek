export const offerInfo: OfferProps = {
  title: "Qué ofrece este sitio web?",
  cards: [
    {
      name: "Herramientas web",
      image: "/icons/settings.svg",
      description:
        "Nostrud fugiat aliquip fugiat in dolore est voluptate ipsum do Lorem elit. sit ea quis incididunt est anim ea aliquip.",
    },
    {
      name: "Simulaciones y gráficos",
      image: "/icons/settings.svg",
      description:
        "Nostrud fugiat aliquip fugiat in dolore est voluptate ipsum do Lorem elit. sit ea quis incididunt est anim ea aliquip.",
    },
    {
      name: "Almacenamiento",
      image: "/icons/settings.svg",
      description:
        "Nostrud fugiat aliquip fugiat in dolore est voluptate ipsum do Lorem elit. sit ea quis incididunt est anim ea aliquip.",
    },
  ],
};

interface OfferProps {
  title: string;
  cards: CardOfferProps[];
}

export interface CardOfferProps {
  name: string;
  image: string;
  description: string;
}
