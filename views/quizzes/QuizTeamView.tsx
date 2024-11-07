import Button from '@/components/button/Button'
import ProjectsLoading from '@/components/loading-templates/ProjectsLoading'
import PermissionTag from '@/components/permission-tag/PermissionTag'
import AddMemberModal from '@/components/team/AddMemberModal'
import Subtitle from '@/components/title/Subtitle'
import Title from '@/components/title/Title'
import { getQuizTeam, removeUserFromQuiz } from '@/services/QuizTeamAPI'
import { Quiz } from '@/types/quiz'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Fragment } from 'react'
import { toast } from 'react-toastify'

type QuizTeamViewProps = {
    quizId: Quiz["_id"]
}

export default function QuizTeamView({quizId}: QuizTeamViewProps) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["quizTeam", quizId],
    queryFn: () => getQuizTeam(quizId),
    retry: false,
  });

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: removeUserFromQuiz,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
        queryClient.invalidateQueries({queryKey: ["QuizTeam", quizId]})
    }
})

console.log(data)

  if (isLoading) return <ProjectsLoading />;
  if (isError) throw new Error("Error");
  if (data) return (
    <>
      <Title variant="dark">Administrar equipo</Title>
      <Subtitle variant="dark" text="Administra el equipo de este quiz" />

      <nav className="flex flex-col gap-3 sm:flex-row">
        <Button
          text="Agregar Colaborador"
          onClick={() => router.push("?addMember=true")}
        />
        <Button
          href={"/quizzes/" + quizId}
          text="Volver a quiz"
          variant="outline"
        />
      </nav>

      <h2 className="headline2 font-black mt-16u mb-8u sm:mt-24u sm:mb-12u">
        Miembros actuales
      </h2>
      {data.length ? (
        <ul
          role="list"
          className="space-y-4 my-10"
        >
          {data?.map((member) => (
            <li
              key={member.user._id}
              className="flex relative justify-between gap-x-6 project-card bg-white shadow-lg"
            >
              <div className="flex min-w-0 gap-x-4 pl-6u py-8u overflow-hidden">
                <div className="min-w-0 flex-auto space-y-2u">
                  <div className="permissionTagWrapper">
                    <PermissionTag
                      isManager={false}
                      permissionLevel={member.permissionLevel}
                    />
                  </div>
                  <div>
                    <Link
                        href={`/projects/${quizId}/team/${member.user._id}`}
                      className="text-gray-600 cursor-pointer hover:underline headline3 font-bold"
                    >
                      {member.user.name}
                    </Link>
                  </div>
                  <p className="text-sm text-gray-400">
                    {member.user.email}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-x-6 pr-6u py-8u">
                <Menu as="div" className="relative flex-none">
                  <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon
                      className="h-9 w-9"
                      aria-hidden="true"
                    />
                  </MenuButton>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <MenuItem>
                        <button
                          type="button"
                          className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          onClick={() =>
                            router.push(
                              location.pathname + `/${member.user._id}`
                            )
                          }
                        >
                          Ver Colaborador
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          type="button"
                          className="block px-3 py-1 text-sm leading-6 text-red-500"
                          onClick={() =>
                            mutate({ quizId, userId: member.user._id })
                          }
                        >
                          Eliminar del Quiz
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center py-20">No hay miembros en este equipo</p>
      )}

      <AddMemberModal projectId={quizId} />
    </>
  );
}
