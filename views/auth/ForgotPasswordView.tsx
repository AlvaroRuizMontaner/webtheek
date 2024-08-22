import { useForm } from "react-hook-form";
import { ForgotPasswordForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/services/AuthAPI";
import { toast } from "react-toastify";
import SubmitInput from "@/components/form/input/SubmitInput";
import Form from '@/components/form/Form';
import AuthLinks from "@/components/form/authLinks/AuthLinks";
import { forgotPasswordLinks } from "@/components/form/authLinks/authLinks.info";
import Input from "@/components/form/input/Input";
import Title from "@/components/title/Title";
import Subtitle from "@/components/title/Subtitle";

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
      <Title>Restablecer Password</Title>
      <Subtitle
        text={"¿Olvidaste tu password? coloca tu email"}
        highlight="y restablece tu password"
      />

      <Form onSubmit={handleSubmit(handleForgotPassword)}>
        <Input
          label="Email"
          name="email"
          id="email"
          placeholder="Email"
          register={register}
          errors={errors}
          required="El Email es obligatorio"
          pattern={{
            value: /\S+@\S+\.\S+/,
            message: "E-mail no válido",
          }}
        />
        <SubmitInput isLoading={isPending} value="Enviar Instrucciones" />
      </Form>

      <AuthLinks info={forgotPasswordLinks} />
    </>
  );
}