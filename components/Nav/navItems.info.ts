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
        name: "Mis proyectos",
        url: "projects"
    },
    {
        name: "Cerrar sesión"
    }
]