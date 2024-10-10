import api from "@/lib/axios"
import { Question, QuestionFormData, Quiz } from "@/types/quiz"
import { isAxiosError } from "axios"


type QuestionAPI = {
    newFormData: QuestionFormData,
    quizId: Quiz["_id"],
    questionId: Question["_id"],
}


export async function addQuestion({quizId, newFormData}: Pick<QuestionAPI, "newFormData" | "quizId">) {
    try {
        const { data } = await api.post<string>(`/quizzes/${quizId}/questions`, newFormData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}


export async function editQuestion({quizId, questionId, newFormData}: Pick<QuestionAPI, "questionId" | "quizId" | "newFormData">) {
    try {
        const { data } = await api.put<string>(`/quizzes/${quizId}/questions/${questionId}`, newFormData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}


export async function deleteQuestion({quizId, questionId,}: Pick<QuestionAPI, "questionId" | "quizId">) {
    try {
        const { data } = await api.delete<string>(`/quizzes/${quizId}/questions/${questionId}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}