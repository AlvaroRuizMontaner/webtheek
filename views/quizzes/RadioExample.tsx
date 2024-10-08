import { QuestionFormData } from "@/types/quiz";
import React from "react";
import { useForm } from "react-hook-form";

type RadioFormExampleProps = {
  stateQuestions: QuestionFormData[]
}

export default function RadioFormExample({ stateQuestions}: RadioFormExampleProps) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data); // Aquí verás el valor del radio seleccionado
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Choose your favorite color:</h3>

      <label>
        <input
          {...register("isCorrect")} // El campo "isCorrect" será controlado
          type="radio"
          value={0}
        />
        Red
      </label>

      <label>
        <input {...register("isCorrect")} type="radio" value={1} />
        Green
      </label>

      <label>
        <input {...register("isCorrect")} type="radio" value={2} />
        Blue
      </label>
      

      <button type="submit">Submit</button>
    </form>
  );
}