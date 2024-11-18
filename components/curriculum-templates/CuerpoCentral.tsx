import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import SeccionCuerpoCentral from './SeccionCuerpoCentral'
import { seccionCuerpocentralInfoType } from './curriculum.info'

type CuerpoCentralProps = {
  page: seccionCuerpocentralInfoType[]
  setPageIndices: Dispatch<SetStateAction<number[]>>
  MAX_HEIGHT: number
}

export default function CuerpoCentral({page, setPageIndices, MAX_HEIGHT}: CuerpoCentralProps) {
  const sections = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Función para calcular los cortes
    const calculatePages = () => {
      if (!sections.current) return;

      let currentHeight = 0;
      const indices: number[] = [];
      const container = sections.current;

      // Iterar sobre los hijos del contenedor para medir alturas acumuladas
      Array.from(container.children).forEach((child, index) => {
        const elementHeight = (child as HTMLElement).offsetHeight;
        currentHeight += elementHeight;
        console.log(currentHeight)

        if (currentHeight > MAX_HEIGHT) {
          indices.push(index); // Marcar dónde cortar
          currentHeight = elementHeight; // Resetear altura acumulada
        }
      });

      setPageIndices(indices);
    };

    calculatePages();

    // Recalcular si la ventana cambia de tamaño
    window.addEventListener("resize", calculatePages);
    return () => window.removeEventListener("resize", calculatePages);
  }, [sections]);

  return (
    <div ref={sections} className='flex flex-col justify-center gap-10 p-[1.25rem]'>
        {page.map((seccion, seccionIndx) => (
            <SeccionCuerpoCentral key={seccionIndx} {...seccion}/>
        ))}
    </div>
  )
}
