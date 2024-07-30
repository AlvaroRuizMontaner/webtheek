"use client"
import { Fragment } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useQueryClient } from '@tanstack/react-query'


export default function NavMenu(): JSX.Element {

  const queryClient = useQueryClient()

  const {data} = useAuth()

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN")
    queryClient.invalidateQueries({queryKey: ["user"]})
  }


  return (
    <Popover className="">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-primary">
        <Bars3Icon className='w-8 h-8 text-white ' />
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-0 sm:left-auto sm:right-0 z-10 px-4 full-width-with-bar mt-5 flex">
          <div className=" shrink rounded-xl w-full bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            {data && <p className='sm:text-center px-2 sm:px-0'>Hola: {data.name}</p>}
            <Link
              href='/profile'
              className='block p-2 hover:text-purple-950'
            >Mi Perfil</Link>
            <Link
              href='/'
              className='block p-2 hover:text-purple-950'
            >Mis Proyectos</Link>
            <button
              className='block p-2 hover:text-purple-950'
              type='button'
              onClick={logout}
            >
              Cerrar Sesión
            </button>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}