import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import SubmitInput from '../form/input/SubmitInput';
import Title from '../title/Title';
import Subtitle from '../title/Subtitle';
import Button from '../button/Button';
import Form from '../form/Form';
import Separator from '../separator/Separator';
import CurriculumForm from './CurriculumForm';
import { Curriculum, CurriculumCreateFormData } from '@/types/curriculum';
import { useEditCurriculumNameMutation } from '@/redux/services/createApiCurriculum';
import { toast } from 'react-toastify';

type EditCurriculumFormProps = {
    data: Curriculum,
    curriculumId: Curriculum["_id"]
}

export default function EditCurriculumForm({data, curriculumId}: EditCurriculumFormProps) {

    const router = useRouter()
    const [editCurriculumName, { isLoading: isPending, /* error, isFetching  */}] = useEditCurriculumNameMutation();

      const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        name: data.name,
      }})
/* 
      const queryClient = useQueryClient()
      const { mutate, isPending } = useMutation({
        mutationFn: updateQuiz,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["quizzes"]})
            queryClient.invalidateQueries({queryKey: ["editQuiz", curriculumId]})
            data && localStorage.setItem('toastMessage', data);
            router.push("/quizzes")
        }
      }) */

/*       const handleForm = (formData: CurriculumCreateFormData) => {
        mutate({
            formData,
            curriculumId
        })
      } */

    const handleForm = async (formData: CurriculumCreateFormData) => {
      try {
        const result = await editCurriculumName({formData, curriculumId}).unwrap();  // Esperar a que termine la mutación
        console.log("Actualización exitosa:", result);

        // Manejo del éxito directo con el resultado de unwrap()
        result && localStorage.setItem('toastMessage', result);
        router.push('/curriculums');
      } catch (err) {
          toast.error((err as any).message);
      }
    };

  return (
    <>
      <div className=" max-w-3xl mx-auto">
        <Title variant="dark">Editar curriculum</Title>
        <Subtitle
          variant="dark"
          text="Llena el siguiente formulario para editar el nombre"
        />

        <div className='mb-8u'>
          <Button text="Volver a curriculums" href="/curriculums" />
        </div>

        <Form onSubmit={handleSubmit(handleForm)}>
          <CurriculumForm register={register} errors={errors} />
          <SubmitInput isLoading={isPending} value="Guardar cambios" />
        </Form>

        <Separator />
      </div>
    </>
  );
}
