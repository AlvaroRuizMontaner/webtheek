"use client"
import Button from '@/components/button/Button';
import Form from '@/components/form/Form';
import SubmitInput from '@/components/form/input/SubmitInput';
import QuizForm from '@/components/quizzes/QuizForm';
import Separator from '@/components/separator/Separator';
import Subtitle from '@/components/title/Subtitle';
import Title from '@/components/title/Title';
import { createQuiz } from '@/services/QuizAPI';
import { QuizFormData } from '@/types/quiz';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function CreateQuizView():JSX.Element {
  const router = useRouter()

  const initialValues: QuizFormData = {
    name: "",
    description: "",
  };

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

  const {mutate, isPending} = useMutation({
      mutationFn: createQuiz,
      onError: (error) => {
          toast.error(error.message)
      },
      onSuccess: (data) => {
          localStorage.setItem('toastMessage', data);
          router.push('/quizzes');
      }
  })

  const handleForm = (formData: QuizFormData) => mutate(formData)


return (
  <>
    <div className=" max-w-3xl mx-auto">
      <Title variant="dark">Crear quiz</Title>
      <Subtitle
        variant="dark"
        text="Llena el siguiente formulario para crear un quiz"
      />

      <div className="mb-8u sm:mb-12u">
        <Button text="Volver a quizzes" href="/quizzes" />
      </div>

      <Form
        className=" shadow-lg rounded-lg"
        onSubmit={handleSubmit(handleForm)}
      >
        <QuizForm register={register} errors={errors} />
        <SubmitInput isLoading={isPending} value="Crear quiz" />
      </Form>
      <Separator />
    </div>
  </>
);
}
