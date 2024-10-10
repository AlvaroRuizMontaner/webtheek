import ProjectsLoading from '@/components/loading-templates/ProjectsLoading';
import Questions from '@/components/quizzes/Questions';
import Subtitle from '@/components/title/Subtitle';
import Title from '@/components/title/Title';
import { getSolvableQuizById } from '@/services/QuizAPI';
import { QuestionFormData, Quiz } from '@/types/quiz';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

type SolvableQuizViewProps = {
    quizId: Quiz["_id"]
}

export default function SolvableQuizView({quizId}: SolvableQuizViewProps) {

      
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["quiz", quizId],
        queryFn: () => getSolvableQuizById(quizId),
        retry: false
    });

    const [stateQuestions, setStateQuestions] = useState<QuestionFormData[]>([])

   
    function spliceQuestion(index: number) {
     setStateQuestions((prev) => {
       const newPrev = [...prev]
       newPrev.splice(index, 1)
       return [
         ...newPrev,
       ]
     })
    }

    if(isLoading) return <ProjectsLoading />
    if(isError) throw new Error(error.message);
    if(data) return (
        <div className="relative">
        <Title variant="dark">{data.name}</Title>
        <Subtitle variant="dark" text={data.description} />
  
  
        <div className="flex gap-8 relative">
          <section className=" remote-control h-fit bg-primary-200 p-2 rounded-md w-fit">

          </section>
  
          <Questions spliceQuestion={spliceQuestion} quizId={quizId} dataQuestions={data.questions} stateQuestions={stateQuestions} />
        </div>
      </div>
    )
}
