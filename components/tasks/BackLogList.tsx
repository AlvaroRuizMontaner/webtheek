import { Project, User } from '@/types'
import BacklogCard from './BacklogCard'
import Title from '../title/Title'
import Subtitle from '../title/Subtitle'
import { GroupedTasks, havePermission, isManager } from '@/utils/policies'
import Button from '../button/Button'
import { useRouter } from 'next/navigation'
import EmptyState from '../empty-state/EmptyState'

type BackLogListProps = {
    backlogGroupedTasks: GroupedTasks["backlog"]
    canEdit: boolean
    projectId: Project["_id"]
    data: Project
    user: User
}

export default function BackLogList({backlogGroupedTasks, canEdit, projectId, data, user}: BackLogListProps) {

  const router = useRouter()

    return (
      <>
        <div className="mt-16u mb-8u sm:mt-24u sm:mb-12u">
          <Title as="h2" variant="dark">
            Backlog
          </Title>
          <Subtitle variant="dark" text="Buzón de tareas" />
          <nav className="flex flex-col gap-3 sm:flex-row">
            {(isManager(data.manager, user._id) ||
              havePermission(data.team, user._id, 3)) && (
              <Button
                text="Agregar Tarea"
                onClick={() => router.push("?newTask=backlog")}
              />
            )}
          </nav>
        </div>
        {backlogGroupedTasks.length !== 0 ? (
          <ul className="my-6 space-y-2">
            {backlogGroupedTasks.map((task, index) => (
              <BacklogCard
                key={task.name + index}
                task={task}
                canEdit={canEdit}
                projectId={projectId}
              />
            ))}
          </ul>
        ) : (
          <div className='h-64'>
            <EmptyState text="No hay tareas en el backlog, aún..."/>
          </div>
        )}
      </>
    );
    }   