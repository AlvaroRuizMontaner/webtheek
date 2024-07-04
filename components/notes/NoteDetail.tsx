import { useAuth } from '@/hooks/useAuth';
import { deleteNote } from '@/services/NoteAPI';
import { Note, Project } from '@/types'
import { formatDate } from '@/utils/formatDate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react'
import { toast } from 'react-toastify';

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
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
          {note.content} por :{" "}
          <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>

      {canDelete && <button
      onClick={() => mutate({projectId, taskId, noteId: note._id})}
      type="button"
      className='bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors'
      >Eliminar</button>}
    </div>
  );
}
