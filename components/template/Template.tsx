import { BiSave } from "react-icons/bi"; 
import { generatePDF } from "@/services/PDFAPI";
import { getHtmlWithStyles } from "@/utils/generateHtml";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import "./curriculum.scss";
import "./theme/themes.scss"
import Spinner from "../spinners/Spinner";
import Link from "next/link";
import CentralBody from "./CentralBody";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addBodyChildByIndex, addPage, sincronize } from "@/redux/features/curriculumSlice";
import { DocumentPlusIcon, PlusIcon } from "@heroicons/react/20/solid";
import PdfIcon from '../../public/icons/pdf_icon.svg';
import SideBody from "./side/SideBody";
import Header from "./header/Header";
import ControlOptions from "./ControlOptions";
import { IconType } from "react-icons/lib";
import EditableTheme from "./theme/EditableTheme";
import { useEditCurriculumContentMutation } from "@/redux/services/createApiCurriculum";
import { CurriculumContentFormData } from "@/types/curriculum";
import { toast } from "react-toastify";

type TemplateProps = {
  curriculumId: string
  savedContent: CurriculumContentFormData
}


export const Template = ({curriculumId, savedContent}: TemplateProps) => {
  const [pdfUrl, setPdfUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(true)
  const [showDashLine, setShowDashLine] = useState(true)
  const [editCurriculumContent, { /* data, error, */ isLoading: isEditLoading/* , isFetching  */}] = useEditCurriculumContentMutation();
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

  const pages = useAppSelector((state) => state.curriculumReducer);

  useEffect(() => {
    console.log(pages)
    if (savedContent && savedContent.length > 0) {
      console.log(savedContent)
      dispatch(sincronize(savedContent));
    }
  }, [savedContent, dispatch]);

  const handleEdit = async (formData: CurriculumContentFormData) => {
    console.log(formData)
    try {
        const result = await editCurriculumContent({curriculumId, formData}).unwrap();
        console.log("Actualización exitosa:", result);
        toast.success("Guardado con éxito")
    } catch (err) {
        console.error("Error en la mutación:", err);
        toast.error("No se ha podido guardar")
    }
  };


  if(pages) return (
    <div className="relative overflow-x-scroll md:overflow-x-hidden">
      {/* El referrer se ha colodado en un ancestro extra porque de otro modo no cogia el background-color */}
      <div className="flex flex-col gap-12" ref={referrer}>
        {pages.map((page, pageNumber) => (
          <div
            key={"cuerpo" + pageNumber}
            className="relative bg-white h-[297mm] w-[785px] flex items-center m-auto overflow-y-hidden"
          >
            <div className="min-w-[42rem] h-full max-w-2xl bg-white p-12 px-0 mx-auto relative">
              {showOptions && (
                <ControlOptions
                  contentLength={page.body.length}
                  addFunctions={[
                    {
                      function: addBodyChildByIndex,
                      icon: PlusIcon as IconType,
                    },
                  ]}
                  dispatch={dispatch}
                  color="gray-200"
                  pageNumber={pageNumber}
                />
              )}
              <div className="contenedor h-full">
                <section className="">
                  <CentralBody pageNumber={pageNumber} page={page.body} />
                </section>
                <section className={`side ${page.themeName}`}>
                  {pageNumber === 0 && (
                    <Header themeName={page.themeName} {...page.header} />
                  )}
                  <SideBody
                    showOptions={showOptions}
                    pageNumber={pageNumber}
                    page={page.side}
                  />
                </section>
              </div>
            </div>
            {showDashLine && (
              <div className="absolute w-full bottom-[48px] border border-black border-dashed"></div>
            )}
          </div>
        ))}
      </div>
      <section className="top-0 left-4 fixed z-50 h-full flex flex-col justify-center">
        <div className="bg-gray-100 rounded-lg py-2 flex flex-col gap-3 justify-center h-fit">
          <div
            className="flex justify-center cursor-pointer"
            onClick={() => dispatch(addPage())}
          >
            <DocumentPlusIcon className="w-8 h-8 text-gray-200" />
          </div>
          <div>
            <div
              className="cursor-pointer w-8 h-8 relative"
              onClick={handleClick}
            >
              {isLoading ? (
                <span className="absolute left-0 bottom-0 block w-8 h-8">
                  <Spinner color="violet" size="small" />
                </span>
              ) : (
                <PdfIcon className="w-8 h-8 text-gray-200" />
                /* https://www.svgrepo.com/svg/64173/pdf-file */
              )}
            </div>
            <Link
              ref={linkRef}
              target={"_blank"}
              href={pdfUrl}
              className="hidden absolute"
            ></Link>
          </div>
          <EditableTheme />
          <div>
            <div
              className="cursor-pointer w-8 h-8 relative"
              onClick={() => handleEdit(pages as any)}
            >
              {isEditLoading ? (
                <span className="absolute left-0 bottom-0 block w-8 h-8">
                  <Spinner color="violet" size="small" />
                </span>
              ) : (
                <BiSave className="w-8 h-8 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

