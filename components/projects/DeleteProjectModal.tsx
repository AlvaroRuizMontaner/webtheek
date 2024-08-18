import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { checkPasswordForm } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkPassword } from '@/services/AuthAPI';
import { toast } from 'react-toastify';
import { deleteProject } from '@/services/ProjectAPI';
import SubmitInput from '../form/input/SubmitInput';
import { XMarkIcon } from '@heroicons/react/20/solid';

export default function DeleteProjectModal() {
    const initialValues: checkPasswordForm = {
        password: ''
    }
    const path = usePathname()
    const router = useRouter()

    const params = useSearchParams()
    const deleteProjectId = params.get("deleteProject")!

    const show = deleteProjectId ? true : false

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const checkPasswordMutation = useMutation({
        mutationFn: checkPassword,
        onError: (error) => toast.error(error.message)
    })

    const QueryClient = useQueryClient()
    const deleteProjectMutation = useMutation({
        mutationFn: deleteProject,
        onError: (error) => {
          toast.error(error.message)
        },
        onSuccess: (data) => {
          QueryClient.invalidateQueries({queryKey: ["projects"]})
          toast.success(data)
          router.push(path)
        }
      })

    const handleForm = async (formData: checkPasswordForm) => {
        await checkPasswordMutation.mutateAsync(formData)
        await deleteProjectMutation.mutateAsync(deleteProjectId)
    }


    return (
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
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <span className='absolute inline-block top-2 right-2 sm:top-5 sm:right-5 cursor-pointer' onClick={() => router.push(path)}>
                                    <XMarkIcon className='w-8 h-8 text-black' />
                                </span>
                                <Dialog.Title
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >Eliminar Proyecto </Dialog.Title>

                                <p className="text-xl font-bold">Confirma la eliminación del proyecto {''}
                                    <span className="text-secondary">colocando tu password</span>
                                </p>

                                <form
                                    className="mt-10 space-y-5"
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                >

                                    <div className="flex flex-col gap-3">
                                        <label
                                            className="font-normal text-primary-500 headline3"
                                            htmlFor="password"
                                        >Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Password Inicio de Sesión"
                                            className="w-full p-3  border-gray-300 border"
                                            {...register("password", {
                                                required: "El password es obligatorio",
                                            })}
                                        />
                                        {errors.password && (
                                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                                        )}
                                    </div>

{/*                                     <div className="bg-accent-500 hover:bg-accent-700 w-full flex justify-center h-[52px] text-white font-black text-xl cursor-pointer relative">
                                        {!checkPasswordMutation.isPending || !deleteProjectMutation.isPending ? <input
                                        type="submit"
                                        value='Eliminar Proyecto'
                                        className="block w-full h-full p-3 cursor-pointer"
                                        /> : <Spinner />}
                                    </div> */}
                                    <SubmitInput isLoading={checkPasswordMutation.isPending || deleteProjectMutation.isPending} value="Eliminar Proyecto" />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}