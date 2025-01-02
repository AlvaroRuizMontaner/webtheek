import { useAuth } from '@/hooks/useAuth';
import { deleteNote, editNote } from '@/services/NoteAPI';
import { Note, NoteFormData, Project } from '@/types'
import { formatDate } from '@/utils/formatDate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import styles from "./Notes.module.css"
import { useForm } from 'react-hook-form';
import SubmitInput from '../form/input/SubmitInput';
import Loading from '../loading-templates/Loading';

type NoteDetailProps  = {
    note: Note
    projectId: Project["_id"]
}

export default function NoteDetail({note, projectId}: NoteDetailProps) {

    const searchParams = useSearchParams()
    const taskId = searchParams.get('viewTask')!
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const initialValues = {
      content: note.content
  }

  const { register, handleSubmit, formState: { errors } } = useForm<NoteFormData>({ defaultValues: initialValues });

    const queryClient = useQueryClient()

    const { data, isLoading } = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id,[data])

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ["task", taskId]})
        }
    })

    const { mutate: editMutate, isPending } = useMutation({
        mutationFn: editNote,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            setIsEdit(false)
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ["task", taskId]})
        }
    })

    const handleEditNote = (formData: NoteFormData) => {
      editMutate({projectId, taskId, noteId: note._id, formData})
    }

    if(isLoading) return <Loading />

  return (
    <div className="flex justify-between items-center gap-2 body3">
      <div className="flex-1 flex flex-col bg-primary-400 rounded border-sm border-primary-400">
        <div className="flex justify-between items-center gap-4 text-white">
          <div className="p-1 px-2 flex items-center justify-between w-full">
            <span className="">{note.createdBy.name}</span>
            <div className="flex gap-2">
              {canDelete && !isEdit && (
                <span
                  className="cursor-pointer flex items-center text-accent-warning-300"
                  onClick={() => setIsEdit(true)}
                >
                  <PencilSquareIcon className="w-6 h-6" />
                </span>
              )}
              {canDelete && !isEdit && (
                <span
                  className="cursor-pointer flex items-center text-accent-danger-500"
                  onClick={() =>
                    mutate({ projectId, taskId, noteId: note._id })
                  }
                >
                  <TrashIcon className="w-6 h-6" />
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-between flex-col sm:flex-row bg-white p-1">
          {isEdit ? (
            <form
              className="flex-1"
              onSubmit={handleSubmit(handleEditNote)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Previene que se haga un salto de línea
                  handleSubmit(handleEditNote)();
                }
              }}
            >
              <textarea
                className="block w-full"
                id="content"
                {...register("content", {
                  minLength: 1,
                  required: true,
                })}
              ></textarea>
              <div className="mt-2 w-72 m-auto">
                <SubmitInput disabled={Boolean(errors.content)} isLoading={isPending} value="Actualizar nota" />
              </div>
            </form>
          ) : (
            <p className={`${styles["note-content"]}`}>{note.content}</p>
          )}
          <p className="text-xs text-slate-500 flex items-center">
            {formatDate(note.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
