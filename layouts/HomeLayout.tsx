"use client"
import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Logo from '@/components/Logo';
import Link from 'next/link';
import DesktopNav from '@/components/Nav/DesktopNav';
import Footer from '@/components/footer/Footer';
import MobileNav from '@/components/Nav/MobileNav';
import ScrollCollapse from '@/components/scroll-colapse/Scroll-collapse';


interface AppLayoutProps {
    children: React.ReactNode
}

export default function HomeLayout({children}: AppLayoutProps): ReactNode {

/*   getSectionFromRouter */

  if (typeof window !== 'undefined') {
    //useInertialScrollDesktop()
    //useInertialScrollMobile()
  }
    

  return (
    <>
      <ScrollCollapse placeholder={{color: "dark"}}>
        <header className=" bg-primary-900 py-2u">
          <div
            className="max-w-screen-2xl mx-auto flex gap-6
              justify-between items-center container"
          >
            <div className="w-24">
              <Link className='h-full' href="/">
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
      </ScrollCollapse>

      {/* <Redirect /> */}

      {children}

      <Footer/>

      <ToastContainer
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      />
    </>
  );
}
