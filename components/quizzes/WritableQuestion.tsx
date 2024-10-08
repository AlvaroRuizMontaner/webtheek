import { QuestionQuiz, Quiz } from '@/types/quiz';
import { useForm } from 'react-hook-form';
import RadioOption from '../form/input/RadioOption';
import SubmitInput from '../form/input/SubmitInput';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addQuestion } from '@/services/QuestionAPI';


type WritableQuestionProps = {
  question: Pick<QuestionQuiz, "statement" | "options">
  questionIndex: number
  quizId: Quiz["_id"]
}



export default function WritableQuestion({question, questionIndex, quizId}: WritableQuestionProps) {
    const {register, handleSubmit} = useForm({defaultValues: {
        ...question,
        isCorrect: 0
    }})
    
    
    const onSubmit = (data: any) => {
        mutate(quizId, data)  
    };

    const { mutate, isPending: addIsPending } = useMutation({
    mutationFn: addQuestion,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
        toast.success(data)
        QueryClient.invalidateQueries({queryKey: ["question", quizId]})
    }
  })



  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-md p-6 space-y-4u"
    >
      <input
        className="mb-8u block w-full"
        {...register("statement")}
        type="text"
      />
      {question.options.map((option, optionIndex) => (
        <RadioOption
          key={"option" + questionIndex + optionIndex}
          name="isCorrect"
          optionIndex={optionIndex}
          questionIndex={questionIndex}
          register={register}
        />
      ))}
      <div className='w-52 mx-auto'>
        <SubmitInput isLoading={addIsPending} value={"Enviar"} />
      </div>
    </form>
  );
}

  
  {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
  {/*           <Option
              key={"option" + questionIndex + optionIndex}
              option={option}
              questionIndex={questionIndex}
            /> */}