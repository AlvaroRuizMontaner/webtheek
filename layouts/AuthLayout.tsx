import React, { ReactNode } from 'react'

interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout({children}: AuthLayoutProps): ReactNode {
  return (
    <>


      <section className=" max-w-screen-2xl mx-auto mt-10 p-5">
        {children}
      </section>


    </>
  );
}
