import { deleteDetailByIndex, deleteInfoChildByIndex, editInfoChildDetail } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useMemo, useRef, useState } from 'react';
import { InfoChildType } from './curriculum.info';
import { restoreCursorPosition, saveCursorPosition } from '@/utils/cursor';

type EditableDetailProps = {
  detail: string
  pageNumber: number
  bodyChildIndex: number
  infoChildIndex: number
  handleInfoOnFocus: () => void
  handleInfoOnBlur: () => void
  infoChild: InfoChildType
}

export default function EditableDetail({detail, bodyChildIndex, pageNumber, infoChildIndex, handleInfoOnFocus, handleInfoOnBlur, infoChild}: EditableDetailProps) {

  const dispatch = useAppDispatch()
  const [showDetailOptions, setShowDetailOptions] = useState(false)
  const editableRef = useRef(null);
  let savedCursorPosition: any = null;

  const handleListChildOnFocus = () => {
    handleInfoOnFocus()
    setTimeout(() => setShowDetailOptions(true), 100)
  }
  const handleListChildOnBlur = () => {
    handleInfoOnBlur()
    setTimeout(() => setShowDetailOptions(false), 100)
  }
  const handleOnInputInfoDetail = (infoChildIndex: number) => (e: React.SyntheticEvent) => {
    savedCursorPosition = saveCursorPosition(editableRef.current);
    dispatch(editInfoChildDetail({pageNumber, bodyChildIndex, infoChildIndex, detail: (e.target as HTMLElement).innerText}))
    setTimeout(() => restoreCursorPosition(editableRef.current, savedCursorPosition), 0);
  }

  function handleDeleteDetail() {
    const main = infoChild.main
    if(!main) {
      dispatch(deleteInfoChildByIndex({ pageNumber, bodyChildIndex, infoChildIndex }))
    } else {
      dispatch(deleteDetailByIndex({pageNumber, bodyChildIndex, infoChildIndex}))
    }
  }

  return (
    <div className='relative'>
      {useMemo(() => (<p
        ref={editableRef}
        onBlur={handleListChildOnBlur}
        onFocus={handleListChildOnFocus}
        dangerouslySetInnerHTML={{ __html: detail }}
        onInput={handleOnInputInfoDetail(infoChildIndex)}
        contentEditable={true}
        className="max-w-[195px]"
      ></p>), [detail, infoChildIndex])}
      {showDetailOptions && (
        <div className="absolute -left-5 top-[50%] -translate-y-[55%] bg-black text-white rounded-full">
          <span
            className="cursor-pointer"
            onClick={handleDeleteDetail}
          >
            <XMarkIcon className="w-4 h-4" />
          </span>
        </div>
      )}
    </div>
  );
}