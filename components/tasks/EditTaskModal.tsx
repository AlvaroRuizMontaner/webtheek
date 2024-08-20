import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { usePathname, useRouter } from 'next/navigation';
import { Project, Task, TaskFormData } from '@/types';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '@/services/TaskAPI';
import { toast } from 'react-toastify';
import SubmitInput from '../form/input/SubmitInput';
import { XMarkIcon } from '@heroicons/react/20/solid';


type EditTaskModalProps = {
    data: Task
    taskId: Task["_id"]
    projectId: Project["_id"]
}

export default function EditTaskModal({data, projectId, taskId}: EditTaskModalProps) {

    const path = usePathname()
    const router = useRouter()

    const { register, handleSubmit, reset, formState: {errors} } = useForm<TaskFormData>({defaultValues: {
        name: data.name,
        description: data.description
    }})

    const queryClient = useQueryClient()
    const  { mutate, isPending } = useMutation({
        mutationFn: updateTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["project", projectId]})
            queryClient.invalidateQueries({queryKey: ["task", taskId]})
            toast.success(data)
            reset()
            router.push(path)
        }
    })

    const handleEditTask = (formData: TaskFormData) => {
        mutate({projectId, taskId, formData})
    }

    return (
        <Transition appear show={true} as={Fragment}>
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
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-8u sm:p-16u">
                                <span className='absolute inline-block top-2 right-2 sm:top-5 sm:right-5 cursor-pointer' onClick={() => router.push(path)}>
                                    <XMarkIcon className='w-8 h-8 text-black' />
                                </span>
                                <DialogTitle
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Editar Tarea
                                </DialogTitle>

                                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                                    <span className="text-accent-300">este formulario</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    noValidate
                                    onSubmit={handleSubmit(handleEditTask)}
                                >
                                    
                                    <TaskForm register={register} errors={errors} />
                                    <SubmitInput isLoading={isPending} value="Guardar Tarea" />
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}