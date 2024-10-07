"use client"
import QuizDetailsView from "@/views/quizzes/QuizDetailsView";

type PageProps = {
  params: {
    quizId: string 
  } 
}

export default function Page({params}: PageProps): JSX.Element {
  const {quizId} = params

  return (
    <>
      <QuizDetailsView quizId={quizId} />
    </>
  );
}

