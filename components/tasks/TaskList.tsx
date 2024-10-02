import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import Clock from '../../public/icons/clock.svg';
import PauseCircle from '../../public/icons/pause_circle.svg';
import { Project, TaskProject, TaskStatus } from '@/types';
import { useState } from 'react';
import TaskCard from './TaskCard';
import { statusTranslations } from '@/locales/es';
import DropTask from './DropTask';
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateStatus } from '@/services/TaskAPI';
import "./task.scss";
import { IconType } from "react-icons/lib";
import { groupTasks } from "@/utils/policies";

type TaskListProps = {
    tasks: TaskProject[]
    projectId: Project["_id"],
    canEdit: boolean
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


    const fieldGroupedTasks = groupTasks(tasks)

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

    const mapFields = ([status, tasks]: [
      string,
      {
        name: string;
        status:
          | "backlog"
          | "pending"
          | "onHold"
          | "inProgress"
          | "underReview"
          | "completed";
        _id: string;
        description: string;
      }[],
    ]) => {

      const statusIcons: { [key: string]: IconType } = {
        backlog: AiOutlineCalendar,
        pending: AiOutlineCalendar,
        onHold: PauseCircle,
        inProgress: Clock,
        underReview: BsEye,
        completed: AiOutlineCheckCircle,
      };
      
      const statusComponents = Object.keys(statusTranslations).reduce<{ [key: string]: IconType }>((acc, key) => {
        acc[key] = statusIcons[key]; // El generico de arriba ayuda a TS a entender el tipo de acc y acc[key]
        return acc;
      }, {});

      const statusComponentStyles: { [key: string]: string } = {
        backlog: "",
        pending: "text-gray-500",
        onHold: "text-accent-danger-500",
        inProgress: "text-primary-500",
        underReview: "text-accent-warning-500",
        completed: "text-accent-500",
      }

      function StatusIcon({ status }: {status: string}) {
        const IconComponent = statusComponents[status];
        return IconComponent ? <IconComponent className={`${statusComponentStyles[status]} w-8 h-6`} /> : null;
      }

      return (
        <div key={status} className="2xl:min-w-0 2xl:w-1/5 taskWidth">
          <div
            className={`p-3 h-[61px] border-t-8 shadow-y-2 flex border border-slate-300 bg-white ${statusStyles[status]}`}
          >
            <div className="relative h-full flex items-center">
              <StatusIcon status={status} />
            </div>
            <h3
              className={`capitalize text-xl font-light
              ${statusStyles[status]}`}
            >
              {statusTranslations[status]}
            </h3>
          </div>
  
          {showDropTask && <DropTask status={status} />}
  
          <ul className="mt-5 space-y-5">
            {tasks.length === 0 ? (
              <li className="text-gray-700 text-center pt-3">No Hay tareas</li>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  status={status}
                  projectId={projectId}
                  key={task._id}
                  task={task}
                  canEdit={canEdit}
                />
              ))
            )}
          </ul>
        </div>
      )
    };


  return (
    <>
      <h2 className="headline2 font-black mt-16u mb-8u sm:mt-24u sm:mb-12u">Tablón de tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-8 pattern ">
        {canEdit ? (
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            {fieldGroupedTasks.map(mapFields)}
          </DndContext>
        ) : (
          fieldGroupedTasks.map(([status, tasks]) => (
            <div key={status} className="taskWidth 2xl:min-w-0 2xl:w-1/5">
              <h3
                className={`capitalize text-xl font-light border border-slate-300 bg-white
                p-3 border-t-8 ${statusStyles[status]}`}
              >
                {statusTranslations[status]}
              </h3>

              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => (
                    <TaskCard
                      status={status}
                      projectId={projectId}
                      key={task._id}
                      task={task}
                      canEdit={canEdit}
                    />
                  ))
                )}
              </ul>
            </div>
          ))
        )}
      </div>
    </>
  );
}
