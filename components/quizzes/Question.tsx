import { QuestionQuiz, Quiz } from '@/types/quiz';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteQuestion } from '@/services/QuestionAPI';
import { toast } from 'react-toastify';
import { XMarkIcon, PencilSquareIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import EditableOptions from './EditableOptions';
import Options from './Options';


type QuestionProps = {
  question: Pick<QuestionQuiz, "statement" | "options" | "correctIndex" | "_id">
  questionIndex: number
  quizId: Quiz["_id"]
}

export default function Question({question, questionIndex, quizId}: QuestionProps) {

  const [onEdit, setOnEdit] = useState(false)

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
  mutationFn: deleteQuestion,
  onError: (error) => toast.error(error.message),
  onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ["quiz", quizId]})
  }
})

function handleDelete() {
  mutate({quizId, questionId: question._id})
}


  return (
    <div className="bg-white rounded-md p-6 space-y-4u relative">
      <div className="mb-8u font-bold">{question.statement}</div>
      {onEdit ? <EditableOptions quizId={quizId} question={question} questionIndex={questionIndex} /> : <Options question={question} questionIndex={questionIndex}/>}
      <div className='absolute right-0 top-0 !mt-0 flex cursor-pointer'>
        <PencilSquareIcon onClick={() => setOnEdit(true)} className='w-7 h-7 text-accent-warning-400 border border-primary-200 bg-gray-100' />
        <XMarkIcon onClick={handleDelete} className='w-7 h-7 text-accent-danger-400 border border-primary-200 bg-gray-100' />
      </div>
    </div>
  );
}
