"use client"

import { generatePDF } from "@/services/PDFAPI";
import { getHtmlWithStyles } from "@/utils/generateHtml";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import "./curriculum.scss";
import Spinner from "../spinners/Spinner";
import Link from "next/link";
import CentralBody from "./CentralBody";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addPage, deletePage } from "@/redux/features/curriculumSlice";
import { DocumentPlusIcon, DocumentTextIcon, XMarkIcon } from "@heroicons/react/20/solid";
import SideBody from "./side/SideBody";
import Header from "./header/Header";


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
    if(showOptions === false) {
        const html: string | undefined = getHtmlWithStyles(referrer);
        if (html) {
          setIsLoading(true)
          mutate(html);
          setShowOptions(true)
          console.log("setShowOptionsTrue")
          setShowDashLine(true)
        }
    }
  },[showOptions])

  const pages = useAppSelector((state) => state.curriculumReducer)


  if(pages) return (
    <div className="relative overflow-x-scroll md:overflow-x-hidden">
      {/* El referrer se ha colodado en un ancestro extra porque de otro modo no cogia el background-color */}
      <div ref={referrer}>
        {pages.map((page, pageNumber) => (
          <div
            key={"cuerpo" + pageNumber}
            className="relative bg-white h-[297mm] w-[785px] flex items-center m-auto"
          >
            <div className="min-w-[42rem] h-full max-w-2xl bg-white p-12 px-0 mx-auto relative">
              {showOptions && pageNumber !== 0 && (
                <div className="absolute top-8 flex gap-2 w-44 rounded-md">
                  <span
                    className="cursor-pointer bg-gray-100"
                    onClick={() => dispatch(deletePage({ pageNumber }))}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </span>
                  {/*   <span className="cursor-pointer bg-gray-100" onClick={() => dispatch(addBodyChild({pageNumber}))}><PlusIcon className="w-6 h-6" /></span> */}
                </div>
              )}
              <div className="contenedor h-full">
                <section className="">
                  <CentralBody pageNumber={pageNumber} page={page.body} />
                </section>
                <section className="bg-indigo-600">
                  {pageNumber === 0 && <Header {...page.header} />}
                  <SideBody pageNumber={pageNumber} page={page.side} />
                </section>
              </div>
            </div>
            {showDashLine && (
              <div className="absolute w-full bottom-[48px] border border-black border-dashed"></div>
            )}
          </div>
        ))}
      </div>
      <section className="top-0 left-2 lg:left-20 flex flex-col gap-3 fixed">
        <div className="mt-4 flex justify-center cursor-pointer" onClick={() => dispatch(addPage())}>
          <DocumentPlusIcon className="w-8 h-8 text-gray-200" />
        </div>
        <div className="cursor-pointer w-8 h-8 relative" onClick={handleClick}>
          {isLoading ? <span className="absolute left-0 bottom-0 block w-8 h-8"><Spinner color="violet" size="small" /></span> : <DocumentTextIcon className="w-8 h-8 text-gray-200" />}
        </div>
        <Link
          ref={linkRef}
          target={"_blank"}
          href={pdfUrl}
          className="hidden absolute"
        ></Link>
{/*         <div className="bg-gray-100 relative h-[72px]">
          <button
            onClick={handleClick}
            className="py-4 px-10 max-h-[56px] bg-accent-700 shadow-y-1 rounded-lg
            mx-auto block absolute left-1/2 -translate-x-1/2 w-[200px] text-white h-[56px] text-[16px]"
          >
            {isLoading ? <Spinner /> : "Convert to pdf"}
          </button>
          <Link
            ref={linkRef}
            target={"_blank"}
            href={pdfUrl}
            className="hidden absolute"
          ></Link>
        </div> */}
      </section>
    </div>
  );
})

