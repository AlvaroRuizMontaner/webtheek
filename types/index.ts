import { z } from "zod"

/* Auth & Users */
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    planType: z.string(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, "email" | "password">
export type UserRegistrationForm = Pick<Auth, "name" | "email" | "password" | "password_confirmation">
export type RequestConfirmationCodeForm = Pick<Auth,  "email">
export type ForgotPasswordForm = Pick<Auth, "email">
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">
export type UpdateCurrentPasswordForm = Pick<Auth, "current_password" | "password" | "password_confirmation">
export type ConfirmToken = Pick<Auth, "token">
export type checkPasswordForm = Pick<Auth, "password">

export const taskStatusSchema = z.enum(["backlog", "pending", "onHold", "inProgress", "underReview", "completed"])
export type TaskStatus = z.infer<typeof taskStatusSchema>

/*     const taskStatus = {
        PENDING: "pending",
        ON_HOLD: "onHold",
        IN_PROGRESS: "inProgress",
        UNDER_REVIEW: "underReview",
        COMPLETED: "completed"
    } as const */
//export type TaskStatus = typeof taskStatus[keyof typeof taskStatus];

/* Users */
export const userSchema = authSchema.pick({
    name: true,
    email: true,
    planType: true
}).extend({
    _id: z.string()
})

export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, "name" | "email">

/* Notes */
const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string(),
    createdAt: z.string()
})
export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, "content">

/* Tasks */
export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema,
        status: taskStatusSchema
    })), // El or se usa para que pase la validacion si el status es pending y por tanto completedBy es null
    //completedBy: userSchema.or(z.null()), // El or se usa para que pase la validacion si el status es pending y por tanto completedBy es null
    notes: z.array(noteSchema/* .extend({createdBy: userSchema}) */),
    createdAt: z.string(),
    updatedAt: z.string()
})

export const taskProjectSchema = taskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status: true

})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, "name" | "description">
export type TaskProject = z.infer<typeof taskProjectSchema>


/* Projects */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(), //z.string(userSchema.pick({ _id: true }))
    tasks: z.array(taskProjectSchema),
    team: z.array(z.object({
        user: z.string(),
        permissionLevel: z.number()
    }))
    //team: z.array(z.string(userSchema.pick({_id: true})))
})

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true
    })
)

export const editProjectSchema = projectSchema.pick({
    projectName: true,
    clientName: true,
    description: true,
})

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, "clientName" | "projectName" | "description">


/* Team */
const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true
})

export const userTeamSchema = z.object({
    user: teamMemberSchema,
    permissionLevel: z.number()
})
export type ToolType = "projects" | "quizzes"


export const teamMembersSchema = z.array(userTeamSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, "email">
