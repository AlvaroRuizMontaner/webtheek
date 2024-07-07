import { useForm } from 'react-hook-form';
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { authenticateUser } from '@/services/AuthAPI';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function LoginView() {
  const router = useRouter()

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: () => {
        router.push("/")
    }
  })


  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <>
      <h1 className="font-black text-white text-2xl md:headline lg:headline-lg">iniciar sesión</h1>
      <p className="font-light text-white my-5 text-lg md:body lg:body-lg">
        comienza a planear tus proyectos {''}
        <span className=" text-fuchsia-500 font-bold"> iniciando sesión en este formulario</span>
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-8 lg:p-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
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

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-secondary hover:bg-info w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link 
            className='text-center text-gray-300 font-normal'
            href={"/auth/register"}
        >¿No tienes una cuenta? <span className='text-highlight'>Crear cuenta</span>
        </Link>
        <Link 
            className='text-center text-gray-300 font-normal'
            href={"/auth/forgot-password"}
        >¿Olvidaste tu contraseña? Restablecer
        </Link>
      </nav>
    </>
  )
}