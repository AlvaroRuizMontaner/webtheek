import { useForm } from 'react-hook-form';
import { UserLoginForm } from "@/types/index";
import { useMutation } from '@tanstack/react-query';
import { authenticateUser } from '@/services/AuthAPI';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SubmitInput from '@/components/form/input/SubmitInput';
import Form from '@/components/form/Form';
import Subtitle from '@/components/title/Subtitle';
import Title from '@/components/title/Title';
import AuthLinks from '@/components/form/authLinks/AuthLinks';
import { loginAuthLinks } from '@/components/form/authLinks/authLinks.info';
import Input from '@/components/form/input/Input';
import Eye from '@/components/form/input/Eye';

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

        <Input
          label="Password"
          name="password"
          id="password"
          type={showPass ? "text" : "password"}
          placeholder="Password de login"
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
        <SubmitInput isLoading={isPending} value="Iniciar sesión" />
      </Form>

      <AuthLinks info={loginAuthLinks} />
    </>
  );
}