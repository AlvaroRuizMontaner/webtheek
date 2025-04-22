"use client"
import Tabs from '@/components/profile/Tabs'
import { FingerPrintIcon, TrophyIcon, UserIcon } from '@heroicons/react/20/solid'
import React, { ReactNode } from 'react'

const tabs = [
  { name: 'Cuenta', href: '/profile', icon: UserIcon },
  { name: 'Cambiar Password', href: '/profile/password', icon: FingerPrintIcon },
  { name: 'Status', href: '/profile/pricing', icon: TrophyIcon },
]

export default function ProfileLayout({children}:{children: ReactNode}) {
  return (
    <>
        <Tabs tabs={tabs}/>
        <div>{children}</div>
    </>
  )
}
