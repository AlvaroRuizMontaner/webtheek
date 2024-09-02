import { useEffect, useRef } from "react";

export const useInertialScroll = (): void => {
  const scrollPosition = useRef<number>(window.scrollY); // Usamos useRef para la posición del scroll
  const scrollSpeed = useRef<number>(0);

  useEffect(() => {
    function smoothScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Aplicar la velocidad al scroll actual
      scrollPosition.current += scrollSpeed.current * 0.1;

      // Limitar scrollPosition a los límites de la página
      if (scrollPosition.current < 0) {
        scrollPosition.current = 0;
        scrollSpeed.current = 0;
      } else if (scrollPosition.current > maxScroll) {
        scrollPosition.current = maxScroll;
        scrollSpeed.current = 0;
      }

      window.scrollTo(0, scrollPosition.current);

      // Reducir gradualmente la velocidad
      scrollSpeed.current *= 0.98;

      // Continuar la animación mientras la velocidad sea significativa
      if (Math.abs(scrollSpeed.current) > 0.1) {
        requestAnimationFrame(smoothScroll);
      }
    }

    const handleWheel = (event: WheelEvent) => {
      // Establece la velocidad inicial de inercia basada en el scroll del usuario
      scrollSpeed.current += event.deltaY * 0.9;

      // Iniciar la animación
      requestAnimationFrame(smoothScroll);
    };

    window.addEventListener('wheel', handleWheel);

    // Limpieza del event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return;
};