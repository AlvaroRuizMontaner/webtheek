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
        w-[16rem] sm:w-[18rem] bg-primary-900 text-white mx-auto md:mx-0 p-6 flex flex-col gap-2
        rounded-lg shadow-lg shadow-primary-900
     "
      >
        <div className="relative w-full h-20 bg-gray-200 rounded-lg">
          <Image className="" fill src={image} alt={`Image ${name}`} />
        </div>
        <h3 className="h-20 leading-6 text-accent-300 font-black body2 flex items-center justify-center text-center">
          {name}
        </h3>
        <div className="text-center">{description}</div>
      </section>
  );
};

export default WhatCard;
