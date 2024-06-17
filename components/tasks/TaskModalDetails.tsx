import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getTaskById } from '@/services/TaskAPI';
import { Project } from '@/types';
import { toast } from 'react-toastify';
import { secondRenderUseEffect } from '@/hooks/useEffect';
import { formatDate } from '@/utils/formatDate';

type TaskModalDetailsProps = {
    projectId: Project["_id"]
}

export default function TaskModalDetails({projectId}: TaskModalDetailsProps) {

    const router = useRouter()
    const path = usePathname()
    const searchParams = useSearchParams()
    const taskId = searchParams.get('viewTask')!
    console.log(taskId)

    const show = taskId ? true : false

    const { data, isError, error } = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId,
        retry: false
    })

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
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual:</label>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}