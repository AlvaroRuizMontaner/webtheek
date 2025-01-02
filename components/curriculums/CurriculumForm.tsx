import { FieldErrors, UseFormRegister } from "react-hook-form";
import Input from "../form/input/Input";
import { CurriculumCreateFormData } from "@/types/curriculum";

type CurriculumFormProps = {
    register: UseFormRegister<CurriculumCreateFormData>
    errors: FieldErrors<CurriculumCreateFormData>
}

export default function CurriculumForm({register, errors}: CurriculumFormProps) {
    return (
      <>
        <Input
          label="Nombre del Curriculum"
          name="name"
          id="curriculumName"
          placeholder="Nombre del Curriculum"
          register={register}
          errors={errors}
          required="El Titulo del Curriculum es obligatorio"
        />
      </>
    );
}