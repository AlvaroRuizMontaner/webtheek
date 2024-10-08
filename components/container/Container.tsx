import React, { ReactNode } from 'react'

type ContainerProps = {
    children: ReactNode
}

export default function Container({children}: ContainerProps) {
  return (
    <div className='container-element'>
        {children}
    </div>
  )
}
