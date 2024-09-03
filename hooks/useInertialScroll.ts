import { useEffect, useRef } from "react";

export const useInertialScrollDesktop = (): void => {
  const scrollPosition = useRef<number>(window.scrollY); // Usamos useRef para la posición del scroll
  const scrollSpeed = useRef<number>(0);

  useEffect(() => {
    function smoothScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Aplicar la velocidad al scroll actual
      scrollPosition.current += scrollSpeed.current * 0.075; // Reduce el movimiento causado al girar la rueda

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
      scrollSpeed.current *= 0.98; // Factor de amortiguación

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


// -----------------------------------------Para moviles-----------------------------------------


export const useInertialScrollMobile = (): void => {
  const scrollPosition = useRef<number>(window.scrollY); // Mantiene la posición actual del scroll
  const scrollSpeed = useRef<number>(0); // Mantiene la velocidad de desplazamiento
  const isTouching = useRef<boolean>(false); // Indica si el usuario está tocando la pantalla

  useEffect(() => {
    let startY = 0; // Almacena la posición inicial del toque
    const scrollFactor = 0.3; // Factor de ajuste para reducir el desplazamiento

    function smoothScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Aplicar la velocidad al scroll actual
      scrollPosition.current += scrollSpeed.current;

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
      if (Math.abs(scrollSpeed.current) > 0.1 && !isTouching.current) {
        requestAnimationFrame(smoothScroll);
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      startY = event.touches[0].clientY;
      isTouching.current = true;
      scrollSpeed.current = 0; // Resetea la velocidad al comenzar un nuevo toque
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isTouching.current) {
        const deltaY = startY - event.touches[0].clientY;
        const adjustedDeltaY = deltaY * scrollFactor; // Reducir la sensibilidad del desplazamiento
        scrollPosition.current = window.scrollY + adjustedDeltaY;
        scrollSpeed.current = adjustedDeltaY; // Establece la velocidad basada en el movimiento ajustado
        window.scrollTo(0, scrollPosition.current);
        startY = event.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      isTouching.current = false;
      requestAnimationFrame(smoothScroll); // Inicia la inercia al levantar el dedo
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Limpieza del event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return;
};