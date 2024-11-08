import { Quiz } from '@/types/quiz';
import SolvableOptions from './SolvableOptions';
import { QuestionWithSelectedIndex } from '@/views/quizzes/SolvableQuizView';


type SolvableQuestionProps = {
  question: QuestionWithSelectedIndex
  questionIndex: number
  quizId: Quiz["_id"]
}

export default function SolvableQuestion({question, questionIndex, quizId, question: {isSubmit}}: SolvableQuestionProps) {

  function checkAnswer(selectedIndex: string , correctIndex: string) {
    return selectedIndex.toString() === correctIndex.toString() ? "!bg-accent-100" : "!bg-accent-danger-100"
  }

  return (
    <div id={`trackId${questionIndex}`} className={`rounded-md p-6 space-y-4u relative ${isSubmit ? checkAnswer(question.selectedIndex, question.correctIndex) : undefined} bg-white`}>
      <SolvableOptions quizId={quizId} question={question} questionIndex={questionIndex}/>
    </div>
  );
}
