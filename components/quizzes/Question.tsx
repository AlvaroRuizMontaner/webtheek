import React from 'react'

export type QuestionType = {
    _id: string
    statement: string;
    options: {
        _id: string
        text: string,
        isCorrect: boolean
    }[]
}

type QuestionProps = {
  question: QuestionType
  questionIndex: number
}

export default function Question({question, questionIndex}: QuestionProps) {
  return (
    <div className="bg-white rounded-md p-6">
      <div className="mb-8u">{question.statement}</div>
      {question.options.map((option, optionIndex) => (
        <div
          className="flex gap-2 items-center"
          key={"option" + questionIndex + optionIndex}
        >
          <input
            type="radio"
            name={"question" + questionIndex}
            id={"question" + questionIndex}
          />
          <div>{option.text}</div>
        </div>
      ))}
    </div>
  );
}
