import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/services/AuthAPI";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import SubmitInput from "@/components/form/input/SubmitInput";

export default function RegisterView() {
  const [showPass, setShowPass] = useState(false)
  const [showPassConfirm, setShowPassConfirm] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors }, trigger } = useForm<UserRegistrationForm>({ defaultValues: initialValues });


  const { mutateAsync } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
        toast.error(error.message)
        setIsLoading(false)
    },
    onSuccess: () => {
        reset()
        setIsLoading(false)
    }
  })

  const password = watch('password');

  const handleRegister = async (formData: UserRegistrationForm) => {
    setIsLoading(true)
    await mutateAsync(formData)
    setIsSubmitted(true)
  }

  return (
    <>
      <h1 className="headline1 font-black text-white">Crear Cuenta</h1>
      <p className="headline2 font-light text-white mt-5">
        Llena el formulario para {''}
        <span className=" text-secondary font-bold"> crear tu cuenta</span>
      </p>

      {!isSubmitted ? <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-bold headline3 text-primary"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email de registro es obligatorio",
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
          >Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
            onBlur={() => {
              trigger('name'); // Ejecuta la validación manualmente
            }}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
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
                minLength: {
                  value: 8,
                  message: 'El Password debe ser mínimo de 8 caracteres'
              }
              })}
            />
            {showPass && <span onClick={() => setShowPass(false)} className='absolute right-4 top-1/2 -translate-y-1/2 inline-block cursor-pointer'><EyeIcon className='w-8 h-8 text-gray-500 ' /></span>}
            {!showPass && <span  onClick={() => setShowPass(true)} className='absolute right-4 top-1/2 -translate-y-1/2 inline-block cursor-pointer'><EyeSlashIcon className='w-8 h-8 text-gray-500 ' /></span>}
          </div>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-bold headline3 text-primary"
          >Repetir Password</label>
          <div className='relative'>
            <input
              id="password_confirmation"
              type={showPassConfirm ? "text": "password"}
              placeholder="Repite Password de Registro"
              className="w-full p-3 border-gray-300 border"
              {...register("password_confirmation", {
                required: "Repetir Password es obligatorio",
                validate: value => value === password || 'Los Passwords no son iguales'
              })}
              onBlur={() => {
                trigger('password_confirmation'); // Ejecuta la validación manualmente
              }}
            />
            {showPassConfirm && <span onClick={() => setShowPassConfirm(false)} className='absolute right-4 top-1/2 -translate-y-1/2 inline-block cursor-pointer'><EyeIcon className='w-8 h-8 text-gray-500 ' /></span>}
            {!showPassConfirm && <span  onClick={() => setShowPassConfirm(true)} className='absolute right-4 top-1/2 -translate-y-1/2 inline-block cursor-pointer'><EyeSlashIcon className='w-8 h-8 text-gray-500 ' /></span>}
          </div>

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

{/*           <div className="bg-info hover:bg-dark-secondary w-full flex justify-center h-[52px] text-white font-black text-xl cursor-pointer relative">
            {!isLoading ? <input
            type="submit"
            value='Registrarme'
            className="block w-full h-full p-3 cursor-pointer"
            /> : <Spinner />}
          </div> */}
          <SubmitInput isLoading={isLoading} value="Registrarme" />
      </form> : (
        <div className="space-y-8 p-7 sm:p-10 bg-white mt-10 flex justify-center items-center flex-col rounded-2xl">
          <p className="text-center text-dark-secondary headline2 font-bold ">Cuenta creada</p>
          <p>Tu cuenta ha sido creada con éxito, pero ahora necesitamos que la confirmes revisando la información que hemos enviado a tu <span className="font-bold text-dark-primary">email</span></p>
        </div>
      )}

      <nav className="mt-10 flex flex-col space-y-4">
        <div className="text-gray-300 flex gap-1 justify-center">
            <span>¿Ya tienes cuenta?</span>
            <Link
              href={"/auth/login"}
              className="text-center font-normal text-tertiary underline"
            >
              Iniciar sesión
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