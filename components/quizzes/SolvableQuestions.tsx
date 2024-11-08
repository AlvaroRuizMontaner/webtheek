import { Question, Quiz } from '@/types/quiz';
import SolvableQuestion from './SolvableQuestion';
import { useSolvableQuizContext } from '@/contexts/solvableQuizContext';

type SolvableQuestionsProps = {
  quizId: Quiz["_id"]
}

export default function SolvableQuestions({quizId}: SolvableQuestionsProps) {

  const {state: {questions}} = useSolvableQuizContext()

  if(questions) return (
    <section className={`bg-primary-200 w-full rounded-t-md p-6 ${(questions.length === 0) ? "hidden":""}`}>
      <div className="bg-primary-200 space-y-8u first:rounded-t-md">
        {questions.map((question: Question, questionIndex: number) => (
          <SolvableQuestion
            key={"questionName" + questionIndex}
            question={question}
            questionIndex={questionIndex}
            quizId={quizId}
          />
        ))}
      </div>
    </section>
  );
}
