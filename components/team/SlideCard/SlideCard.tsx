import React from 'react'
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { slideCardInfo } from './SlideCardInfo';

type SlideCardProps = {
    level: number
}

export default function SlideCard({level}: SlideCardProps) {
  return (
    <div className={`
         p-4 sm:p-6 border-gray-300 border-8 rounded-md cursor-pointer
        shadow-gray-500 shadow-md my-5 min-h-[240px] `
    }>
        <div className=' space-y-4'>
            <div className='flex justify-center items-center gap-2'>
                <span className='font-black text-xl'>Nivel de permiso: </span>
                <span className="text-white p-2 bg-primary rounded-full w-8 h-8 flex 
                items-center justify-center font-black shadow-1
                " >{level}</span>
            </div>
            {slideCardInfo.filter((_, filterIndx) => filterIndx+1 <= level).map((msg, index) => (
                <p key={index} className='flex items-center'>
                    <span className='w-8 h-8 flex items-center justify-center'><CheckIcon className='w-6 h-6 text-green-500 ' /></span>
                    <span>{msg}</span>
                </p>
            ))}
            {slideCardInfo.filter((_, filterIndx) => filterIndx+1 > level).map((msg, index) => (
                <p key={index} className='flex items-center'>
                    <span className='w-8 h-8 flex items-center justify-center'><XMarkIcon className='w-6 h-6 text-red-500 ' /></span>
                    <span>{msg}</span>
                </p>
            ))}
        </div>
    </div>
  )
}
