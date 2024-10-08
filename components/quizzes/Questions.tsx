import Question from './Question';
import { Quiz } from '@/types/quiz';

type QuestionsProps = {
    questions: Quiz["questions"]
}

export default function Questions({questions}: QuestionsProps) {
  return (
    <section className="border bg-primary-200  w-full rounded-md p-6">
      <div className="bg-gray-100 h-full space-y-8u rounded-md">
        {questions.map((question, questionIndex) => (
          <Question
            key={"questionName" + questionIndex}
            question={question}
            questionIndex={questionIndex}
          />
        ))}
      </div>
    </section>
  );
}
