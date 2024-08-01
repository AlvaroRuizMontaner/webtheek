import Image from "next/image";
import React from "react";
import { WhatCardInfoProps } from "./whatCard.info";

const WhatCard = ({
  name,
  image,
  description,
}: WhatCardInfoProps): JSX.Element => {
  return (
      <section
        className="
      w-64 mx-auto md:mx-0 p-4 flex flex-col gap-2
      border-8 rounded-lg border-primary shadow-primary custom-shadow
     "
      >
        <div className="relative w-full h-20 bg-gray-400 rounded-lg">
          <Image className="" fill src={image} alt={`Image ${name}`} />
        </div>
        <h3 className="h-20 text-lg text-gray-600 font-extrabold flex items-center justify-center text-center">
          {name}
        </h3>
        <div className="text-center">{description}</div>
      </section>
  );
};

export default WhatCard;
