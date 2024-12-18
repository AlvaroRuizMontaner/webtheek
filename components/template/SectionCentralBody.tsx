import { useCallback, useState } from 'react';
import { SectionCentralBodyInfoType } from './curriculum.info';
import { useAppDispatch } from '@/redux/hooks';
import InfoChild from './InfoChild';
import EditableTitle from './EditableTitle';
import ControlBoundary from './ControlBoundary';
import { PlusIcon } from '@heroicons/react/20/solid';
import { IconType } from 'react-icons/lib';
import { addBodyChildByIndex, deleteBodyChildByIndex } from '@/redux/features/curriculumSlice';
import EditableIcon from './EditableIcon';

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
            <div className='flex gap-2 items-center relative -translate-x-8 z-20'>
                <EditableIcon bodyChildIndex={bodyChildIndex} pageNumber={pageNumber} title={title} />
                <EditableTitle handleOnBlur={handleOnBlur} handleOnFocus={handleOnFocus} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} titleText={title.text} />
            </div>

            {info.map((infoChild, infoChildIndex) => (
                <InfoChild key={"infoChild" + infoChildIndex} bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} infoChild={infoChild} pageNumber={pageNumber} handleOnFocus={handleOnFocus} handleOnBlur={handleOnBlur} />
            ))}
        </section>
        {showBodyChildOptions && (
             <ControlBoundary addFunctions={[{function: addBodyChildByIndex, icon: PlusIcon as IconType}]} deleteFunction={deleteBodyChildByIndex} color="blue-500 text-white" pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} dispatch={dispatch} orientation='horizontal' />
        )}
    </div>
  )
}
