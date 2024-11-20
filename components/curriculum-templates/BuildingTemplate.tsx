"use client"

import { generatePDF } from "@/services/PDFAPI";
import { getHtmlWithStyles } from "@/utils/generateHtml";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState, /* useState */ } from "react";
import "./curriculum.css";
import Link from "next/link";
import Spinner from "@/components/spinners/Spinner";
import EncabezadoLateral from "./EncabezadoLateral";
import { CuerpoCentralPaginas } from "./templates.info";
import Template from "./Template";
import CuerpoCentralBuilding, { indexArrayType } from "./CuerpoCentralBuilding";

type TemplateProps = {
  sections: CuerpoCentralPaginas
}


export default function BuildingTemplate({sections}: TemplateProps): JSX.Element {
  const MAX_HEIGHT = 1122 /* 1139 */ /* 1162 */
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


  const [indexArrays, setIndexArrays] = useState<indexArrayType[]>([]); // Índices donde dividir

/*   // Función para dividir el array en páginas
  const getPages = () => {
    const pages = [];
    let start = 0;
  
    pageIndices.forEach((endIndex, i) => {
      const end = endIndex || sections.length; // Si `endIndex` es undefined, usar `sections.length`
      pages.push(sections.slice(start, end)); // Agregar el segmento actual
      start = end; // Actualizar `start` para la siguiente iteración
    });
  
    // Último segmento: manejar cualquier contenido restante
    if (start < sections.length) {
      pages.push(sections.slice(start));
    }
  
    return pages;
  }; */

  return (
    <>
    {/* El referrer se ha colodado en un ancestro extra porque de otro modo no cogia el background-color */}
      <div ref={referrer}>
        <div className=" bg-white min-w-[785px] overflow-x-scroll lg:overflow-x-hidden">
          <div className="contenedor max-w-2xl bg-white  mx-auto p-12 px-0">
            <section className="">
                <CuerpoCentralBuilding MAX_HEIGHT={MAX_HEIGHT} setIndexArrays={setIndexArrays} page={sections} />
              {/* <CuerpoCentral page={buildCuerpoCentralPagina1(cuerpoCentralPaginas)} /> */}
            </section>
            <section className="bg-indigo-600">
              <EncabezadoLateral />
              {/* <CuerpoLateral page={buildCuerpoLateralPagina1(lateralPaginas)} /> */}
            </section>
          </div>
        </div>
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
      <Template sections={sections} indexArrays={indexArrays} />
    </>
  );
}

