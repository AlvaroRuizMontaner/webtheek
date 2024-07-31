import React/* , { useMemo } */ from 'react'
import { NavItem } from './navItems.info'
import Link from 'next/link'
import { useQueryClient } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'

export default function DesktopNavItem({name, url}: NavItem) {

    const queryClient = useQueryClient()
    const path = usePathname()

    console.log(path.includes(url!), path, url)
    //const isPath = useMemo(() => path.includes(url!), [path])

    const logout = () => {
      localStorage.removeItem("AUTH_TOKEN")
      queryClient.invalidateQueries({queryKey: ["user"]})
    }

  return (
    <div className='cursor-pointer' /* className={`${isPath && "border-b-2 border-primary"}`} */>
        {(url || url === "") ? (
            <Link href={`/${url}`}>{name}</Link>
        ): (
            <span onClick={logout}>{name}</span>
        )}
    </div>
  )
}
