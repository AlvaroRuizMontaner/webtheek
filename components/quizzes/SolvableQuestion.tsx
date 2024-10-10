import { Quiz } from '@/types/quiz';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteQuestion } from '@/services/QuestionAPI';
import { toast } from 'react-toastify';
import SolvableOptions from './SolvableOptions';
import { QuestionWithSelectedIndex } from '@/views/quizzes/SolvableQuizView';


type SolvableQuestionProps = {
  question: QuestionWithSelectedIndex
  questionIndex: number
  quizId: Quiz["_id"]
}

export default function SolvableQuestion({question, questionIndex, quizId, selectedIndex}: SolvableQuestionProps) {

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
  mutationFn: deleteQuestion,
  onError: (error) => toast.error(error.message),
  onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ["quiz", quizId]})
  }
})

console.log(question.selectedIndex)

  return (
    <div className="bg-white rounded-md p-6 space-y-4u relative">
      <SolvableOptions quizId={quizId} question={question} questionIndex={questionIndex}/>
    </div>
  );
}
