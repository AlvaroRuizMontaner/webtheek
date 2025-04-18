import Button from "@/components/button/Button";
import EmptyState from "@/components/empty-state/EmptyState";
import Loading from "@/components/loading-templates/Loading";
import PermissionTag from "@/components/permission-tag/PermissionTag";
import DeleteQuizModal from "@/components/quizzes/DeleteQuizModal";
import Subtitle from "@/components/title/Subtitle";
import Title from "@/components/title/Title";
import { useAuth } from "@/hooks/useAuth";
import { getQuizzes } from "@/services/QuizAPI";
import { isManager } from "@/utils/policies";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import "./quizzes.scss"



export default function QuizzesView() {
    const router = useRouter()
    const path = usePathname()
    const { data: user, isLoading: authLoading } = useAuth()
    const { data, isLoading, isError } = useQuery({
      queryKey: ["quizzes"],
      queryFn: getQuizzes,
    });
  
  
    if (isError) return <EmptyState text="Algo ha fallado..." />
    if (isLoading || authLoading) return <Loading />;
  
    if (data && user)
        return (
          <>
            <div className="mb-8u sm:mb-12u">
              <Title variant="dark">Quizzes</Title>
              <Subtitle variant="dark" text="Maneja y administra quizzes" />
    
              <Button text="Nuevo quiz" href="/quizzes/create" />
            </div>
    
            {data.length ? (
              <ul role="list" className="lg:grid lg:grid-cols-2 gap-8u my-10">
                {data.map((quiz) => (
                  <li
                    key={quiz._id}
                    className="flex relative justify-between gap-x-6 quiz-card bg-white shadow-lg h-full"
                  >
                    <div className="flex min-w-0 gap-x-4 pl-6u py-8u overflow-hidden">
                      <div className="min-w-0 flex-auto space-y-2u">
                        <div className="permissionTagWrapper">
                          <PermissionTag
                            isManager={isManager(quiz.manager, user._id)}
                          />
                        </div>
                        <div>
                          <Link
                            href={`/quizzes/${quiz._id}`}
                            className="text-accent-200 cursor-pointer hover:underline headline3 font-bold"
                            id={quiz._id}
                          >
                            {quiz.name}
                          </Link>
                        </div>
                        <p className="text-white">{quiz.description}</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-6 w-fit pr-6u py-8u">
                      <Menu as="div" className="relative z-10 flex-none">
                        <MenuButton className="-m-2.5 block text-white hover:text-primary-200">
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
                                href={`/quizzes/${quiz._id}`}
                                className="block px-3 py-1 text-sm leading-6 text-gray-900"
                              >
                                Ver Quiz
                              </Link>
                            </MenuItem>
    
                            {isManager(quiz.manager, user._id) && (
                              <>
                                <MenuItem>
                                  <Link
                                    href={`/quizzes/${quiz._id}/edit`}
                                    className="block px-3 py-1 text-sm leading-6 text-gray-900"
                                  >
                                    Editar Quiz
                                  </Link>
                                </MenuItem>
                                <MenuItem>
                                  <button
                                    type="button"
                                    className="block px-3 py-1 text-sm leading-6 text-red-500"
                                    onClick={() =>
                                      router.push(
                                        path + `?deleteQuiz=${quiz._id}`
                                      )
                                    }
                                  >
                                    Eliminar Quiz
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
                  <EmptyState text="No hay quizzes, aún..." />
                </div>
                <Link
                  className=" text-primary-500 font-bold"
                  href="/quizzes/create"
                >
                  Crear quiz
                </Link>
              </div>
            )}
    
            <DeleteQuizModal />
          </>
        );
}