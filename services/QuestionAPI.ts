import api from "@/lib/axios"
import { QuestionFormData, Quiz } from "@/types/quiz"
import { isAxiosError } from "axios"


export async function addQuestion(quizId: Quiz["_id"], formData: QuestionFormData) {
    try {
        const { data } = await api.post(`/quizzes/${quizId}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.error) // Hay que lanzar el error para que vaya al onError de mutate
    }
}