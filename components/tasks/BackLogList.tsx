import { Project, TaskProject } from '@/types'
import BacklogCard from './BacklogCard'
import Title from '../title/Title'
import Subtitle from '../title/Subtitle'

type BackLogListProps = {
    backlogGroupedTasks: TaskProject[]
    canEdit: boolean
    projectId: Project["_id"]
}

export default function BackLogList({backlogGroupedTasks, canEdit, projectId}: BackLogListProps) {

    return (
      <>
        <div className="mt-16u mb-8u sm:mt-24u sm:mb-12u">
          <Title as="h2" variant="dark">
            Backlog
          </Title>
          <Subtitle variant="dark" text="Buzón de tareas" />
{/*           <nav className="flex flex-col gap-3 sm:flex-row">
            {(isManager(data.manager, user._id) ||
              havePermission(data.team, user._id, 3)) && (
              <Button
                text="Agregar Tarea"
                onClick={() => router.push("?newTask=true")}
              />
            )}
          </nav> */}
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
          <div className="my-6 body3">No hay tareas en el backlog</div>
        )}
      </>
    );
    }   