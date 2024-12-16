import { z } from "zod"

/* Curriculums */

const bodyObjectSchema = z.object({
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
})

const sideObjectSchema = z.object({
    title: z.object({
        text: z.string(),
        nameIcon: z.string(),
        classNameIcon: z.string()
    }),
    info: z.array(z.object({
        main: z.string(),
        icon: z.object({
            nameIcon: z.string(),
            classNameIcon: z.string()
        }),
        aux: z.string().optional(),
        bar: z.string().optional(),
        mainType: z.number()

    }))
})

const headerSchema = z.object({
    name: z.string(),
    data: z.string(),
    birthday: z.string(),
    imageUrl: z.string()
})

export const curriculumContentSchema = z.object({
    body: z.array(bodyObjectSchema),
    header: headerSchema,
    side: z.array(sideObjectSchema)
})

export const curriculumSchema = z.object({
    _id: z.string(),
    manager: z.string().optional(),
    content: curriculumContentSchema
})

const fetchImage = z.object({
    image: z.instanceof(File),
    album: z.string()
})


export const editCurriculumSchema = curriculumSchema.pick({
    _id: true,
    content: true,
})


export type Curriculum = z.infer<typeof curriculumSchema>
export type CurriculumFormData = z.infer<typeof curriculumContentSchema>
export type CurriculumImageFormData = z.infer<typeof fetchImage>