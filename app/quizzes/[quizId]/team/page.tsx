"use client"

import QuizTeamView from "@/views/quizzes/QuizTeamView"

export type TeamPageProps = {
  params: {
    quizId: string 
  } 
}

export default function Page({params}: TeamPageProps): JSX.Element {
    const {quizId} = params
    console.log(quizId)
  return (
    <>
      <QuizTeamView quizId={quizId} />
    </>
  );
}
