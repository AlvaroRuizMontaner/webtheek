import Link from "next/link";
import React, { useState } from "react";
import Collapse from "../collapse/Collapse";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./header.module.css";

const NavItem = ({ subitems, url, text }: NavItemProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(subitems, text);
  return (
    <div className="relative">
      {url && (
        <span className="hover:text-blue-700 hover:underline">
          <Link href={url}>{text}</Link>
        </span>
      )}
      {subitems && (
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={` relative ml-2 cursor-pointer justify-self-end md:justify-self-auto 
        ${styles.dropButton} ${isOpen && styles.openDropButton}
        `}
        >
          <IoIosArrowDown fontSize={12} />
        </button>
      )}
      {subitems && (
        <Collapse bottom={"-24px"} isOpen={isOpen}>
          {subitems.map((subitem) => (
            <div
              key={subitem.text}
              className={`hover:text-blue-700 flex flex-1 justify-center items-center ${isOpen ? styles.openItem : styles.closeItem}`}
            >
              {subitem.url ? (
                <Link href={subitem.url}>{subitem.text}</Link>
              ) : (
                <div
                  onClick={
                    () => null //Logout handler
                  }
                >
                  {subitem.text}
                </div>
              )}
            </div>
          ))}
        </Collapse>
      )}
    </div>
  );
};

export default NavItem;

interface NavItemProps {
  subitems?: {
    url: string;
    text: string;
  }[];
  url?: string;
  text: string;
}
