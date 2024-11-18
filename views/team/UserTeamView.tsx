import { Project, ToolType, User } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import ProjectsLoading from '@/components/loading-templates/ProjectsLoading';
import Button from '@/components/button/Button';
import { ChangeEvent } from 'react';
import RadioPermissionInput from '@/components/form/input/radioPermissionInput/RadioPermissionInput';
import { editUserFromTeam, getUserTeamById } from '@/services/TeamAPI';


type UserTeamViewProps = {
    toolId: Project["_id"]
    userId: User["_id"]
    tool: ToolType
    queryKey: string
}



export default function UserTeamView({toolId, tool, userId, queryKey}: UserTeamViewProps) {

  const newQueryKey = queryKey + userId // Cada user tiene un queryKey unico

  const { data, isLoading, isError } = useQuery({
    queryKey: [newQueryKey, toolId],
    queryFn: () => getUserTeamById({toolId, userId, tool}),
    retry: false,
  });

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: editUserFromTeam,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
        queryClient.invalidateQueries({queryKey: [newQueryKey, toolId]})
    }
  })
  
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    mutate({
      toolId,
      userId,
      permissionFormData: {
        permissionLevel: Number(e.target.value),
      },
      tool
    })

    // Actualización optimista
    queryClient.setQueryData(
      [newQueryKey, toolId],
      (prevData: {
        user: {
          _id: string;
          name: string;
          email: string;
        };
        permissionLevel: number;
      }) => {

        console.log(prevData)

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
