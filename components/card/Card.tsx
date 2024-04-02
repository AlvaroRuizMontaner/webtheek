import Image from "next/image";
import React from "react";
import { CardOfferProps } from "../offer/offer.info";

const Card = ({ name, image, description }: CardOfferProps): JSX.Element => {
  return (
    <section className="w-60 h-80 mx-auto md:mx-0 p-4 flex flex-col gap-2 border border-4 rounded-lg border-indigo-400">
      <h3 className="h-20 text-lg flex items-center justify-center text-center">
        {name}
      </h3>
      <div className="relative w-full">
        <Image className="" fill src={image} alt={`Image ${name}`} />
      </div>
      <div className="text-center">{description}</div>
    </section>
  );
};

export default Card;
