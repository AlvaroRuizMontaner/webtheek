import React from "react";
import styles from "./collapse.module.css";

const Collapse = ({ children, isOpen }: CollapseProps): JSX.Element => {
  /* 
    Las reglas mas importantes del collapse son el max-height 0 en isOpen false y
    max-height auto en isOpen true y el overflow-y, el resto son opcionales, 
    aunque añadir transition queda bien
  */

  return (
    <section
      className={`overflow-y-hidden flex flex-col w-full ${styles.transition}
        absolute translate-y-full bottom-[-4px] left-0 right-0 bg-accent
        ${isOpen ? "h-[150px]" : "h-0"}`}
    >
      {Array.isArray(children) ? children.map((child) => child) : children}
    </section>
  );
};

export default Collapse;

interface CollapseProps {
  children: React.ReactNode;
  isOpen: boolean;
}
