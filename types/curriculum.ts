import { z } from "zod"

/* Curriculums */

export const curriculumContentSchema = z.array(z.object({
    title: z.object({
        text: z.string(),
        nameIcon: z.string(),
        classNameIcon: z.string()
    }),
    info: z.array(z.object({
        main: z.string(),
        detail: z.string().optional(),
        date: z.string().optional(),
        list: z.array(z.string()).optional()
    }))
}))

export const curriculumSchema = z.object({
    _id: z.string(),
    manager: z.string().optional(),
    content: curriculumContentSchema
})


export const editCurriculumSchema = curriculumSchema.pick({
    _id: true,
    content: true,
})


export type Curriculum = z.infer<typeof curriculumSchema>
export type CurriculumFormData = z.infer<typeof curriculumContentSchema>