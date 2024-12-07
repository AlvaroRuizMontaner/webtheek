import { deleteAuxByIndex, editInfoChildAux } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useRef, useState } from 'react';
import { restoreCursorPosition, saveCursorPosition } from '@/utils/cursor';

type EditableAuxProps = {
  aux: string
  pageNumber: number
  bodyChildIndex: number
  infoChildIndex: number
  handleInfoOnFocus: () => void
  handleInfoOnBlur: () => void
}

export default function EditableAux({aux, bodyChildIndex, pageNumber, infoChildIndex, handleInfoOnFocus, handleInfoOnBlur}: EditableAuxProps) {

  const dispatch = useAppDispatch()
  const [showAuxOptions, setShowAuxOptions] = useState(false)
  const editableRef = useRef(null);
  let savedCursorPosition: any = null;

  const handleListChildOnFocus = () => {
    handleInfoOnFocus()
    setTimeout(() => setShowAuxOptions(true), 100)
  }
  const handleListChildOnBlur = () => {
    handleInfoOnBlur()
    setTimeout(() => setShowAuxOptions(false), 100)
  }
  const handleOnInputInfoAux = (infoChildIndex: number) => (e: React.SyntheticEvent) => {
    savedCursorPosition = saveCursorPosition(editableRef.current);
    dispatch(editInfoChildAux({pageNumber, bodyChildIndex, infoChildIndex, aux: (e.target as HTMLElement).innerText}))
    setTimeout(() => restoreCursorPosition(editableRef.current, savedCursorPosition), 0);
  }

  function handleDeleteAux() {
    dispatch(deleteAuxByIndex({pageNumber, bodyChildIndex, infoChildIndex}))
  }

  return (
    <div className='relative max-w-36'>
      <span
        ref={editableRef}
        onBlur={handleListChildOnBlur}
        onFocus={handleListChildOnFocus}
        dangerouslySetInnerHTML={{ __html: aux }}
        onInput={handleOnInputInfoAux(infoChildIndex)}
        contentEditable={true}
        className="text-gray-400 font-bold"
      ></span>
      {showAuxOptions && (
        <div className="absolute -left-5 top-[50%] -translate-y-[55%] bg-black text-white rounded-full">
          <span
            className="cursor-pointer "
            onClick={handleDeleteAux}
          >
            <XMarkIcon className="w-4 h-4" />
          </span>
        </div>
      )}
    </div>
  );
}