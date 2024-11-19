import React from 'react'
import { seccionCuerpoCentralInfoType } from './templates.info'
import "./curriculum.css"

export default function SeccionCuerpoCentral({title, info}: seccionCuerpoCentralInfoType) {
  return (
    <div className='flex flex-col py-[1.25rem] seccion-cuerpo-central'>
        <div className='flex gap-2 items-center relative -translate-x-8'>
            <div className='bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center'>
                <span className={`text-white ${title.classNameIcon}`}>{title.nameIcon}</span>
            </div>
            <h2 className='text-xl text-indigo-700 font-bold uppercase'>{title.text}</h2>
        </div>

        {info.map((el, index) => (
            <div className='subseccion-cuerpo-central' key={index}>
                <p className='font-bold text-blue-900'>{el.main}</p>
                <div className='flex justify-between text-gray-400 text-sm'>
                    <p className=' '>{el.detail}</p>
                    {el.date && <p>{el.date}</p>}
                </div>
                {el.list && (
                    <ul className=' text-[14px] list-disc'>
                        {el.list.map((subEl, subIndex) => (
                            <li key={"" + index + subIndex}>{subEl}</li>
                        ))}
                    </ul>
                )}
            </div>
        ))}
    </div>
  )
}
