import { deleteDetailByIndex, editInfoChildDetail } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useRef, useState } from 'react';

type EditableDetailProps = {
  detail: string
  pageNumber: number
  bodyChildIndex: number
  infoChildIndex: number
  handleInfoOnFocus: () => void
  handleInfoOnBlur: () => void
}

export default function EditableDetail({detail, bodyChildIndex, pageNumber, infoChildIndex, handleInfoOnFocus, handleInfoOnBlur}: EditableDetailProps) {

  const dispatch = useAppDispatch()
  const [showDetailOptions, setShowDetailOptions] = useState(false)
  const editableRef = useRef(null);
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

  return (
    <div className='relative'>
      <p
        ref={editableRef}
        onBlur={handleListChildOnBlur}
        onFocus={handleListChildOnFocus}
        dangerouslySetInnerHTML={{ __html: detail }}
        onInput={handleOnInputInfoDetail(infoChildIndex)}
        contentEditable={true}
        className=" "
      ></p>
      {showDetailOptions && (
        <div className="absolute -left-8 top-[50%] -translate-y-[55%]">
          <span
            className="cursor-pointer"
            onClick={() =>
              dispatch(
                deleteDetailByIndex({
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