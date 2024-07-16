import api from "@/lib/axios";
import { Project, TeamMember, TeamMemberForm, User, teamMembersSchema, userTeamSchema } from "@/types";
import { isAxiosError } from "axios";


type TeamAPI = {
    formData: TeamMemberForm,
    projectId: Project["_id"],
    userId: User["_id"],
    permissionFormData: {
        permissionLevel: number
    }
}

export async function finduserByEmail({projectId, formData}: Pick<TeamAPI, "projectId" | "formData">) {
    try {
        const url = `/projects/${projectId}/team/find`
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addUserToProject({projectId, id}: {projectId: Project["_id"], id: TeamMember["_id"]}) {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api.post<string>(url, {id})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectTeam(projectId: Project["_id"]) {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api(url)
        const response = teamMembersSchema.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function removeUserFromProject({projectId, userId}: {projectId: Project["_id"], userId: TeamMember["_id"]}) {
    try {
        const url = `/projects/${projectId}/team/${userId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function editUserFromProject({projectId, userId, permissionFormData}: Pick<TeamAPI, "projectId" | "userId" | "permissionFormData">) {
    try {
        const url = `/projects/${projectId}/team/${userId}`
        const { data } = await api.put<string>(url, permissionFormData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUserTeamById({projectId, userId}: Pick<TeamAPI, "projectId" | "userId">) {
    try {
        const url = `/projects/${projectId}/team/${userId}`
        const { data } = await api.get<string>(url)
        const response = userTeamSchema.safeParse(data)
        if(response.success) return response.data

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}