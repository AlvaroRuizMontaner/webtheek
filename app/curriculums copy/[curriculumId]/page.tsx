"use client"

import { Template } from '@/components/template/Template'
import { useGetCurriculumByIdQuery } from '@/redux/services/createApiCurriculum'
import React from 'react'

type PageProps = {
  params: {
    curriculumId: string 
  } 
}

export default function page({params}: PageProps) {
  const {curriculumId} = params
  const { data } = useGetCurriculumByIdQuery({curriculumId})

  if(data) return (
    <Template savedContent={data.content} curriculumId={curriculumId} />
  )
}
