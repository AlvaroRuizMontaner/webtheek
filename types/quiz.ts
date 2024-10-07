import { z } from "zod"

/* Questions */
export const questionSchema = z.object({
    _id: z.string(),
    statement: z.string(),
    quiz: z.string(),
    options: z.array(z.object({
        _id: z.string(),
        text: z.string(),
        isCorrect: z.boolean()
    })),
    createdAt: z.string(),
    updatedAt: z.string()
})

export const questionQuizSchema = questionSchema.pick({
    _id: true,
    statement: true,
    options: true

})

export type Question = z.infer<typeof questionSchema>
export type QuestionFormData = Pick<Question, "statement" | "options">
export type QuestionQuiz = z.infer<typeof questionQuizSchema>

/* Quizzes */

export const quizSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    manager: z.string(),
    questions: z.array(questionQuizSchema),
    team: z.array(z.object({
        user: z.string(),
        permissionLevel: z.number()
    }))
})

export const dashboardQuizSchema = z.array(
    quizSchema.pick({
        _id: true,
        name: true,
        description: true,
        manager: true
    })
)

export const editQuizSchema = quizSchema.pick({
    name: true,
    description: true,
})

export type Quiz = z.infer<typeof quizSchema>
export type QuizFormData = Pick<Quiz, "name" | "description">