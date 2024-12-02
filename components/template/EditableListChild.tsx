import { deleteListChildByIndex, editListChild } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useRef, useState } from 'react';

type EditableListChildProps = {
  listChild: string
  pageNumber: number
  bodyChildIndex: number
  infoChildIndex: number
  handleInfoOnFocus: () => void
  handleInfoOnBlur: () => void
  listChildIndex: number
}

export default function EditableListChild({listChild, bodyChildIndex, pageNumber, infoChildIndex, listChildIndex, handleInfoOnFocus, handleInfoOnBlur}: EditableListChildProps) {

  const dispatch = useAppDispatch()
  const editableRef = useRef(null);
  const [showListChildOptions, setShowListChildOptions] = useState(false)
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

  return (
    <div className='relative'>
      <li
        ref={editableRef}
        onBlur={handleListChildOnBlur}
        onFocus={handleListChildOnFocus}
        dangerouslySetInnerHTML={{ __html: listChild }}
        contentEditable={true}
        onInput={handleOnInputInfoList(infoChildIndex, listChildIndex)}
      ></li>
      {showListChildOptions && (
      <div className='absolute -left-8 top-[50%] -translate-y-[55%]'>
        <span className="cursor-pointer " onClick={() => dispatch(deleteListChildByIndex({pageNumber, bodyChildIndex, infoChildIndex, listChildIndex}))}><XMarkIcon className="w-4 h-4" /></span>
      </div>
      )}

    </div>
  );
}