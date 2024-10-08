import api from "@/lib/axios"
import { Question, QuestionFormData, Quiz } from "@/types/quiz"
import { isAxiosError } from "axios"


type QuestionAPI = {
    newFormData: QuestionFormData,
    quizId: Quiz["_id"],
    questionId: Question["_id"],
}

type AddAPI = Pick<QuestionAPI, "quizId" | "newFormData">

export async function addQuestion({quizId, newFormData}: AddAPI) {
    try {
        const { data } = await api.post<string>(`/quizzes/${quizId}/questions`, newFormData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}