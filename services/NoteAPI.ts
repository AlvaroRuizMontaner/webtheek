import api from "@/lib/axios"
import { Note, NoteFormData, Project, Task } from "@/types"
import { isAxiosError } from "axios"


type NoteAPIType = {
    formData: NoteFormData
    projectId: Project["_id"]
    taskId: Task["_id"]
    noteId: Note["_id"]
}

export async function createNote({projectId, taskId, formData}: Pick<NoteAPIType, "formData" | "projectId" | "taskId">) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteNote({projectId, taskId, noteId}: Pick<NoteAPIType, "projectId" | "taskId" | "noteId">) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
export async function editNote({projectId, taskId, noteId}: NoteAPIType) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
        const { data } = await api.put<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}