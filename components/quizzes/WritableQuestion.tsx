import { QuestionQuiz, Quiz } from '@/types/quiz';
import { useForm } from 'react-hook-form';
import RadioOption from '../form/input/RadioOption';
import SubmitInput from '../form/input/SubmitInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addQuestion } from '@/services/QuestionAPI';


type WritableQuestionProps = {
  question: Pick<QuestionQuiz, "statement" | "options" | "correctIndex">
  questionIndex: number
  stateQuestionIndex: number
  quizId: Quiz["_id"]
  spliceQuestion: (idx: number) => void
}



export default function WritableQuestion({question, questionIndex, quizId, stateQuestionIndex, spliceQuestion}: WritableQuestionProps) {

    const {register, handleSubmit} = useForm({defaultValues: {
      ...question,
      correctIndex: "0"
    }})
    
    const onSubmit = (formData: Pick<QuestionQuiz, "statement" | "options" | "correctIndex"> & {correctIndex: string}) => {
      const newFormData = {
        ...formData,
        correctIndex: formData.correctIndex,
        options: formData.options.map((option, formIndex) => {
          return {
            text: option.text,
            correctIndex: formData.correctIndex === formIndex.toString()
          }
        })
      }
      mutate({quizId, newFormData})  
      spliceQuestion(stateQuestionIndex)
    };

    const queryClient = useQueryClient()
    const { mutate, isPending: addIsPending } = useMutation({
    mutationFn: addQuestion,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
        toast.success(data)
        queryClient.invalidateQueries({queryKey: ["quiz", quizId]})
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

      {question.options.map((_, optionIndex) => (
        <RadioOption
          key={"option" + questionIndex + optionIndex}
          name="correctIndex"
          optionIndex={optionIndex}
          questionIndex={questionIndex}
          register={register}
        />
      ))}

      <div className="w-52 mx-auto">
        <SubmitInput isLoading={addIsPending} value={"Crear"} />
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