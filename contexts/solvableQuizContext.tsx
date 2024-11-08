import { solvableQuizReducer } from "@/reducers/solvableQuizReducer";
import { Question } from "@/types/quiz";
import { ReactNode, createContext, useContext, useReducer } from "react";

type QuizState = {
  state: {
    time: number,
    questions: Question[]
  };
  dispatch: React.Dispatch<any>; // Si tienes acciones específicas, puedes tiparlas mejor
};

const initialArray: Question[] = [
    {
        _id: "",
        options: [],
        statement: "",
        quiz: "",
        correctIndex: "",
        selectedIndex: "",
        createdAt: "",
        updatedAt: ""
    }
]
export const initialState = JSON.parse(JSON.stringify({
  questions: initialArray,
  time: 10
}));

export const SolvableQuizContext = createContext({
  state: initialState,
  dispatch: () => null, // una función vacía
});

export const useSolvableQuizContext = (): QuizState  => useContext(SolvableQuizContext);



/* --------------------------------------- Provider ----------------------------------------------- */



export const SolvableQuizProvider = ({
    children,
  }: {
    children: ReactNode;
  }) => {
    const [state, dispatch] = useReducer(solvableQuizReducer, initialArray);
  
    const value = {
      state,
      dispatch,
    };
  
    return (
      <SolvableQuizContext.Provider value={value as any}>
        {Array.isArray(children) ? children.map((child) => child) : children}
      </SolvableQuizContext.Provider>
    );
  };