import { FieldErrors, UseFormRegister } from "react-hook-form";
import Input from "../form/input/Input";
import Textarea from "../form/input/Textarea";
import { QuizFormData } from "@/types/quiz";

type QuizFormProps = {
    register: UseFormRegister<QuizFormData>
    errors: FieldErrors<QuizFormData>
}

export default function QuizForm({register, errors}: QuizFormProps) {
    return (
      <>
        <Input
          label="Nombre del Quiz"
          name="name"
          id="projectName"
          placeholder="Nombre del Quiz"
          register={register}
          errors={errors}
          required="El Titulo del Quiz es obligatorio"
        />
        <Textarea
          label="Descripción"
          name="description"
          id="description"
          placeholder="Descripción del Quiz"
          register={register}
          required="La descripción es obligatoria"
        />
      </>
    );
}