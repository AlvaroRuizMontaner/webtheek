"use client"

import TeamView from "@/views/team/TeamView"

export type TeamPageProps = {
  params: {
    quizId: string 
  } 
}

export default function Page({params}: TeamPageProps): JSX.Element {
    const {quizId} = params
    const queryKey = "QuizTeam"

  return (
    <>
      <TeamView toolId={quizId} tool="quizzes" queryKey={queryKey} />
    </>
  );
}
