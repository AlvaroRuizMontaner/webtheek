import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/services/AuthAPI";
import { toast } from "react-toastify";
import { useState } from "react";
import SubmitInput from "@/components/form/input/SubmitInput";
import Form from '@/components/form/Form';
import Title from "@/components/title/Title";
import Subtitle from "@/components/title/Subtitle";
import { registerAuthLinks } from "@/components/form/authLinks/authLinks.info";
import AuthLinks from "@/components/form/authLinks/AuthLinks";
import Input from "@/components/form/input/Input";
import Eye from "@/components/form/input/Eye";

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

  const handlePasswordMatch = (value: unknown) => value === password || "Los Passwords no son iguales"

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
              placeholder="Email de registro"
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
              placeholder="Nombre de registro"
              register={register}
              errors={errors}
              trigger={trigger}
              required="El Nombre de usuario es obligatorio"
            />
            <Input
              label="Password"
              name="password"
              id="password"
              type={showPass ? "text" : "password"}
              placeholder="Password de registro"
              register={register}
              errors={errors}
              trigger={trigger}
              required="El Password es obligatorio"
              minLength={{
                value: 8,
                message: "El Password debe ser mínimo de 8 caracteres",
              }}
            >
              <Eye showPass={showPass} setShowPass={setShowPass} />
            </Input>
            <Input
              label="Repetir Password"
              name="password_confirmation"
              id="password_confirmation"
              type={showPassConfirm ? "text" : "password"}
              placeholder="Repite password de registro"
              register={register}
              errors={errors}
              trigger={trigger}
              required="Repetir Password es obligatorio"
              validate={handlePasswordMatch}
              minLength={{
                value: 8,
                message: "El Password debe ser mínimo de 8 caracteres",
              }}
            >
              <Eye showPass={showPassConfirm} setShowPass={setShowPassConfirm} />
            </Input>
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