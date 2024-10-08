import { QuestionQuiz } from '@/types/quiz';
import Option from './Option';


type QuestionProps = {
  question: Pick<QuestionQuiz, "statement" | "options">
  questionIndex: number
}

export default function Question({question, questionIndex}: QuestionProps) {
  return (
    <div className="bg-white rounded-md p-6">
      <div className="mb-8u">{question.statement}</div>
      {question.options.map((option, optionIndex) => (
        <Option key={"option" + questionIndex + optionIndex} option={option} questionIndex={questionIndex} />
      ))}
    </div>
  );
}
