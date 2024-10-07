"use client"
import EditQuizView from "@/views/quizzes/EditQuizView";

export type EditPageProps = {
  params: {
    quizId: string 
  } 
}


export default function Page({params}: EditPageProps): JSX.Element {
  const {quizId} = params

  return (
    <>
      <EditQuizView quizId={quizId} />
    </>
  );
}

