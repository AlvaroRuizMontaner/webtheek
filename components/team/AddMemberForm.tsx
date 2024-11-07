import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { Project, TeamMemberForm } from "@/types";
import { findUserByEmail } from "@/services/TeamAPI";
import SearchResult from "./SearchResult";
import SubmitInput from "../form/input/SubmitInput";

type AddMemberFormProps = {
    projectId: Project["_id"]
}

export default function AddMemberForm({projectId}: AddMemberFormProps) {
    const initialValues: TeamMemberForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: findUserByEmail
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = {projectId, formData}
        mutation.mutate(data)
    }

    const resetData = () => {
        reset()
        mutation.reset()
    }

    return (
        <>

            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="name"
                    >E-mail de Usuario</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="E-mail del usuario a Agregar"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

{/*                 <div className="bg-accent.500 hover:bg-accent-700 w-full flex justify-center h-[52px] text-white font-black text-xl cursor-pointer relative">
                    {!mutation.isPending ? <input
                    type="submit"
                    value='Buscar Usuario'
                    className="block w-full h-full p-3 cursor-pointer"
                    /> : <Spinner />}
                </div> */}
                <SubmitInput isLoading={mutation.isPending} value="Buscar Usuario" />
            </form>

            <div className="mt-10">
                {mutation.isPending && <p className="text-center">Cargando...</p>}
                {mutation.error && <p className="text-center">{mutation.error.message}</p>}
                {mutation.data && <SearchResult projectId={projectId} user={mutation.data} reset={resetData}/>}
            </div>
        </>
    )
}