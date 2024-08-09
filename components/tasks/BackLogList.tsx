import { Project, TaskProject } from '@/types'
import BacklogCard from './BacklogCard'

type BackLogListProps = {
    backlogGroupedTasks: TaskProject[]
    canEdit: boolean
    projectId: Project["_id"]
}

export default function BackLogList({backlogGroupedTasks, canEdit, projectId}: BackLogListProps) {

    return (
        <>
          <div className='mt-10 font-black headline3'>
            <p>Backlog</p>
          </div>
          {backlogGroupedTasks.length !== 0 ? (
            <ul className='my-6 space-y-2'>
              {backlogGroupedTasks.map((task, index) => (
                <BacklogCard key={task.name + index} task={task} canEdit={canEdit} projectId={projectId} />
              ))}
            </ul>
          ) : (
            <div className='my-6 body3'>No hay tareas en el backlog</div>
          )}
        </>
      );
    }   