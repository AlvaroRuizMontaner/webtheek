import React, { useEffect, useMemo, useState } from 'react'
import { NavItem } from './navItems.info'
import { useQueryClient } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function MobileNavItem({url, name}: NavItem) : JSX.Element {

    const [isLogged, setIsLogged] = useState(false)

  
    useEffect(() => {
      let token = ""
      if (typeof window !== 'undefined') {
        token = localStorage.getItem("AUTH_TOKEN")!
        if(token) setIsLogged(true)
      }
    },[isLogged])

    const queryClient = useQueryClient()
    const path = usePathname()

    const isPath = useMemo(() => path.includes(url!), [path])

    const logout = () => {
        setIsLogged(false)
      localStorage.removeItem("AUTH_TOKEN")
      queryClient.invalidateQueries({queryKey: ["user"]})
    }

    return (
      <div
        className={`cursor-pointer text-white ${isPath && " border-b-2 !text-accent-warning-300 border-accent-warning-300 w-fit"}`}
      >
        {url || url === "" ? (
          <div className="w-fit p-2">
            <Link className="hover:text-accent-warning-500" href={`/${url}`}>
              {name}
            </Link>
          </div>
        ) : isLogged ? (
          <button className="p-2 hover:text-accent-warning-500" onClick={logout}>
            {name}
          </button>
        ) : (
          <div className="w-fit p-2">
            <Link href={"/auth/login"} className="hover:text-accent-warning-500">
              Iniciar sesión
            </Link>
          </div>
        )}
      </div>
    );
}
