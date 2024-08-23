"use client"
import Button from '@/components/button/Button';
import Form from '@/components/form/Form';
import SubmitInput from '@/components/form/input/SubmitInput';
import ProjectForm from '@/components/projects/ProjectForm';
import Separator from '@/components/separator/Separator';
import Subtitle from '@/components/title/Subtitle';
import Title from '@/components/title/Title';
import { createProject } from '@/services/ProjectAPI';
import { ProjectFormData } from '@/types';
import { useMutation } from '@tanstack/react-query';
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
      <Title variant="dark">Crear proyecto</Title>
        <Subtitle
          variant="dark"
          text="Llena el siguiente formulario para crear un proyecto"
        />

      <Button text="Volver a proyectos" href="/projects" />

      <Form
        className=" shadow-lg rounded-lg"
        onSubmit={handleSubmit(handleForm)}
      >
        <ProjectForm register={register} errors={errors} />
        <SubmitInput isLoading={isPending} value="Crear proyecto" />
      </Form>
      <Separator />
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