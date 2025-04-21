import { useState, useEffect, memo } from "react";
import "./scroll-collapse.scss"

type ScrollCollapseProps = {
  children: React.ReactNode; // Los elementos que envolverá el wrapper
  threshold?: number; // Umbral de scroll para activar la visibilidad (por defecto a 100px)
  position?: "fixed" | "absolute"
  placeholder?: {
    color: "light" | "dark"
  }
}

  const ScrollCollapse = memo(({ children, threshold = 146, position="fixed", placeholder={color: "light"} }: ScrollCollapseProps) => {
  const [isVisible, setIsVisible] = useState(true); // Controla la visibilidad del nav
  const [lastScrollTop, setLastScrollTop] = useState(0); // Almacena la última posición del scroll


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Si el usuario se desplaza hacia abajo y pasa el umbral, ocultamos el nav
      if (currentScrollTop > lastScrollTop && currentScrollTop > threshold) {
        setIsVisible(false); // Ocultamos el nav
      } else if (currentScrollTop < lastScrollTop) {
        setIsVisible(true); // Mostramos el nav
      }
  
      // Actualizamos la posición del scroll
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Cleanup al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

      return (
      <div>
        {placeholder && <div className={`placeholder ${placeholder.color}`} style={{ height: threshold }}></div>}
        <div className={`scroll-collapse ${position} ${isVisible ? "visible" : "not-visible"}`}>
          {children}
        </div>
      </div>
      
    );
})

export default ScrollCollapse