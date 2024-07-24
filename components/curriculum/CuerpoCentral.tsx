import React from 'react'
import SeccionCuerpoCentral from './SeccionCuerpoCentral'
import { seccionCuerpoCentralCareerProfileInfo, seccionCuerpoCentralEducacionInfo, seccionCuerpoCentralExperienceInfo, seccionCuerpoCentralProyectosInfo } from './curriculum.info'

export default function CuerpoCentral() {
  return (
    <div className='flex flex-col justify-center gap-10 p-[1.25rem]'>
        <SeccionCuerpoCentral {...seccionCuerpoCentralEducacionInfo}/>
        <SeccionCuerpoCentral {...seccionCuerpoCentralCareerProfileInfo} />
        <SeccionCuerpoCentral {...seccionCuerpoCentralExperienceInfo}/>
        <SeccionCuerpoCentral {...seccionCuerpoCentralProyectosInfo}/>
    </div>
  )
}
