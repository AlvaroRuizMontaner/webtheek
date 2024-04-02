import React from "react";
import { offerInfo } from "./offer.info";
import Card from "../card/Card";

const Offer = (): JSX.Element => {
  return (
    <div className="my-20 flex flex-col gap-10">
      <h2 className="text-center text-2xl">{offerInfo.title}</h2>
      <div className="grid grid-cols-1 md:flex gap-10 justify-center">
        {offerInfo.cards.map((card) => (
          <Card key={card.name} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Offer;
