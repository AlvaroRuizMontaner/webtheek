import React from "react";
import styles from "./collapse.module.css";

const Collapse = ({
  children,
  isOpen,
  bottom = "-4px",
  position = "absolute",
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
        ${position} left-0 right-0 overflow-y-hidden
        ${isOpen ? " max-h-screen" : "max-h-0"}
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
  position?: "absolute" | "relative"
  height?: string
}
