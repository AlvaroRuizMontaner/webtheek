"use client"
import Tabs from '@/components/profile/Tabs'
import React, { ReactNode } from 'react'

export default function ProfileLayout({children}:{children: ReactNode}) {
  return (
    <>
        <Tabs/>
        <div>{children}</div>
    </>
  )
}
