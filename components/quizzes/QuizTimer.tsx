import { useSolvableQuizContext } from "@/contexts/solvableQuizContext";
import { useEffect } from "react";

export default function QuizTimer() {
    const { state, dispatch } = useSolvableQuizContext();

    useEffect(() => {
        // Inicia el intervalo
        const intervalId = setInterval(() => {

            // Si el tiempo se acaba, se resuelve con las respuestas que hayan
            if(state.time <= 0) {
                dispatch({ type: 'SUBMIT' })
            }

            dispatch({ type: 'TICK' });
        }, 1000);

        // Detener el reloj si el cuestionario está completo
        if(state[0].isSubmit) {
            clearInterval(intervalId)
        }

        // Limpiar el intervalo cuando el cuestionario se complete o se desmonte el componente
        return () => clearInterval(intervalId);
    }, [dispatch, state[0].isSubmit]);

    return (
        <div>
            <p>Tiempo: {state.time}s</p>
        </div>
    );
}