"use client"
import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Logo from '@/components/Logo';
import Link from 'next/link';
import DesktopNav from '@/components/Nav/DesktopNav';
import Footer from '@/components/footer/Footer';
import MobileNav from '@/components/Nav/MobileNav';


interface CurriculumLayoutProps {
    children: React.ReactNode
}

export default function CurriculumLayout({children}: CurriculumLayoutProps): ReactNode {

/*   getSectionFromRouter */

  if (typeof window !== 'undefined') {
    //useInertialScrollDesktop()
    //useInertialScrollMobile()
  }
    

  return (
    <>
      <header className=" bg-primary-900 py-2u relative z-[2]">
        <div
          className="max-w-screen-2xl mx-auto flex sm:flex-row gap-6
            justify-between items-center cv-container"
        >
          <div className="w-24"> {/* flex-shrink-0 */}
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <section className='hidden h-[130px] md:block'>
            <DesktopNav />
          </section>

          <section className='md:hidden'>
            <MobileNav/>
          </section>
        </div>
      </header>

      {/* <Redirect /> */}

      <section className=" max-w-screen-2xl flex-1 mx-auto py-12u container bg-primary-300 -showgrid relative z-[1]">
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
