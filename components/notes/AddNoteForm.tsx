import { NoteFormData, Project } from '@/types'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createNote } from '@/services/NoteAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import SubmitInput from '../form/input/SubmitInput'
import Textarea from '../form/input/Textarea'
import Title from '../title/Title'
import Form from '../form/Form'

export default function AddNoteForm({projectId}: {projectId: Project["_id"]}) {

    const params = useSearchParams()
    const taskId = params.get("viewTask")!

    const initialValues = {
        content: ""
    }
    const { register, handleSubmit, reset, formState: {errors} } = useForm<NoteFormData>({defaultValues: initialValues})


    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ["task", taskId]})
            reset()
        }
    })

    const handleAddNote = (formData: NoteFormData) => {
        mutate({projectId, taskId, formData})
    }


  return (
    <Form
      className="!p-0 !space-y-4u"
      onSubmit={handleSubmit(handleAddNote)}
    >
      <Title variant="dark" as="h3">
        Creación de notas
      </Title>
      <Textarea
        name="content"
        id="content"
        placeholder="Contenido de la nota"
        errors={errors}
        register={register}
        required="El contenido de la nota es obligatorio"
      />

      <SubmitInput isLoading={isPending} value="Crear Nota" />
    </Form>
  );
}
