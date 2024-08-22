import ErrorMessage from '@/components/ErrorMessage'
import React, { ReactNode } from 'react'
import { FieldError, FieldErrors, FieldValues, Path, UseFormRegister, UseFormTrigger } from 'react-hook-form'
// InputProps<TFormValues extends FieldValues> es un tipo genérico
// TFormValues extends FieldValues asegura que TFormValues sea compatible con las funciones de react-hook-form.

type InputProps<TFormValues extends FieldValues> = {
    label: string
    name: Path<TFormValues> // Esto asegura que name sea un campo válido dentro de TFormValues, necesario para el correcto funcionamiento con react-hook-form.
    id: string
    type?: string
    placeholder: string
    // UseFormRegister<UserRegistrationForm>  UseFormTrigger<UserLoginForm> FieldErrors<UserRegistrationForm>
    register: UseFormRegister<TFormValues>
    trigger?: UseFormTrigger<TFormValues>
    errors: FieldErrors<TFormValues>
    required: string
    validate?: any
    children?: ReactNode
    pattern?: {
        value: RegExp,
        message: string,
    }
    minLength?: {
        value: number,
        message: string
    }
}

export default function Input<TFormValues extends FieldValues>({
  label,
  name,
  id,
  type = "email",
  placeholder,
  register,
  minLength,
  trigger,
  errors,
  required,
  validate,
  pattern,
  children
}: InputProps<TFormValues>) {
  return (
    <div className="flex flex-col gap-5">
      <label className="font-bold body1 text-primary-500" htmlFor={id}>
        {label}
      </label>

      <div className="relative">
        
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="w-full p-3  border-gray-300 border"
          {...register(name, {
            required: required,
            pattern: pattern,
            minLength: minLength,
            validate: validate ? validate : undefined
          })}
          // Ejecuta la validación manualmente
          onBlur={trigger ?() => {trigger(name)}: undefined}
        />

        {children && children}
      </div>

      {errors[name] && (
        <ErrorMessage>{(errors[name] as FieldError)!.message}</ErrorMessage>
      )}
    </div>
  );
}
