import { editBirthday } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import { restoreCursorPosition, saveCursorPosition } from '@/utils/cursor';
import React, { useRef } from 'react';

type EditableBirthdayProps = {
  birthday: string
  isEditable: boolean
}

export default function EditableBirthday({birthday, isEditable}: EditableBirthdayProps) {

  const dispatch = useAppDispatch()
  const editableRef = useRef(null);
  let savedCursorPosition: any = null;

  
  const handleInput = (e: React.SyntheticEvent) => {
    // Guarda la posición del cursor antes de actualizar Redux
    savedCursorPosition = saveCursorPosition(editableRef.current);

    //setContent(newContent);

    dispatch(editBirthday({         
      pageNumber: 0, 
      value: (e.target as HTMLElement).innerText
    }))

    // Restaura la posición del cursor después de actualizar Redux
    setTimeout(() => restoreCursorPosition(editableRef.current, savedCursorPosition), 0);

  };

  return (
    <p
      dangerouslySetInnerHTML={{ __html: birthday }}
      ref={editableRef}
      contentEditable={isEditable ? true : false}
      onInput={handleInput}
      className='text-center text-base outline-none'
    ></p>
  );
}