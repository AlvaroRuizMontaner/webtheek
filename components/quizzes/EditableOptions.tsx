import { QuestionQuiz, Quiz } from "@/types/quiz";
import SubmitInput from "../form/input/SubmitInput";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editQuestion } from "@/services/QuestionAPI";
import { Dispatch, SetStateAction } from "react";


type EditableOptionsProps = {
    question: Pick<QuestionQuiz, "statement" | "options" | "correctIndex" | "_id">
    questionIndex: number
    quizId: Quiz["_id"]
    setOnEdit: Dispatch<SetStateAction<boolean>>
}

export default function EditableOptions({question, questionIndex, quizId, setOnEdit}:EditableOptionsProps) {

  const {register, handleSubmit, watch} = useForm({
    defaultValues: {
      ...question
    }
  })

  const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
    mutationFn: editQuestion,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
        toast.success(data)
        queryClient.invalidateQueries({queryKey: ["quiz", quizId]})
        setOnEdit(false)
    }
  })

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
    console.log(formData)
    mutate({quizId, questionId: question._id, newFormData})  
  };


  return (
    <form className="space-y-4u" onSubmit={handleSubmit(onSubmit)}>
      <input className="w-full mb-8u" type="text" {...register(`statement`)} />
      {question.options.map((option, optionIndex) => (
        <div
          key={"editableOption" + questionIndex + optionIndex}
          className={`flex gap-2 items-center min-h-[42px]`}
        >
          <input
            type="radio"
            value={optionIndex.toString()}
            {...register("correctIndex")}
            id={"question" + questionIndex}
          />
          <input className={`w-full ${optionIndex.toString() === watch("correctIndex") ? "bg-accent-100" : "bg-gray-100"}`} type="text" {...register(`options.${optionIndex}.text`)} />
        </div>
      ))}
      <div className="w-52 mx-auto mt-4u">
        <SubmitInput value={"Editar"} isLoading={isPending} />
      </div>
    </form>
  );
}
