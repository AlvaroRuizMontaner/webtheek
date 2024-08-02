import Link from 'next/link'
import React from 'react'
import ProjectForm from './ProjectForm'
import { Project, ProjectFormData } from '@/types';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProject } from '@/services/ProjectAPI';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import SubmitInput from '../form/input/SubmitInput';

type EditProjectFormProps = {
    data: ProjectFormData,
    projectId: Project["_id"]
}

export default function EditProjectForm({data, projectId}: EditProjectFormProps) {

    const router = useRouter()

      const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description,
      }})

      const queryClient = useQueryClient()
      const { mutate, isPending } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["projects"]})
            queryClient.invalidateQueries({queryKey: ["editProject", projectId]})
            data && localStorage.setItem('toastMessage', data);
            router.push("/")
        }
      })

      const handleForm = (formData: ProjectFormData) => {
        mutate({
            formData,
            projectId
        })
      }

  return (
    <>
    <div className=" max-w-3xl mx-auto">
      <h1 className="text-5xl font-bold">Editar proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Llena el siguiente formulario para editar un proyecto
      </p>

      <nav className="my-5">
        <Link
          className=" bg-primary hover:bg-dark-primary px-10 py-3 text-white text-xl 
        font-bold cursor-pointer transition-colors"
          href="/"
        >
          Volver a proyectos
        </Link>
      </nav>

      <form
        className="mt-10 bg-white shadow-lg p-10 rounded-lg"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <ProjectForm register={register} errors={errors} />
{/*         <div className="bg-info hover:bg-dark-secondary w-full flex justify-center h-[52px] text-white font-black text-xl cursor-pointer relative">
            {!isPending ? <input
            type="submit"
            value="Guardar cambios"
            className="block w-full h-full p-3 cursor-pointer"
            /> : <Spinner />}
        </div> */}
        <SubmitInput isLoading={isPending} value="Guardar cambios" />
      </form>
    </div>
  </>
  )
}
