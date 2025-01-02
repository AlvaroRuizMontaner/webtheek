import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { checkPasswordForm } from '@/types';
import { toast } from 'react-toastify';
import SubmitInput from '../form/input/SubmitInput';
import Subtitle from '../title/Subtitle';
import Title from '../title/Title';
import Input from '../form/input/Input';
import XMark from '../tasks/XMark/XMark';
import { useCheckPasswordMutation, useDeleteCurriculumMutation } from '@/redux/services/createApiCurriculum';

export default function DeleteCurriculumModal() {
    const [deleteCurriculum, { isLoading: isPendingDelete /* data, error , isFetching  */}] = useDeleteCurriculumMutation();
    const [checkPassword, { isLoading: isPendingPassword /* data, error , isFetching  */}] = useCheckPasswordMutation();
    const initialValues: checkPasswordForm = {
        password: ''
    }
    const path = usePathname()
    const router = useRouter()

    const params = useSearchParams()
    const deleteCurriculumId = params.get("deleteCurriculum")!

    const show = deleteCurriculumId ? true : false

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

/*     const checkPasswordMutation = useMutation({
        mutationFn: checkPassword,
        onError: (error) => toast.error(error.message)
    })

    const queryClient = useQueryClient()
    const deleteCurriculumMutation = useMutation({
        mutationFn: deleteCurriculum,
        onError: (error) => {
          toast.error(error.message)
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries({queryKey: ["curriculums"]})
          toast.success(data)
          router.push(path)
        }
      })

    const handleForm = async (formData: checkPasswordForm) => {
        await checkPasswordMutation.mutateAsync(formData)
        await deleteCurriculumMutation.mutateAsync(deleteCurriculumId)
    } */

    const handleForm = async (formData: checkPasswordForm) => {
        console.log(formData)
        try {
            await checkPassword(formData).unwrap();  // Esperar a que termine la mutación
            await deleteCurriculum({ curriculumId: deleteCurriculumId }).unwrap();  // Esperar a que termine la mutación
    
            // Manejo del éxito directo con el resultado de unwrap()
            localStorage.setItem('toastMessage', "Curriculum eliminado");
            router.push('/curriculums');
        } catch (err) {
            console.error("error")
            toast.error("No se ha podido eliminar");
        }
    };


    return (
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => router.push(path)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-8 sm:p-16">
                  <span
                    className="absolute inline-block top-2 right-2 sm:top-5 sm:right-5 cursor-pointer"
                    onClick={() => router.push(path)}
                  >
                    <XMark/>
                  </span>

                  <Title variant="dark">Eliminar curriculum</Title>
                  <Subtitle
                    variant="dark"
                    text="Confirma la eliminación"
                    highlight="colocando tu password"
                  />

                  <form
                    className="mt-10 space-y-5"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                  >
                    <Input
                      name="password"
                      id="password"
                      placeholder="Password de inicio de sesión"
                      register={register}
                      errors={errors}
                      required="El Password es obligatorio"
                    />
                    <SubmitInput
                      isLoading={
/*                         checkPasswordMutation.isPending ||
                        deleteCurriculumMutation.isPending */
                        isPendingPassword || isPendingDelete
                      }
                      value="Eliminar curriculum"
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
}