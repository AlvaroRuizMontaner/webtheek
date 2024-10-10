"use client"
import React from 'react'
import { navItemsInfo } from './navItems.info'
import DesktopNavItem from './DesktopNavItem'

export default function DesktopNav() {
  return (
    <div className='text-white flex gap-10 md:gap-14 items-center h-full justify-between'>
        {navItemsInfo.map((item, index) => (
            <div key={index} className="h-full flex items-center">
              <DesktopNavItem
                {...item}
              />
            </div>
        ))}
    </div>
  )
}
