import AddTaskModal from '@/components/tasks/AddTaskModal';
import EditTaskData from '@/components/tasks/EditTaskData';
import TaskList from '@/components/tasks/TaskList';
import TaskModalDetails from '@/components/tasks/TaskModalDetails';
import { useAuth } from '@/hooks/useAuth';
import { getFullProject } from '@/services/ProjectAPI';
import { Project } from '@/types';
import { isManager } from '@/utils/policies';
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

    const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

    if(isLoading && authLoading) return "Cargando..."
    if(isError) throw new Error(error.message);
    if(data && user) return (
      <>
        <h1 className=" text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl fon-light text-gray-500 mt-5">
          {data.description}
        </p>

        {isManager(data.manager, user._id) && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className=" bg-primary hover:bg-dark-primary px-10 py-3 text-white text-xl
                font-bold cursor-pointer transition-colors"
              onClick={() => router.push("?newTask=true")}
            >
              Agregar Tarea
            </button>

            <Link
              href={path + "/team"}
              className=" bg-info hover:bg-info px-10 py-3 text-white text-xl
                font-bold cursor-pointer transition-colors"
            >
              Colaboradores
            </Link>
          </nav>
        )}

        <TaskList canEdit={canEdit} projectId={projectId} tasks={data.tasks} />
        <AddTaskModal projectId={projectId} />
        <EditTaskData projectId={projectId} />
        <TaskModalDetails projectId={projectId} />
      </>
    );
}
