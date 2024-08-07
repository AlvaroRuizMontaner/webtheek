"use client"
import SubmitInput from '@/components/form/input/SubmitInput';
import ProjectForm from '@/components/projects/ProjectForm';
import { createProject } from '@/services/ProjectAPI';
import { ProjectFormData } from '@/types';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function CreateProjectView():JSX.Element {
  const router = useRouter()

  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

  const {mutate, isPending} = useMutation({
      mutationFn: createProject,
      onError: (error) => {
          toast.error(error.message)
      },
      onSuccess: (data) => {
          localStorage.setItem('toastMessage', data);
          router.push('/projects');
      }
  })

  const handleForm = (formData: ProjectFormData) => mutate(formData)


return (
  <>
    <div className=" max-w-3xl mx-auto">
      <h1 className="headline1 font-bold">Crear proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Llena el siguiente formulario para crear un proyecto
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
{/*         <input
          type="submit"
          value="Crear proyecto"
          className=" bg-info hover:bg-dark-secondary w-full p-3 text-white 
          uppercase font-bold cursor-pointer transition-colors"
        /> */}
        <SubmitInput isLoading={isPending} value="Crear proyecto" />
      </form>
    </div>
  </>
);
}









/* import CreateProjectView from '@/views/projects/CreateProjectView'

export default function page() {
  return (
    <>
        <CreateProjectView />
    </>
  )
}

 */