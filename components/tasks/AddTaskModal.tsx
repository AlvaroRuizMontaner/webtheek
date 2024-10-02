import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import TaskForm from './TaskForm';
import { Project, TaskFormData } from '@/types';
import { useForm } from 'react-hook-form';
import { createBacklogTask, createTask } from '@/services/TaskAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import SubmitInput from '../form/input/SubmitInput';
import XMark from './XMark/XMark';

export default function AddTaskModal({projectId}: {projectId: Project["_id"]}) {

    const router = useRouter()
    const path = usePathname()
    const searchParams = useSearchParams()
    const search = searchParams.get('newTask')
    const show = search ? true : false
    const isBacklogTask = search === "backlog"

    const initialvalues: TaskFormData = {
        name: "",
        description: ""
    }

    const { register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues: initialvalues})

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: isBacklogTask ? createBacklogTask : createTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["project", projectId]})
            toast.success(data)
            reset()
            router.push(path)
        }
    })

    const handleCreateTask = (formData: TaskFormData) => {
        const data = {
            projectId,
            formData
        }
        mutate(data)
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => router.push(path)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-8 sm:p-16">
                                    <span className='absolute inline-block top-2 right-2 sm:top-5 sm:right-5 cursor-pointer' onClick={() => router.push(path)}>
                                    <XMark/>
                                    </span>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black headline2 mb-5 leading-[1]"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-accent-300">una tarea</span>
                                    </p>

                                    <form 
                                        className='mt-10 space-y-3'
                                        noValidate
                                        onSubmit={handleSubmit(handleCreateTask)}
                                    >
                                        <TaskForm 
                                            register={register}
                                            errors={errors}
                                        />
{/*                                         <input
                                            type="submit"
                                            value="Guardar Tarea"
                                            className=" bg-accent-500 hover:bg-accent-700 w-full p-3 text-white 
                                            uppercase font-bold cursor-pointer transition-colors"
                                        /> */}
                                        <SubmitInput isLoading={isPending} value="Guardar Tarea" />
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}