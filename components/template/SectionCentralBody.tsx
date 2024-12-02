import { useCallback, useState } from 'react';
import { SectionCentralBodyInfoType } from './curriculum.info';
import { useAppDispatch } from '@/redux/hooks';
import { addBodyChild, deleteBodyChildByIndex } from '@/redux/features/curriculumSlice';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import InfoChild from './InfoChild';
import EditableTitle from './editableTitle';

interface SectionCentralBody extends SectionCentralBodyInfoType {
    pageNumber: number;
    bodyChildIndex: number
}

export default function SectionCentralBody({title, info, pageNumber, bodyChildIndex}: SectionCentralBody) {
    const dispatch = useAppDispatch()
    const [showBodyChildOptions, setShowBodyChildOptions] = useState(false)


/*     const handleOnInputList = (infoChildIndex: number, listChildIndex: number) => (e: React.SyntheticEvent) => {
        dispatch(editListChild({pageNumber, bodyChildIndex, infoChildIndex, listChildIndex, value: (e.target as HTMLElement).innerText}))
    } */
/*     const handleOnInputInfoDetail = (infoChildIndex: number) => (e: React.SyntheticEvent) => {
        dispatch(editInfoChildDetail({pageNumber, bodyChildIndex, infoChildIndex, detail: (e.target as HTMLElement).innerText}))
    } */
/*     const handleOnInputInfoDate = (infoChildIndex: number) => (e: React.SyntheticEvent) => {
        dispatch(editInfoChildDate({pageNumber, bodyChildIndex, infoChildIndex, date: (e.target as HTMLElement).innerText}))
    } */
/*     const handleOnInputInfoMain = (infoChildIndex: number) => (e: React.SyntheticEvent) => {
        dispatch(editInfoChildMain({pageNumber, bodyChildIndex, infoChildIndex, main: (e.target as HTMLElement).innerText}))
    } */


    const handleOnBlur = useCallback(() => {
        setTimeout(() => setShowBodyChildOptions(false), 100)
    },[])
    const handleOnFocus = useCallback(() => {
        setTimeout(() => setShowBodyChildOptions(true), 100)
    },[])


  return (
    <div className='flex flex-col gap-3 relative'>
        <div className='flex gap-2 items-center relative -translate-x-8'>
            <div className='bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center'>
                <span className={`text-white ${title.classNameIcon}`}>{title.nameIcon}</span>
            </div>
            {/* <h2 dangerouslySetInnerHTML={{ __html: titleText }} contentEditable={true} onInput={handleOnInputTitle} className='text-xl text-indigo-700 font-bold uppercase'></h2> */}
            <EditableTitle handleOnBlur={handleOnBlur} handleOnFocus={handleOnFocus} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} titleText={title.text} />
        </div>

        {info.map((infoChild, infoChildIndex) => (
            <InfoChild key={"infoChild" + infoChildIndex} bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} infoChild={infoChild} pageNumber={pageNumber} handleOnFocus={handleOnFocus} handleOnBlur={handleOnBlur} />
        ))}
        {showBodyChildOptions && (
            <div className="absolute -top-6 left-[50%] -translate-x-[50%] flex gap-2 px-1 rounded-md bg-blue-500 text-white">
                <span className="cursor-pointer" onClick={() => dispatch(deleteBodyChildByIndex({pageNumber, bodyChildIndex}))}><MinusIcon className="w-6 h-6" /></span>
                <span className="cursor-pointer" onClick={() => dispatch(addBodyChild({pageNumber}))}><PlusIcon className="w-6 h-6" /></span>
            </div>
        )}
    </div>
  )
}
