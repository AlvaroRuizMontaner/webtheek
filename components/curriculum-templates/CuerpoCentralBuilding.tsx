import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import SeccionCuerpoCentral from './SeccionCuerpoCentral'
import { CuerpoCentralPaginas } from './templates.info'

type CuerpoCentralProps = {
  page: CuerpoCentralPaginas
  setIndexArrays: Dispatch<SetStateAction<indexArrayType[]>>
  MAX_HEIGHT: number
}

export type indexArrayType = number[]

type indexArraysType = indexArrayType[]

export default function CuerpoCentralBuilding({page, setIndexArrays, MAX_HEIGHT}: CuerpoCentralProps) {
  const sections = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let page = 0
    const calculateDeepLevel = (deepChildren: Element[], deepCurrentHeight: number, indexArrays: indexArraysType, nestingLevel: number, page: number) => {
      let moreDeepCurrentHeight = deepCurrentHeight
      let deeperChildren: Element[] = []
      deepChildren.some((deepChild, deepIndex) => { // Se usa some para detener la iteración cuando necesite con el return true

        const deepElementHeight = (deepChild as HTMLElement).offsetHeight;
        deepCurrentHeight += deepElementHeight

        console.log(`Altura de iteracion nesteada en elemento ${deepIndex+1}`,deepCurrentHeight)

        if (deepCurrentHeight > MAX_HEIGHT) {
          indexArrays[page].push(deepIndex)
/*           indexObjects[page] = {
            ...indexObjects[page],
            //[`nestingLevel${nestingLevel}CutIndex`]: deepIndex
            [nestingLevel]: deepIndex
          } */
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

      let currentHeight = 48 + 48; // Referente al padding-block de pagina (de elementos padre)
      const indices: number[] = [];
      const indexArrays: indexArraysType = []
      const container = sections.current;

      // Iterar sobre los hijos del contenedor para medir alturas acumuladas
      Array.from(container.children).forEach((child, index) => {
        const elementHeight = (child as HTMLElement).offsetHeight;
        currentHeight += elementHeight;
        
        if (currentHeight > MAX_HEIGHT) {
          indices.push(index); // Marcar dónde cortar
          indexArrays[page] = []
          indexArrays[page].push(index)
          console.log(`Altura de sobrepaso de pagina ${index+1}`,currentHeight)
          
          const deepCurrentHeight = currentHeight - elementHeight
          console.log(`Altura anterior a corte de pagina ${index+1}`,deepCurrentHeight)
          const deepChildren = Array.from(child.children)
          const [doubleDeepCurrentHeight, deeperChildren] = calculateDeepLevel(deepChildren, deepCurrentHeight, indexArrays, 1, page)
          const [tripleDeepCurrentHeight, moreDeeperChildren] = calculateDeepLevel((deeperChildren as Element[]), (doubleDeepCurrentHeight as number), indexArrays, 2, page)
          const [cuadrupleDeepCurrentHeight, evenMoreDeeperChildren] = calculateDeepLevel((moreDeeperChildren as Element[]), (tripleDeepCurrentHeight as number), indexArrays, 3, page)
          calculateDeepLevel((evenMoreDeeperChildren as Element[]), (cuadrupleDeepCurrentHeight as number), indexArrays, 4, page)

          page += 1
          currentHeight = elementHeight; // Resetear altura acumulada
        }
      });

      console.log(indexArrays)
      //setPageIndices(indices);
      setIndexArrays(indexArrays);
    };

    calculatePages();

    // Recalcular si la ventana cambia de tamaño
    window.addEventListener("resize", calculatePages);
    return () => window.removeEventListener("resize", calculatePages);
  }, [sections]);

  return (
    <div ref={sections} className='flex flex-col justify-center px-[1.25rem]'>
        {page.map((seccion, seccionIndx) => (
            <SeccionCuerpoCentral key={seccionIndx} title={seccion[0]} info={seccion[1]}/>
        ))}
    </div>
  )
}
