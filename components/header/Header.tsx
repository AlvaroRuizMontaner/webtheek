"use client";
import React, { useState } from "react";
import Image from "next/image";
import NavList from "../nav/NavList";
import { headerInfo } from "../nav/nav.info";
import Link from "next/link";
import Collapse from "../collapse/Collapse";
import styles from "./header.module.css";

const Header = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-20 bg-indigo-400 border-l-4 border-r-4 border-b-4">
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
          className={`relative w-14 h-14 ${styles.button} bg-indigo-400 md:hidden cursor-pointer justify-self-end md:justify-self-auto`}
        >
          <Image
            width={48}
            height={48}
            layout="responsive"
            objectFit="contain"
            src={"/icons/menu.png"}
            alt="butterfly"
          />
        </button>

        <Collapse isOpen={isOpen}>
          <div
            className={`flex flex-1 justify-center items-center ${isOpen ? styles.openItem : styles.closeItem}`}
          >
            <Link href="/curriculares">Curriculares</Link>
          </div>
          <div
            className={`flex flex-1 justify-center items-center ${isOpen ? styles.openItem : styles.closeItem}`}
          >
            <Link href="/herramientas">Herramientas</Link>
          </div>
          <div
            className={`flex flex-1 justify-center items-center ${isOpen ? styles.openItem : styles.closeItem}`}
          >
            <Link href="/imagenes">Imágenes</Link>
          </div>
        </Collapse>
      </div>
      <div className="hidden md:block flex-1 my-auto">
        <NavList info={headerInfo} />
      </div>
    </div>
  );
};

export default Header;
