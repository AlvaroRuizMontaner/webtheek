import api from "@/lib/axios";
import { Quiz, QuizFormData, QuizTimeData, dashboardQuizSchema, editQuizSchema, quizSchema, solvableQuizSchema } from "@/types/quiz";
import { isAxiosError } from "axios";

type QuizTimeModalType = {
    formData: QuizTimeData,
    quizId: Quiz["_id"]
}

export async function createQuiz(formData: QuizFormData) {
    try {
        const { data } = await api.post("/quizzes", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

export async function getQuizzes() {
    try {
        const { data } = await api("/quizzes")
        const response = dashboardQuizSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

export async function getQuizById(id: Quiz["_id"]) {
    try {
        const { data } = await api(`/quizzes/${id}`)
        const response = editQuizSchema.safeParse(data)
        if(response.success) {
            return response.data
        }

    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

export async function getSolvableQuizById(id: Quiz["_id"]) {
    try {
        const { data } = await api(`/browse/quizzes/${id}`)
        const response = solvableQuizSchema.safeParse(data)

        if(response.success) {
            return response.data
        }

    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

export async function getFullQuiz(id: Quiz["_id"]) {
    try {
        const { data } = await api(`/quizzes/${id}`)
        const response = quizSchema.safeParse(data)
        if(response.success) {
            return response.data
        }

    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

type QuizApiType = {
    formData: QuizFormData,
    quizId: Quiz["_id"]
}

export async function addTime({formData, quizId}: QuizTimeModalType) {
    try {
        const { data } = await api.put(`/quizzes/${quizId}/time`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

export async function updateQuiz({formData, quizId}: QuizApiType) {
    try {
        const { data } = await api.put<string>(`/quizzes/${quizId}`, formData)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}

export async function deleteQuiz(id: Quiz["_id"]) {
    try {
        const { data } = await api.delete<string>(`/quizzes/${id}`)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}