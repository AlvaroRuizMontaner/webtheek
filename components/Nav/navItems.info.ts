export type NavItem = {
    name: string
    url?: string
    subItems?: {
        name: string
        url: string
    }
}

export const navItemsInfo: NavItem[] = [
    {
        name: "Perfil",
        url: "profile"
    },
    {
        name: "Proyectos",
        url: "projects"
    },
    {
        name: "Quizzes",
        url: "quizzes"
    },
    {
        name: "Curriculums",
        url: "curriculums"
    },
    {
        name: "Cerrar sesión"
    }
]