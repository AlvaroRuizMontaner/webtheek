import React from "react";
import { offerInfo } from "./offer.info";
import OfferCard from "../card/OfferCard";

const Offer = (): JSX.Element => {
  return (
    <div className="my-20 flex flex-col gap-14">
      <h2 className="text-center text-3xl font-bold text-white font-lato">
        {offerInfo.title}
      </h2>
      <div className="grid grid-cols-1 md:flex gap-10 justify-center">
        {offerInfo.cards.map((card) => (
          <OfferCard key={card.name} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Offer;
