import React from "react";
import styles from "./collapse.module.css";

const Collapse = ({
  children,
  isOpen,
  bottom = "-4px",
}: CollapseProps): JSX.Element => {
  /* 
    Las reglas mas importantes del collapse son el max-height 0 cuando isOpen es false y
    max-height auto cuando isOpen es true y el overflow-y, el resto son opcionales, 
    aunque añadir transition queda bien
  */

  return (
    <section
      style={{ bottom }}
      className={`flex flex-col z-10 w-full ${styles.transition}
        absolute translate-y-full left-0 right-0 bg-dark-primary
        ${isOpen ? "h-[150px]" : "h-0"} ${!isOpen && "overflow-y-hidden"}
        `}
    >
      {Array.isArray(children) ? children.map((child) => child) : children}
    </section>
  );
};

export default Collapse;

interface CollapseProps {
  children: React.ReactNode;
  isOpen: boolean;
  bottom?: string;
}
