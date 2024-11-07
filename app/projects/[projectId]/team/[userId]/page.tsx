"use client"

import UserTeamView from "@/views/team/UserTeamView"



export type UserPageProps = {
  params: {
    projectId: string,
    userId: string
  } 
}

export default function Page({params}: UserPageProps): JSX.Element {
    const {projectId, userId} = params

    const queryKey = "userTeamProject"

  return (
    <>
      <UserTeamView toolId={projectId} userId={userId} tool={"projects"} queryKey={queryKey} />
    </>
  );
}
