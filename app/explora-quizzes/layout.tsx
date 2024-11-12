import Footer from '@/components/footer/Footer';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Crea y comparte quizzes o cuestionarios online gratis | Quizzes o cuestionarios interactivos para amigos y estudiantes | Webtheek",
    description: "Crea quizzes o cuestionarios online gratis de manera rápida y sencilla para compartir con amigos, estudiantes o compañeros de clase. Webtheek te permite diseñar quizzes personalizados para una experiencia de aprendizaje y diversión interactiva.",
    icons: {
      icon: "/logosinborde.png",
    },
    openGraph: {
      images: [
        {
          url: "https://webtheek.com/logosinborde.png",
          width: 1200,  // Opcional, pero recomendable
          height: 630,  // Opcional, pero recomendable
          alt: "Logo de Webtheek, plataforma para crear y compartir quizzes online",  // Opcional pero recomendado
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
