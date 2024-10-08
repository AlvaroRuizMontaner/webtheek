import React from 'react'
import { UseFormRegister } from 'react-hook-form';

type RadioOptionProps = {
  name: string;
  questionIndex: number
  optionIndex: number
  register: UseFormRegister<{
    isCorrect: number;
    options: {
        isCorrect: boolean;
        text: string;
        _id: string;
    }[];
    statement: string;
}>
}

export default function RadioOption({name, questionIndex, optionIndex, register}: RadioOptionProps) {
  return (
    <div className='flex gap-2 items-center'>
      <input
        {...register(name as any)}
        value={optionIndex} // El valor será el índice de la opción
        type="radio"
        id={`question-${questionIndex}-${optionIndex}`}
      />
      <input
        className='w-full'
        {...register(`options.${optionIndex}.text`)}
        type="text"
        name={`options.${optionIndex}.text`}
        id=""
      />
    </div>
  );
}
