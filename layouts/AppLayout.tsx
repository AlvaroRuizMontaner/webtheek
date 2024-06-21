import React, { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu';
import Link from 'next/link';
import Redirect from '@/components/Redirect';

interface AppLayoutProps {
    children: React.ReactNode
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
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <NavMenu/>
        </div>
      </header>

      <Redirect />

      <section className=" max-w-screen-2xl mx-auto mt-10 p-5">
          {children}
      </section>

      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>

      <ToastContainer
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      />
    </>
  );
}
