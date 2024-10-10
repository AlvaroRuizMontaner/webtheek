import { Quiz } from '@/types/quiz';
import SolvableQuestion from './SolvableQuestion';
import { QuestionWithSelectedIndex } from '@/views/quizzes/SolvableQuizView';

type SolvableQuestionsProps = {
  questions: QuestionWithSelectedIndex[]
  quizId: Quiz["_id"]

}

export default function SolvableQuestions({questions, quizId}: SolvableQuestionsProps) {

  return (
    <section className={`border bg-primary-200 w-full rounded-t-md p-6 ${(questions.length === 0) ? "hidden":""}`}>
      <div className="bg-primary-200 space-y-8u first:rounded-t-md">
        {questions.map((question, questionIndex) => (
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
