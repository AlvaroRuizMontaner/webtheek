import AuthLinks from "@/components/form/authLinks/AuthLinks";
import { confirmAccountLinks } from "@/components/form/authLinks/authLinks.info";
import Subtitle from "@/components/title/Subtitle";
import Title from "@/components/title/Title";
import { confirmAccount } from "@/services/AuthAPI";
import { ConfirmToken } from "@/types";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const router = useRouter()

    const [token, setToken] = useState<ConfirmToken["token"]>("")

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            router.push("/auth/login")
        }
    })

    const handleChange = (token: ConfirmToken["token"]) => {
        setToken(token)
    }

    const handleComplete = (token: ConfirmToken["token"]) => mutate({token})

  return (
    <>
      <Title>Confirma tu Cuenta</Title>
      <Subtitle
        text={"Ingresa el código que recibiste"}
        highlight="por e-mail"
      />

      <form
        className="space-y-8 p-4 sm:p-10 bg-white rounded-md max-w-min mx-auto"
      >
        <label
          className="font-normal body1 text-center block"
        >Código de 6 dígitos</label>

        <div className="flex justify-center gap-5">
            <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                <PinInputField className="w-7 sm:w-10 h-7 sm:h-10 p-1 sm:p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
                <PinInputField className="w-7 sm:w-10 h-7 sm:h-10 p-1 sm:p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
                <PinInputField className="w-7 sm:w-10 h-7 sm:h-10 p-1 sm:p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
                <PinInputField className="w-7 sm:w-10 h-7 sm:h-10 p-1 sm:p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
                <PinInputField className="w-7 sm:w-10 h-7 sm:h-10 p-1 sm:p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
                <PinInputField className="w-7 sm:w-10 h-7 sm:h-10 p-1 sm:p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
            </PinInput>
        </div>

      </form>

      <AuthLinks variant="underline" info={confirmAccountLinks} />
    </>
  )
}