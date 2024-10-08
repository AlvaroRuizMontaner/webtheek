import Question from './Question';
import { Quiz } from '@/types/quiz';

type QuestionsProps = {
    dataQuestions: Quiz["questions"]
    stateQuestions: any
}

export default function Questions({dataQuestions, stateQuestions}: QuestionsProps) {

  function calculateIndexOfStateQuestion(dataQuestions, stateQuestionIndex) {
    return dataQuestions.length + stateQuestionIndex
  }

  return (
    <section className="border bg-primary-200 w-full rounded-t-md p-6">
      <div className="bg-gray-100 space-y-8u first:rounded-t-md">
        {dataQuestions.map((question, questionIndex) => (
          <Question
            key={"questionName" + questionIndex}
            question={question}
            questionIndex={questionIndex}
          />
        ))}
      </div>

      <div className="bg-gray-100 space-y-8u last:rounded-b-md pt-8u">
        {stateQuestions.map((question, stateQuestionIndex) => (
          <Question
            key={"questionName" + calculateIndexOfStateQuestion(dataQuestions, stateQuestionIndex)}
            question={question}
            questionIndex={calculateIndexOfStateQuestion(dataQuestions, stateQuestionIndex)}
          />
        ))}
      </div>
    </section>
  );
}
