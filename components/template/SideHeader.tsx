import React from 'react'

export default function SideHeader() {
  return (
    <div className='flex flex-col justify-center gap-3 p-[1.25rem] bg-indigo-800 text-white'>
        <div className='flex justify-center'>
            <img src="https://imagizer.imageshack.com/img923/7400/eoTc6E.png" alt="" width={130}/>
        </div>

        <h1 className=' text-2xl text-center font-bold'>Álvaro Ruiz Montaner</h1>

        <p className='text-center text-gray-400'>Web Developer</p>
        <p className='text-center text-gray-400 h-[20px]'>08-04-1994</p>
    </div>
  )
}
