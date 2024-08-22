import React, { ReactNode } from 'react'

export default function ErrorMessage({children}: {children: ReactNode}): JSX.Element {
  return (
    <div className='text-center my-4 bg-accent-danger-100 text-accent-danger-400 font-bold p-3 uppercase text-sm'>
        {children}
    </div>
  )
}
