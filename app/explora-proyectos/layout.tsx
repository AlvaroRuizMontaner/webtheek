import Footer from '@/components/footer/Footer';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Gestiona tus tareas y proyectos online | Webtheek - Biblioteca de Recursos Web",
    description: "Organiza y gestiona tus tareas y proyectos de forma gratuita con Webtheek. Crea proyectos con tableros organizativos y un backlog para almacenar tareas futuras. Todo lo que necesitas para la gestión eficaz de tareas en un solo lugar."
,
    icons: {
      icon: "/logosinborde.png",
    },
    openGraph: {
      images: [
        {
          url: "https://webtheek.com/logosinborde.png",
          width: 1200,  // Opcional, pero recomendable
          height: 630,  // Opcional, pero recomendable
          alt: "Logo de Webtheek, plataforma de gestión de tareas y proyectos",  // Opcional pero recomendado
        }
      ],
    }
};

export default function Layout({children}: {children: JSX.Element}): JSX.Element {

  return (
    <>
        {children}
        <Footer />
    </>
  );
}
