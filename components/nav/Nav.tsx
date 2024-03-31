import React from "react";
import { navInfo } from "./nav.info";
import Link from "next/link";
import Image from "next/image";
import NavList from "./NavList";

const Nav = () => {
  return (
    <nav className="flex h-10">
      <NavList info={navInfo} />
    </nav>
  );
};

export default Nav;
