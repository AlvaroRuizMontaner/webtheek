import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useRouter } from "next/navigation";
import { updatePasswordWithToken } from "@/services/AuthAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import SubmitInput from "../form/input/SubmitInput";
import Form from '@/components/form/Form';

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

    return (
        <>
            <Form
                onSubmit={handleSubmit(handleNewPassword)}
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl text-primary-500 headline3"
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

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal body1 text-primary-500 headline3"
                    >Repetir Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className="w-full p-3 border-gray-300 border"
                        {...register("password_confirmation", {
                            required: "Repetir Password es obligatorio",
                            validate: value => value === password || 'Los Passwords no son iguales'
                        })}
                    />

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

{/*                 <input
                    type="submit"
                    value='Establecer Password'
                    className="bg-accent-500 hover:bg-accent-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                /> */}
                <SubmitInput isLoading={isPending} value="Establecer Password" />
            </Form>
        </>
    )
}