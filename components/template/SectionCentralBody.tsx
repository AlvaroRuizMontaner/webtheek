import React from 'react'
import { SectionCentralBodyInfoType } from './curriculum.info'
import { useAppDispatch } from '@/redux/hooks'
import { editInfoChildDate, editInfoChildDetail, editInfoChildMain, editListChild, editTitleText } from '@/redux/features/curriculumSlice';

interface SectionCentralBody extends SectionCentralBodyInfoType {
    pageNumber: number;
    bodyChildIndex: number
}

export default function SectionCentralBody({title, info, pageNumber, bodyChildIndex}: SectionCentralBody) {
    const dispatch = useAppDispatch()


    const handleOnInputList = (infoChildIndex: number, listChildIndex: number) => (e: React.SyntheticEvent) => {
        dispatch(editListChild({pageNumber, bodyChildIndex, infoChildIndex, listChildIndex, value: (e.target as HTMLElement).innerText}))
    }
    const handleOnInputInfoDetail = (infoChildIndex: number) => (e: React.SyntheticEvent) => {
        dispatch(editInfoChildDetail({pageNumber, bodyChildIndex, infoChildIndex, detail: (e.target as HTMLElement).innerText}))
    }
    const handleOnInputInfoDate = (infoChildIndex: number) => (e: React.SyntheticEvent) => {
        dispatch(editInfoChildDate({pageNumber, bodyChildIndex, infoChildIndex, date: (e.target as HTMLElement).innerText}))
    }

    const handleOnInputInfoMain = (infoChildIndex: number) => (e: React.SyntheticEvent) => {
        dispatch(editInfoChildMain({pageNumber, bodyChildIndex, infoChildIndex, main: (e.target as HTMLElement).innerText}))
    }
    const handleOnInputTitle = (e: React.SyntheticEvent) => {
        console.log(pageNumber)
        dispatch(editTitleText({         
            pageNumber, 
            bodyChildIndex,
            value: (e.target as HTMLElement).innerText}))
    }


  return (
    <div className='flex flex-col gap-3'>
        <div className='flex gap-2 items-center relative -translate-x-8'>
            <div className='bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center'>
                <span className={`text-white ${title.classNameIcon}`}>{title.nameIcon}</span>
            </div>
            <h2 dangerouslySetInnerHTML={{ __html: title.text }} contentEditable={true} onInput={handleOnInputTitle} className='text-xl text-indigo-700 font-bold uppercase'></h2>
        </div>

        {info.map((infoChild, infoChildIndex) => (
            <div className='space-y-2' key={infoChildIndex}>
                <p dangerouslySetInnerHTML={{ __html: infoChild.main }} contentEditable={true} onInput={handleOnInputInfoMain(infoChildIndex)} className='font-bold text-blue-900'></p>
                <div className='flex justify-between text-gray-400 text-sm'>
                    {infoChild && infoChild.detail && <p dangerouslySetInnerHTML={{ __html: infoChild.detail }} onInput={handleOnInputInfoDetail(infoChildIndex)}  contentEditable={true} className=' ' ></p>}
                    {infoChild && infoChild.date && <p dangerouslySetInnerHTML={{ __html: infoChild.date }} onInput={handleOnInputInfoDate(infoChildIndex)} contentEditable={true} ></p>}
                </div>
                {infoChild.list && (
                    <ul className=' text-[14px] list-disc'>
                        {infoChild.list.map((listChild, listChildIndex) => (
                            <li dangerouslySetInnerHTML={{ __html: listChild }} contentEditable={true} onInput={handleOnInputList(infoChildIndex, listChildIndex)} key={"" + infoChildIndex + listChildIndex}></li>
                        ))}
                    </ul>
                )}
            </div>
        ))}
    </div>
  )
}
