import { Quiz } from '@/types/quiz';
import SolvableOptions from './SolvableOptions';
import { QuestionWithSelectedIndex } from '@/views/quizzes/SolvableQuizView';


type SolvableQuestionProps = {
  question: QuestionWithSelectedIndex
  questionIndex: number
  quizId: Quiz["_id"]
}

export default function SolvableQuestion({question, questionIndex, quizId}: SolvableQuestionProps) {

  return (
    <div className="bg-white rounded-md p-6 space-y-4u relative">
      <SolvableOptions quizId={quizId} question={question} questionIndex={questionIndex}/>
    </div>
  );
}
