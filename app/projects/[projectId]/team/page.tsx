"use client"
import TeamView from "@/views/team/TeamView";

export type TeamPageProps = {
  params: {
    projectId: string 
  } 
}

export default function Page({params}: TeamPageProps): JSX.Element {
    const {projectId} = params
    const queryKey= "ProjectTeam"

  return (
    <>
      <TeamView toolId={projectId} tool="projects" queryKey={queryKey} />
    </>
  );
}
