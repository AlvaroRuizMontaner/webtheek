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
        <h1 className="headline1 font-black">Proyectos</h1>
        <p className="body1 font-light text-gray-500 my-5">
          Maneja y administra tus proyectos
        </p>

        <nav className="my-5">
          <Link
            className="inline-block bg-primary hover:bg-dark-primary px-10 py-3 text-white text-xl 
          font-bold cursor-pointer transition-colors"
            href="/projects/create"
          >
            Nuevo proyecto
          </Link>
        </nav>

        {data.length ? (
          <ul
            role="list"
            className="divide-y divide-gray-300 border border-gray-100 my-10 bg-white shadow-lg"
          >
            {data.map((project) => (
              <li
                key={project._id}
                className="flex justify-between gap-x-6 px-5 py-10"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">

                  <div>
                  {isManager(project.manager, user._id) ?
                        <p className="font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-sm
                        border-indigo-500 rounded-lg inline-block py-1 px-5 mb-2">Manager</p>:
                        <p  className="font-bold text-xs uppercase bg-green-50 text-green-500 border-sm
                        border-green-500 rounded-lg inline-block py-1 px-5 mb-2">Colaborador</p>
                      }
                  </div>

                    <Link
                      href={`/projects/${project._id}`}
                      className="text-gray-600 cursor-pointer hover:underline headline3 font-bold"
                    >
                      {project.projectName}
                    </Link>
                    <p className="text-sm text-gray-400">
                      Cliente: {project.clientName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
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
                                onClick={() =>router.push(path + `?deleteProject=${project._id}`)}
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
              className=" text-secondary font-bold"
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
