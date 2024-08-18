import { NoteFormData, Project } from '@/types'
import React from 'react'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import { createNote } from '@/services/NoteAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import SubmitInput from '../form/input/SubmitInput'

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
    <form 
        onSubmit={handleSubmit(handleAddNote)} 
        action=""
        noValidate
        className='space-y-3'
    >
        <div className="flex flex-col">
            <label className=' px-3 bg-gray-300 w-fit text-black rounded-t' htmlFor="content">Nueva Nota</label>
            <textarea 
                id="content"
                placeholder="Contenido de la nota"
                className='w-full p-3 border min-h-[50px] rounded-b border-gray-300'
                {...register("content", {
                    required: "El cotnenido de la nota es obligatorio"
                })}
            />
            {errors.content && (
                <ErrorMessage>{errors.content.message}</ErrorMessage>
            )}
        </div>

        <div className='flex justify-center'>
{/*             <input 
                type="submit" 
                value="Crear Nota"
                className='bg-accent-500 hover:bg-accent-700 w-full sm:w-fit px-8 py-2 body2 text-white font-black cursor-pointer rounded'
            /> */}
            <SubmitInput isLoading={isPending} value="Crear Nota" />
        </div>
    </form>
  )
}
