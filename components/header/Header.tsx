"use client";
import React, { useState } from "react";
import Image from "next/image";
import NavList from "../nav/NavList";
import { headerInfo, navItemProps } from "../nav/nav.info";
import Collapse from "../collapse/Collapse";
import styles from "./header.module.css";
import NavItemMobile from "./NavItemMobile";

const Header = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const isLogged = true;

  const filterNavItems = (isLogged: boolean): navItemProps[] => {
    if (isLogged) {
      return headerInfo.filter(
        (item) => item.url !== "/signin" && item.url !== "/signup"
      );
    } else {
      return headerInfo.filter((item) => item.url !== "/profile");
    }
  };

  const filteredNavItems = filterNavItems(isLogged);

  return (
    <div className="flex h-20 bg-dark-primary">
      <nav className="container flex">
        <div className="w-full p-2 md:w-[140px] h-full grid items-center relative">
          <div className="relative w-full h-full md:block justify-self-start hidden">
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
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={`relative w-14 h-14 ${styles.button} bg-white md:hidden cursor-pointer justify-self-end md:justify-self-auto`}
          >
            <Image
              width={48}
              height={48}
              layout="responsive"
              objectFit="contain"
              src={"/icons/menu.png"}
              alt="menu"
            />
          </button>

          <Collapse bottom={"1px"} isOpen={isOpen}>
            {filteredNavItems.map((headerItem) => (
              <div
                key={headerItem.text}
                className={`flex flex-1 justify-center items-center ${isOpen ? styles.openItem : styles.closeItem}`}
              >
                {headerItem.url ? (
                  <NavItemMobile {...headerItem} />
                ) : (
                  <div
                    onClick={
                      () => null //Logout handler
                    }
                  >
                    {headerItem.text}
                  </div>
                )}
              </div>
            ))}
          </Collapse>
        </div>
        <div className="hidden md:block flex-1 my-auto">
          <NavList info={headerInfo} />
        </div>
      </nav>
    </div>
  );
};

export default Header;
