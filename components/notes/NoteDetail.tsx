import { useAuth } from '@/hooks/useAuth';
import { deleteNote } from '@/services/NoteAPI';
import { Note, Project } from '@/types'
import { formatDate } from '@/utils/formatDate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react'
import { toast } from 'react-toastify';
import { TrashIcon } from "@heroicons/react/20/solid";
import styles from "./Notes.module.css"

type NoteDetailProps  = {
    note: Note
    projectId: Project["_id"]
}

export default function NoteDetail({note, projectId}: NoteDetailProps) {

    const searchParams = useSearchParams()
    const taskId = searchParams.get('viewTask')!

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

    if(isLoading) return "Cargando..."

  return (
    <div className="flex justify-between items-center gap-2 body3">
      <div className='flex-1 flex flex-col bg-primary rounded border-2 border-primary'>
        <div className='flex justify-between items-center gap-4 text-white'>
          <p className='px-1 flex justify-between w-full'>
            <span className="">{note.createdBy.name}</span>
            {canDelete && <span className='cursor-pointer flex items-center text-accent' onClick={() => mutate({projectId, taskId, noteId: note._id})}><TrashIcon className='w-4 h-4' /></span>}
          </p>
        </div>
        <div className='flex justify-between flex-col sm:flex-row bg-white p-1'>
          <p className={`${styles["note-content"]}`}>{note.content}</p>
          <p className="text-xs text-slate-500 flex items-center">{formatDate(note.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
