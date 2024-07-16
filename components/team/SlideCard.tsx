import React from 'react'
import { CheckIcon } from "@heroicons/react/20/solid";

type SlideCardProps = {
    level: number
}

export default function SlideCard({level}: SlideCardProps) {
  return (
    <div className='p-10 border-gray-300 border-8 rounded-md cursor-pointer shadow-2xl'>
        <div className=' space-y-4'>
            <div className='flex justify-center items-center gap-2'>
                <span className='font-black'>Nivel de permiso: </span>
                <span className="text-white p-2 bg-primary rounded-full w-8 h-8 flex 
                items-center justify-center font-black
                " >{level}</span>
            </div>
            <p>Capacidades:</p>
            <p className='flex items-center justify-center'>
                <span className='w-8 h-8 flex items-center justify-center'><CheckIcon className='w-6 h-6 text-green-500 ' /></span>
                <span>Ver tareas y notas</span>
            </p>
        </div>
    </div>
  )
}
