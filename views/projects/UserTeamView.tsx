import { editUserFromProject, getUserTeamById } from '@/services/TeamAPI';
import { Project, User } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import 'swiper/css';
import { toast } from 'react-toastify';
import ProjectsLoading from '@/components/loading-templates/ProjectsLoading';
import Button from '@/components/button/Button';
import { ChangeEvent, useEffect } from 'react';
import RadioPermissionInput from '@/components/form/input/radioPermissionInput/RadioPermissionInput';


type UserTeamViewProps = {
    projectId: Project["_id"]
    userId: User["_id"]
}

export default function UserTeamView({projectId, userId}: UserTeamViewProps) {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userTeam", projectId],
    queryFn: () => getUserTeamById({projectId, userId}),
    retry: false,
  });

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: editUserFromProject,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
        queryClient.invalidateQueries({queryKey: ["userTeam", projectId]})
    }
  })
  
  useEffect(() => {
    if(!isLoading && !isError && data) {
      console.log(data.permissionLevel)
    }
  },[isLoading, isError, data])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value)
    mutate({
      projectId,
      userId,
      permissionFormData: {
        permissionLevel: Number(e.target.value),
      },
    })

    queryClient.setQueryData(
      ["userTeam", projectId],
      (prevData: {
        user: {
          _id: string;
          name: string;
          email: string;
        };
        permissionLevel: number;
      }) => {
        console.log(prevData);

        return {
          user: prevData.user,
          permissionLevel: Number(e.target.value),
        };
      }
    );
  }


  if (isLoading) return <ProjectsLoading />
  if (isError) throw new Error("Error");
  if (data) return (
    <>
      <h2 className="headline2 font-black mb-8u sm:mb-12u">Permisos de <span className='text-primary-700'>{data.user.name}</span></h2>

      <nav className="flex flex-col gap-3 sm:flex-row">
        <Button
          href={"/projects/" + projectId + "/team/"}
          text="Volver a colaboradores"
          variant="outline"
        />
      </nav>

      <section className='py-8u px-4u sm:px-8u bg-gray-200 space-y-6u mt-8u'>
        <div className=''>
          <h3 className='body1 font-bold'>Cambiar nivel de permisos</h3>
        </div>
        <hr className='border-gray-900 border-2' />
        {

        }
        <div className='flex flex-col sm:flex-row gap-8u flex-wrap lg:flex-nowrap justify-center items-center'>
          {Array(3).fill(1).map((el, index) => (
            <RadioPermissionInput 
              className="lg:w-64 lg:h-64 w-full h-52 sm:w-60 sm:h-60 px-2u py-4u border-2 border-primary-700 rounded-lg" 
              name="permission"
              index={index + 1}
              key={"permission" + (index + 1)}
              onChange={handleChange}
              title={"Nivel de permiso" + " " + (index + 1)}
              selectState={data.permissionLevel}
            />
          ))}
        </div>
      </section>


    </>
  );
}
