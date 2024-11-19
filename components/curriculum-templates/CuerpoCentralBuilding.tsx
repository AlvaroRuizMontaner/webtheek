import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import SeccionCuerpoCentral from './SeccionCuerpoCentral'
import { seccionCuerpoCentralInfoType } from './templates.info'

type CuerpoCentralProps = {
  page: seccionCuerpoCentralInfoType[]
  setPageIndices: Dispatch<SetStateAction<number[]>>
  MAX_HEIGHT: number
}

type indexesType = {
  cutIndex: number,
  nestingLevel1CutIndex?: number
  nestingLevel2CutIndex?: number
  nestingLevel3CutIndex?: number
}[]

export default function CuerpoCentralBuilding({page, setPageIndices, MAX_HEIGHT}: CuerpoCentralProps) {
  const sections = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let page = 0
    const calculateDeepLevel = (deepChildren: Element[], deepCurrentHeight: number, indexes: indexesType, nestingLevel: number, page: number) => {
      let moreDeepCurrentHeight = deepCurrentHeight
      let deeperChildren: Element[] = []
      deepChildren.some((deepChild, deepIndex) => { // Se usa some para detener la iteración cuando necesite con el return true

        const deepElementHeight = (deepChild as HTMLElement).offsetHeight;
        deepCurrentHeight += deepElementHeight

        console.log(`Altura de iteracion nesteada en elemento ${deepIndex+1}`,deepCurrentHeight)

        if (deepCurrentHeight > MAX_HEIGHT) {
          //deepIndices.push(deepIndex)
          indexes[page] = {
            ...indexes[page],
            [`nestingLevel${nestingLevel}CutIndex`]: deepIndex
          }
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
      const indexes: indexesType = []
      const container = sections.current;

      // Iterar sobre los hijos del contenedor para medir alturas acumuladas
      Array.from(container.children).forEach((child, index) => {
        const elementHeight = (child as HTMLElement).offsetHeight;
        currentHeight += elementHeight;
        
        if (currentHeight > MAX_HEIGHT) {
          indices.push(index); // Marcar dónde cortar
          indexes.push({
            cutIndex: index
          })
          console.log(`Altura de sobrepaso de pagina ${index+1}`,currentHeight)
          
          const deepCurrentHeight = currentHeight - elementHeight
          console.log(`Altura anterior a corte de pagina ${index+1}`,deepCurrentHeight)
          const deepChildren = Array.from(child.children)
          const [doubleDeepCurrentHeight, deeperChildren] = calculateDeepLevel(deepChildren, deepCurrentHeight, indexes, 1, page)
          const [tripleDeepCurrentHeight, moreDeeperChildren] = calculateDeepLevel((deeperChildren as Element[]), (doubleDeepCurrentHeight as number), indexes, 2, page)
          calculateDeepLevel((moreDeeperChildren as Element[]), (tripleDeepCurrentHeight as number), indexes, 3, page)

          page += 1
          currentHeight = elementHeight; // Resetear altura acumulada
        }
      });

      console.log(indexes)
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
