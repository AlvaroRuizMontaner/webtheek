import { QuestionQuiz } from '@/types/quiz';
import Option from './Option';
import { useForm } from 'react-hook-form';


type InputQuestionProps = {
  question: Pick<QuestionQuiz, "statement" | "options">
  questionIndex: number
}



export default function InputQuestion({question, questionIndex}: InputQuestionProps) {
    const {register, handleSubmit} = useForm({ defaultValues: question })
    
    
    const onSubmit = (data) => {
        console.log(data);
      };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-md p-6">
      <input className="mb-8u block w-full" {...register("statement")} type="text" />
      {question.options.map((option, optionIndex) => (
        <div key={"option" + questionIndex + optionIndex}>
{/*           <Option
            key={"option" + questionIndex + optionIndex}
            option={option}
            questionIndex={questionIndex}
          /> */}
          <input {...register(`options.${optionIndex}.isCorrect`)} value={optionIndex} type="radio" name={"question" + questionIndex} id={"question" + questionIndex}/>
          <input {...register(`options.${optionIndex}.text`)} type="text" 
            name={`options.${optionIndex}.text`} id="" 
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
