import React from 'react'
import AddNoteForm from './AddNoteForm'
import { Project, Task } from '@/types'
import NoteDetail from './NoteDetail'
import Title from '../title/Title'

type NotesPanelProps = {
    notes: Task["notes"],
    projectId: Project["_id"]
    canEditNotes: boolean
}

export default function NotesPanel({projectId, notes, canEditNotes}: NotesPanelProps) {
  return (
    <div className="space-y-12u">
      {canEditNotes && <AddNoteForm projectId={projectId} />}

      {notes.length ? <div className="divide-y divide-gray-300 mt-10 space-y-4u">
        <>
          <Title variant="dark" as="h3">
            Notas
          </Title>
          {/* <p className="font-bold text-2xl text-slate-600 my-5">Notas:</p> */}
          {notes.map((note) => (
                <NoteDetail projectId={projectId} key={note._id} note={note} />
          ))}
        </>
      </div> : null}
    </div>
  );
}
