import React from "react";
import { navInfo } from "./nav.info";
import NavList from "./NavList";

const Nav = (): JSX.Element => {
  return (
    <nav className="flex h-10">
      <NavList info={navInfo} />
    </nav>
  );
};

export default Nav;
