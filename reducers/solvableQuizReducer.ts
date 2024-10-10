import { initialState } from "@/contexts/solvableQuizContext";
import { QuestionWithSelectedIndex } from "@/views/quizzes/SolvableQuizView";


export type solvableQuizActions =
  | "CHANGE_LEVEL"
  | "CHANGE_STEP"
  | "CHANGE_RADIO_VALUE"
  | "CHANGE_CHECK_VALUE"
  | "RESET";

type PayloadProps = {
    questionIndex?: number
    optionIndex?: number
}

export function solvableQuizReducer(
    state: QuestionWithSelectedIndex[],
    { type, payload }: { type: solvableQuizActions; payload: PayloadProps }
  ) {
    //console.log(JSON.stringify(state, null, 2)); // Esto mostrará tu estado formateado de manera legible antes de la actualización
    switch (type) {
      case "RESET": {
        const newState = initialState;
        //console.log(newState)
        return newState;
      }
/*       case "CHANGE_STEP": {
        const newState = {
          ...state,
          currentStep: state.currentStep + 1,
        };
        return newState;
      } */
/*       case "CHANGE_LEVEL": {
        const stepName = payload.stepName;
        const newState = {
          ...state,
          [stepName]: {
            ...state[stepName],
            level: state[stepName].level + 1,
          },
        };
        return newState;
      } */
/*       case "CHANGE_RADIO_VALUE": {
        const { value, name, stepName } = payload;
        const newState = {
          ...state,
          [stepName]: {
            ...state[stepName],
            [name]: value,
          },
        };
        return newState;
      } */
/*       case "CHANGE_CHECK_VALUE": {
        const { value, name, stepName, key } = payload;
        const newState = {
          ...state,
          [stepName]: {
            ...state[stepName],
            [name]: {
              ...state[stepName][name],
              [key]: value,
            },
          },
        };

        return newState;
      } */
      default: {
        throw new Error(`Unhandled action type: ${type}`);
      }
    }
  }