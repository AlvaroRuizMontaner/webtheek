import api from "@/lib/axios";
import { Project, TeamMember, TeamMemberForm, User, teamMembersSchema, userTeamSchema } from "@/types";
import { isAxiosError } from "axios";


type TeamAPI = {
    formData: TeamMemberForm,
    toolId: Project["_id"],
    userId: User["_id"],
    permissionFormData: {
        permissionLevel: number
    }
}

export async function findUserByEmail({toolId, formData}: Pick<TeamAPI, "toolId" | "formData">) {
    try {
        const url = `/projects/${toolId}/team/find`
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addUserToProject({toolId, id}: {toolId: Project["_id"], id: TeamMember["_id"]}) {
    try {
        const url = `/projects/${toolId}/team`
        const { data } = await api.post<string>(url, {id})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectTeam(toolId: Project["_id"]) {
    try {
        const url = `/projects/${toolId}/team`
        const { data } = await api(url)
        const response = teamMembersSchema.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function removeUserFromProject({toolId, userId}: {toolId: Project["_id"], userId: TeamMember["_id"]}) {
    try {
        const url = `/projects/${toolId}/team/${userId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function editUserFromProject({toolId, userId, permissionFormData}: Pick<TeamAPI, "toolId" | "userId" | "permissionFormData">) {
    try {
        const url = `/projects/${toolId}/team/${userId}`
        const { data } = await api.put<string>(url, permissionFormData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUserTeamById({toolId, userId}: Pick<TeamAPI, "toolId" | "userId">) {
    try {
        const url = `/projects/${toolId}/team/${userId}`
        const { data } = await api.get<string>(url)
        const response = userTeamSchema.safeParse(data)
        if(response.success) return response.data

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}