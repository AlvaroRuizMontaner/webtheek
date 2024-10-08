import Button from '@/components/button/Button';
import ProjectsLoading from '@/components/loading-templates/ProjectsLoading';
import Questions from '@/components/quizzes/Questions';
import Subtitle from '@/components/title/Subtitle';
import Title from '@/components/title/Title';
import { useAuth } from '@/hooks/useAuth';
import { getFullQuiz } from '@/services/QuizAPI';
import { QuestionFormData, Quiz } from '@/types/quiz';
import { havePermission, isManager } from '@/utils/policies';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function QuizDetailsView({quizId}: {quizId: Quiz["_id"]}) {

  const path = usePathname()

  const { data: user, isLoading: authLoading } = useAuth()
  const { data, isLoading, isError, error } = useQuery({
      queryKey: ["quiz", quizId],
      queryFn: () => getFullQuiz(quizId),
      retry: false
  });


/*   const { mutate: deleteMutate, isPending: deleteIsPending } = useMutation({
    mutationFn: deleteQuestion,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
        toast.success(data)
        QueryClient.invalidateQueries({queryKey: ["task", quizId]})
    }
  }) */

 const [stateQuestions, setStateQuestions] = useState<QuestionFormData[]>([])

 function addQuestion() {
  setStateQuestions((prev) => {
    return [
      ...prev,
      {
        statement: "Insertar enunciado",
        correctIndex: 0,
        options: [
          {
            text: "Insertar pregunta 1"
          },
          {
            text: "Insertar pregunta 2"
          },
          {
            text: "Insertar pregunta 3"
          },
        ]
      }
    ]
  })
 }

 function popQuestion() {
  setStateQuestions((prev) => {
    const newPrev = [...prev]
    newPrev.pop()
    return [
      ...newPrev,
    ]
  })
 }

 function spliceQuestion(index: number) {
  setStateQuestions((prev) => {
    const newPrev = [...prev]
    newPrev.splice(index, 1)
    return [
      ...newPrev,
    ]
  })
 }

  useEffect(() => {
    if(data) console.log(data)
  }, [data])


  if(isLoading && authLoading) return <ProjectsLoading />
  if(isError) throw new Error(error.message);
  if(data && user) return (
    <div className="relative">
      <Title variant="dark">{data.name}</Title>
      <Subtitle variant="dark" text={data.description} />

      <nav className="flex flex-col gap-3 sm:flex-row mb-8u">
        {(isManager(data.manager, user._id) ||
          havePermission(data.team, user._id, 4)) && (
          <Button
            text="Colaboradores"
            variant="outline"
            href={path + "/team"}
          />
        )}
      </nav>

      <div className="flex gap-6">
        <section className="relative left-0 top-[10vh] h-32 bg-primary-200 p-2 rounded-md w-fit">
          <div className="flex flex-col gap-2">
            <button onClick={addQuestion} className="w-8 h-8 rounded-full bg-accent-200 flex items-center justify-center font-bold">
              +
            </button>
            <button onClick={() => popQuestion()} className="w-8 h-8 rounded-full bg-accent-danger-200 flex items-center justify-center font-bold">
              -
            </button>
            <p className="w-8 h-8 text-center font-bold">M</p>
          </div>
        </section>

        <Questions spliceQuestion={spliceQuestion} quizId={quizId} dataQuestions={data.questions} stateQuestions={stateQuestions} />
      </div>
    </div>
  );
}
