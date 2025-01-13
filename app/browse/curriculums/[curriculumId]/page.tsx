"use client"

import { Template } from '@/components/template/Template'
import { useGetPublicCurriculumByIdQuery } from '@/redux/services/createApiCurriculum'

type PageProps = {
  params: {
    curriculumId: string 
  } 
}

export default function page({params}: PageProps) {
  const {curriculumId} = params
  const { data } = useGetPublicCurriculumByIdQuery({curriculumId})

  if(data) return (
    <Template isPublic={true} savedContent={data.content} curriculumId={curriculumId} />
  )
}
