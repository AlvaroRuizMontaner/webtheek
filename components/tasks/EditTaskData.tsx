import { EditPageProps } from '@/app/projects/[projectId]/page'
import { getTaskById } from '@/services/TaskAPI'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import EditTaskModal from './EditTaskModal'


export default function EditTaskData({projectId}: EditPageProps["params"]) {

    const searchParams = useSearchParams()
    const taskId = searchParams.get('editTask')!
    
    const { data, isError } = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTaskById({
            projectId,
            taskId
        }),
        enabled: !!taskId
    })

    if(isError) throw new Error("Error")

  if(data) return <EditTaskModal taskId={taskId} projectId={projectId} data={data} />
}
