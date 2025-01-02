import { Template } from '@/components/template/Template'
import React from 'react'

type PageProps = {
  params: {
    curriculumId: string 
  } 
}

export default function page({params}: PageProps) {
  const {curriculumId} = params
  return (
    <Template curriculumId={curriculumId} />
  )
}
