import React from "react";
import { navItemProps } from "./nav.info";
import NavItem from "../header/NavItem";

const NavList = ({ info }: NavListProps): JSX.Element => {
  return (
    <div className="flex items-center justify-around flex-1">
      {info.map((link, index) => (
        <div key={index} className="font-bold">
          <NavItem {...link} />
        </div>
      ))}
    </div>
  );
};

interface NavListProps {
  info: navItemProps[];
}

export default NavList;
