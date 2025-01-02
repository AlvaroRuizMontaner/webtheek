"use client"
import Button from '@/components/button/Button';
import CurriculumForm from '@/components/curriculums/CurriculumForm';
import Form from '@/components/form/Form';
import SubmitInput from '@/components/form/input/SubmitInput';
import Separator from '@/components/separator/Separator';
import Subtitle from '@/components/title/Subtitle';
import Title from '@/components/title/Title';
import { useCreateCurriculumMutation } from '@/redux/services/createApiCurriculum';
import { CurriculumCreateFormData } from '@/types/curriculum';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function CreateCurriculumView():JSX.Element {
  const router = useRouter()
  const [createCurriculum, { isLoading: isPending, /* error, isFetching  */}] = useCreateCurriculumMutation();

  const initialValues: CurriculumCreateFormData = {
    name: "",
  };

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

/*   const {mutate, isPending} = useMutation({
      mutationFn: createCurriculum,
      onError: (error) => {
          toast.error(error.message)
      },
      onSuccess: (data) => {
          localStorage.setItem('toastMessage', data);
          router.push('/quizzes');
      }
  }) */

  //const handleForm = (formData: QuizFormData) => mutate(formData)

  const handleForm = async (formData: CurriculumCreateFormData) => {
    try {
        const result = await createCurriculum(formData).unwrap();  // Esperar a que termine la mutación
        console.log("Actualización exitosa:", result);

        // Manejo del éxito directo con el resultado de unwrap()
        localStorage.setItem('toastMessage', result);
        router.push('/curriculums');
    } catch (err) {
        toast.error((err as any).message);
    }
};



return (
  <>
    <div className=" max-w-3xl mx-auto">
      <Title variant="dark">Crear curriculum</Title>
      <Subtitle
        variant="dark"
        text="Llena el siguiente formulario para crear un curriculum"
      />

      <div className="mb-8u sm:mb-12u">
        <Button text="Volver a curriculums" href="/curriculums" />
      </div>

      <Form
        className=" shadow-lg rounded-lg"
        onSubmit={handleSubmit(handleForm)}
      >
        <CurriculumForm register={register} errors={errors} />
        <SubmitInput isLoading={isPending} value="Crear curriculum" />
      </Form>
      <Separator />
    </div>
  </>
);
}
