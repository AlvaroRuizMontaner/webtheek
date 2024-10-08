import React from 'react'

type QuestionProps = {
  question: {
    statement: string;
    options: {
        text: string,
        isCorrect: boolean
    }[]
  };
  index: number
}

export default function Question({question, index}: QuestionProps) {
  return (
    <>
      <div className="mb-8u">{question.statement}</div>
      {question.options.map(() => (
        <div
          className="flex gap-2 items-center"
          key={"option" + index + optionIndex}
        >
          <input
            type="radio"
            name={"question" + index}
            id={"question" + index}
          />
          <div>{option.text}</div>
        </div>
      ))}
    </>
  );
}
