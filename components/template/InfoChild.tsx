import { useRef, useState } from 'react';
import { InfoChildType } from './curriculum.info';
import { addInfoChild, deleteInfoChildByIndex } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import EditableMain from './EditableMain';
import EditableDetail from './EditableDetail';
import EditableDate from './EditableDate';
import EditableListChild from './EditableListChild';

type InfoChildProps = {
    infoChildIndex: number, 
    handleOnBlur: () => void, 
    handleOnFocus: () => void, 
    infoChild: InfoChildType,
    pageNumber: number
    bodyChildIndex: number
}

export default function InfoChild({infoChildIndex, handleOnBlur, handleOnFocus, infoChild, pageNumber, bodyChildIndex}: InfoChildProps) {
    const ulRef = useRef<HTMLUListElement | null>(null)
    const dispatch = useAppDispatch()
    const [showInfoChildOptions, setShowInfoChildOptions] = useState(false)

    const handleInfoOnBlur = () => {
        handleOnBlur()
        setTimeout(() => setShowInfoChildOptions(false), 100)
    }
    const handleInfoOnFocus = () => {
        handleOnFocus()
        setTimeout(() => setShowInfoChildOptions(true), 100)
    }

  return (
    <div className='relative'>
      {showInfoChildOptions && (
        <div className="absolute -left-16 top-[50%] -translate-y-[50%] flex-col gap-2 py-1 rounded-md bg-blue-900 text-white">
          <span className="cursor-pointer " onClick={() => dispatch(deleteInfoChildByIndex({pageNumber, bodyChildIndex, infoChildIndex}))}><MinusIcon className="w-6 h-6" /></span>
          <span className="cursor-pointer" onClick={() => dispatch(addInfoChild({pageNumber, bodyChildIndex, infoChildIndex}))}><PlusIcon className="w-6 h-6" /></span>
        </div>
      )}
      <div className="space-y-2" key={infoChildIndex}>
        {infoChild.main && <EditableMain infoChild={infoChild} handleInfoOnBlur={handleInfoOnBlur} handleInfoOnFocus={handleInfoOnFocus} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} main={infoChild.main} />}
        <div className="flex justify-between text-gray-400 text-sm">
          {infoChild && infoChild.detail && <EditableDetail infoChild={infoChild} handleInfoOnBlur={handleInfoOnBlur} handleInfoOnFocus={handleInfoOnFocus} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} detail={infoChild.detail} />}
          {infoChild && infoChild.detail && infoChild.date && <EditableDate handleInfoOnBlur={handleInfoOnBlur} handleInfoOnFocus={handleInfoOnFocus} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} date={infoChild.date} />}
        </div>
        {infoChild.list && infoChild.list.length >= 1 && (
          <ul className=" text-[14px] list-disc" ref={ulRef}>
            {infoChild.list.map((listChild, listChildIndex) => <EditableListChild key={"" + infoChildIndex + listChildIndex} listChild={listChild} handleInfoOnBlur={handleInfoOnBlur} handleInfoOnFocus={handleInfoOnFocus} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} listChildIndex={listChildIndex} />)}
          </ul>
        )}
      </div>
    </div>
  );
}
