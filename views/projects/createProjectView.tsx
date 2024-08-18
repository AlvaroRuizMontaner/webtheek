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
      <h1 className="text-5xl font-bold">Crear proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Llena el siguiente formulario para crear un proyecto
      </p>

      <nav className="my-5">
        <Link
          className=" bg-primary-400 hover:bg-primary-700 px-10 py-3 text-white text-xl 
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
{/*         <div className="bg-accent-500 hover:bg-accent-700 w-full flex justify-center h-[52px] text-white font-black text-xl cursor-pointer relative">
            {!isPending ? <input
            type="submit"
            value='Iniciar Sesión'
            className="block w-full h-full p-3 cursor-pointer"
            /> : <Spinner />}
          </div> */}
          <SubmitInput isLoading={isPending} value="Crear proyecto" />
      </form>
    </div>
  </>
);
}
