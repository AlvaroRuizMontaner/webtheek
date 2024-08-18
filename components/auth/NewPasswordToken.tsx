import { validateToken } from '@/services/AuthAPI';
import { ConfirmToken } from '@/types';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { toast } from 'react-toastify';

type NewPasswordTokenProps = {
    token: ConfirmToken["token"]
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({token, setToken, setIsValidToken}: NewPasswordTokenProps) {

    const mutation = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
            setIsValidToken(true);
        }
      })

    const handleChange = (token: ConfirmToken["token"]) => {
        setToken(token)
    }
    const handleComplete = (token: ConfirmToken["token"]) => mutation.mutate({token})

/*     useEffect(() => {
        if (mutation.isSuccess) setIsValidToken(true);
     }, [mutation]); */

    return (
        <>
            <form
                className="space-y-8 p-4 sm:p-10 rounded-lg bg-white mt-10 max-w-min mx-auto"
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
            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    href='/auth/forgot-password'
                    className="text-center text-accent-300 underline font-bold"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
    )
}