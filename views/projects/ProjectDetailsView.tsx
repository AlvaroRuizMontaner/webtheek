import AddTaskModal from '@/components/tasks/AddTaskModal';
import EditTaskData from '@/components/tasks/EditTaskData';
import TaskList from '@/components/tasks/TaskList';
import TaskModalDetails from '@/components/tasks/TaskModalDetails';
import { getProjectById } from '@/services/ProjectAPI';
import { Project } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react'


export default function ProjectDetailsView({projectId}: {projectId: Project["_id"]}) {

    const router = useRouter()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    });

    if(isLoading) return "Cargando..."
    if(isError) throw new Error(error.message);

    if(data) return (
        <>
            <h1 className=' text-5xl font-black'>{data.projectName}</h1>
            <p className="text-2xl fon-light text-gray-500 mt-5">{data.description}</p>

            <nav className='my-5 flex gap-3'>
                <button
                    type='button'
                    className=' bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl
                    font-bold cursor-pointer transition-colors'
                    onClick={() => router.push("?newTask=true")}
                >Agregar Tarea</button>
            </nav>


            <TaskList projectId={projectId} tasks={data.tasks} />
            <AddTaskModal projectId={projectId} />
            <EditTaskData projectId={projectId} />
            <TaskModalDetails projectId={projectId} />
        </>
    )
}
