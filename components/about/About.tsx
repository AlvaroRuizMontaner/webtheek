import React from 'react'
import "./about.scss"

export default function About() {
  return (
    <section className='about'>
        <div className="about-grid container-element">
            <div className='about-text flex flex-col justify-evenly'>
                <h2 className='headline2 text-center text-accent-300 m-0 font-bold'>Herramientas generales</h2>
                <p className='body2 text-white leading-8'>Organiza proyectos, asigna tareas y haz seguimiento fácilmente. Crea cuestionarios personalizados para evaluar y desafiar, y diseña un CV profesional que resalte tus habilidades y experiencia, todo desde una sola plataforma.</p>
            </div>
        </div>
    </section>
  )
}
