import React from 'react'
import ProjectForm from './ProjectForm'
import { Project, ProjectFormData } from '@/types';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProject } from '@/services/ProjectAPI';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import SubmitInput from '../form/input/SubmitInput';
import Title from '../title/Title';
import Subtitle from '../title/Subtitle';
import Button from '../button/Button';
import Form from '../form/Form';
import Separator from '../separator/Separator';

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
        <Title variant="dark">Editar proyecto</Title>
        <Subtitle
          variant="dark"
          text="Llena el siguiente formulario para editar un proyecto"
        />

        <Button text="Volver a proyectos" href="/projects" />

        <Form
          onSubmit={handleSubmit(handleForm)}
        >
          <ProjectForm register={register} errors={errors} />
          <SubmitInput isLoading={isPending} value="Guardar cambios" />
        </Form>

        <Separator />
      </div>
    </>
  );
}
