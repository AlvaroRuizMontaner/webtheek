import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { RequestConfirmationCode } from "@/services/AuthAPI";
import { toast } from "react-toastify";
import SubmitInput from "@/components/form/input/SubmitInput";

export default function RegisterView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate, isPending } = useMutation({
        mutationFn: RequestConfirmationCode,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
        }
      })

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData)

    return (
      <>
        <h1 className="headline1 font-black text-white">
          Solicitar Código de Confirmación
        </h1>
        <p className="text-2xl font-light text-white mt-5">
          Coloca tu e-mail para recibir {""}
          <span className=" text-accent-300 font-bold"> un nuevo código</span>
        </p>

        <form
          onSubmit={handleSubmit(handleRequestCode)}
          className="space-y-8 p-10 rounded-lg bg-white mt-10"
          noValidate
        >
          <div className="flex flex-col gap-5">
            <label className="font-normal text-2xl" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="w-full p-3 rounded-lg border-gray-300 border"
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

{/*           <div className="bg-accent-500 hover:bg-accent-700 w-full flex justify-center h-[52px] text-white font-black text-xl cursor-pointer relative">
            {!isPending ? <input
            type="submit"
            value="Enviar Código"
            className="block w-full h-full p-3 cursor-pointer"
            /> : <Spinner />}
          </div> */}
          <SubmitInput isLoading={isPending} value="Enviar Código" />
        </form>

        <nav className="mt-10 flex flex-col space-y-4 body2">
          <div className="text-gray-300 flex gap-1 justify-center">
            <span>¿Ya tienes cuenta?</span>
            <Link
              href="/auth/login"
              className="text-center font-bold text-accent-300"
            >
              Iniciar Sesión
            </Link>
          </div>
          <div className="text-gray-300 flex gap-1 justify-center">
            <span>¿Olvidaste tu contraseña?</span>
            <Link
              href="/auth/forgot-password"
              className="text-center font-bold text-accent-300"
            >
              Reestablecer
            </Link>
          </div>
        </nav>
      </>
    );
}