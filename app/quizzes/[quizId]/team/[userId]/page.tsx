"use client"

import UserTeamView from "@/views/projects/UserTeamView"

export type UserPageProps = {
  params: {
    projectId: string,
    userId: string
  } 
}

export default function Page({params}: UserPageProps): JSX.Element {
    const {projectId, userId} = params
    console.log(projectId, userId)
  return (
    <>
      <UserTeamView projectId={projectId} userId={userId} />
    </>
  );
}
