import React from "react";
import Image from "next/image";
import NavList from "./nav/NavList";
import { headerInfo } from "./nav/nav.info";

const Header = () => {
  return (
    <div className="flex h-10">
      <div className="relative w-full md:w-[140px] h-full p-2 flex justify-center">
        <Image
          /*           width={48}
          height={48}
          layout="responsive" */
          fill
          objectFit="contain"
          src={"/icons/butterfly.png"}
          alt="butterfly"
        />
      </div>
      <div className="hidden md:block flex-1">
        <NavList info={headerInfo} />
      </div>
    </div>
  );
};

export default Header;
