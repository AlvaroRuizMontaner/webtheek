import { addSideInfoChildByIndex, addSideInfoChildByIndex2, addSideInfoChildByIndex3, deleteSideInfoChildByIndex, editSideInfoChildMain } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { useMemo, useRef, useState } from 'react';
import { restoreCursorPosition, saveCursorPosition } from '@/utils/cursor';
import { SideInfoChildType } from '../curriculum.info';

type EditableMainProps = {
  pageNumber: number
  bodyChildIndex: number
  infoChildIndex: number
  handleOnFocus: () => void
  handleOnBlur: () => void
  infoChild: SideInfoChildType
}

export default function EditableMain({ bodyChildIndex, pageNumber, infoChildIndex, handleOnFocus, handleOnBlur, infoChild}: EditableMainProps) {

  const dispatch = useAppDispatch()
  const [showMainOptions, setShowMainOptions] = useState(false)
  const editableRef = useRef(null);
  let savedCursorPosition: any = null;

  const handleListChildOnFocus = () => {
    handleOnFocus()
    setTimeout(() => setShowMainOptions(true), 100)
  }
  const handleListChildOnBlur = () => {
    handleOnBlur()
    setTimeout(() => setShowMainOptions(false), 100)
  }
  const handleOnInputInfoMain = (infoChildIndex: number) => (e: React.SyntheticEvent) => {
    savedCursorPosition = saveCursorPosition(editableRef.current);
    dispatch(editSideInfoChildMain({pageNumber, bodyChildIndex, infoChildIndex, main: (e.target as HTMLElement).innerText}))
    setTimeout(() => restoreCursorPosition(editableRef.current, savedCursorPosition), 0);
  }

  function handleDeleteMain() {
    dispatch(deleteSideInfoChildByIndex({ pageNumber, bodyChildIndex, infoChildIndex }))
  }

  const addMainFunctions = [
    addSideInfoChildByIndex,
    addSideInfoChildByIndex2,
    addSideInfoChildByIndex3
  ]

  const addMainFunction = addMainFunctions[infoChild.mainType]


return (
  <div className='relative z-10 leading-[1.5]'>
    {useMemo(() => (<span
      ref={editableRef}
      onBlur={handleListChildOnBlur}
      onFocus={handleListChildOnFocus}
      dangerouslySetInnerHTML={{ __html: infoChild.main }}
      contentEditable={true}
      onInput={handleOnInputInfoMain(infoChildIndex)}
      className="font-bold max-w-[390px] text-white break-all flex items-center"
    ></span>), [infoChild.main, infoChildIndex])}
    {showMainOptions && (
      <div className="">
        <span
          className="cursor-pointer absolute -left-5 top-[50%] -translate-y-[55%] bg-black text-white rounded-full"
          onClick={handleDeleteMain}
        >
          <XMarkIcon className="w-4 h-4" />
        </span>
        <span className="cursor-pointer absolute -right-5 top-[50%] -translate-y-[55%] bg-black text-white rounded-full" onClick={() => dispatch(addMainFunction({pageNumber, bodyChildIndex, infoChildIndex}))}><PlusIcon className="w-4 h-4" /></span>
      </div>
    )}
  </div>
)}
