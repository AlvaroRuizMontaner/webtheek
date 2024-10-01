import { editUserFromProject, getUserTeamById } from '@/services/TeamAPI';
import { Project, User } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import 'swiper/css';
import { toast } from 'react-toastify';
import ProjectsLoading from '@/components/loading-templates/ProjectsLoading';
import Button from '@/components/button/Button';


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


  if (isLoading) return <ProjectsLoading />
  if (isError) throw new Error("Error");
  if (data) return (
    <>
      <h2 className="headline2 font-black mb-8u sm:mb-12u">Editar permisos de <span className='text-primary-700'>{data.user.name}</span></h2>

      <nav className="flex flex-col gap-3 sm:flex-row">
        <Button
          href={"/projects/" + projectId + "/team/"}
          text="Volver a colaboradores"
          variant="outline"
        />
      </nav>

      <section className='py-8u px-4u sm:px-8u bg-primary-100 space-y-6u mt-8u'>
        <div className=''>
          <h3 className='body1 font-bold'>Cambiar nivel de permisos</h3>
        </div>
        <hr className='border-gray-900 border-2' />
        <div className='flex flex-col sm:flex-row gap-4u  justify-center items-center'>
          <div className='lg:w-80 lg:h-80 w-40 h-40 sm:w-60 sm:h-60 p-2u border-2 border-primary-700 rounded-lg'>
            <label htmlFor="permission1" className='block h-full relative'>
            <input type="radio" name="permission" value="1" id="permission1" className='absolute opacity-0 pointer-events-none' onChange={(e) => console.log(e.target.value)}/>
            <span>Permission 1</span>
            </label>
          </div>
          <div className='lg:w-80 lg:h-80 w-40 h-40 sm:w-60 sm:h-60 p-2u border-2 border-primary-700 rounded-lg'>
            <label htmlFor="permission2" className='block h-full relative'>
            <input type="radio" name="permission" value="2" id="permission2" className='absolute opacity-0 pointer-events-none' onChange={(e) => console.log(e.target.value)}/>
            <span>Permission 2</span>
            </label>
          </div>
          <div className='lg:w-80 lg:h-80 w-40 h-40 sm:w-60 sm:h-60 p-2u border-2 border-primary-700 rounded-lg'>
            <label htmlFor="permission3" className='block h-full relative'>
            <input type="radio" name="permission" value="3" id="permission3" className='absolute opacity-0 pointer-events-none' onChange={(e) => console.log(e.target.value)}/>
            <span>Permission 3</span>
            </label>
          </div>
        </div>
      </section>


    </>
  );
}
