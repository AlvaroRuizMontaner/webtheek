import { QuestionQuiz } from '@/types/quiz';
import React from 'react'
import Option from './Option';

type OptionsProps = {
    questionIndex: number
    question: Pick<QuestionQuiz, "statement" | "options" | "correctIndex" | "_id">
}

export default function Options({question, questionIndex}: OptionsProps) {
  return (
    <>
    <div className="mb-8u font-bold">{question.statement}</div>
      {question.options.map((option, optionIndex) => (
        <Option
          key={"option" + questionIndex + optionIndex}
          correctIndex={question.correctIndex}
          optionIndex={optionIndex}
          option={option} /* questionIndex={questionIndex} */
        />
      ))}
    </>
  );
}
