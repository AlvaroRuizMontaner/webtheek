import React from 'react'

type RecountProps = {
    numberOfCorrectAnswers: number,
    numberOfQuestions: number
}

export default function Recount({numberOfCorrectAnswers, numberOfQuestions}: RecountProps) {
  return (
    <div className="p-4 rounded-md bg-gray-400 w-fit text-white mx-auto space-y-4u">
      <p>Número de preguntas: {numberOfQuestions}</p>
      <p>Número de preguntas correctas: {numberOfCorrectAnswers}</p>
      <p>Nota del quiz: {(numberOfCorrectAnswers/numberOfQuestions)*10}</p>
    </div>
  );
}
