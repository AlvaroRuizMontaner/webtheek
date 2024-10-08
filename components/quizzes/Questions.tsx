import InputQuestion from './InputQuestion';
import Question from './Question';
import { QuestionFormData, Quiz } from '@/types/quiz';

type QuestionsProps = {
    dataQuestions: Quiz["questions"]
    stateQuestions: QuestionFormData[]
}

export default function Questions({dataQuestions, stateQuestions}: QuestionsProps) {

  function calculateIndexOfStateQuestion(dataQuestionsLength: number, stateQuestionIndex: number) {
    return dataQuestionsLength + stateQuestionIndex
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

      {stateQuestions.length !==0 &&<div className="bg-gray-100 space-y-8u last:rounded-b-md pt-8u">
        {stateQuestions.map((question, stateQuestionIndex) => (
          <InputQuestion
            key={"questionName" + calculateIndexOfStateQuestion(dataQuestions.length, stateQuestionIndex)}
            question={question}
            questionIndex={calculateIndexOfStateQuestion(dataQuestions.length, stateQuestionIndex)}
          />
        ))}
      </div>}
    </section>
  );
}
