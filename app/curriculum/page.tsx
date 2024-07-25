"use client"

import { generatePDF } from "@/services/PDFAPI";
import { getHtmlWithStyles } from "@/utils/generateHtml";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState, /* useState */ } from "react";
import "./curriculum.css";
import EncabezadoLateral from "@/components/curriculum/EncabezadoLateral";
import CuerpoLateral from "@/components/curriculum/CuerpoLateral";
import CuerpoCentral from "@/components/curriculum/CuerpoCentral";
import { cuerpoCentralPagina1, cuerpoCentralPagina2, lateralPagina1, lateralPagina2 } from "@/components/curriculum/curriculum.info";
import Link from "next/link";
import Spinner from "@/components/spinners/Spinner";

export default function Page(): JSX.Element {
  const [pdfUrl, setPdfUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { mutateAsync } = useMutation({
    mutationFn: generatePDF,
    onError: (error) => {
      console.log(error);
      setIsLoading(false)
    },
    onSuccess: () => {
      console.log("Exito");
      setIsLoading(false)
    },
  });

  const referrer = useRef<HTMLDivElement | null>(null);
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    console.log(isLoading)
    if(pdfUrl && linkRef.current) {
      linkRef.current.click();
    }
  }, [pdfUrl])


  const handleClick = async () => {
    const html: string | undefined = getHtmlWithStyles(referrer);
    if (html) {
/*       console.log(html);
      console.log(referrer.current?.offsetHeight) */
      setIsLoading(true)
      const url = await mutateAsync(html);
      setPdfUrl(url)
    }
  };

  return (
    <>
    {/* El referrer se ha colodado en un ancestro extra porque de otro modo no cogia el background-color */}
      <div ref={referrer}>

        <div className=" bg-white min-h-screen min-w-[785px] overflow-x-scroll">
          <div className="contenedor max-w-2xl bg-white  mx-auto p-12 px-0">
            <section className="">
              <CuerpoCentral page={cuerpoCentralPagina1} />
            </section>
            <section className="bg-indigo-600">
              <EncabezadoLateral />
              <CuerpoLateral page={lateralPagina1} />
            </section>
          </div>
        </div>

        <div className="  bg-white min-h-screen min-w-[785px] overflow-x-scroll">
          <div className="contenedor max-w-2xl bg-white  mx-auto p-12 px-0">
            <section className="">
              <CuerpoCentral page={cuerpoCentralPagina2} />
            </section>
            <section className="bg-indigo-600">
              <CuerpoLateral page={lateralPagina2} />
            </section>
          </div>
        </div>

      </div>
      <div className="bg-yellow-200 relative">
        <button
          onClick={handleClick}
          className="py-4 px-10 max-h-[56px] bg-secondary shadow-1 rounded-lg
          mx-auto block absolute left-1/2 -translate-x-1/2 w-[196px] h-[56px]"
        >
          {isLoading ? <Spinner/> : "Convert to pdf"}
        </button>
        <Link ref={linkRef} target={"_blank"} href={pdfUrl} className="hidden absolute"></Link>
      </div>
    </>
  );
}

