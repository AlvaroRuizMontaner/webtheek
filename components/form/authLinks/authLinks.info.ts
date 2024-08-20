import { AuthLink } from "./AuthLinks";


export const registerAuthLinks: AuthLink[] = [
    {
      text: "¿Ya tienes cuenta?",
      linkText: "Iniciar sesión",
      href: "/auth/login"
    },
    {
      text: "¿Olvidaste tu contraseña?",
      linkText: "Restablecer",
      href: "/auth/forgot-password"
    },
]

export const loginAuthLinks: AuthLink[] = [
    {
      text: "¿No tienes una cuenta?",
      linkText: "Crear cuenta",
      href: "/auth/register"
    },
    {
      text: "¿Olvidaste tu contraseña?",
      linkText: "Restablecer",
      href: "/auth/forgot-password"
    },
]