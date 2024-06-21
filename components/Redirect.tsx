"use client"
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function Redirect() {
    const router = useRouter()
    const { isError } = useAuth()
    const token = localStorage.getItem("AUTH_TOKEN")

     // La doble condición evita comportamientos extraños cuando asincronamente aún no se haya
     // actualizado el isError a false pero sí haya token (al hacer login)
    if(isError && !token) {
        router.push("/auth/login")
    }
  return null
}
