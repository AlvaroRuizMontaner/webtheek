import React from 'react'
import AddNoteForm from './AddNoteForm'
import { Project, Task } from '@/types'
import NoteDetail from './NoteDetail'

type NotesPanelProps = {
    notes: Task["notes"],
    projectId: Project["_id"]
}

export default function NotesPanel({projectId, notes}: NotesPanelProps) {
  return (
    <>
        <AddNoteForm projectId={projectId} />

        <div className="divide-y divide-gray-100 mt-10">
            {notes.length ? (
                <>
                    <p className='font-bold text-2xl text-slate-600 my-5'>Notas:</p>
                    {notes.map(note => <NoteDetail projectId={projectId} key={note._id} note={note} />)}
                </>
            ): <p className='text-gray-500 text-center pt-3'>No hay notas</p>}

        </div>
    </>
  )
}
