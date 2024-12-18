import { deleteDateByIndex, editInfoChildDate } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useMemo, useRef, useState } from 'react';

type EditableDateProps = {
  date: string
  pageNumber: number
  bodyChildIndex: number
  infoChildIndex: number
  handleInfoOnFocus: () => void
  handleInfoOnBlur: () => void
}

export default function EditableDate({date, bodyChildIndex, pageNumber, infoChildIndex, handleInfoOnFocus, handleInfoOnBlur}: EditableDateProps) {

  const dispatch = useAppDispatch()
  const editableRef = useRef(null);
  const [showDateOptions, setShowDateOptions] = useState(false)
  let savedCursorPosition: any = null;

  const saveCursorPosition = (element: any) => {
    const selection = window.getSelection();
    if (!selection!.rangeCount) {
      return null; // Si no hay selección activa, no hacemos nada
    }
    const range = selection!.getRangeAt(0);
    // Asegúrate de que el rango pertenece al elemento dado
    if (!element.contains(range.startContainer)) {
      return null; // El rango no pertenece al elemento
    }
  
    const offset = range.startOffset;
    return { container: range.startContainer, offset }; // Guardamos también el contenedor
  };
  
  const restoreCursorPosition = (element: any, savedPosition: any) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(element.firstChild || element, savedPosition.offset);
    range.collapse(true);
    selection!.removeAllRanges();
    selection!.addRange(range);
  };

  const handleListChildOnFocus = () => {
    handleInfoOnFocus()
    setTimeout(() => setShowDateOptions(true), 100)
  }
  const handleListChildOnBlur = () => {
    handleInfoOnBlur()
    setTimeout(() => setShowDateOptions(false), 100)
  }


  const handleOnInputInfoDate = (infoChildIndex: number) => (e: React.SyntheticEvent) => {
    savedCursorPosition = saveCursorPosition(editableRef.current);
    dispatch(editInfoChildDate({pageNumber, bodyChildIndex, infoChildIndex, date: (e.target as HTMLElement).innerText}))
    setTimeout(() => restoreCursorPosition(editableRef.current, savedCursorPosition), 0);
}

  return (
    <div className='relative'>
      {useMemo(() => (<p
        ref={editableRef}
        onBlur={handleListChildOnBlur}
        onFocus={handleListChildOnFocus}
        dangerouslySetInnerHTML={{ __html: date }}
        onInput={handleOnInputInfoDate(infoChildIndex)}
        contentEditable={true}
        className="max-w-[195px]"
      ></p>), [date, infoChildIndex])}
      {showDateOptions && (
        <div className="absolute -left-5 top-[50%] -translate-y-[55%] bg-black text-white rounded-full">
          <span
            className="cursor-pointer"
            onClick={() =>
              dispatch(
                deleteDateByIndex({
                  pageNumber,
                  bodyChildIndex,
                  infoChildIndex,
                })
              )
            }
          >
            <XMarkIcon className="w-4 h-4" />
          </span>
        </div>
      )}
    </div>
  );
}