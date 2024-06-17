import { z } from "zod"

const taskStatus = {
    PENDING: "pending",
    ON_HOLD: "onHold",
    IN_PROGRESS: "inProgress",
    UNDER_REVIEW: "underReview",
    COMPLETED: "completed"
} as const
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus];

/* Tasks */
export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, "name" | "description">


/* Projects */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string()
})

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    })
)

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, "clientName" | "projectName" | "description">