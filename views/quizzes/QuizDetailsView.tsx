import ProjectsLoading from '@/components/loading-templates/ProjectsLoading';
import Questions from '@/components/quizzes/Questions';
import Subtitle from '@/components/title/Subtitle';
import Title from '@/components/title/Title';
import { useAuth } from '@/hooks/useAuth';
import { getFullQuiz } from '@/services/QuizAPI';
import { QuestionFormData, Quiz } from '@/types/quiz';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import "./quizzes.scss"
import Button from '@/components/button/Button';
import { ClockIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { havePermission, isManager } from '@/utils/policies';
import { usePathname, useRouter } from 'next/navigation';
import AddTimeModal from '@/components/quizzes/AddTimeModal';


export default function QuizDetailsView({quizId}: {quizId: Quiz["_id"]}) {
  const router = useRouter()

  const { data: user, isLoading: authLoading } = useAuth()
  const { data, isLoading, isError, error } = useQuery({
      queryKey: ["quiz", quizId],
      queryFn: () => getFullQuiz(quizId),
      retry: false
  });

 const [stateQuestions, setStateQuestions] = useState<QuestionFormData[]>([])

 const path = usePathname()

 function addQuestion() {
  setStateQuestions((prev) => {
    return [
      ...prev,
      {
        statement: "Insertar enunciado",
        correctIndex: "0",
        options: [
          {
            text: "Insertar respuesta 1"
          },
          {
            text: "Insertar respuesta 2"
          },
          {
            text: "Insertar respuesta 3"
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


  if(isLoading && authLoading) return <ProjectsLoading />
  if(isError) throw new Error(error.message);
  if(data && user) return (
    <div className="relative">
      <Title variant="dark">{data.name}</Title>
      <Subtitle variant="dark" text={data.description} />
      <div>{data.time}</div>

      <nav className="flex flex-col gap-3 sm:flex-row mb-8u">
        <Button
          text="Resolver"
          variant="outline"
          href={"/browse" + "/quizzes" + "/" + quizId}
        />
        {(isManager(data.manager, user._id) ||
          havePermission(data.team, user._id, 4)) && (
          <Button
            text="Colaboradores"
            variant="outline"
            href={path + "/team"}
          />
        )}
      </nav>

      <div className="flex sm:gap-8 relative">
        <section className=" remote-control h-fit bg-primary-200 p-2 rounded-md w-fit">
          <div className="flex flex-col gap-2">
            <button
              onClick={addQuestion}
              className="w-8 h-8 rounded-full bg-accent-200 flex items-center justify-center font-bold"
            >
              <PlusIcon className='w-6 h-6' />
            </button>
            <button
              onClick={() => popQuestion()}
              className="w-8 h-8 rounded-full bg-accent-danger-200 flex items-center justify-center font-bold"
            >
              <MinusIcon className='w-6 h-6' />
            </button>
            {(isManager(data.manager, user._id) ||
                havePermission(data.team, user._id, 3)) && (
                <button
                onClick={() => router.push("?addTime=true")}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold"
              >
                <ClockIcon />
              </button>
              )}
          </div>
        </section>
        <section className='mobile-remote-control'>
          <section className=" absolute h-fit bg-primary-200 p-2 rounded-md w-fit">
            <div className="flex flex-col gap-2">
              <button
                onClick={addQuestion}
                className="w-8 h-8 rounded-full bg-accent-200 flex items-center justify-center font-bold"
              >
                <PlusIcon className='w-6 h-6' />
              </button>
              <button
                onClick={() => popQuestion()}
                className="w-8 h-8 rounded-full bg-accent-danger-200 flex items-center justify-center font-bold"
              >
                <MinusIcon className='w-6 h-6' />
              </button>
              {(isManager(data.manager, user._id) ||
                havePermission(data.team, user._id, 3)) && (
                <button
                onClick={() => router.push("?addTime=true")}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold"
              >
                <ClockIcon />
              </button>
              )}
            </div>
          </section>
        </section>

        <Questions
          spliceQuestion={spliceQuestion}
          quizId={quizId}
          dataQuestions={data.questions}
          stateQuestions={stateQuestions}
        />
        <AddTimeModal time={data.time} quizId={quizId} />
      </div>
    </div>
  );
}
