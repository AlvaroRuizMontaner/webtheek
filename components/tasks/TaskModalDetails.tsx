import { Fragment, useState } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@/services/TaskAPI';
import { Project, TaskStatus } from '@/types';
import { toast } from 'react-toastify';
import { secondRenderUseEffect } from '@/hooks/useEffect';
import { formatDate } from '@/utils/formatDate';
import { statusTranslations } from '@/locales/es';
import NotesPanel from '../notes/NotesPanel';
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Collapse from '../collapse/Collapse';
import styles from '../collapse/collapse.module.css';
import "./task.scss";
import Subtitle from '../title/Subtitle';
import Title from '../title/Title';
import Label from '../title/Label';
import XMark from './XMark/XMark';

type TaskModalDetailsProps = {
    projectId: Project["_id"]
    canEditTasks: boolean
    canEditNotes: boolean
}

export default function TaskModalDetails({projectId, canEditNotes, canEditTasks}: TaskModalDetailsProps) {
    const [isOpenHistory, setIsOpenHistory] = useState(false)

    const router = useRouter()
    const path = usePathname()
    const searchParams = useSearchParams()
    const taskId = searchParams.get('viewTask')!

    const show = taskId ? true : false

    
    const { data, isError, error } = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId,
        retry: false
        })
        
        const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
            },
            onSuccess: (data) => {
                toast.success(data)
                queryClient.invalidateQueries({queryKey: ["project", projectId]})
                queryClient.invalidateQueries({queryKey: ["task", taskId]})
                }
                })
                

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus

        const data = {projectId, taskId, status}
        mutate(data)
    }

    // Evita que toast provoque el warning de "cannot-update-a-component-x-while"
    // En caso de id no valida, en el primer render no hace nada esperando que react-query reciba el error
    // y cuando es recibido ejecuta el toast y la redireccion
    secondRenderUseEffect(() => {
        if(isError) {
            toast.error(error.message, {toastId: "error"})
            router.push(`/projects/${projectId}`)
        }
    }, [error])
  
    if(data) return (
      <>
        <Transition appear show={show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => router.push(path)}
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel
                    className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white
                                    text-left align-middle shadow-xl transition-all p-8 sm:p-16 relative"
                  >
                    <span
                      className="absolute inline-block top-2 right-2 sm:top-5 sm:right-5 cursor-pointer"
                      onClick={() => router.push(path)}
                    >
                      <XMark/>
                    </span>
                    <p className="text-sm text-slate-400">
                      Agregada el: {formatDate(data.createdAt)}{" "}
                    </p>
                    <p className="text-sm text-slate-400">
                      Última actualización: {formatDate(data.updatedAt)}
                    </p>

                    <div className="mt-6u">
                      <Title variant="dark" as="h3">
                        {data.name}
                      </Title>
                    </div>
                    <Subtitle variant="dark" text={data.description} />

                    <div className="space-y-12u mt-12u">
                      {data.completedBy.length ? (
                        <div className="">
                          <Label> Modificaciones</Label>
                          <p
                            className={` flex items-center justify-between gap-2 rounded p-3 border border-gray-300 text-black ${isOpenHistory && "rounded-b-none"} `}
                          >
                            <span>Historial de cambios</span>
                            <span
                              onClick={() => setIsOpenHistory((prev) => !prev)}
                              className={`${isOpenHistory ? "rotate-180" : "rotate-0"} text-gray-500 ${styles["transition-rotate"]} cursor-pointer`}
                            >
                              <ChevronDownIcon className="w-6 h-6 " />
                            </span>
                          </p>

                          <Collapse
                            height="unset"
                            position="relative"
                            bottom="unset"
                            isOpen={isOpenHistory}
                          >
                            <div className="border border-gray-300 border-t-0 p-2 rounded-b">
                              <ul className="list-decimal ml-4 relative bg-white px-2">
                                {data.completedBy.map((activityLog) => (
                                  <li key={activityLog._id}>
                                    <span className="font-bold text-slate-600">
                                      {statusTranslations[activityLog.status]}
                                    </span>{" "}
                                    por: {activityLog.user.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </Collapse>
                        </div>
                      ) : null}

                      <div className="">
                        <Label >Estado Actual:</Label>

                        {canEditTasks ? (
                          <select
                            name=""
                            id=""
                            className="w-full p-3 bg-white no-border-focus border-gray-300 border rounded-b"
                            defaultValue={data.status}
                            onChange={handleChange}
                          >
                            {Object.entries(statusTranslations).map(
                              ([key, value]) => (
                                <option key={key} value={key}>
                                  {value}
                                </option>
                              )
                            )}
                          </select>
                        ) : (
                          <div className="w-full p-3 bg-white border-2 border-primary-700">
                            {statusTranslations[data.status]}
                          </div>
                        )}
                      </div>

                      <div className="">
                        <NotesPanel
                          canEditNotes={canEditNotes}
                          notes={data.notes}
                          projectId={projectId}
                        />
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}