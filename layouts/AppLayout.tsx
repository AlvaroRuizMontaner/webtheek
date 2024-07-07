import React, { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu';
import Link from 'next/link';
import Redirect from '@/components/Redirect';
import Footer from '@/components/Footer';

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout({children}: AppLayoutProps): ReactNode {

  return (
    <>
      <header className=" bg-accent py-5">
        <div
          className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row
            justify-between items-center container"
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

      <section className=" max-w-screen-2xl flex-1 mx-auto mt-10 container">
          {children}
      </section>

      <Footer/>

{/*       <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer> */}

      <ToastContainer
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      />
    </>
  );
}
