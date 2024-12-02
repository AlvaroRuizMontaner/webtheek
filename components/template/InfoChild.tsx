import React, { useState } from 'react'
import { InfoChildType } from './curriculum.info';
import { addInfoChild, deleteInfoChildByIndex, editInfoChildDate, editInfoChildDetail, editInfoChildMain, editListChild } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid';

type InfoChildProps = {
    infoChildIndex: number, 
    handleOnBlur: () => void, 
    handleOnFocus: () => void, 
    infoChild: InfoChildType,
    pageNumber: number
    bodyChildIndex: number
}

export default function InfoChild({infoChildIndex, handleOnBlur, handleOnFocus, infoChild, pageNumber, bodyChildIndex}: InfoChildProps) {

    const dispatch = useAppDispatch()
    const [showInfoChildOptions, setShowInfoChildOptions] = useState(false)

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
            <div className="absolute -left-12 flex-col gap-2 rounded-md">
                <span className="cursor-pointer bg-gray-100" onClick={() => dispatch(deleteInfoChildByIndex({pageNumber, bodyChildIndex, infoChildIndex}))}><XMarkIcon className="w-6 h-6" /></span>
                <span className="cursor-pointer bg-gray-100" onClick={() => dispatch(addInfoChild({pageNumber, bodyChildIndex}))}><PlusIcon className="w-6 h-6" /></span>
            </div>
        )}
      <div className="space-y-2" key={infoChildIndex}>
        {infoChild.main && (
          <p
            onBlur={handleInfoOnBlur}
            onFocus={handleInfoOnFocus}
            dangerouslySetInnerHTML={{ __html: infoChild.main }}
            contentEditable={true}
            onInput={handleOnInputInfoMain(infoChildIndex)}
            className="font-bold text-blue-900"
          ></p>
        )}
        <div className="flex justify-between text-gray-400 text-sm">
          {infoChild && infoChild.detail && (
            <p
              onBlur={handleInfoOnBlur}
              onFocus={handleInfoOnFocus}
              dangerouslySetInnerHTML={{ __html: infoChild.detail }}
              onInput={handleOnInputInfoDetail(infoChildIndex)}
              contentEditable={true}
              className=" "
            ></p>
          )}
          {infoChild && infoChild.date && (
            <p
              onBlur={handleInfoOnBlur}
              onFocus={handleInfoOnFocus}
              dangerouslySetInnerHTML={{ __html: infoChild.date }}
              onInput={handleOnInputInfoDate(infoChildIndex)}
              contentEditable={true}
            ></p>
          )}
        </div>
        {infoChild.list && (
          <ul className=" text-[14px] list-disc">
            {infoChild.list.map((listChild, listChildIndex) => (
              <li
                onBlur={handleInfoOnBlur}
                onFocus={handleInfoOnFocus}
                dangerouslySetInnerHTML={{ __html: listChild }}
                contentEditable={true}
                onInput={handleOnInputList(infoChildIndex, listChildIndex)}
                key={"" + infoChildIndex + listChildIndex}
              ></li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
