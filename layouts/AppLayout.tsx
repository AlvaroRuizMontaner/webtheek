"use client"
import React, { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Logo from '@/components/Logo'
import NavMenu from '@/components/Nav/NavMenu';
import Link from 'next/link';
import Footer from '@/components/Footer';
import DesktopNav from '@/components/Nav/DesktopNav';
import { getSectionFromRouter } from '@/utils/router';

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout({children}: AppLayoutProps): ReactNode {

  getSectionFromRouter

  return (
    <>
      <header className=" bg-dark-primary py-5">
        <div
          className="max-w-screen-2xl mx-auto flex sm:flex-row gap-6
            justify-between items-center container"
        >
          <div className="w-14">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <section className='w-full hidden sm:block'>
            <DesktopNav />
          </section>

          <section className='sm:hidden'>
            <NavMenu/>
          </section>
        </div>
      </header>

      {/* <Redirect /> */}

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
