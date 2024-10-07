import ProjectsLoading from '@/components/loading-templates/ProjectsLoading';
import EditQuizForm from '@/components/quizzes/EditQuizForm';
import { getQuizById } from '@/services/QuizAPI';
import { Quiz } from '@/types/quiz';
import { useQuery } from '@tanstack/react-query';

export default function EditQuizView({quizId}:{quizId: Quiz["_id"]}) {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["editQuiz", quizId],
        queryFn: () => getQuizById(quizId),
        retry: false
    });

    if(isLoading) return <ProjectsLoading />
    if(isError) throw new Error(error.message);

    if(data) return <EditQuizForm data={data} quizId={quizId} />
}
