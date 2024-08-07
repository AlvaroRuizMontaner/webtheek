import React, { useEffect, useMemo, useState } from 'react'
import { NavItem } from './navItems.info'
import Link from 'next/link'
import { useQueryClient } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'

export default function DesktopNavItem({name, url}: NavItem) {

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
      console.log(isLogged)
      localStorage.removeItem("AUTH_TOKEN")
      queryClient.invalidateQueries({queryKey: ["user"]})
    }

  return (
    <div className={`'cursor-pointer' ${isPath && "border-b-2 border-primary"}`}>
        {(url || url === "") ? (
            <Link href={`/${url}`}>{name}</Link>
        ): (
          isLogged ? (
            <span className='cursor-pointer' onClick={logout}>{name}</span>
        ): (
            <Link
            href={"/auth/login"}
            className=""
          >
            Iniciar sesión
          </Link>
        )
        )}
    </div>
  )
}
