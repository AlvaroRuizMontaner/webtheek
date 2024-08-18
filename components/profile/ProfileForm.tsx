import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { User, UserProfileForm } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/services/ProfileAPI"
import { toast } from "react-toastify"
import SubmitInput from "../form/input/SubmitInput"

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
                <h1 className="headline1 font-black ">Mi perfil</h1>
                <p className="body1 font-light text-gray-500 mt-5">Aquí puedes actualizar tu información</p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full p-3  border border-gray-200"
                            {...register("name", {
                                required: "Nombre de usuario es obligatoro",
                            })}
                            onBlur={() => {
                                trigger('name'); // Ejecuta la validación manualmente
                            }}
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >E-mail</label>
                        <input
                            id="text"
                            type="email"
                            placeholder="Tu Email"
                            className="w-full p-3  border border-gray-200"
                            {...register("email", {
                                required: "EL e-mail es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })}
                            onBlur={() => {
                                trigger('email'); // Ejecuta la validación manualmente
                              }}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>
{/*                     <div className="bg-accent-500 hover:bg-accent-700 w-full flex justify-center h-[52px] text-white font-black text-xl cursor-pointer relative">
                        {!isPending ? <input
                        type="submit"
                        value='Guardar Cambios'
                        className="block w-full h-full p-3 cursor-pointer"
                        /> : <Spinner />}
                    </div> */}
                    <SubmitInput isLoading={isPending} value="Guardar cambios" />
                </form>
            </div>
        </>
    )
}