import { Quiz } from "@/types/quiz";
import { QuestionWithSelectedIndex } from "@/views/quizzes/SolvableQuizView";
import { useSolvableQuizContext } from "@/contexts/solvableQuizContext";


type SolvableOptionsProps = {
    question: QuestionWithSelectedIndex
    questionIndex: number
    quizId: Quiz["_id"]
}

export default function SolvableOptions({question, questionIndex}:SolvableOptionsProps) {

  const { dispatch } = useSolvableQuizContext();

  return (
    <form className="space-y-4u">
      <div className="mb-8u">{question.statement}</div>
      {question.options.map((option, optionIndex) => (
        <div
          key={"editableOption" + questionIndex + optionIndex}
          className={`flex gap-2 items-center min-h-[42px]`}
        >
          <input
            type="radio"
            value={optionIndex.toString()}
            name="correctIndex"
            id={"question" + questionIndex}
            onClick={() => dispatch({ type: "CHANGE_SELECTED_INDEX", payload: {selectedIndex: optionIndex.toString(), questionIndex} })}
          />
          <div>{option.text}</div>
        </div>
      ))}
    </form>
  );
}
