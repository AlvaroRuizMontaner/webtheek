"use client"
import ProjectDetailsView from "@/views/projects/ProjectDetailsView";

export type EditPageProps = {
  params: {
    projectId: string 
  } 
}

export default function Page({params}: EditPageProps): JSX.Element {
  const {projectId} = params

  return (
    <>
      <ProjectDetailsView projectId={projectId} />
    </>
  );
}

