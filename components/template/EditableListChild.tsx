import { addListChildByIndex, deleteListChildByIndex, editListChild } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import { restoreCursorPosition, saveCursorPosition } from '@/utils/cursor';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import React, { useMemo, useRef, useState } from 'react';

type EditableListChildProps = {
  listChild: string
  pageNumber: number
  bodyChildIndex: number
  infoChildIndex: number
  handleInfoOnFocus: () => void
  handleInfoOnBlur: () => void
  listChildIndex: number
  isEditable: boolean
}

export default function EditableListChild({listChild, bodyChildIndex, pageNumber, infoChildIndex, listChildIndex, handleInfoOnFocus, handleInfoOnBlur, isEditable}: EditableListChildProps) {

  const dispatch = useAppDispatch()
  const editableRef = useRef(null);
  const [showListChildOptions, setShowListChildOptions] = useState(false)
  let savedCursorPosition: any = null;

  const handleListChildOnFocus = () => {
    handleInfoOnFocus()
    setTimeout(() => setShowListChildOptions(true), 100)
  }
  const handleListChildOnBlur = () => {
    handleInfoOnBlur()
    setTimeout(() => setShowListChildOptions(false), 100)
  }
  const handleOnInputInfoList = (infoChildIndex: number, listChildIndex: number) => (e: React.SyntheticEvent) => {
    savedCursorPosition = saveCursorPosition(editableRef.current);
    dispatch(editListChild({pageNumber, bodyChildIndex, infoChildIndex, listChildIndex, value: (e.target as HTMLElement).innerText}))
    setTimeout(() => restoreCursorPosition(editableRef.current, savedCursorPosition), 0);
  }
/*   function handleDeleteListByIndex() {
    
  } */

  return (
    <div className='relative leading-[1.5]'>
      {useMemo(() => (<li
        ref={editableRef}
        onBlur={handleListChildOnBlur}
        onFocus={handleListChildOnFocus}
        dangerouslySetInnerHTML={{ __html: listChild }}
        contentEditable={isEditable ? true : false}
        onInput={handleOnInputInfoList(infoChildIndex, listChildIndex)}
        className='max-w-[390px] outline-none w-fit'
      ></li>), [listChild, infoChildIndex, listChildIndex])}
      {showListChildOptions && (
      <div className=''>
        <span className="cursor-pointer absolute -left-5 top-[50%] -translate-y-[55%] bg-black text-white rounded-full" onClick={() => dispatch(deleteListChildByIndex({pageNumber, bodyChildIndex, infoChildIndex, listChildIndex}))}><MinusIcon className="w-4 h-4" /></span>
        <span className="cursor-pointer absolute -right-4 top-[50%] -translate-y-[55%]  bg-black text-white rounded-full" onClick={() => dispatch(addListChildByIndex({pageNumber, bodyChildIndex, infoChildIndex, listChildIndex}))}><PlusIcon className="w-4 h-4" /></span>
      </div>
      )}

    </div>
  );
}