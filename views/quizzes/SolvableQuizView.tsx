import ProjectsLoading from '@/components/loading-templates/ProjectsLoading';
import SolvableQuestions from '@/components/quizzes/SolvableQuestions';
import Subtitle from '@/components/title/Subtitle';
import Title from '@/components/title/Title';
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

      
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["quiz", quizId],
        queryFn: () => getSolvableQuizById(quizId),
        retry: false
    });

    const [questions, setQuestions] = useState<QuestionWithSelectedIndex[]>([])
    //const [table, setTable] = useState([])

   useEffect(() => {
    if (data) {
      setQuestions(
        ([...data.questions] as QuestionWithSelectedIndex[]).map((question) => ({
          ...question,
          selectedIndex: "",
        }))
      );
    }
  }, [data]);

    if(isLoading) return <ProjectsLoading />
    if(isError) throw new Error(error.message);
    if(data && questions) return (
        <div className="relative">
        <Title variant="dark">{data.name}</Title>
        <Subtitle variant="dark" text={data.description} />
  
  
        <div className="flex gap-8 relative">
          <SolvableQuestions quizId={quizId} questions={questions} />
        </div>
      </div>
    )
}
