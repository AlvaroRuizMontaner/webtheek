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
        max-w-[16rem] sm:max-w-[19rem] bg-primary-900 text-white mx-auto md:mx-0 p-6 flex flex-col gap-2
        rounded-lg shadow-lg shadow-primary-900
     "
      >
        <div className="relative w-full h-20 bg-primary-100 rounded-lg">
          <Image className="" fill src={image} alt={`Image ${name}`} />
        </div>
        <h2 className="h-20 leading-6 text-accent-300 font-black body2 flex items-center justify-center text-center">
          {name}
        </h2>
        <div className="text-center">{description}</div>
      </section>
  );
};

export default WhatCard;
