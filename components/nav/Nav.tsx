import React from "react";
import { navInfo } from "./nav.info";
import NavList from "./NavList";

const Nav = (): JSX.Element => {
  return (
    <nav className="flex h-10 bg-dark-primary border-4">
      <NavList info={navInfo} />
    </nav>
  );
};

export default Nav;
