import { Project, ToolType, User } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import 'swiper/css';
import { toast } from 'react-toastify';
import ProjectsLoading from '@/components/loading-templates/ProjectsLoading';
import Button from '@/components/button/Button';
import { ChangeEvent } from 'react';
import RadioPermissionInput from '@/components/form/input/radioPermissionInput/RadioPermissionInput';
import { editUserFromQuiz, getUserTeamById } from '@/services/QuizTeamAPI';
import { editUserFromProject, getUserTeamById as getUserTeamByIdProject } from '@/services/TeamAPI';


type UserTeamViewProps = {
    toolId: Project["_id"]
    userId: User["_id"]
    tool: ToolType
    queryKey: string
}

export function getQueryFn(tool: ToolType) {
  return tool === "projects" ? getUserTeamByIdProject : getUserTeamById
}
export function getEditFn(tool: ToolType) {
  return tool === "projects" ? editUserFromProject : editUserFromQuiz
}

export default function UserTeamView({toolId, tool, userId, queryKey}: UserTeamViewProps) {

  const queryFn = getQueryFn(tool)
  const editFn = getEditFn(tool)

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey, toolId],
    queryFn: () => queryFn({toolId, userId}),
    retry: false,
  });

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: editFn,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
        queryClient.invalidateQueries({queryKey: [queryKey, toolId]})
    }
  })
  
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    mutate({
      toolId,
      userId,
      permissionFormData: {
        permissionLevel: Number(e.target.value),
      },
    })

    // Actualización optimista
    queryClient.setQueryData(
      [queryKey, toolId],
      (prevData: {
        user: {
          _id: string;
          name: string;
          email: string;
        };
        permissionLevel: number;
      }) => {

        return {
          user: prevData.user,
          permissionLevel: Number(e.target.value),
        };
      }
    );
  }

  if(data) {
    console.log(data.permissionLevel)
  }



  if (isLoading) return <ProjectsLoading />
  if (isError) throw new Error("Error");
  if (data) return (
    <>
      <h2 className="headline2 font-black mb-8u sm:mb-12u">Permisos de <span className='text-primary-700'>{data.user.name}</span></h2>

      <nav className="flex flex-col gap-3 sm:flex-row">
        <Button
          href={`/${tool}/${toolId}/team/`}
          text="Volver a colaboradores"
          variant="outline"
        />
      </nav>

      <section className='py-8u space-y-8u mt-8u'>
        <div className=''>
          <h3 className='body1 font-bold leading-none'>Cambiar nivel de permisos</h3>
        </div>
        <hr className='border-0 bg-gray-900 h-[1px]' />
        {

        }
        <div className='flex flex-col sm:flex-row gap-8u flex-wrap lg:flex-nowrap justify-center items-center'>
          {Array(3).fill(1).map((el, index) => (
            <RadioPermissionInput 
              className="lg:w-64 lg:h-64 w-full h-60 sm:w-60 sm:h-60 px-2u py-4u shadow-lg rounded-lg" 
              name="permission"
              index={index + 1}
              key={"permission" + (index + 1)}
              onChange={handleChange}
              title={"Nivel"}
              selectState={data.permissionLevel}
            />
          ))}
        </div>
      </section>
    </>
  );
}
