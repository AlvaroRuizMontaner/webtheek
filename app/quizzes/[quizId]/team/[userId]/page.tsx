"use client"

import { Quiz } from "@/types/quiz"
import UserTeamView from "@/views/team/UserTeamView"

export type UserPageProps = {
  params: {
    quizId: Quiz["_id"],
    userId: string
  } 
}

export default function Page({params}: UserPageProps): JSX.Element {
    const {quizId, userId} = params

    const queryKey = "userTeamQuiz"
  return (
    <>
      <UserTeamView toolId={quizId} userId={userId} tool={"quizzes"} queryKey={queryKey} />
    </>
  );
}
