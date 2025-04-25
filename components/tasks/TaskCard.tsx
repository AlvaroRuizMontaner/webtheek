import { deleteTask } from '@/services/TaskAPI'
import { Project, TaskProject } from '@/types'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { Fragment } from 'react'
import { toast } from 'react-toastify'
import { useDraggable } from "@dnd-kit/core"
import {CSS} from '@dnd-kit/utilities';
import Thumbtack from './Thumtack/Thumbtack'
import { linkify } from '@/utils/linkify'

type TaskCardProps = {
    task: TaskProject
    projectId: Project["_id"]
    canEdit: boolean
    status: string
}

const statusStyles: {[key: string]: string} = {
  pending: "border-primary-300 shadow-gray-500",
  onHold: "border-primary-300 shadow-gray-500",
  inProgress: "border-primary-300 shadow-gray-500",
  underReview: "border-primary-300 shadow-gray-500",
  completed: "border-primary-300 shadow-gray-500"
}

export default function TaskCard({task, projectId, canEdit, status}: TaskCardProps) {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id
  })

    const router = useRouter()

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
      mutationFn: deleteTask,
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: (data) => {
        toast.success(data)
        queryClient.invalidateQueries({queryKey: ["project", projectId]})
      },
    })

    const style = {
      transform: CSS.Translate.toString(transform),
    }

  return (
    <li
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      style={style}
      className={`p-3 sm:p-5 border-2 ${statusStyles[status]} flex justify-between gap-3 shadow-y-2 relative task-card`}
    >
      <div className=" min-w-0 flex justify-center flex-col gap-y-4 max-h-48">
        <div className='flex gap-4'>
          <Thumbtack />
          <button
            type="button"
            className=" text-base font-bold text-primary-700 text-left ellipsis"
            onClick={() =>
              router.push(location.pathname + `?viewTask=${task._id}`)
            }
          >
            {task.name}
          </button>
        </div>
        {task.description && (
          <p className="body3 md:text-base ellipsis ">
            {linkify(task.description)}
          </p>
        )}
      </div>

      <div className="flex shrink-0  gap-x-6">
        <Menu as="div" className="relative w-2 flex-none">
          <Menu.Button className="-m-2.5 absolute top-1 right-0 sm:top-0 sm:-right-1 block text-gray-500 hover:text-gray-900">
            <span className="sr-only">opciones</span>
            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                <button
                  type="button"
                  className="block px-3 py-1 text-sm leading-6 text-gray-900"
                  onClick={() =>
                    router.push(location.pathname + `?viewTask=${task._id}`)
                  }
                >
                  Ver Tarea
                </button>
              </Menu.Item>
              {canEdit && (
                <>
                  <Menu.Item>
                    <button
                      type="button"
                      className="block px-3 py-1 text-sm leading-6 text-gray-900"
                      onClick={() =>
                        router.push(location.pathname + `?editTask=${task._id}`)
                      }
                    >
                      Editar Tarea
                    </button>
                  </Menu.Item>

                  <Menu.Item>
                    <button
                      type="button"
                      className="block px-3 py-1 text-sm leading-6 text-accent-danger-500"
                      onClick={() => mutate({ projectId, taskId: task._id })}
                    >
                      Eliminar Tarea
                    </button>
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  );
}
