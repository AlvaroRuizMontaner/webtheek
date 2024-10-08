import { Fragment } from 'react'
import "./task.scss"
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Project, TaskProject } from '@/types'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '@/services/TaskAPI'
import { toast } from 'react-toastify'

type BacklogCardProps = {
    task:  TaskProject
    canEdit: boolean
    projectId: Project["_id"]
}

export default function BacklogCard({task, canEdit, projectId}: BacklogCardProps) {

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


  return (
    <li
      className="p-2 shadow-y-1 backlog-card rounded-lg flex justify-between"
    >
      <div className="font-bold text-gray-800 flex flex-col justify-center">
        <span
          className="cursor-pointer"
          onClick={() =>
            router.push(location.pathname + `?viewTask=${task._id}`)
          }
        >
          {task.name}
        </span>
      </div>

      <div className="flex shrink-0  gap-x-6">
        <Menu as="div" className="relative flex-none">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
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
