"use client"
import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Logo from '@/components/Logo';
import Link from 'next/link';
import DesktopNav from '@/components/Nav/DesktopNav';
import MobileNav from '@/components/Nav/NavMenu';
import Footer from '@/components/footer/Footer';


interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout({children}: AppLayoutProps): ReactNode {

/*   getSectionFromRouter */

  if (typeof window !== 'undefined') {
    //useInertialScrollDesktop()
    //useInertialScrollMobile()
  }
    

  return (
    <>
      <header className=" bg-primary-900 py-2u">
        <div
          className="max-w-screen-2xl mx-auto flex sm:flex-row gap-6
            justify-between items-center container"
        >
          <div className="w-24">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <section className='hidden h-[130px] sm:block'>
            <DesktopNav />
          </section>

          <section className='sm:hidden'>
            <MobileNav/>
          </section>
        </div>
      </header>

      {/* <Redirect /> */}

      <section className=" max-w-screen-2xl flex-1 mx-auto my-12u container -showgrid">
          {children}
      </section>

      <Footer/>

      {/* <footer className="py-5">
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
