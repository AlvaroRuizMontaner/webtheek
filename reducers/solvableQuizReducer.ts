import { initialState } from "@/contexts/solvableQuizContext";
import { QuestionWithSelectedIndex } from "@/views/quizzes/SolvableQuizView";


export type solvableQuizTypes =
  | "CHANGE_SELECTED_INDEX"
  | "BUILD_STATE"
  | "SUBMIT"
  | "RESET";


export type PayloadProps = {
    questionIndex?: number
    optionIndex?: number
    selectedIndex?: string
    questions?: QuestionWithSelectedIndex[]
    isSubmit?: boolean
}

export function solvableQuizReducer(
    state: QuestionWithSelectedIndex[],
    { type, payload }: { type: solvableQuizTypes; payload: PayloadProps }
  ) {
    switch (type) {
      case "RESET": {
        const newState = initialState;
        return newState;
      }

      case "CHANGE_SELECTED_INDEX": {
        const {questionIndex, selectedIndex} = payload
        const newState = state.map((question, index) =>
            index === questionIndex
              ? { ...question, selectedIndex: selectedIndex, isSubmit: false }
              : question
            );
        return newState
      }
      case "BUILD_STATE": {
        const {questions} = payload
        if(questions) {
          const newState = [...questions].map((question) => ({
            ...question,
            selectedIndex: "",
          }))
          return newState
        }
        return questions
      }

      case "SUBMIT": {
        const {questions} = payload
        if(questions) {
          const newState = [...questions].map((question) => ({
            ...question,
            isSubmit: true,
          }))
          return newState
        }
        return questions
      }

      default: {
        throw new Error(`Unhandled action type: ${type}`);
      }
    }
  }