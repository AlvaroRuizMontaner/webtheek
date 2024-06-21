import { getUser } from "@/services/AuthAPI"
import { useQuery } from "@tanstack/react-query"


export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false // Evita hacer nuevas peticiones al cambiar de pestaña
    })

    return { data, isError, isLoading }
}