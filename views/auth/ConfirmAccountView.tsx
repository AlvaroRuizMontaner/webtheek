import { confirmAccount } from "@/services/AuthAPI";
import { ConfirmToken } from "@/types";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
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
      <h1 className="headline2 font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {''}
        <span className=" text-accent-300 font-bold"> por e-mail</span>
      </p>
      <form
        className="space-y-8 p-4 sm:p-10 bg-white mt-10 rounded-md max-w-min mx-auto"
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

      <nav className="mt-10 flex flex-col space-y-4 body2">
        <Link
          href='/auth/request-code'
          className="text-center text-accent-300 underline font-bold body2"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>

    </>
  )
}