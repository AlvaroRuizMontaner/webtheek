import { NoteFormData, Project } from '@/types'
import React from 'react'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import { createNote } from '@/services/NoteAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useSearchParams } from 'next/navigation'

export default function AddNoteForm({projectId}: {projectId: Project["_id"]}) {

    const params = useSearchParams()
    const taskId = params.get("viewTask")!

    const initialValues = {
        content: ""
    }
    const { register, handleSubmit, reset, formState: {errors} } = useForm<NoteFormData>({defaultValues: initialValues})


    const queryClient = useQueryClient()
    const { mutate } = useMutation({
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
    <form 
        onSubmit={handleSubmit(handleAddNote)} 
        action=""
        noValidate
        className='space-y-3'
    >
        <div className="flex flex-col gap-2">
            <label className='font-bold' htmlFor="">Crear Nota</label>
            <textarea 
                id="content"
                placeholder="Contenido de la nota"
                className='w-full p-3 border border-gray-300 min-h-[50px]'
                {...register("content", {
                    required: "El cotnenido de la nota es obligatorio"
                })}
            />
            {errors.content && (
                <ErrorMessage>{errors.content.message}</ErrorMessage>
            )}
        </div>

        <input 
            type="submit" 
            value="Crear Nota"
            className='bg-info hover:bg-dark-secondary w-full p-2 body2 text-white font-black cursor-pointer'
        />
    </form>
  )
}
