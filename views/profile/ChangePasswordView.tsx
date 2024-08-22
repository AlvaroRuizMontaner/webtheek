import { useForm } from "react-hook-form";
import { UpdateCurrentPasswordForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/services/ProfileAPI";
import { toast } from "react-toastify";
import { useState } from "react";
import SubmitInput from "@/components/form/input/SubmitInput";
import Input from "@/components/form/input/Input";
import Eye from "@/components/form/input/Eye";
import Form from "@/components/form/Form";
import Title from "@/components/title/Title";
import Subtitle from "@/components/title/Subtitle";

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

  const handlePasswordMatch = (value: unknown) => value === password || "Los Passwords no son iguales"

  const handleChangePassword = (formData: UpdateCurrentPasswordForm) => mutate(formData)

  return (
    <>
      <div className="mx-auto max-w-3xl">

        <Title variant="dark">Cambiar password</Title>
        <Subtitle
          variant="dark"
          text={"Utiliza este formulario para cambiar"}
          highlight="tu password"
        />

        <Form onSubmit={handleSubmit(handleChangePassword)}>
          <Input
            label="Password actual"
            name="current_password"
            id="current_password"
            type={showCurrentPass ? "text" : "password"}
            placeholder="Password actual"
            register={register}
            errors={errors}
            trigger={trigger}
            required="El password actual es obligatorio"
          >
            <Eye showPass={showCurrentPass} setShowPass={setShowCurrentPass} />
          </Input>

          <Input
            label="Nuevo password"
            name="password"
            id="password"
            type={showPass ? "text" : "password"}
            placeholder="Nuevo password"
            register={register}
            errors={errors}
            trigger={trigger}
            required="El nuevo password es obligatorio"
            minLength={{
              value: 8,
              message: "El Password debe ser mínimo de 8 caracteres",
            }}
          >
            <Eye showPass={showPass} setShowPass={setShowPass} />
          </Input>

          <Input
            label="Repetir password"
            name="password_confirmation"
            id="password_confirmation"
            type={showPassConfirm ? "text" : "password"}
            placeholder="Repetir password"
            register={register}
            errors={errors}
            trigger={trigger}
            required="Este campo es obligatorio"
            validate={handlePasswordMatch}
          >
            <Eye showPass={showPassConfirm} setShowPass={setShowPassConfirm} />
          </Input>
          <SubmitInput isLoading={isPending} value="Cambiar password" />
        </Form>

        <section className="mt-6u"></section>
      </div>
    </>
  );
}