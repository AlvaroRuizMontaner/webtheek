import { Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { getProjects } from "@/services/ProjectAPI";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import DeleteProjectModal from "@/components/projects/DeleteProjectModal";
import { usePathname, useRouter } from "next/navigation";
import Title from "@/components/title/Title";
import Subtitle from "@/components/title/Subtitle";
import Button from "@/components/button/Button";
import "./projects.scss"
import PermissionTag from "@/components/permission-tag/PermissionTag";
import Loading from "@/components/loading-templates/Loading";
import EmptyState from "@/components/empty-state/EmptyState";

export default function ProjectsView() {
  const router = useRouter()
  const path = usePathname()
  const { data: user, isLoading: authLoading } = useAuth()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });


  if (isLoading || authLoading) return <Loading />;
  if (isError) return <EmptyState text="Algo ha fallado..." />

  if (data && user)
    return (
      <>
        <div className="mb-8u sm:mb-12u">
          <Title variant="dark">Tus proyectos</Title>
          <Subtitle variant="dark" text="Maneja y administra tus proyectos" />

          <Button text="Nuevo proyecto" href="/projects/create" />
        </div>

        {data.length ? (
          <ul role="list" className="space-y-8u my-10">
            {data.map((project) => (
              <li
                key={project._id}
                className="flex relative justify-between gap-x-6 project-card bg-white shadow-lg"
              >
                <div className="flex min-w-0 gap-x-4 pl-6u py-8u overflow-hidden">
                  <div className="min-w-0 flex-auto space-y-2u">
                    <div className="permissionTagWrapper">
                      <PermissionTag
                        isManager={isManager(project.manager, user._id)}
                      />
                    </div>
                    <div>
                      <Link
                        href={`/projects/${project._id}`}
                        className="text-gray-600 cursor-pointer hover:underline headline3 font-bold"
                        id={project._id}
                      >
                        {project.projectName}
                      </Link>
                    </div>
                    <p className="text-gray-400">
                      Cliente: {project.clientName}
                    </p>
                    <p className="text-gray-400">{project.description}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6 w-fit pr-6u py-8u">
                  <Menu as="div" className="relative z-10 flex-none">
                    <MenuButton className="-m-2.5 block text-gray-500 hover:text-gray-900">
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
                          <Link
                            href={`/projects/${project._id}`}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            Ver Proyecto
                          </Link>
                        </MenuItem>

                        {isManager(project.manager, user._id) && (
                          <>
                            <MenuItem>
                              <Link
                                href={`/projects/${project._id}/edit`}
                                className="block px-3 py-1 text-sm leading-6 text-gray-900"
                              >
                                Editar Proyecto
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <button
                                type="button"
                                className="block px-3 py-1 text-sm leading-6 text-red-500"
                                onClick={() =>
                                  router.push(
                                    path + `?deleteProject=${project._id}`
                                  )
                                }
                              >
                                Eliminar Proyecto
                              </button>
                            </MenuItem>
                          </>
                        )}
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-20 flex flex-col gap-2">
            <div className="h-64">
              <EmptyState text="No hay proyectos, aún..." />
            </div>
            <Link
              className=" text-primary-500 font-bold"
              href="/projects/create"
            >
              Crear proyecto
            </Link>
          </div>
        )}

        <DeleteProjectModal />
      </>
    );
}
