import api from "@/lib/axios";
import { TeamMember, TeamMemberForm, User, teamMembersSchema, userTeamSchema } from "@/types";
import { Quiz } from "@/types/quiz";
import { isAxiosError } from "axios";


type TeamAPI = {
    formData: TeamMemberForm,
    toolId: Quiz["_id"],
    userId: User["_id"],
    permissionFormData: {
        permissionLevel: number
    }
}

export async function findUserByEmail({toolId, formData}: Pick<TeamAPI, "toolId" | "formData">) {
    try {
        const url = `/quizzes/${toolId}/team/find`
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addUserToQuiz({toolId, id}: {toolId: Quiz["_id"], id: TeamMember["_id"]}) {
    try {
        const url = `/quizzes/${toolId}/team`
        const { data } = await api.post<string>(url, {id})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getQuizTeam(toolId: Quiz["_id"]) {
    try {
        const url = `/quizzes/${toolId}/team`
        const { data } = await api(url)
        const response = teamMembersSchema.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function removeUserFromQuiz({toolId, userId}: {toolId: Quiz["_id"], userId: TeamMember["_id"]}) {
    try {
        const url = `/quizzes/${toolId}/team/${userId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function editUserFromQuiz({toolId, userId, permissionFormData}: Pick<TeamAPI, "toolId" | "userId" | "permissionFormData">) {
    try {
        const url = `/quizzes/${toolId}/team/${userId}`
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
        const url = `/quizzes/${toolId}/team/${userId}`
        const { data } = await api.get<string>(url)
        const response = userTeamSchema.safeParse(data)
        if(response.success) return response.data

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}