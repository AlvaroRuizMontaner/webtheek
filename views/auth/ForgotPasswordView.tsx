import { useForm } from "react-hook-form";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/services/AuthAPI";
import { toast } from "react-toastify";
import SubmitInput from "@/components/form/input/SubmitInput";
import Form from '@/components/form/Form';

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
        reset()
    }
  })
  
  const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)


  return (
    <>
      <h1 className="text-5xl font-black text-white">Restablecer Password</h1>
      <p className="text-2xl font-light text-white mt-5">
        ¿Olvidaste tu password? coloca tu email {''}
        <span className=" text-fuchsia-500 font-bold"> y restablece tu password</span>
      </p>

      <Form
        onSubmit={handleSubmit(handleForgotPassword)}
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
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
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>
        <SubmitInput isLoading={isPending} value="Enviar Instrucciones" />
      </Form>

      <nav className="mt-10 flex flex-col space-y-4">


        <div className="text-gray-300 flex gap-1 justify-center body2">
            <span>¿Ya tienes cuenta?</span>
            <Link
              href="/auth/login"
              className="text-center font-bold text-accent-300"
            >
              Iniciar Sesión
            </Link>
          </div>
          <div className="text-gray-300 flex gap-1 justify-center">
            <span>¿No tienes cuenta?</span>
            <Link
              href="/auth/register"
              className="text-center font-bold text-accent-300"
            >
              Crear cuenta
            </Link>
          </div>
      </nav>
    </>
  )
}