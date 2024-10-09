import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  favoriteColor: string;
};

export default function RadioButtonForm() {
  // Inicializa el formulario con defaultValues
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      favoriteColor: 'green', // Configura el valor inicial seleccionado
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data); // Muestra los datos del formulario en la consola
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Choose your favorite color:</h3>

      <label>
        <input
          {...register('favoriteColor')}
          type="radio"
          value="red"
        />
        Red
      </label>

      <label>
        <input
          {...register('favoriteColor')}
          type="radio"
          value="green"
        />
        Green
      </label>

      <label>
        <input
          {...register('favoriteColor')}
          type="radio"
          value="blue"
        />
        Blue
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}