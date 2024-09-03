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
import "./projects.css"
import Permission from "@/components/permission/Permission";

export default function ProjectsView() {
  const router = useRouter()
  const path = usePathname()
  const { data: user, isLoading: authLoading } = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });


  if (isLoading && authLoading) return "cargando...";

  if (data && user)
    return (
      <>
        <div className="mb-8u sm:mb-12u">
          <Title variant="dark">Tus proyectos</Title>
          <Subtitle variant="dark" text="Maneja y administra tus proyectos" />

          <Button text="Nuevo proyecto" href="/projects/create" />
        </div>

        {data.length ? (
          <ul
            role="list"
            className="space-y-4 my-10"
          >
            {data.map((project) => (
              <li
                key={project._id}
                className="flex justify-between gap-x-6 px-4u py-6u sm:px-6u sm:py-8u project-card bg-white shadow-lg"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2u">
                    <div className="permission">
                      <Permission isManager={isManager(project.manager, user._id)}/>
                    </div>
                    <div>
                      <Link
                        href={`/projects/${project._id}`}
                        className="text-gray-600 cursor-pointer hover:underline headline3 font-bold"
                      >
                        {project.projectName}
                      </Link>
                    </div>
                    <p className="text-sm text-gray-400">
                      Cliente: {project.clientName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6 w-fit">
                  <Menu as="div" className="relative flex-none">
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
          <p className="text-center py-20">
            No hay proyectos aún. {""}
            <Link
              className=" text-accent-300 font-bold"
              href="/projects/create"
            >
              Crear proyecto
            </Link>
          </p>
        )}

        <DeleteProjectModal />
      </>
    );
}
