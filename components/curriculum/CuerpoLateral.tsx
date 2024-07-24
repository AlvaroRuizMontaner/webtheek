import React from 'react'
import SeccionCuerpoLateral from './SeccionCuerpoLateral'
import { seccionCuerpoLateralInfoType } from './curriculum.info'


export default function CuerpoLateral({page}: {page: seccionCuerpoLateralInfoType[]}) {
  return (
    <div className='flex flex-col justify-center gap-5 p-[1.25rem] text-white'>
      {page.map((seccion, seccionIndx) => (
        <SeccionCuerpoLateral key={seccionIndx} {...seccion} />
      ))}
    </div>
  )
}
