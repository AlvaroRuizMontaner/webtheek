"use client"
import React from 'react'
import { navItemsInfo } from './navItems.info'
import DesktopNavItem from './DesktopNavItem'

export default function DesktopNav() {
  return (
    <div className='text-white flex gap-14 px-10 items-center h-full w-fit'>
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
