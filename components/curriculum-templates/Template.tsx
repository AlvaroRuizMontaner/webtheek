"use client"

import { generatePDF } from "@/services/PDFAPI";
import { getHtmlWithStyles } from "@/utils/generateHtml";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import "./curriculum.css";
import { indexArrayType } from "./CuerpoCentralBuilding";
import { CuerpoCentralPaginas } from "./templates.info";
import CuerpoCentralTemplate from "./CuerpoCentralTemplate";
import EncabezadoLateral from "./EncabezadoLateral";
import Spinner from "../spinners/Spinner";
import Link from "next/link";

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


function buildPage1(nestedSlices: any[]): CuerpoCentralPaginas {
    const newNestedSlices = JSON.parse(JSON.stringify(nestedSlices))
    const reversedNestedSlices = [...newNestedSlices].reverse()
    const arr: any = []
    const returnArr: any = []


    reversedNestedSlices.forEach((nestedSlice, index) => {

        if(index === 0) {
            arr[index] = JSON.parse(JSON.stringify(nestedSlice))
            //console.log(arr[index])
        } else {
            const currentSlice = JSON.parse(JSON.stringify(nestedSlice))
            const previousSlice = JSON.parse(JSON.stringify(arr[index-1]))
            currentSlice.push(previousSlice)
            arr[index] = currentSlice
        }
    })
    //console.log(arr)
    returnArr.push(arr[arr.length-1])
    return returnArr
}
function buildPage3(nestedSlices: any[]): CuerpoCentralPaginas {
    const newNestedSlices = JSON.parse(JSON.stringify(nestedSlices))
    const reversedNestedSlices = [...newNestedSlices].reverse()
    const arr: any = []
    const returnArr: any = []

    reversedNestedSlices.forEach((nestedSlice, index) => {

        if(index === 0) {
            arr[index] = JSON.parse(JSON.stringify(nestedSlice))
        } else {
            const currentSlice = JSON.parse(JSON.stringify(nestedSlice))
            const previousSlice = JSON.parse(JSON.stringify(arr[index-1]))

            //Calcular substitutionIndex
            const substitutionIndex = currentSlice.lastIndexOf(0);

            currentSlice[substitutionIndex] = previousSlice
            arr[index] = currentSlice
        }
    })
    //console.log(arr)
    returnArr.push(arr[arr.length-1])
    return returnArr
}



export default function Template({sections, indexArrays}: TemplateProps) {
    const [arrayPages, setArrayPages] = useState<any[]>([])
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

  //console.log(indexArrays)

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


  useEffect(() => {
    if(Array.isArray(indexArrays[0]) && Array.isArray(sections)) {
      const nestedSlices =  getNestedSlices(sections, indexArrays[0])
      const nestedSlices3 =  getNestedSlices3(sections, indexArrays[0])
      //nestedSlices2.pop();nestedSlices2.pop();nestedSlices2.pop()

      const arr: any[] = buildPage1(nestedSlices)
      const arr3: any[] = buildPage3(nestedSlices3)

      console.log(nestedSlices3)
      console.log(arr3)

      //setArrayPages(arr)
      setArrayPages([...arr, ...arr3])
    }
  },[])

  function cleanArrayWithPop(array: any[], sliceIndex: number) {
    // Hacer una copia profunda del array para eliminar referencias mutables
    const newArray = JSON.parse(JSON.stringify(array));
      
    // Bucle para eliminar elementos sobrantes (arrays vacíos)
    while (newArray.length > sliceIndex) {
        newArray.pop(); // Eliminar arrays vacíos al final
    }
    //console.log(newArray)
  
    return newArray;
  }

  function cleanArrayWithPlaceholders(array: any[], sliceIndex: number): any[] {
    // Crear una copia para no mutar el array original
    const newArray = JSON.parse(JSON.stringify(array));
  
    // Reemplazar los primeros elementos con ceros
    for (let i = 0; i <= sliceIndex; i++) {
      if (i < newArray.length) {
        console.log(newArray[i])
        newArray[i] = 0;
      }
    }
  
    return newArray;
  }

  function getNestedSlices(data: any[], indices: number[]) {
    // Navega por los niveles según los índices
    let nestedSlices: any[] = []
    let current = JSON.parse(JSON.stringify(data)) //[...data]

    console.log(indices)

    indices.forEach((cutIndex, _) => {
      // Asegurar que `current` es iterable
      const newCurrent = Array.isArray(current) ? JSON.parse(JSON.stringify(current)) : [];
      const slice = cleanArrayWithPop(newCurrent, cutIndex);
          
      nestedSlices.push(slice);

      // Avanzar al siguiente nivel solo si `current` es un array válido
      current = Array.isArray(current) && current[cutIndex] ? current[cutIndex] : [];
    });

    if(indices.filter((indx) => indx !==0).length === 1) {
      const indexForPops = indices.filter((indx) => indx !==0)[0]
      nestedSlices = cleanArrayWithPop(nestedSlices, indexForPops)
      // Pendiente probar el caso de indices = [2] u otro numero
    }
  
    return nestedSlices
}

  function getNestedSlices3(data: any[], indices: number[]) {
    // Navega por los niveles según los índices
    const nestedSlices3: any[] = []
    let current = JSON.parse(JSON.stringify(data)) //[...data]


    indices.forEach((cutIndex, index) => {
      // Asegurar que `current` es iterable
      const newCurrent = Array.isArray(current) ? JSON.parse(JSON.stringify(current)) : [];
      let slice3 = []

      if(index === indices.length-1) {
        slice3 = newCurrent.slice(cutIndex)
      } else {
        slice3 = cleanArrayWithPlaceholders(newCurrent, cutIndex)
        //const substitutionIndex = slice3.lastIndexOf(0);
        //slice3[substitutionIndex] = 1
      }
      
      console.log(slice3, index)
      nestedSlices3.push(slice3);

  
      // Avanzar al siguiente nivel solo si `current` es un array válido
      current = Array.isArray(current) && current[cutIndex] ? current[cutIndex] : [];
    });
  
    return nestedSlices3
}


  if(arrayPages) return (
    <>
    {/* El referrer se ha colodado en un ancestro extra porque de otro modo no cogia el background-color */}
      <div ref={referrer}>
        {arrayPages.map((page, index) => (
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
      </div>
    </>
  );
}

