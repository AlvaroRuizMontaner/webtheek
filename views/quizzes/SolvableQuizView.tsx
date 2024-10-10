import ProjectsLoading from '@/components/loading-templates/ProjectsLoading';
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
};

export default function SolvableQuizView({quizId}: SolvableQuizViewProps) {

  const { dispatch } = useSolvableQuizContext();
  const [isBuilt, setIsBuilt] = useState(false)
      
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["quiz", quizId],
        queryFn: () => getSolvableQuizById(quizId),
        retry: false
    });

    //const [questions, setQuestions] = useState<QuestionWithSelectedIndex[]>([])
    //const [table, setTable] = useState([])

   useEffect(() => {
    if (data) {
      dispatch({type: "BUILD_STATE", payload: {questions: data.questions}})
      setIsBuilt(true)
/*       setQuestions(
        ([...data.questions] as QuestionWithSelectedIndex[]).map((question) => ({
          ...question,
          selectedIndex: "",
        }))
      ); */
    }
  }, [data]);

    if(isLoading) return <ProjectsLoading />
    if(isError) throw new Error(error.message);
    if(data && isBuilt) return (
        <div className="relative">
        <Title variant="dark">{data.name}</Title>
        <Subtitle variant="dark" text={data.description} />
  
  
        <div className="flex gap-8 relative">
          <SolvableQuestions quizId={quizId} />
        </div>
      </div>
    )
}
