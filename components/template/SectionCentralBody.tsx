import { useCallback, useState } from 'react';
import { SectionCentralBodyInfoType } from './curriculum.info';
import { useAppDispatch } from '@/redux/hooks';
import { addBodyChildByIndex, deleteBodyChildByIndex } from '@/redux/features/curriculumSlice';
import InfoChild from './InfoChild';
import EditableTitle from './EditableTitle';
import ControlBoundary from './ControlBoundary';

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
    <div className='relative z-10'>
        <section className='flex flex-col gap-3 relative z-50'>
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
        </section>
        {showBodyChildOptions && (
             <ControlBoundary addFunction={addBodyChildByIndex} deleteFunction={deleteBodyChildByIndex} width="w-[122%]" color="blue-500 text-white" pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} dispatch={dispatch} orientation='horizontal' />
/*             <div>
                <div className='absolute border-[3px] border-blue-500 top-0 right-0 w-[122%] translate-x-[5%] h-[105%] -translate-y-[2.5%] z-20'></div>
                <div className="absolute -top-6 left-[50%] -translate-x-[50%] flex gap-2 px-1 rounded-md bg-blue-500 text-white z-30">
                    <span className="cursor-pointer" onClick={() => dispatch(deleteBodyChildByIndex({pageNumber, bodyChildIndex}))}><MinusIcon className="w-6 h-6" /></span>
                    <span className="cursor-pointer" onClick={() => dispatch(addBodyChildByIndex({pageNumber, bodyChildIndex}))}><PlusIcon className="w-6 h-6" /></span>
                </div>
            </div> */
        )}
    </div>
  )
}
