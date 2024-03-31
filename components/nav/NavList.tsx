import React from "react";
import { navInfo, navItemProps } from "./nav.info";
import Link from "next/link";

const NavList = ({ info }: NavListProps) => {
  return (
    <div className="h-10 flex items-center justify-around flex-1">
      {info.map((link) => (
        <Link key={link.text} href={link.url}>
          {link.text}
        </Link>
      ))}
    </div>
  );
};

interface NavListProps {
  info: navItemProps[];
}

export default NavList;
