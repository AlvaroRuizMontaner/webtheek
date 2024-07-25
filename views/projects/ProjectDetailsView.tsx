import AddTaskModal from '@/components/tasks/AddTaskModal';
import EditTaskData from '@/components/tasks/EditTaskData';
import TaskList from '@/components/tasks/TaskList';
import TaskModalDetails from '@/components/tasks/TaskModalDetails';
import { useAuth } from '@/hooks/useAuth';
import { getFullProject } from '@/services/ProjectAPI';
import { Project } from '@/types';
import { havePermission, isManager } from '@/utils/policies';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react'


export default function ProjectDetailsView({projectId}: {projectId: Project["_id"]}) {

    const router = useRouter()
    const path = usePathname()

    const { data: user, isLoading: authLoading } = useAuth()
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getFullProject(projectId),
        retry: false
    });

    const checkManager = useMemo(() => data?.manager === user?._id, [data, user])

    if(isLoading && authLoading) return "Cargando..."
    if(isError) throw new Error(error.message);
    if(data && user) return (
      <>
        <h1 className=" font-black headline1">{data.projectName}</h1>
        <p className="body1 font-light text-gray-500 mt-5">
          {data.description}
        </p>

          <nav className="flex flex-col gap-3 sm:flex-row">
            {(isManager(data.manager, user._id) || havePermission(data.team, user._id, 3)) && <button
              type="button"
              className=" bg-primary hover:bg-dark-primary px-10 py-3 text-white text-xl
                font-bold cursor-pointer transition-colors mt-5"
              onClick={() => router.push("?newTask=true")}
            >
              Agregar Tarea
            </button>}

            {(isManager(data.manager, user._id) || havePermission(data.team, user._id, 4)) &&<Link
              href={path + "/team"}
              className=" bg-info hover:bg-dark-secondary px-10 py-3 text-white text-xl
                font-bold cursor-pointer transition-colors flex justify-center mt-5"
            >
              Colaboradores
            </Link>}
          </nav>
        

        <TaskList canEdit={checkManager || havePermission(data.team, user._id, 3)} projectId={projectId} tasks={data.tasks}/>
        <AddTaskModal projectId={projectId} />
        <EditTaskData projectId={projectId} />
        <TaskModalDetails canEditTasks={checkManager || havePermission(data.team, user._id, 3)} 
         projectId={projectId} canEditNotes={checkManager || havePermission(data.team, user._id, 2)}
        />
      </>
    );
}
