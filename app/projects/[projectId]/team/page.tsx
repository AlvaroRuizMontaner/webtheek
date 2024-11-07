"use client"
import ProjectTeamView from "@/views/projects/ProjectTeamView";

export type TeamPageProps = {
  params: {
    projectId: string 
  } 
}

export default function Page({params}: TeamPageProps): JSX.Element {
    const {projectId} = params

  return (
    <>
      <ProjectTeamView toolId={projectId} />
    </>
  );
}
