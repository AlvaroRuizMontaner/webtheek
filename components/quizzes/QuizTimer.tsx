import { useSolvableQuizContext } from "@/contexts/solvableQuizContext";
import { ClockIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";

export default function QuizTimer() {
    const { state: {questions, time}, dispatch } = useSolvableQuizContext();

    useEffect(() => {
        // Inicia el intervalo
        const intervalId = setInterval(() => {

            console.log(time)
            // Si el tiempo se acaba, se resuelve con las respuestas que hayan
            if(time === 1) {
                clearInterval(intervalId)
                dispatch({type: "SUBMIT", payload: {questions: questions}})
            }


            dispatch({ type: 'TICK' });
        }, 1000);

        // Detener el reloj si el cuestionario está completo
        if(questions[0].isSubmit) {
            clearInterval(intervalId)
        }

        // Limpiar el intervalo cuando el cuestionario se complete o se desmonte el componente
        return () => clearInterval(intervalId);
    }, [dispatch, questions[0].isSubmit, time]);

    return (
        <div className="flex items-center gap-2">
            <p><ClockIcon className='w-6 h-6' /></p>
            <p>{time}s</p>
        </div>
    );
}