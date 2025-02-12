import "./curriculums.scss";
import { useGetCurriculumsQuery } from "@/redux/services/createApiCurriculum";



export default function CurriculumsView() {
    //const router = useRouter()
    //const path = usePathname()
    //const { data: user, isLoading: authLoading } = useAuth()
    const {data, /* isLoading, */ /* error, isFetching */} = useGetCurriculumsQuery(null)
/*     const { data, isLoading } = useQuery({
      queryKey: ["curriculums"],
      queryFn: getCurriculums,
    }); */
  
    if(data) return <div>
      <div>hola</div>
      <div>{data[0]._id}</div>
    </div>
    /* if (isLoading || authLoading) return <Loading />; */
  
    /* if (data && user) */
/*         return (
          <>
            <div className="mb-8u sm:mb-12u">
              <Title variant="dark">Curriculums</Title>
              <Subtitle variant="dark" text="Maneja y administra curriculums" />
    
              <Button text="Nuevo curriculum" href="/curriculums/create" />
            </div>
    
            {data.length ? (
              <ul role="list" className="space-y-8u my-10">
                {data.map((curriculum) => (
                  <li
                    key={curriculum._id}
                    className="flex relative justify-between gap-x-6 curriculum-card bg-white shadow-lg"
                  >
                    <div className="flex min-w-0 gap-x-4 pl-6u py-8u overflow-hidden">
                      <div className="min-w-0 flex-auto space-y-2u">
                        <div className="permissionTagWrapper">
                          <PermissionTag
                            isManager={isManager(curriculum.manager, user._id)}
                          />
                        </div>
                        <div>
                          <Link
                            href={`/curriculums/${curriculum._id}`}
                            className="text-gray-600 cursor-pointer hover:underline headline3 font-bold"
                            id={curriculum._id}
                          >
                            {curriculum.name}
                          </Link>
                        </div> */
                        {/* <p className="text-gray-400">{curriculum.description}</p> */}
{/*                       </div>
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
                                href={`/curriculums/${curriculum._id}`}
                                className="block px-3 py-1 text-sm leading-6 text-gray-900"
                              >
                                Ver curriculum
                              </Link>
                            </MenuItem>
    
                            {isManager(curriculum.manager, user._id) && (
                              <>
                                <MenuItem>
                                  <Link
                                    href={`/curriculums/${curriculum._id}/edit`}
                                    className="block px-3 py-1 text-sm leading-6 text-gray-900"
                                  >
                                    Editar nombre
                                  </Link>
                                </MenuItem>
                                <MenuItem>
                                  <button
                                    type="button"
                                    className="block px-3 py-1 text-sm leading-6 text-red-500"
                                    onClick={() =>
                                      router.push(
                                        path + `?deleteCurriculum=${curriculum._id}`
                                      )
                                    }
                                  >
                                    Eliminar curriculum
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
                  <EmptyState text="No hay curriculums, aún..." />
                </div>
                <Link
                  className=" text-primary-500 font-bold"
                  href="/curriculums/create"
                >
                  Crear curriculum
                </Link>
              </div>
            )}
    
            <DeleteCurriculumModal />
          </>
        ); */}
}