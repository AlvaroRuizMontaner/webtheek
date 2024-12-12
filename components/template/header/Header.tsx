import React from 'react'
import EditableName from './EditableName'
import EditableCharge from './EditableCharge'
import EditableBirthday from './EditableBirthday'

type HeaderProps = {
  name?: string
  charge?: string
  birthday?: string
}

export default function Header({name="", charge="", birthday=""}: HeaderProps) {
  return (
    <div className='flex flex-col justify-center gap-3 p-[1.25rem] bg-indigo-800 text-white'>
        <div className='flex justify-center'>
            <img src="https://imagizer.imageshack.com/img923/7400/eoTc6E.png" alt="" width={130}/>
        </div>

        {/* <h1 className=' text-2xl text-center font-bold'>{name}</h1> */}
        <EditableName name={name} />

        {/* <p className='text-center text-gray-400'>{charge}</p> */}
        <EditableCharge charge={charge} />
        <EditableBirthday birthday={birthday} />
        {/* <p className='text-center text-gray-400 h-[20px]'>{birthday}</p> */}
    </div>
  )
}
