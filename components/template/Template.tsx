import { BiSave } from "react-icons/bi";
import { generatePDF } from "@/services/PDFAPI";
import { getHtmlWithStyles } from "@/utils/generateHtml";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import "./curriculum.scss";
import "./theme/themes.scss";
import Spinner from "../spinners/Spinner";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addPage, initialState, sincronize } from "@/redux/features/curriculumSlice";
import { DocumentPlusIcon } from "@heroicons/react/20/solid";
import PdfIcon from '../../public/icons/pdf_icon.svg';
import EditableTheme from "./theme/EditableTheme";
import { useEditCurriculumContentMutation } from "@/redux/services/createApiCurriculum";
import { Curriculum } from "@/types/curriculum";
import { toast } from "react-toastify";
import Page from "./Page";

type TemplateProps = {
  curriculumId: string
  savedContent: Curriculum["content"]
  isPublic?: boolean
}


export const Template = ({curriculumId, savedContent, isPublic=false}: TemplateProps) => {
  const [pdfUrl, setPdfUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(true)
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
  };

  useEffect(() => {
    if(showOptions === false) {
      const html: string | undefined = getHtmlWithStyles(referrer);
      if (html) {
        setIsLoading(true)
        mutate(html);
        setShowOptions(true)
        console.log("setShowOptionsTrue")
      }
    }
  },[showOptions])

  const content = useAppSelector((state) => state.curriculumReducer);

  useEffect(() => {
    // Si el registro tiene informacion util, se añade al estado
    if (savedContent && savedContent.pages.length > 0) {
      dispatch(sincronize(savedContent));
    } else {
      // Si el registro NO tiene informacion util, se aplica el initialState
      dispatch(sincronize(initialState));
    }
  }, [savedContent, dispatch]);

  const handleEdit = async (formData: Curriculum["content"]) => {
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


  if(content && content.pages) return (
    <div className="relative overflow-x-scroll md:overflow-x-hidden">
      {/* El referrer se ha colodado en un ancestro extra porque de otro modo no cogia el background-color */}
      <div className="flex flex-col gap-12" ref={referrer}>
        {content.pages.map((page, pageNumber) => (
          <Page isPublic={isPublic} themeName={content.themeName} key={"page" + pageNumber} page={page} pageNumber={pageNumber} showOptions={showOptions} />
        ))}
      </div>
      <section className="top-0 left-4 fixed z-50 h-full flex flex-col justify-center">
        <div className="bg-gray-100 rounded-lg py-2 flex flex-col gap-3 justify-center h-fit">
          {!isPublic && <div
            className="flex justify-center cursor-pointer"
            onClick={() => dispatch(addPage())}
          >
            <DocumentPlusIcon className="w-8 h-8 text-gray-200" />
          </div>}
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
          {!isPublic && <div>
            <div
              className="cursor-pointer w-8 h-8 relative"
              onClick={() => handleEdit(content as any)}
            >
              {isEditLoading ? (
                <span className="absolute left-0 bottom-0 block w-8 h-8">
                  <Spinner color="violet" size="small" />
                </span>
              ) : (
                <BiSave className="w-8 h-8 text-gray-400" />
              )}
            </div>
          </div>}
        </div>
      </section>
    </div>
  );
}

