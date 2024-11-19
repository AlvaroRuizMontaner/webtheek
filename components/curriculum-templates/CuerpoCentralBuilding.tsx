import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import SeccionCuerpoCentral from './SeccionCuerpoCentral'
import { seccionCuerpoCentralInfoType } from './templates.info'

type CuerpoCentralProps = {
  page: seccionCuerpoCentralInfoType[]
  setPageIndices: Dispatch<SetStateAction<number[]>>
  MAX_HEIGHT: number
}

export default function CuerpoCentralBuilding({page, setPageIndices, MAX_HEIGHT}: CuerpoCentralProps) {
  const sections = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const calculateDeepLevel = (deepChildren: Element[], deepCurrentHeight: number, deepIndices: number[]) => {
      let moreDeepCurrentHeight = deepCurrentHeight
      let deeperChildren: Element[] = []
      deepChildren.some((deepChild, deepIndex) => { // Se usa some para detener la iteración cuando necesite con el return true

        const deepElementHeight = (deepChild as HTMLElement).offsetHeight;
        deepCurrentHeight += deepElementHeight

        console.log(deepCurrentHeight)

        if (deepCurrentHeight > MAX_HEIGHT) {
          deepIndices.push(deepIndex)
          deeperChildren = Array.from(deepChild.children)
          moreDeepCurrentHeight = deepCurrentHeight - deepElementHeight
          return true
        }

        return false
      })
      return [moreDeepCurrentHeight, deeperChildren]
    }
    // Función para calcular los cortes
    const calculatePages = () => {
      if (!sections.current) return;

      let currentHeight = 48 + 48; // Referente al padding-block de pagina
      const indices: number[] = [];
      const deepIndices: number[] = []
      const container = sections.current;

      // Iterar sobre los hijos del contenedor para medir alturas acumuladas
      Array.from(container.children).forEach((child, index) => {
        const elementHeight = (child as HTMLElement).offsetHeight;
        currentHeight += elementHeight;
        
        if (currentHeight > MAX_HEIGHT) {
          indices.push(index); // Marcar dónde cortar
          console.log(currentHeight)
          
          const deepCurrentHeight = currentHeight - elementHeight
          console.log(deepCurrentHeight)
          const deepChildren = Array.from(child.children)

          const [doubleDeepCurrentHeight, deeperChildren] = calculateDeepLevel(deepChildren, deepCurrentHeight, deepIndices)
          console.log(doubleDeepCurrentHeight, deeperChildren)

          currentHeight = elementHeight; // Resetear altura acumulada
        }
      });

      const pageData = indices.map((index, i) => ({
        index, // Índice del primer nivel
        deepIndex: deepIndices[i] || null // Índice profundo, o null si no hay
      }));

      console.log(pageData)

      setPageIndices(indices);
    };

    calculatePages();

    // Recalcular si la ventana cambia de tamaño
    window.addEventListener("resize", calculatePages);
    return () => window.removeEventListener("resize", calculatePages);
  }, [sections]);

  return (
    <div ref={sections} className='flex flex-col justify-center px-[1.25rem]'>
        {page.map((seccion, seccionIndx) => (
            <SeccionCuerpoCentral key={seccionIndx} {...seccion}/>
        ))}
    </div>
  )
}
