import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/services/AuthAPI";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import SubmitInput from "@/components/form/input/SubmitInput";
import Form from '@/components/form/Form';
import Title from "@/components/title/Title";
import Subtitle from "@/components/title/Subtitle";
import { registerAuthLinks } from "@/components/form/authLinks/authLinks.info";
import AuthLinks from "@/components/form/authLinks/AuthLinks";
import Input from "@/components/form/input/Input";

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
      {!isSubmitted ? (
        <>
          <Title>Crear cuenta</Title>
          <Subtitle
            text={"Llena el formulario para"}
            highlight="crear una cuenta"
          />
          <Form onSubmit={handleSubmit(handleRegister)}>
            <Input
              label="Email"
              name="email"
              id="email"
              placeholder="Email de Registro"
              register={register}
              errors={errors}
              trigger={trigger}
              required="El Email de registro es obligatorio"
              pattern={{
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              }}
            />
            <Input
              label="Nombre"
              name="name"
              id="name"
              placeholder="Nombre de Registro"
              register={register}
              errors={errors}
              trigger={trigger}
              required="El Nombre de usuario es obligatorio"
            />
            <div className="flex flex-col gap-5">
              <label className="font-bold body1 text-primary-500">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password de Registro"
                  className="w-full p-3 border-gray-300 border"
                  {...register("password", {
                    required: "El Password es obligatorio",
                    minLength: {
                      value: 8,
                      message: "El Password debe ser mínimo de 8 caracteres",
                    },
                  })}
                />
                {showPass && (
                  <span
                    onClick={() => setShowPass(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 inline-block cursor-pointer"
                  >
                    <EyeIcon className="w-8 h-8 text-gray-500 " />
                  </span>
                )}
                {!showPass && (
                  <span
                    onClick={() => setShowPass(true)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 inline-block cursor-pointer"
                  >
                    <EyeSlashIcon className="w-8 h-8 text-gray-500 " />
                  </span>
                )}
              </div>
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>

            <div className="flex flex-col gap-5">
              <label className="font-bold body1 text-primary-500">
                Repetir Password
              </label>
              <div className="relative">
                <input
                  id="password_confirmation"
                  type={showPassConfirm ? "text" : "password"}
                  placeholder="Repite Password de Registro"
                  className="w-full p-3 border-gray-300 border"
                  {...register("password_confirmation", {
                    required: "Repetir Password es obligatorio",
                    validate: (value) =>
                      value === password || "Los Passwords no son iguales",
                  })}
                  onBlur={() => {
                    trigger("password_confirmation"); // Ejecuta la validación manualmente
                  }}
                />
                {showPassConfirm && (
                  <span
                    onClick={() => setShowPassConfirm(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 inline-block cursor-pointer"
                  >
                    <EyeIcon className="w-8 h-8 text-gray-500 " />
                  </span>
                )}
                {!showPassConfirm && (
                  <span
                    onClick={() => setShowPassConfirm(true)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 inline-block cursor-pointer"
                  >
                    <EyeSlashIcon className="w-8 h-8 text-gray-500 " />
                  </span>
                )}
              </div>

              {errors.password_confirmation && (
                <ErrorMessage>
                  {errors.password_confirmation.message}
                </ErrorMessage>
              )}
            </div>
            <SubmitInput isLoading={isLoading} value="Registrarme" />
          </Form>
          <AuthLinks info={registerAuthLinks} />
        </>
      ) : (
        <div className="space-y-8 p-7 sm:p-10 bg-white mt-10 flex justify-center items-center flex-col rounded-2xl">
          <p className="text-center text-primary-900 headline2 font-bold ">
            Cuenta creada
          </p>
          <p className="text-gray-900">
            Tu cuenta ha sido creada con éxito, pero ahora necesitamos que la
            confirmes revisando la información que hemos enviado a tu{" "}
            <span className="font-bold text-accent-500">email</span>
          </p>
        </div>
      )}
    </>
  );
}