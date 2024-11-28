import { z } from "zod"

/* Curriculums */

export const curriculumSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    manager: z.string().optional(),
})


export const editCurriculumSchema = curriculumSchema.pick({
    name: true,
    description: true,
})


export type Curriculum = z.infer<typeof curriculumSchema>
export type CurriculumFormData = Pick<Curriculum, "name" | "description">