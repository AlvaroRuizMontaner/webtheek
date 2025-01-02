import Button from '@/components/button/Button';
import Loading from '@/components/loading-templates/Loading';
import AddTaskModal from '@/components/tasks/AddTaskModal';
import BackLogList from '@/components/tasks/BackLogList';
import EditTaskData from '@/components/tasks/EditTaskData';
import TaskList from '@/components/tasks/TaskList';
import TaskModalDetails from '@/components/tasks/TaskModalDetails';
import Subtitle from '@/components/title/Subtitle';
import Title from '@/components/title/Title';
import { useAuth } from '@/hooks/useAuth';
import { getFullProject } from '@/services/ProjectAPI';
import { Project } from '@/types';
import { groupTasksByBacklog, havePermission, isManager } from '@/utils/policies';
import { useQuery } from '@tanstack/react-query';
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

  if(isLoading && authLoading) return <Loading />
  if(isError) throw new Error(error.message);
  if(data && user) return (
    <>
      <Title variant="dark">{data.projectName}</Title>
      <Subtitle
      variant="dark"
        text={data.description}
      />

      <nav className="flex flex-col gap-3 sm:flex-row">
        {(isManager(data.manager, user._id) ||
          havePermission(data.team, user._id, 3)) && (
          <Button text="Agregar Tarea" onClick={() => router.push("?newTask=true")} />
        )}

        {(isManager(data.manager, user._id) ||
          havePermission(data.team, user._id, 4)) && (
            <Button text="Colaboradores" variant="outline" href={path + "/team"} />
        )}
      </nav>

      <TaskList
        canEdit={checkManager || havePermission(data.team, user._id, 3)}
        projectId={projectId}
        tasks={data.tasks}
      />
      <BackLogList
        backlogGroupedTasks={groupTasksByBacklog(data.tasks)}
        canEdit={checkManager || havePermission(data.team, user._id, 3)}
        projectId={projectId}
        data={data}
        user={user}
      />
      <AddTaskModal projectId={projectId} />
      <EditTaskData projectId={projectId} />
      <TaskModalDetails
        canEditTasks={checkManager || havePermission(data.team, user._id, 3)}
        projectId={projectId}
        canEditNotes={checkManager || havePermission(data.team, user._id, 2)}
      />
    </>
  );
}
