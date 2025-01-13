import { editName } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import { restoreCursorPosition, saveCursorPosition } from '@/utils/cursor';
import React, { useRef } from 'react';

type EditableNameProps = {
  name: string
  isEditable: boolean
}

export default function EditableName({name, isEditable}: EditableNameProps) {

  const dispatch = useAppDispatch()
  const editableRef = useRef(null);
  let savedCursorPosition: any = null;

  
  const handleInput = (e: React.SyntheticEvent) => {
    // Guarda la posición del cursor antes de actualizar Redux
    savedCursorPosition = saveCursorPosition(editableRef.current);

    //setContent(newContent);

    dispatch(editName({         
      pageNumber: 0, 
      value: (e.target as HTMLElement).innerText
    }))

    // Restaura la posición del cursor después de actualizar Redux
    setTimeout(() => restoreCursorPosition(editableRef.current, savedCursorPosition), 0);

  };

  return (
    <h1
      dangerouslySetInnerHTML={{ __html: name }}
      ref={editableRef}
      contentEditable={isEditable ? true : false}
      onInput={handleInput}
      className=' text-2xl text-center font-bold outline-none'
    ></h1>
  );
}