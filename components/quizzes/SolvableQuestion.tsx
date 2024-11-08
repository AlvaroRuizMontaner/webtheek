import { Question, Quiz } from '@/types/quiz';
import SolvableOptions from './SolvableOptions';


type SolvableQuestionProps = {
  question: Question
  questionIndex: number
  quizId: Quiz["_id"]
}

export default function SolvableQuestion({question, questionIndex, quizId, question: {isSubmit}}: SolvableQuestionProps) {

  function checkAnswer(selectedIndex: string , correctIndex: string) {
    return selectedIndex.toString() === correctIndex.toString() ? "!bg-accent-100" : "!bg-accent-danger-100"
  }

  return (
    <div id={`trackId${questionIndex}`} className={`rounded-md p-6 space-y-4u relative ${isSubmit ? checkAnswer(question.selectedIndex as string, question.correctIndex) : undefined} bg-white`}>
      <SolvableOptions quizId={quizId} question={question} questionIndex={questionIndex}/>
    </div>
  );
}
