import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { RequestConfirmationCode } from "@/services/AuthAPI";
import { toast } from "react-toastify";
import SubmitInput from "@/components/form/input/SubmitInput";
import Form from '@/components/form/Form';
import Input from "@/components/form/input/Input";
import Title from "@/components/title/Title";
import Subtitle from "@/components/title/Subtitle";
import AuthLinks from "@/components/form/authLinks/AuthLinks";
import { requestNewCodeLinks } from "@/components/form/authLinks/authLinks.info";

export default function RequestNewCodeView() {
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
        <Title>Solicitar Código de Confirmación</Title>
        <Subtitle
          text={"Coloca tu e-mail para recibir"}
          highlight="un nuevo código"
        />

        <Form onSubmit={handleSubmit(handleRequestCode)}>
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
          <SubmitInput isLoading={isPending} value="Enviar Código" />
        </Form>

        <AuthLinks info={requestNewCodeLinks} />
      </>
    );
}