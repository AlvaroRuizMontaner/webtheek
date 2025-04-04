import { z } from "zod"

/* Questions */
export const optionSchema = z.object({
    text: z.string(),
})

export const questionSchema = z.object({
    _id: z.string(),
    statement: z.string(),
    quiz: z.string(),
    options: z.array(optionSchema),
    correctIndex: z.string(),
    createdAt: z.string(), //Provisional
    updatedAt: z.string(), //Provisional
    selectedIndex: z.string().optional(),
    isSubmit: z.boolean().optional()
})

export const questionQuizSchema = questionSchema.pick({
    _id: true,
    statement: true,
    options: true,
    correctIndex: true

})

export type OptionType = z.infer<typeof optionSchema>
export type Question = z.infer<typeof questionSchema>
export type QuestionFormData = Pick<Question, "statement" | "options" | "correctIndex">
export type QuestionQuiz = z.infer<typeof questionQuizSchema>

/* Quizzes */

export const quizSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    manager: z.string(),
    questions: z.array(questionQuizSchema),
    time: z.number(),
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
    time: true
})

export const solvableQuizSchema = quizSchema.pick({
    name: true,
    description: true,
    questions: true,
    time: true
})

export type SolvableQuiz = z.infer<typeof solvableQuizSchema>
export type Quiz = z.infer<typeof quizSchema>
export type QuizFormData = Pick<Quiz, "name" | "description" | "time">
export type QuizTimeData = Pick<Quiz, "time">
export type QuizTimeModal = Pick<Quiz, "_id" | "time">