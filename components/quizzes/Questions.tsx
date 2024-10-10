import Question from './Question';
import { QuestionFormData, Quiz } from '@/types/quiz';
import WritableQuestion from './WritableQuestion';

type QuestionsProps = {
    dataQuestions: Quiz["questions"]
    stateQuestions: QuestionFormData[]
    quizId: Quiz["_id"]
    spliceQuestion: (idx: number) => void
}

export default function Questions({dataQuestions, stateQuestions, quizId, spliceQuestion}: QuestionsProps) {

  function calculateIndexOfStateQuestion(dataQuestionsLength: number, stateQuestionIndex: number) {
    return dataQuestionsLength + stateQuestionIndex
  }

  return (
    <section className={`border bg-primary-200 w-full rounded-t-md p-6 ${(dataQuestions.length === 0 && stateQuestions.length === 0) ? "hidden":""}`}>
      <div className="bg-primary-200 space-y-8u first:rounded-t-md">
        {dataQuestions.map((question, questionIndex) => (
          <Question
            key={"questionName" + questionIndex}
            question={question}
            questionIndex={questionIndex}
            quizId={quizId}
          />
        ))}
      </div>

      {stateQuestions.length !==0 &&<div className="bg-primary-200 space-y-8u last:rounded-b-md pt-8u">
        {stateQuestions.map((question, stateQuestionIndex) => (
          <WritableQuestion
            quizId={quizId}
            key={"questionName" + calculateIndexOfStateQuestion(dataQuestions.length, stateQuestionIndex)}
            question={question}
            questionIndex={calculateIndexOfStateQuestion(dataQuestions.length, stateQuestionIndex)}
            stateQuestionIndex= {stateQuestionIndex}
            spliceQuestion={spliceQuestion}
          />
        ))}
      </div>}
    </section>
  );
}
