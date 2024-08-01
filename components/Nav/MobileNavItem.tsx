import React, { useMemo } from 'react'
import { NavItem } from './navItems.info'
import { useQueryClient } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function MobileNavItem({url, name}: NavItem) : JSX.Element {

    console.log(name)

    const queryClient = useQueryClient()
    const path = usePathname()

    const isPath = useMemo(() => path.includes(url!), [path])

    const logout = () => {
      localStorage.removeItem("AUTH_TOKEN")
      queryClient.invalidateQueries({queryKey: ["user"]})
    }

    return (
        <div className={`'cursor-pointer' ${isPath && "border-b-2 border-primary w-32"}`}>
            {(url || url === "") ? (
                <Link className='block p-2 hover:text-purple-950' href={`/${url}`}>{name}</Link>
            ): (
                <button className='block p-2 hover:text-purple-950' onClick={logout}>{name}</button>
            )}
        </div>
    )
}
