import { useForm } from "react-hook-form"
import { User, UserProfileForm } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/services/ProfileAPI"
import { toast } from "react-toastify"
import SubmitInput from "../form/input/SubmitInput"
import Form from "../form/Form"
import Title from "../title/Title"
import Subtitle from "../title/Subtitle"
import Input from "../form/input/Input"
import Separator from "../separator/Separator"

type ProfileFormProps = {
    data: User
}

export default function ProfileForm({ data }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors }, trigger, setError } = useForm<UserProfileForm>({ defaultValues: data })

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ["user"]})
        }
    })

    const handleEditProfile = (formData: UserProfileForm) => {
        console.log(data, formData)

        if((data.name === formData.name) && (data.email === formData.email)) {
            setError("email", { type: 'custom', message: 'El nombre y el email no han cambiado' })
        } else {
            mutate(formData)
        }
    }

    return (
      <>
        <div className="mx-auto max-w-3xl g">
          <Title variant="dark">Mi perfil</Title>
          <Subtitle
            variant="dark"
            text={"Aquí puedes actualizar"}
            highlight="tu información"
          />

          <Form onSubmit={handleSubmit(handleEditProfile)}
            className="shadow-y-4"
          >

          <Input
              label="Nombre"
              name="name"
              id="name"
              placeholder="Tu Nombre"
              register={register}
              errors={errors}
              trigger={trigger}
              required="El Nombre de usuario es obligatorio"
            />
          <Input
              label="Email"
              name="email"
              id="email"
              placeholder="Tu Email"
              register={register}
              errors={errors}
              trigger={trigger}
              required="El e-mail es obligatorio"
              pattern={{
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              }}
            />
            <SubmitInput isLoading={isPending} value="Guardar cambios" />
          </Form>

          <Separator />
        </div>
      </>
    );
}