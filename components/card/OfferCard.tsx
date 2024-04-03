import Image from "next/image";
import React from "react";
import { OfferCardOfferProps } from "../offer/offer.info";

const OfferCard = ({
  name,
  image,
  description,
}: OfferCardOfferProps): JSX.Element => {
  return (
    <section
      className="
      w-60 h-80 mx-auto md:mx-0 p-4 flex flex-col gap-2
      border-4 rounded-lg border-tertiary shadow-tertiary custom-shadow
     "
    >
      <div className="relative w-full h-20 bg-accent rounded-lg">
        <Image className="" fill src={image} alt={`Image ${name}`} />
      </div>
      <h3 className="h-20 text-lg text-secondary font-extrabold flex items-center justify-center text-center">
        {name}
      </h3>
      <div className="text-center">{description}</div>
    </section>
  );
};

export default OfferCard;
