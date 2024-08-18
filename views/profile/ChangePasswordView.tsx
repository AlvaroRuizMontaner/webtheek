import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import { UpdateCurrentPasswordForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/services/ProfileAPI";
import { toast } from "react-toastify";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import SubmitInput from "@/components/form/input/SubmitInput";

export default function ChangePasswordView() {
  const [showCurrentPass, setShowCurrentPass] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showPassConfirm, setShowPassConfirm] = useState(false)
  const initialValues: UpdateCurrentPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, watch, reset, formState: { errors }, trigger } = useForm({ defaultValues: initialValues })

  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
        reset()
    }
})

  const password = watch('password');

  const handleChangePassword = (formData: UpdateCurrentPasswordForm) => mutate(formData)

  return (
    <>
      <div className="mx-auto max-w-3xl">

        <h1 className="text-5xl font-black ">Cambiar Password</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Utiliza este formulario para cambiar tu password</p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="current_password"
            >Password Actual</label>
            <div className='relative'>
              <input
                id="current_password"
                type={showCurrentPass ? "text": "password"}
                placeholder="Password Actual"
                className="w-full p-3 border border-gray-200"
                {...register("current_password", {
                  required: "El password actual es obligatorio",
                })}
                onBlur={() => {
                  trigger('current_password'); // Ejecuta la validación manualmente
                }}
              />
              {showCurrentPass && <span onClick={() => setShowCurrentPass(false)} className='absolute right-4 top-1/2 -translate-y-1/2 inline-block cursor-pointer'><EyeIcon className='w-8 h-8 text-gray-500 ' /></span>}
              {!showCurrentPass && <span  onClick={() => setShowCurrentPass(true)} className='absolute right-4 top-1/2 -translate-y-1/2 inline-block cursor-pointer'><EyeSlashIcon className='w-8 h-8 text-gray-500 ' /></span>}
            </div>
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="password"
            >Nuevo Password</label>
            <div className='relative'>
              <input
                id="password"
                type={showPass ? "text": "password"}
                placeholder="Nuevo Password"
                className="w-full p-3 border border-gray-200"
                {...register("password", {
                  required: "El Nuevo Password es obligatorio",
                  minLength: {
                    value: 8,
                    message: 'El Password debe ser mínimo de 8 caracteres'
                  }
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
          <div className="mb-5 space-y-3">
            <label
              htmlFor="password_confirmation"
              className="text-sm uppercase font-bold"
            >Repetir Password</label>
            <div className='relative'>
              <input
                id="password_confirmation"
                type={showPassConfirm ? "text": "password"}
                placeholder="Repetir Password"
                className="w-full p-3 border border-gray-200"
                {...register("password_confirmation", {
                  required: "Este campo es obligatorio",
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

{/*           <div className="bg-accent-500 hover:bg-accent-700 w-full flex justify-center h-[52px] text-white font-black text-xl cursor-pointer relative">
            {!isPending ? <input
            type="submit"
            value='Cambiar Password'
            className="block w-full h-full p-3 cursor-pointer"
            /> : <Spinner />}
          </div> */}
          <SubmitInput isLoading={isPending} value="Cambiar Password" />
        </form>
      </div>
    </>
  )
}