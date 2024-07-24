import React from 'react'

export default function EncabezadoLateral() {
  return (
    <div className='flex flex-col justify-center gap-5 p-[1.25rem] bg-fuchsia-800 text-white'>
        <div className='flex justify-center'>
            <img src="https://imgur.com/a/ASWUOet" alt="" width={100} height={100}/>
        </div>

        <h1 className=' text-2xl text-center font-bold'>Álvaro Ruiz Montaner</h1>

        <p className='text-center text-gray-400'>Self taught front-dev</p>
        <p className='text-center text-gray-400'>08-04-1994</p>
    </div>
  )
}
