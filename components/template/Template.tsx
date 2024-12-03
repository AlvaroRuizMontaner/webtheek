"use client"

import { generatePDF } from "@/services/PDFAPI";
import { getHtmlWithStyles } from "@/utils/generateHtml";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import "./curriculum.css";
import SideHeader from "./SideHeader";
import Spinner from "../spinners/Spinner";
import Link from "next/link";
import CentralBody from "./CentralBody";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Button from "../button/Button";
import { addPage, deletePage } from "@/redux/features/curriculumSlice";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { createCurriculum } from "@/services/CurriculumAPI";


export const Template = React.memo(() => {
  const [pdfUrl, setPdfUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(true)
  const [showDashLine, setShowDashLine] = useState(true)
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

  const dispatch = useAppDispatch()

  const referrer = useRef<HTMLDivElement | null>(null);
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if(pdfUrl && linkRef.current) {
      linkRef.current.click();
    }
  }, [pdfUrl])


  const handleClick = () => {
    setShowOptions(false)
    setShowDashLine(false)
  };

  useEffect(() => {
    if(!showOptions) {
        const html: string | undefined = getHtmlWithStyles(referrer);
        if (html) {
          setIsLoading(true)
          mutate(html);
          setShowOptions(true)
          setShowDashLine(true)
        }
    }
  },[showOptions])

  const pages = useAppSelector((state) => state.curriculumReducer)
  console.log(pages)


  if(pages) return (
    <>
    {/* El referrer se ha colodado en un ancestro extra porque de otro modo no cogia el background-color */}
      <div ref={referrer}>
        {pages.map((page, pageNumber) => (
          <div key={"cuerpo" + pageNumber} className="relative bg-white h-[1122px] w-[785px] flex items-center m-auto overflow-x-scroll md:overflow-x-hidden">
            <div className="max-w-2xl bg-white p-12 px-0 mx-auto relative">
              {showOptions && (
                <div className="absolute top-8 flex gap-2 w-44 rounded-md">
                    <span className="cursor-pointer bg-gray-100" onClick={() => dispatch(deletePage({pageNumber}))}><XMarkIcon className="w-6 h-6" /></span>
                  {/*   <span className="cursor-pointer bg-gray-100" onClick={() => dispatch(addBodyChild({pageNumber}))}><PlusIcon className="w-6 h-6" /></span> */}
                </div>
              )}
              <div className="contenedor">
                <section className="">
                    <CentralBody pageNumber={pageNumber} page={page} />
                </section>
                <section className="bg-indigo-600">
                    <SideHeader />
                </section>
              </div>
            </div>
            {showDashLine && <div className="absolute w-full bottom-[48px] border border-black border-dashed"></div>}
          </div>
        ))}
      </div>
      <div className="py-4 flex justify-center">
        <Button text="Añadir página" onClick={() => dispatch(addPage())} />
      </div>
      <div className="bg-gray-100 relative h-[72px]">
        <button
          onClick={handleClick}
          className="py-4 px-10 max-h-[56px] bg-accent-700 shadow-y-1 rounded-lg
          mx-auto block absolute left-1/2 -translate-x-1/2 w-[200px] text-white h-[56px] text-[16px]"
        >
          {isLoading ? <Spinner/> : "Convert to pdf"}
        </button>
        <button onClick={() => createCurriculum(pages[0])}>Crear</button>
        <Link ref={linkRef} target={"_blank"} href={pdfUrl} className="hidden absolute"></Link>
      </div>
    </>
  );
})

