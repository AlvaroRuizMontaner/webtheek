import React from 'react'
import SeccionCuerpoLateral from './SeccionCuerpoLateral'


export default function CuerpoLateral({page}: {page: any[]}) {
  return (
    <div className='flex flex-col justify-center gap-5 p-[1.25rem] text-white'>
      {page.map((seccion, seccionIndx) => (
        <SeccionCuerpoLateral key={seccionIndx} {...seccion} />
      ))}
    </div>
  )
}
