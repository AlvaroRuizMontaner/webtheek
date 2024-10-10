import { solvableQuizReducer } from "@/reducers/solvableQuizReducer";
import { ReactNode, createContext, useContext, useReducer } from "react";

const initialArray = [
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
export const initialState = JSON.parse(JSON.stringify(initialArray));

export const SolvableQuizContext = createContext({
  state: initialState,
  dispatch: () => null, // una función vacía
});

export const useSolvableQuizContext = (): any => useContext(SolvableQuizContext);



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