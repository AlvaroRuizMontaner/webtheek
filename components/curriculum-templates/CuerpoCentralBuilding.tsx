import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import SeccionCuerpoCentral from './SeccionCuerpoCentral'
import { seccionCuerpoCentralInfoType } from './templates.info'

type CuerpoCentralProps = {
  page: seccionCuerpoCentralInfoType[]
  setIndexObjects: Dispatch<SetStateAction<indexObjectType[]>>
  MAX_HEIGHT: number
}

export type indexObjectType = {
  cutIndex: number,
  nestingLevel1CutIndex?: number
  nestingLevel2CutIndex?: number
  nestingLevel3CutIndex?: number
}

type indexObjectsType = indexObjectType[]

export default function CuerpoCentralBuilding({page, setIndexObjects, MAX_HEIGHT}: CuerpoCentralProps) {
  const sections = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let page = 0
    const calculateDeepLevel = (deepChildren: Element[], deepCurrentHeight: number, indexObjects: indexObjectsType, nestingLevel: number, page: number) => {
      let moreDeepCurrentHeight = deepCurrentHeight
      let deeperChildren: Element[] = []
      deepChildren.some((deepChild, deepIndex) => { // Se usa some para detener la iteración cuando necesite con el return true

        const deepElementHeight = (deepChild as HTMLElement).offsetHeight;
        deepCurrentHeight += deepElementHeight

        console.log(`Altura de iteracion nesteada en elemento ${deepIndex+1}`,deepCurrentHeight)

        if (deepCurrentHeight > MAX_HEIGHT) {
          //deepIndices.push(deepIndex)
          indexObjects[page] = {
            ...indexObjects[page],
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

      let currentHeight = 48 + 48; // Referente al padding-block de pagina (de elementos padre)
      const indices: number[] = [];
      const indexObjects: indexObjectsType = []
      const container = sections.current;

      // Iterar sobre los hijos del contenedor para medir alturas acumuladas
      Array.from(container.children).forEach((child, index) => {
        const elementHeight = (child as HTMLElement).offsetHeight;
        currentHeight += elementHeight;
        
        if (currentHeight > MAX_HEIGHT) {
          indices.push(index); // Marcar dónde cortar
          indexObjects.push({
            cutIndex: index
          })
          console.log(`Altura de sobrepaso de pagina ${index+1}`,currentHeight)
          
          const deepCurrentHeight = currentHeight - elementHeight
          console.log(`Altura anterior a corte de pagina ${index+1}`,deepCurrentHeight)
          const deepChildren = Array.from(child.children)
          const [doubleDeepCurrentHeight, deeperChildren] = calculateDeepLevel(deepChildren, deepCurrentHeight, indexObjects, 1, page)
          const [tripleDeepCurrentHeight, moreDeeperChildren] = calculateDeepLevel((deeperChildren as Element[]), (doubleDeepCurrentHeight as number), indexObjects, 2, page)
          calculateDeepLevel((moreDeeperChildren as Element[]), (tripleDeepCurrentHeight as number), indexObjects, 3, page)

          page += 1
          currentHeight = elementHeight; // Resetear altura acumulada
        }
      });

      console.log(indexObjects)
      //setPageIndices(indices);
      setIndexObjects(indexObjects);
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
