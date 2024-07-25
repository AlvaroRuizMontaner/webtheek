import { useForm } from 'react-hook-form';
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { authenticateUser } from '@/services/AuthAPI';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export default function LoginView() {
  const router = useRouter()
  const [showPass, setShowPass] = useState(false)

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors }, trigger } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: () => {
        router.push("/")
    }
  })


  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <>
      <h1 className="font-black text-white headline1">Iniciar sesión</h1>
      <p className="font-light text-white my-5 body1">
        Prosigue tu aventura en Webtheek {''}
        <span className=" text-secondary font-bold"> iniciando sesión en este formulario</span>
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-8 lg:p-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="headline3 text-primary font-bold"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
            onBlur={() => {
              trigger('email'); // Ejecuta la validación manualmente
            }}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-bold headline3 text-primary"
          >Password</label>

          <div className='relative'>
            <input
              type={showPass ? "text": "password"}
              placeholder="Password de Registro"
              className="w-full p-3 border-gray-300 border"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
              onBlur={() => {
                trigger('password'); // Ejecuta la validación manualmente
              }}
            />
           {showPass && <span onClick={() => setShowPass(false)} className='absolute right-4 top-1/2 -translate-y-1/2 inline-block cursor-pointer'><EyeIcon className='w-8 h-8 text-gray-500 ' /></span>}
            {!showPass && <span  onClick={() => setShowPass(true)} className='absolute right-4 top-1/2 -translate-y-1/2 inline-block cursor-pointer'><EyeSlashIcon className='w-8 h-8 text-gray-500 ' /></span>}
          </div>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-info hover:bg-dark-secondary w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <div className="text-gray-300 flex gap-1 justify-center">
            <span>¿No tienes una cuenta?</span>
            <Link
              href={"/auth/register"}
              className="text-center font-normal text-tertiary underline"
            >
              Crear cuenta
            </Link>
          </div>
          <div className="text-gray-300 flex gap-1 justify-center">
            <span>¿Olvidaste tu contraseña?</span>
            <Link
              href="/auth/forgot-password"
              className="text-center font-normal text-tertiary underline"
            >
              Restablecer
            </Link>
          </div>
      </nav>
    </>
  )
}