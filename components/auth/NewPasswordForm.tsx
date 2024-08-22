import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updatePasswordWithToken } from "@/services/AuthAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import SubmitInput from "../form/input/SubmitInput";
import Form from '@/components/form/Form';
import Input from "../form/input/Input";
import Eye from "../form/input/Eye";

type NewPasswordFormProps = {
    token: ConfirmToken["token"]
}

export default function NewPasswordForm({token}: NewPasswordFormProps) {
    const router = useRouter()
    const [showPass, setShowPass] = useState(false)
    const [showPassConfirm, setShowPassConfirm] = useState(false)
    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors }, trigger } = useForm({ defaultValues: initialValues });

    const { mutate, isPending } = useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            router.push("/auth/login")
        }
      })


    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            formData,
            token
        }
        mutate(data)
    }

    const password = watch('password');

    const handlePasswordMatch = (value: unknown) => value === password || "Los Passwords no son iguales"

    return (
      <>
        <Form onSubmit={handleSubmit(handleNewPassword)}>
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
          <SubmitInput isLoading={isPending} value="Establecer Password" />
        </Form>
      </>
    );
}