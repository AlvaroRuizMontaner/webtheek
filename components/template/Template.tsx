"use client"

import { generatePDF } from "@/services/PDFAPI";
import { getHtmlWithStyles } from "@/utils/generateHtml";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import "./curriculum.css";
import SideHeader from "./SideHeader";
import Spinner from "../spinners/Spinner";
import Link from "next/link";
import CentralBody from "./CentralBody";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createCurriculum } from "@/services/CurriculumAPI";
import Button from "../button/Button";
import { addPage } from "@/redux/features/curriculumSlice";



export default function Template() {
  const [pdfUrl, setPdfUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(true)
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
  };

  useEffect(() => {
    if(!showOptions) {
        const html: string | undefined = getHtmlWithStyles(referrer);
        if (html) {
          setIsLoading(true)
          mutate(html);
          setShowOptions(true)
        }
    }
  },[showOptions])

  const pages = useAppSelector((state) => state.curriculumReducer)
  console.log(pages[0][0])


  if(pages) return (
    <>
    {/* El referrer se ha colodado en un ancestro extra porque de otro modo no cogia el background-color */}
      <div ref={referrer}>
        {pages.map((page, pageNumber) => (
          <div key={"cuerpo" + pageNumber} className=" bg-white min-w-[785px] h-[1122px] overflow-x-scroll lg:overflow-x-hidden">
            <div className="max-w-2xl bg-white p-12 px-0 mx-auto relative">
                {showOptions && <div className="absolute top-10">hola</div>}
                <div className="contenedor">
                    <section className="">
                        <CentralBody pageNumber={pageNumber} page={page} />
                    </section>
                    <section className="bg-indigo-600">
                        <SideHeader />
                    </section>
                </div>
            </div>
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
}

