import { ChartBarIcon, ChatBubbleOvalLeftIcon, UserIcon } from "@heroicons/react/20/solid";
import ControlOptions from "../ControlOptions";
import { SectionSideBodyInfoType } from "../curriculum.info";
import SectionSideBody from "./SectionSideBody";
import { IconType } from "react-icons/lib";
import { addSideBodyChildByIndex, addSideBodyChildByIndex2, addSideBodyChildByIndex3 } from "@/redux/features/curriculumSlice";
import { useAppDispatch } from "@/redux/hooks";

type SideBodyProps = {
  sidePage: SectionSideBodyInfoType[]
  pageNumber: number
  showOptions: boolean
  isEditable: boolean
}


export default function SideBody({sidePage, pageNumber, showOptions, isEditable}: SideBodyProps) {
  const dispatch = useAppDispatch()


  const sideAddFunctionOptions = [
    {
      function: addSideBodyChildByIndex,
      icon: UserIcon as IconType
    },
    {
      function: addSideBodyChildByIndex2,
      icon: ChatBubbleOvalLeftIcon as IconType
    },
    {
      function: addSideBodyChildByIndex3,
      icon: ChartBarIcon as IconType
    },
  ]

  return (
    <div className='flex flex-col justify-center gap-5 p-[1.25rem] text-white relative'>
      {showOptions && <ControlOptions position="side" contentLength={sidePage.length} addFunctions={sideAddFunctionOptions} dispatch={dispatch} color="gray-200" pageNumber={pageNumber} />}
      {sidePage.map((bodyChild, bodyChildIndex) => (
        <SectionSideBody sideAddFunctionOptions={sideAddFunctionOptions} pageNumber={pageNumber} key={bodyChildIndex} bodyChildIndex={bodyChildIndex} {...bodyChild} isEditable={isEditable} />
      ))}
    </div>
  )
}
