import React from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

type RadioOptionProps = {
  name: string;
  questionIndex: number
  optionIndex: number
  correctIndex: number
  setValue: UseFormSetValue<{
    correctIndex: number;
    statement: string;
    options: {
        text: string;
    }[];
}>
  register: UseFormRegister<{
    correctIndex: number;
    options: {
        text: string;
    }[];
    statement: string;
}>
}

export default function RadioOption({name, questionIndex, optionIndex, register, correctIndex, setValue}: RadioOptionProps) {
  setValue("correctIndex", correctIndex)
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
