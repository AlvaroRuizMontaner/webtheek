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

export const requestNewCodeLinks: AuthLink[] = registerAuthLinks


export const forgotPasswordLinks: AuthLink[] = [
  {
    text: "¿Ya tienes cuenta?",
    linkText: "Iniciar sesión",
    href: "/auth/login"
  },
  {
    text: "¿No tienes cuenta?",
    linkText: "Crear cuenta",
    href: "/auth/register"
  },
]

export const confirmAccountLinks: AuthLink[] = [
  {
    linkText: "Solicitar un nuevo código",
    href: "/auth/request-code"
  },
]
export const newPasswordTokenLinks: AuthLink[] = [
  {
    linkText: "Solicitar un nuevo código",
    href: "/auth/forgot-password"
  },
]