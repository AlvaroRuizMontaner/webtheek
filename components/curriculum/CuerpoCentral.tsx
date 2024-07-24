import React from 'react'
import SeccionCuerpoCentral from './SeccionCuerpoCentral'
import { seccionCuerpocentralInfoType } from './curriculum.info'

export default function CuerpoCentral({page}: {page: seccionCuerpocentralInfoType[]}) {
  return (
    <div className='flex flex-col justify-center gap-10 p-[1.25rem]'>
        {page.map((seccion, seccionIndx) => (
            <SeccionCuerpoCentral key={seccionIndx} {...seccion}/>
        ))}
    </div>
  )
}
