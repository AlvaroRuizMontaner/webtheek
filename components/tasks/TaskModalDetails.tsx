import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@/services/TaskAPI';
import { Project, TaskStatus } from '@/types';
import { toast } from 'react-toastify';
import { secondRenderUseEffect } from '@/hooks/useEffect';
import { formatDate } from '@/utils/formatDate';
import { statusTranslations } from '@/locales/es';
import NotesPanel from '../notes/NotesPanel';

type TaskModalDetailsProps = {
    projectId: Project["_id"]
    canEditTasks: boolean
    canEditNotes: boolean
}

export default function TaskModalDetails({projectId, canEditNotes, canEditTasks}: TaskModalDetailsProps) {

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
                <Dialog as="div" className="relative z-10" onClose={() => router.push(path) }>
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
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)} </p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.updatedAt)}</p>
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </DialogTitle>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>

                                    {data.completedBy.length ? (
                                        <>
                                            <p className="font-bold headline3 text-slate-600 my-5">Historial de cambios</p>

                                            <ul className='list-decimal'>
                                                {data.completedBy.map((activityLog) => (
                                                    <li key={activityLog._id}>
                                                        <span className='font-bold text-slate-600'>{statusTranslations[activityLog.status]}</span>{" "}
                                                        por: {activityLog.user.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : null}


                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual:</label>
                                        
                                        {canEditTasks ? (<select 
                                            name="" 
                                            id=""
                                            className='w-full p-3 bg-white border border-gray-300'
                                            defaultValue={data.status}
                                            onChange={handleChange}
                                        >
                                            {Object.entries(statusTranslations).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>) : (
                                            <div className='w-full p-3 bg-white border border-gray-300'>{statusTranslations[data.status]}</div>
                                        )}
                                    </div>

                                    <NotesPanel canEditNotes={canEditNotes} notes={data.notes} projectId={projectId} />
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}