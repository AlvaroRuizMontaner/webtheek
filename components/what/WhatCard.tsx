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
        w-[16rem] sm:w-[18rem] mx-auto md:mx-0 p-6 flex flex-col gap-2
        rounded-lg shadow-1
     "
      >
        <div className="relative w-full h-20 bg-secondary rounded-lg">
          <Image className="" fill src={image} alt={`Image ${name}`} />
        </div>
        <h3 className="h-20 leading-6 text-gray-900 font-black body2 flex items-center justify-center text-center">
          {name}
        </h3>
        <div className="text-center">{description}</div>
      </section>
  );
};

export default WhatCard;
