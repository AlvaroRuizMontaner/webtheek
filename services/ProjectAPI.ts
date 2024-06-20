import api from "@/lib/axios";
import { Project, ProjectFormData, dashboardProjectSchema } from "@/types";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post("/projects", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

export async function getProjects() {
    const token = localStorage.getItem("AUTH_TOKEN")
    console.log(token)
    try {
        const { data } = await api("/projects", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const response = dashboardProjectSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

export async function getProjectById(id: Project["_id"]) {
    try {
        const { data } = await api(`/projects/${id}`)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

type ProjectApiType = {
    formData: ProjectFormData,
    projectId: Project["_id"]
}

export async function updateProject({formData, projectId}: ProjectApiType) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

export async function deleteProject(id: Project["_id"]) {
    try {
        const { data } = await api.delete<string>(`/projects/${id}`)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}