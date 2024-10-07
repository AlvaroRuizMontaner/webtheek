import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import SubmitInput from '../form/input/SubmitInput';
import Title from '../title/Title';
import Subtitle from '../title/Subtitle';
import Button from '../button/Button';
import Form from '../form/Form';
import Separator from '../separator/Separator';
import { Quiz, QuizFormData } from '@/types/quiz';
import { updateQuiz } from '@/services/QuizAPI';
import QuizForm from './QuizForm';

type EditQuizFormProps = {
    data: QuizFormData,
    quizId: Quiz["_id"]
}

export default function EditQuizForm({data, quizId}: EditQuizFormProps) {

    const router = useRouter()

      const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        name: data.name,
        description: data.description,
      }})

      const queryClient = useQueryClient()
      const { mutate, isPending } = useMutation({
        mutationFn: updateQuiz,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["quizzes"]})
            queryClient.invalidateQueries({queryKey: ["editQuiz", quizId]})
            data && localStorage.setItem('toastMessage', data);
            router.push("/quizzes")
        }
      })

      const handleForm = (formData: QuizFormData) => {
        mutate({
            formData,
            quizId
        })
      }

  return (
    <>
      <div className=" max-w-3xl mx-auto">
        <Title variant="dark">Editar quiz</Title>
        <Subtitle
          variant="dark"
          text="Llena el siguiente formulario para editar un quiz"
        />

        <div className='mb-8u'>
          <Button text="Volver a quizzes" href="/quizzes" />
        </div>

        <Form onSubmit={handleSubmit(handleForm)}>
          <QuizForm register={register} errors={errors} />
          <SubmitInput isLoading={isPending} value="Guardar cambios" />
        </Form>

        <Separator />
      </div>
    </>
  );
}
