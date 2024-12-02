import { editTitleText } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import React, { useRef } from 'react';

type EditableTitleProps = {
  titleText: string
  pageNumber: number
  bodyChildIndex: number
  handleOnBlur: () => void
  handleOnFocus: () => void
}

export default function EditableTitle({titleText, bodyChildIndex, pageNumber, handleOnFocus, handleOnBlur}: EditableTitleProps) {

  const dispatch = useAppDispatch()
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

  const handleInput = (e: React.SyntheticEvent) => {
    // Guarda la posición del cursor antes de actualizar Redux
    savedCursorPosition = saveCursorPosition(editableRef.current);

    //setContent(newContent);

    dispatch(editTitleText({         
      pageNumber, 
      bodyChildIndex,
      value: (e.target as HTMLElement).innerText
    }))

    // Restaura la posición del cursor después de actualizar Redux
    setTimeout(() => restoreCursorPosition(editableRef.current, savedCursorPosition), 0);

  };

  return (
    <h2
      dangerouslySetInnerHTML={{ __html: titleText }}
      ref={editableRef}
      contentEditable
      onInput={handleInput}
      className='text-xl text-indigo-700 font-bold uppercase'
      onFocus={handleOnFocus} 
      onBlur={handleOnBlur}
    ></h2>
  );
}