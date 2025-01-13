"use client"

import EditCurriculumView from "@/views/curriculums/EditCurriculumView"

export type EditPageProps = {
  params: {
    curriculumId: string 
  } 
}


export default function Page({params}: EditPageProps): JSX.Element {
  const {curriculumId} = params

  return (
    <>
      <EditCurriculumView curriculumId={curriculumId} />
    </>
  );
}

