"use client"
import EditProjectView from "@/views/projects/EditProjectView";

export type EditPageProps = {
  params: {
    projectId: string 
  } 
}


export default function Page({params}: EditPageProps): JSX.Element {
  const {projectId} = params

  return (
    <>
      <EditProjectView projectId={projectId} />
    </>
  );
}

