import api from "@/lib/axios"
import { Question, QuestionFormData, Quiz } from "@/types/quiz"
import { isAxiosError } from "axios"


type QuestionAPI = {
    formData: QuestionFormData,
    quizId: Quiz["_id"],
    questionId: Question["_id"],
}

type AddAPI = Pick<QuestionAPI, "quizId" | "formData">

export async function addQuestion({quizId, formData}: AddAPI) {
    try {
        const { data } = await api.post(`/quizzes/${quizId}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}