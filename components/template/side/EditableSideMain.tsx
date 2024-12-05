import { deleteInfoChildByIndex, deleteMainByIndex, editInfoChildMain } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useRef, useState } from 'react';
import { restoreCursorPosition, saveCursorPosition } from '@/utils/cursor';
import { SideInfoChildType } from '../curriculum.info';

type EditableMainProps = {
  pageNumber: number
  bodyChildIndex: number
  infoChildIndex: number
  handleInfoOnFocus: () => void
  handleInfoOnBlur: () => void
  infoChild: SideInfoChildType
}

export default function EditableMain({ bodyChildIndex, pageNumber, infoChildIndex, /* handleInfoOnFocus, handleInfoOnBlur, */ infoChild}: EditableMainProps) {

  const dispatch = useAppDispatch()
  const [showMainOptions, setShowMainOptions] = useState(false)
  const editableRef = useRef(null);
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
    dispatch(deleteSideInfoChildByIndex({ pageNumber, bodyChildIndex, infoChildIndex }))
  }

return (
  <div className='relative'>
    <span
      ref={editableRef}
/*       onBlur={handleListChildOnBlur}
      onFocus={handleListChildOnFocus} */
      dangerouslySetInnerHTML={{ __html: infoChild.main }}
      contentEditable={true}
      onInput={handleOnInputInfoMain(infoChildIndex)}
      className="font-bold max-w-[390px] text-white break-all flex items-center"
    ></span>
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
