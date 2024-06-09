import React from 'react'

interface AppLayoutProps {
    children: JSX.Element
}

export default function AppLayout({children}: AppLayoutProps): JSX.Element {
  return (
    <div>
        <header
            className='bg-gray-800 py-5'
        >

        </header>
        {children}
    </div>
  )
}
