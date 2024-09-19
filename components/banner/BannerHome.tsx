import React from 'react'
import "./banner-home.scss"
import Button from '../button/Button'

export default function BannerHome() {
  return (
    <section className="banner-home w-full h-[600px]">
      <div className="container grid md:grid-cols-2 h-full">
        <article className="w-fit h-full flex flex-col justify-end md:justify-center">
          <div className='content-banner p-6u sm:p-8u rounded-lg space-y-6u'>
            <ul className='space-y-6u list-disc pl-5 text-lg'>
                <li className="font-bold">Planea y crea proyectos con tu equipo</li>
                <li className="font-bold">Colaborando se llegan a mejores resultados</li>
            </ul>
            <div className='flex justify-center'>
            <Button text="Ir a proyectos" href="/projects" variant='outline' />
            </div>
          </div>
        </article>
        <article></article>
      </div>
    </section>
  );
}
