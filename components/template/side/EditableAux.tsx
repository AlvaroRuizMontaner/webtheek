import { deleteAuxByIndex, editInfoChildAux } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useMemo, useRef, useState } from 'react';
import { restoreCursorPosition, saveCursorPosition } from '@/utils/cursor';

type EditableAuxProps = {
  aux: string
  pageNumber: number
  bodyChildIndex: number
  infoChildIndex: number
  handleInfoOnFocus: () => void
  handleInfoOnBlur: () => void
  themeName: string
}

export default function EditableAux({aux, themeName, bodyChildIndex, pageNumber, infoChildIndex, handleInfoOnFocus, handleInfoOnBlur}: EditableAuxProps) {

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
    <div className='relative max-w-[50%] leading-[1.5]'>
      {useMemo(() => (<span
        ref={editableRef}
        onBlur={handleListChildOnBlur}
        onFocus={handleListChildOnFocus}
        dangerouslySetInnerHTML={{ __html: aux }}
        onInput={handleOnInputInfoAux(infoChildIndex)}
        contentEditable={true}
        className={`aux ${themeName} font-bold outline-none`}
      ></span>), [aux, infoChildIndex, themeName])}
      {showAuxOptions && (
        <div className="absolute -right-5 top-[50%] -translate-y-[55%] bg-black text-white rounded-full ">
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