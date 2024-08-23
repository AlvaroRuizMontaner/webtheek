import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProjectFormData } from "@/types";
import Input from "../form/input/Input";
import Textarea from "../form/input/Textarea";

type ProjectFormProps = {
    register: UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({register, errors}: ProjectFormProps) {
    return (
      <>
        <Input
          label="Nombre del Proyecto"
          name="projectName"
          id="projectName"
          placeholder="Nombre del Proyecto"
          register={register}
          errors={errors}
          required="El Titulo del Proyecto es obligatorio"
        />
        <Input
          label="Nombre del Cliente"
          name="clientName"
          id="clientName"
          placeholder="Nombre del Cliente"
          register={register}
          errors={errors}
          required="El Nombre del cliente es obligatorio"
        />
        <Textarea
          label="Descripción"
          name="description"
          id="description"
          placeholder="Descripción del Proyecto"
          register={register}
          required="El Nombre del cliente es obligatorio"
        />
      </>
    );
}