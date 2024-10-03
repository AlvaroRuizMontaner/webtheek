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
import ProjectsLoading from '../loading-templates/ProjectsLoading';
import { useForm } from 'react-hook-form';
import Spinner from '../spinners/Spinner';

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

  const { register, handleSubmit, formState: { errors, isLoading: isLoadingEdit } } = useForm<NoteFormData>({ defaultValues: initialValues });

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

    const { mutate: editMutate } = useMutation({
        mutationFn: editNote,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ["task", taskId]})
        }
    })

    const handleEditNote = (formData: NoteFormData) => {
      editMutate({projectId, taskId, noteId: note._id, formData})
      setIsEdit(false)
    }

    const makeConsolLog = (e) => {
      e.preventDefault()
      console.log("Hola aqui estoy")
    }

    if(isLoading) return <ProjectsLoading />

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
            <form onClick={makeConsolLog} className="flex-1" onSubmit={makeConsolLog}>
              <textarea
              onClick={makeConsolLog}
                className="block w-full"
                id="content"
                {...register("content", {
                  required: true,
                })}
              ></textarea>
              {!isLoadingEdit ? (
                <input
                  className="flex w-full justify-center font-bold text-accent-500 p-1 cursor-pointer"
                  type="submit"
                  value="Actualizar nota"
                  disabled={errors ? true : false}
                  onClick={makeConsolLog}
                />
              ) : (
                <Spinner />
              )}
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
