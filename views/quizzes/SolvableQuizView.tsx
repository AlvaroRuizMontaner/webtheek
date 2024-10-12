import Button from '@/components/button/Button';
import ProjectsLoading from '@/components/loading-templates/ProjectsLoading';
import Recount from '@/components/quizzes/Recount';
import SolvableQuestions from '@/components/quizzes/SolvableQuestions';
import Subtitle from '@/components/title/Subtitle';
import Title from '@/components/title/Title';
import { useSolvableQuizContext } from '@/contexts/solvableQuizContext';
import { getSolvableQuizById } from '@/services/QuizAPI';
import { Question, Quiz } from '@/types/quiz';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

type SolvableQuizViewProps = {
    quizId: Quiz["_id"]
}

export type QuestionWithSelectedIndex = Question & {
  selectedIndex: string;
  isSubmit: boolean
};

export default function SolvableQuizView({quizId}: SolvableQuizViewProps) {

  const { state, dispatch } = useSolvableQuizContext();
  const [isBuilt, setIsBuilt] = useState(false)

      
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["solvableQuiz", quizId],
        queryFn: () => getSolvableQuizById(quizId),
        retry: false
    });

   useEffect(() => {
    if (data) {
      dispatch({type: "BUILD_STATE", payload: {questions: data.questions}})
      setIsBuilt(true)
    }
  }, [data]);

  function calculateCorrectAnswers(questions: QuestionWithSelectedIndex[]){
    return questions.reduce((acc, question) => {
      if(question.correctIndex === question.selectedIndex) {
        return acc + 1
      } else {
        return acc
      }
    },0)
  }

  function submit() {
    dispatch({type: "SUBMIT", payload: {questions: state}})
  }

    if(isLoading) return <ProjectsLoading />
    if(isError) throw new Error(error.message);
    if(data && isBuilt) return (
        <div className="relative">
        <Title variant="dark">{data.name}</Title>
        <Subtitle variant="dark" text={data.description} />
  
  
        <div className="flex gap-8 relative">
          <div className='w-full space-y-8u'>
            <SolvableQuestions quizId={quizId} />
            <div className='flex justify-center'><Button onClick={submit} text={"Resolver"} /></div>
            {state.every((question: QuestionWithSelectedIndex) => question.isSubmit === true) && (
              <Recount numberOfCorrectAnswers={calculateCorrectAnswers(state)} numberOfQuestions={state.length}/>
            )}
          </div>
        </div>
      </div>
    )
}
