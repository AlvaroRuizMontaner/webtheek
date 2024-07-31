"use client"
import React from 'react'
import { navItemsInfo } from './navItems.info'
import DesktopNavItem from './DesktopNavItem'

export default function DesktopNav() {
  return (
    <div className='h-full text-white flex gap-14 px-10 w-fit py-4'>
        {navItemsInfo.map((item, index) => (
            <div key={index} className="">
              <DesktopNavItem
                {...item}
              />
            </div>
        ))}
    </div>
  )
}
