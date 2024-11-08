import { Quiz } from "@/types/quiz";
import { QuestionWithSelectedIndex } from "@/views/quizzes/SolvableQuizView";
import { useSolvableQuizContext } from "@/contexts/solvableQuizContext";


type SolvableOptionsProps = {
    question: QuestionWithSelectedIndex
    questionIndex: number
    quizId: Quiz["_id"]
}

export default function SolvableOptions({question, questionIndex, question:{isSubmit}}:SolvableOptionsProps) {

  const { dispatch } = useSolvableQuizContext();

  function checkAnswer(selectedIndex: string , correctIndex: string, optionIndex: number) {
    if(selectedIndex !== "" && optionIndex.toString() === selectedIndex) { // Primero comprueba que la opcion ha sido seleccionada y luego se asegura que solo se pinte la opcion seleccionada
      return selectedIndex.toString() === correctIndex.toString() ? "!bg-accent-300" : "!bg-accent-danger-300" // Comprueba que la opcion seleccionada coincide con la respuesta correcta
    }
  }

  return (
    <form className="space-y-4u">
      <div className="mb-8u flex items-center gap-2 font-bold">
        <div className="h-8 min-w-8 p-2 bg-primary-400 rounded-full text-white flex items-center justify-center">{questionIndex + 1}</div>
        <div>{question.statement}</div>
      </div>
      {question.options.map((option, optionIndex) => (
        <div
          key={"editableOption" + questionIndex + optionIndex}
          className={`flex gap-2 items-center min-h-[42px] ${isSubmit ? checkAnswer(question.selectedIndex, question.correctIndex, optionIndex) : undefined}`}
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
