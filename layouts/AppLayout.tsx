import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu';
import React, { ReactNode } from 'react'

interface AppLayoutProps {
    children: JSX.Element
}

export default function AppLayout({children}: AppLayoutProps): ReactNode {
  return (
    <>
      <header className=" bg-gray-800 py-5">
        <div
          className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row
            justify-between items-center"
        >
          <div className="w-64">
            <Logo />
          </div>

          <NavMenu/>
        </div>
      </header>
      {children}
    </>
  );
}
