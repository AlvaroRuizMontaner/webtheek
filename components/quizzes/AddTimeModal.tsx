import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import SubmitInput from '../form/input/SubmitInput';
import { Quiz, QuizTimeData } from '@/types/quiz';
import XMark from '../tasks/XMark/XMark';
import ErrorMessage from '../ErrorMessage';
import { addTime } from '@/services/QuizAPI';

type AddTimeModalProps = {
  quizId:  Quiz["_id"]
  data: Quiz
}

export default function AddTimeModal({quizId, data}: AddTimeModalProps) {

    const router = useRouter()
    const path = usePathname()
    const searchParams = useSearchParams()
    const search = searchParams.get('addTime')
    const show = search ? true : false


    const { register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues: {
      time: data.time
    }})

/*     // Usa useEffect para actualizar el valor de `time` en el formulario cuando cambie
    useEffect(() => {
      reset({ time });
    }, [time, reset]); */

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: addTime,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["quiz", quizId]})
            toast.success(data)
            reset()
            router.push(path)
        }
    })

    const handleAddTime = (formData: QuizTimeData) => {
        const data = {
            quizId,
            formData
        }
        mutate(data)
    }

    return (
      <>
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
                      <XMark />
                    </span>
                    <Dialog.Title
                      as="h3"
                      className="font-black headline2 mb-5 leading-[1]"
                    >
                      Establecer tiempo
                    </Dialog.Title>

                    <p className="text-xl font-bold">
                      Llena el campo y elige {""}
                      <span className="text-accent-300">el tiempo</span>
                    </p>

                    <form
                      className="mt-10 space-y-3"
                      noValidate
                      onSubmit={handleSubmit(handleAddTime)}
                    >
                      <div className="flex flex-col gap-5">
                        <label className="font-normal text-2xl" htmlFor="name">
                          Tiempo
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Tiempo del quiz"
                          className="w-full p-3  border-gray-300 border"
                          {...register("time", {
                            required: "El tiempo del quiz es obligatorio",
                          })}
                        />
                        {errors.time && (
                          <ErrorMessage>{errors.time.message}</ErrorMessage>
                        )}
                      </div>
                      <SubmitInput
                        isLoading={isPending}
                        value="Enviar"
                      />
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}