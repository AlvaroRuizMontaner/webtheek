import React from 'react'
import { UseFormRegister } from 'react-hook-form';

type RadioOptionProps = {
  name: string;
  questionIndex: number
  optionIndex: number
  correctIndex: string
  register: UseFormRegister<{
    correctIndex: string;
    options: {
        text: string;
    }[];
    statement: string;
}>
}

export default function RadioOption({name, questionIndex, optionIndex, register, correctIndex}: RadioOptionProps) {
  return (
    <div className={`flex gap-2 items-center`}>
      <input
        {...register(name as any)}
        value={optionIndex.toString()} // El valor será el índice de la opción
        type="radio"
        id={`question-${questionIndex}-${optionIndex}`}
        className={`${correctIndex === optionIndex.toString() ? "border-accent-200" : ""}`}
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
