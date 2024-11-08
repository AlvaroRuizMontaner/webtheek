import { initialState } from "@/contexts/solvableQuizContext";
import { Question } from "@/types/quiz";


export type solvableQuizTypes =
  | "CHANGE_SELECTED_INDEX"
  | "TICK"
  | "BUILD_STATE"
  | "SUBMIT"
  | "RESET";


export type PayloadProps = {
    questionIndex?: number
    optionIndex?: number
    selectedIndex?: string
    questions?: Question[]
    time: number
    isSubmit?: boolean
}

export type StateType = {
  questions: Question[]
  time: number
}

export function solvableQuizReducer(
    state: StateType,
    { type, payload }: { type: solvableQuizTypes; payload: PayloadProps }
  ) {
    switch (type) {
      case "RESET": {
        const newState = initialState;
        return newState;
      }

      case "CHANGE_SELECTED_INDEX": {
        const {questionIndex, selectedIndex} = payload
        const newQuestions = state.questions.map((question, index) =>
            index === questionIndex
              ? { ...question, selectedIndex: selectedIndex, isSubmit: false }
              : question
            );
        return {
          ...state,
          questions: newQuestions,
        }
      }
      case 'TICK': {
        return { ...state, time: state.time - 1 }; // Aumenta el tiempo en 1 segundo
      }
      case "BUILD_STATE": {
        const {questions, time} = payload
        if(questions) {
          const newQuestions = [...questions].map((question) => ({
            ...question,
            selectedIndex: "",
          }))
          return {
            ...state,
            questions: newQuestions,
            time: time || state.time, // Preserva el tiempo actual si no se proporciona uno nuevo
          };
        }
        return {
          ...state,
          questions: state.questions, // Mantiene las preguntas actuales si no hay nuevas
          time: time || state.time,
      };
      }

      case "SUBMIT": {
        const {questions, time} = payload
        if(questions) {
          const newQuestions = [...questions].map((question) => ({
            ...question,
            isSubmit: true,
          }))
          return {
            ...state,
            questions: newQuestions,
            time: time || state.time,
          };
        }
        return {
          ...state,
          questions: state.questions,
          time: time || state.time,
        };
      }

      default: {
        throw new Error(`Unhandled action type: ${type}`);
      }
    }
  }


  /* 
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
  */