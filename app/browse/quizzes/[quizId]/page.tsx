"use client"
import { useToastSuccess } from "@/hooks/toast"
import SolvableQuizView from "@/views/quizzes/SolvableQuizView";

type PageProps = {
  params: {
    quizId: string
  }
}
export default function Page({params}: PageProps): JSX.Element {
  const {quizId} = params

  useToastSuccess()
  return (

    <>
      <SolvableQuizView quizId={quizId} />
    </>
  );
}