"use client"

import { generatePDF } from "@/services/PDFAPI";
import { getHtmlWithStyles } from "@/utils/generateHtml";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import "./curriculum.css";
import Link from "next/link";
import Spinner from "@/components/spinners/Spinner";
import EncabezadoLateral from "./EncabezadoLateral";
import CuerpoCentralTemplate from "./CuerpoCentralTemplate";
import { indexArrayType } from "./CuerpoCentralBuilding";
import { CuerpoCentralPaginas, Section } from "./templates.info";

type TemplateProps = {
  sections: CuerpoCentralPaginas
  indexArrays: indexArrayType[]
}

/* function lol(sections: CuerpoCentralPaginas): Section[][] {
    const sliceLvl1: any = sections.slice(0,2)
    const sliceLvl2: any = sections[2].slice(0,1)
    const sliceLvl3: any = sections[2][1].slice(0,0) //Pienso que da un []
    const sliceLvl4: any = sections[2][1][0].slice(0,2)
    const sliceLvl5: any = sections[2][1][0][2] && sections[2][1][0][2].slice(0,1)

    console.log(sliceLvl1)
    console.log(sliceLvl2)
    console.log(sliceLvl3)
    console.log(sliceLvl4)
    console.log(sliceLvl5)


    sliceLvl4.push(sliceLvl5)
    sliceLvl3.push(sliceLvl4)
    sliceLvl2.push(sliceLvl3)
    sliceLvl1.push(sliceLvl2)
    console.log(sliceLvl1)
    const newX = []
    newX.push(sliceLvl1)
    console.log(newX)
    return newX

  } */


function buildPage(nestedSlices: any[]): CuerpoCentralPaginas {
    const newNestedSlices = JSON.parse(JSON.stringify(nestedSlices))
    const reversedNestedSlices = [...newNestedSlices].reverse()
    let arr: any = []


    reversedNestedSlices.forEach((nestedSlice, index) => {
        const newNestedSlice = JSON.parse(JSON.stringify(nestedSlice))
        let currentSlice: any = []
        console.log(newNestedSlice)
/*         if(index === 0) {
            currentSlice = newNestedSlice
            //console.log(currentSlice, index)
        } else {
            nestedSlice.push(currentSlice)
            currentSlice = nestedSlice
            //console.log(currentSlice, index)

            if(index === nestedSlices.length-1) { // Tras la última iteracion ya se puede retornar el valor final
                arr = currentSlice
            }
        } */
    })
    console.log(arr)
    return arr
}



export default function Template({sections, indexArrays}: TemplateProps): JSX.Element {
    const nolose = []
    /* page-break-inside: avoid; */
  const [pdfUrl, setPdfUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { mutate } = useMutation({
    mutationFn: generatePDF,
    onError: (error) => {
      console.log(error);
      setIsLoading(false)
    },
    onSuccess: (url) => {
      console.log("Exito");
      setIsLoading(false)
      setPdfUrl(url)
    },
  });

  console.log(indexArrays)

  const referrer = useRef<HTMLDivElement | null>(null);
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if(pdfUrl && linkRef.current) {
      linkRef.current.click();
    }
  }, [pdfUrl])


  const handleClick = () => {
    const html: string | undefined = getHtmlWithStyles(referrer);
    if (html) {
/*       console.log(html);
      console.log(referrer.current?.offsetHeight) */
      setIsLoading(true)
      mutate(html);
    }
  };

/*   // Medir cambios de height con ResizeObserver
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (referrer.current) {
        setHeight(referrer.current.offsetHeight);
      }
    };

    const observer = new ResizeObserver(() => {
      handleResize();
    });

    if (referrer.current) {
      observer.observe(referrer.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log("Altura actualizada:", height);
    // Usa la altura para realizar algo
  }, [height]); */


  // Función para dividir el array en páginas
  const getPages = () => {
    const pages = [];
    let start = 0;
  
    indexArrays.forEach((arr, indx) => {
      const end = arr[indx] || sections.length; // Si `endIndex` es undefined, usar `sections.length`
      pages.push(sections.slice(start, end)); // Agregar el segmento actual
      start = end; // Actualizar `start` para la siguiente iteración
    });
  
    // Último segmento: manejar cualquier contenido restante
    if (start < sections.length) {
      pages.push(sections.slice(start));
    }
  
    return pages;
  };

  //const newX = lol(sections)

  useEffect(() => {
      if(Array.isArray(indexArrays[0])) {
          const nestedSlices = getNestedSlices(sections, indexArrays[0])
          //console.log(nestedSlices)
        const arr = buildPage(nestedSlices)
        //console.log(arr)
        //console.log(slice)
    }
  },[])

  function cleanArrayWithPop(array: any[], sliceIndex: number) {
    // Hacer una copia profunda del array para eliminar referencias mutables
    const newArray = JSON.parse(JSON.stringify(array));
/*     const newArray = sections.map((item, index) => {
        console.log(item, index)
        return Array.isArray(item) ? [...item] : item
    }); */
      
  
    // Bucle para eliminar elementos sobrantes (arrays vacíos)
    while (newArray.length > sliceIndex) {
        newArray.pop(); // Eliminar arrays vacíos al final
/*       if (Array.isArray(newArray[newArray.length - 1]) && newArray[newArray.length - 1].length === 0) {
        newArray.pop(); // Eliminar arrays vacíos al final
      } else {
        newArray.pop(); // Eliminar cualquier elemento adicional
      } */
    }
    //console.log(newArray)
  
    return newArray;
  }

  function getNestedSlices(data: any[], indices: number[]) {
    // Navega por los niveles según los índices
    const nestedSlices: any[] = []
    let current = [...data];
    indices.forEach((index) => {
        const newCurrent = [...current]
        //const slice = JSON.parse(JSON.stringify(newCurrent)).slice(0, index)
        //const slice = cleanArrayWithPop(JSON.parse(JSON.stringify(newCurrent)).slice(0, index), index)
        const slice = cleanArrayWithPop(newCurrent, index)
        console.log(slice)

        //console.log(slice,cleanArrayWithPop(slice, index))
        //nestedSlices.splice(nestedSlices.length, 0, slice)
        nestedSlices.push(slice)

      current = current[index];
    });
  
    // Aplica slice al nivel más profundo
    //console.log(nestedSlices)
    return nestedSlices
}


  const pages = getPages()

/*   console.log(pages)
  console.log(deepPages) */

  return (
    <>
    {/* El referrer se ha colodado en un ancestro extra porque de otro modo no cogia el background-color */}
{/*       <div ref={referrer}>
        {pages.map((page, index) => (
          <div key={"cuerpo" + index} className=" bg-white min-w-[785px] overflow-x-scroll lg:overflow-x-hidden">
            <div className="contenedor max-w-2xl bg-white  mx-auto p-12 px-0">
              <section className="">
                  <CuerpoCentralTemplate page={page} />
              </section>
              <section className="bg-indigo-600">
                <EncabezadoLateral />
              </section>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 relative h-[72px]">
        <button
          onClick={handleClick}
          className="py-4 px-10 max-h-[56px] bg-accent-700 shadow-y-1 rounded-lg
          mx-auto block absolute left-1/2 -translate-x-1/2 w-[200px] text-white h-[56px] text-[16px]"
        >
          {isLoading ? <Spinner/> : "Convert to pdf"}
        </button>
        <Link ref={linkRef} target={"_blank"} href={pdfUrl} className="hidden absolute"></Link>
      </div> */}
    </>
  );
}

