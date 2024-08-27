import { Project, TaskProject, TaskStatus } from '@/types'
import React, { useState } from 'react'
import TaskCard from './TaskCard'
import { statusTranslations } from '@/locales/es'
import DropTask from './DropTask'
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updateStatus } from '@/services/TaskAPI'
import BackLogList from './BackLogList'

type TaskListProps = {
    tasks: TaskProject[]
    projectId: Project["_id"],
    canEdit: boolean
}

type GroupedTasks = {
    [key: string]: TaskProject[]
}

const initialStatusGroups: GroupedTasks = {
    backlog: [],
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}

const statusStyles: {[key: string]: string} = {
  pending: "border-t-gray-500",
  onHold: "border-t-accent-danger-500",
  inProgress: "border-t-primary-500",
  underReview: "border-t-accent-warning-300",
  completed: "border-t-accent-500"
}

export default function TaskList({tasks, projectId, canEdit}: TaskListProps) {

  const [showDropTask, setShowDropTask] = useState(false)

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
      mutationFn: updateStatus,
      onError: (error) => {
          toast.error(error.message)
      },
      onSuccess: (data) => {
          toast.success(data)
          queryClient.invalidateQueries({queryKey: ["project", projectId]})
          //queryClient.invalidateQueries({queryKey: ["task", taskId]})
      }
  })

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    const fieldGroupedTasks = Object.entries(groupedTasks).filter(([status]) => status !== "backlog")
    const backlogGroupedTasks = groupedTasks["backlog"]

    const mouseSensor = useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    });
   
    const touchSensor = useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    });
    const sensors = useSensors(mouseSensor, touchSensor);

    const handleDragEnd = (e: DragEndEvent) => {
      const { over, active } = e
      setShowDropTask(false)
      if(over && over.id) {
        const taskId = active.id.toString()
        const status = over.id as TaskStatus

        mutate({projectId, taskId, status})

        // Actualizacion optimista
        queryClient.setQueryData(["project", projectId], (prevData: Project) => {
          const updatedTasks = prevData.tasks.map((task) => {
            if(task._id === taskId) {
              return {
                ...task,
                status
              }
            }
            return task
          })

          return {
            ...prevData,
            tasks: updatedTasks
          }
        })
      }
    }
    const handleDragStart = (e: DragEndEvent) => {
      const { active } = e
      console.log(active)
      setShowDropTask(true)
    }


  return (
    <>
      <h2 className="headline2 font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-8 ">
        {canEdit ? (
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
          {fieldGroupedTasks.map(([status, tasks]) => (
            <div key={status} className="2xl:min-w-0 2xl:w-1/5 taskWidth">

              <h3 
                className={`capitalize text-xl font-light border border-slate-300 bg-white
                p-3 border-t-8 shadow-2 ${statusStyles[status]}`}
              >{statusTranslations[status]}</h3>

              {showDropTask && <DropTask status={status} />}

              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-700 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => <TaskCard status={status} projectId={projectId} key={task._id} task={task} canEdit={canEdit} />)
                )}
              </ul>
            </div>
          ))}
        </DndContext>
        ) : (
          fieldGroupedTasks.map(([status, tasks]) => (
            <div key={status} className="taskWidth 2xl:min-w-0 2xl:w-1/5">

              <h3 
                className={`capitalize text-xl font-light border border-slate-300 bg-white
                p-3 border-t-8 ${statusStyles[status]}`}
              >{statusTranslations[status]}</h3>

              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => <TaskCard status={status} projectId={projectId} key={task._id} task={task} canEdit={canEdit} />)
                )}
              </ul>
            </div>
          ))
        )}
      </div>

      <BackLogList backlogGroupedTasks={backlogGroupedTasks} canEdit={canEdit} projectId={projectId} />
    </>
  );
}
