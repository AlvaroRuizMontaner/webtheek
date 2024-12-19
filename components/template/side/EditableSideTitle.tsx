import { editSideTitleText } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import { restoreCursorPosition, saveCursorPosition } from '@/utils/cursor';
import React, { useRef } from 'react';

type EditableSideTitleProps = {
  titleText: string
  pageNumber: number
  bodyChildIndex: number
  handleOnBlur: () => void
  handleOnFocus: () => void
}

export default function EditableSideTitle({titleText, bodyChildIndex, pageNumber, handleOnFocus, handleOnBlur}: EditableSideTitleProps) {

  const dispatch = useAppDispatch()
  const editableRef = useRef(null);
  let savedCursorPosition: any = null;

  
  const handleInput = (e: React.SyntheticEvent) => {
    // Guarda la posición del cursor antes de actualizar Redux
    savedCursorPosition = saveCursorPosition(editableRef.current);

    //setContent(newContent);

    dispatch(editSideTitleText({         
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
      className={`text-xl max-w-40 outline-none `}
      onFocus={handleOnFocus} 
      onBlur={handleOnBlur}
    ></h2>
  );
}