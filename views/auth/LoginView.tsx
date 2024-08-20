import { useForm } from 'react-hook-form';
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from '@tanstack/react-query';
import { authenticateUser } from '@/services/AuthAPI';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import SubmitInput from '@/components/form/input/SubmitInput';
import Form from '@/components/form/Form';
import Subtitle from '@/components/title/Subtitle';
import Title from '@/components/title/Title';
import AuthLinks from '@/components/form/authLinks/AuthLinks';
import { loginAuthLinks } from '@/components/form/authLinks/authLinks.info';
import Input from '@/components/form/input/Input';

export default function LoginView() {
  const router = useRouter()
  const [showPass, setShowPass] = useState(false)

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors }, trigger } = useForm({ defaultValues: initialValues })

  const { mutate, isPending } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: () => {
        router.push("/")
    }
  })


  const handleLogin = (formData: UserLoginForm) => {
    console.log(isPending)
    mutate(formData)

  }

  return (
    <>
      <Title>Iniciar sesión</Title>
      <Subtitle
        text="Prosigue tu aventura en Webtheek"
        highlight="iniciando sesión en este formulario"
      />

      <Form onSubmit={handleSubmit(handleLogin)}>
        <Input
          label="Email"
          name="email"
          id="email"
          placeholder="Email de login"
          register={register}
          errors={errors}
          trigger={trigger}
          required="El Email es obligatorio"
          pattern={{
            value: /\S+@\S+\.\S+/,
            message: "E-mail no válido",
          }}
        />

        <div className="flex flex-col gap-4u">
          <label className="font-bold body1 text-primary-500">Password</label>

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password de login"
              className="w-full p-3 border-gray-300 border"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
              onBlur={() => {
                trigger("password"); // Ejecuta la validación manualmente
              }}
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
        <SubmitInput isLoading={isPending} value="Iniciar sesión" />
      </Form>

      <AuthLinks info={loginAuthLinks} />
    </>
  );
}