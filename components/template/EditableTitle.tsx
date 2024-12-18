import { editTitleText } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import { restoreCursorPosition, saveCursorPosition } from '@/utils/cursor';
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
      className='text-xl text-indigo-700 font-bold uppercase max-w-[350px]'
      onFocus={handleOnFocus} 
      onBlur={handleOnBlur}
    ></h2>
  );
}