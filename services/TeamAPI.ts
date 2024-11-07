import api from "@/lib/axios";
import { Project, TeamMember, TeamMemberForm, ToolType, User, teamMembersSchema, userTeamSchema } from "@/types";
import { Quiz } from "@/types/quiz";
import { isAxiosError } from "axios";


type TeamAPI = {
    formData: TeamMemberForm,
    toolId: Project["_id"] | Quiz["_id"],
    tool: ToolType
    userId: User["_id"],
    permissionFormData: {
        permissionLevel: number
    }
}

export async function findUserByEmail({toolId, formData, tool}: Pick<TeamAPI, "toolId" | "formData" | "tool">) {
    try {
        const url = `/${tool}/${toolId}/team/find`
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addUserToTeam({toolId, id, tool}: {toolId: Quiz["_id"], id: TeamMember["_id"], tool: ToolType}) {
    try {
        const url = `/${tool}/${toolId}/team`
        const { data } = await api.post<string>(url, {id})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTeam(toolId: Quiz["_id"], tool: ToolType) {
    try {
        const url = `/${tool}/${toolId}/team`
        const { data } = await api(url)
        const response = teamMembersSchema.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function removeUserFromTeam({toolId, userId, tool}:  Pick<TeamAPI, "toolId" | "userId" | "tool">) {
    try {
        const url = `/${tool}/${toolId}/team/${userId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function editUserFromTeam({toolId, userId, permissionFormData, tool}: Pick<TeamAPI, "toolId" | "userId" | "permissionFormData" | "tool">) {
    try {
        const url = `/${tool}/${toolId}/team/${userId}`
        const { data } = await api.put<string>(url, permissionFormData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUserTeamById({toolId, userId, tool}: Pick<TeamAPI, "toolId" | "userId" | "tool">) {
    try {
        const url = `/${tool}/${toolId}/team/${userId}`
        const { data } = await api.get<string>(url)
        const response = userTeamSchema.safeParse(data)
        if(response.success) return response.data

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}