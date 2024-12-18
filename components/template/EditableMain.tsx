import { deleteInfoChildByIndex, deleteMainByIndex, editInfoChildMain } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useMemo, useRef, useState } from 'react';
import { InfoChildType } from './curriculum.info';
import { restoreCursorPosition, saveCursorPosition } from '@/utils/cursor';

type EditableMainProps = {
  main: string
  pageNumber: number
  bodyChildIndex: number
  infoChildIndex: number
  handleInfoOnFocus: () => void
  handleInfoOnBlur: () => void
  infoChild: InfoChildType
}


export default function EditableMain({main, bodyChildIndex, pageNumber, infoChildIndex, handleInfoOnFocus, handleInfoOnBlur, infoChild}: EditableMainProps) {

  console.log("Re-render main")

  const dispatch = useAppDispatch()
  const [showMainOptions, setShowMainOptions] = useState(false)
  const editableRef = useRef<HTMLParagraphElement>(null);
  let savedCursorPosition: any = null;

  const handleListChildOnFocus = () => {
    handleInfoOnFocus()
    setTimeout(() => setShowMainOptions(true), 100)
  }
  const handleListChildOnBlur = () => {
    handleInfoOnBlur()
    setTimeout(() => setShowMainOptions(false), 100)
  }
  const handleOnInputInfoMain = (infoChildIndex: number) => (e: React.SyntheticEvent) => {
    savedCursorPosition = saveCursorPosition(editableRef.current);
    dispatch(editInfoChildMain({pageNumber, bodyChildIndex, infoChildIndex, main: (e.target as HTMLElement).innerText}))
    setTimeout(() => restoreCursorPosition(editableRef.current, savedCursorPosition), 0);
  }

  function handleDeleteMain() {
    const detail = infoChild.detail
    if(!detail) {
      dispatch(deleteInfoChildByIndex({ pageNumber, bodyChildIndex, infoChildIndex }))
    } else {
      dispatch(deleteMainByIndex({ pageNumber, bodyChildIndex, infoChildIndex }))
    }
  }

return (
  <div className='relative'>
    {useMemo(() => (<p
      ref={editableRef}
      onBlur={handleListChildOnBlur}
      onFocus={handleListChildOnFocus}
      dangerouslySetInnerHTML={{ __html: main }}
      contentEditable={true}
      onInput={handleOnInputInfoMain(infoChildIndex)}
      className="font-bold text-base text-blue-900 max-w-[390px]"
    ></p>), [main, infoChildIndex])}
    {showMainOptions && (
      <div className="absolute -left-5 top-[50%] -translate-y-[55%] bg-black text-white rounded-full">
        <span
          className="cursor-pointer"
          onClick={handleDeleteMain}
        >
          <XMarkIcon className="w-4 h-4" />
        </span>
      </div>
    )}
  </div>
)}
