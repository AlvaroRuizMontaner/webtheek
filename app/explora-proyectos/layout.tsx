import Footer from '@/components/footer/Footer';
import React from 'react'

export default function Layout({children}: {children: JSX.Element}): JSX.Element {

  return (
    <>
        {children}
        <Footer />
    </>
  );
}
