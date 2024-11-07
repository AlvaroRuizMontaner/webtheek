"use client"

import QuizTeamView from "@/views/quizzes/QuizTeamView"

export type TeamPageProps = {
  params: {
    quizId: string 
  } 
}

export default function Page({params}: TeamPageProps): JSX.Element {
    const {quizId} = params

  return (
    <>
      <QuizTeamView tool={"quizzes"} toolId={quizId} />
    </>
  );
}
