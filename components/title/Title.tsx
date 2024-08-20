import React, { ReactNode } from 'react'

type TitleProps = {
    children: ReactNode
}

export default function Title({children}: TitleProps) {
  return (
    <h1 className="headline1 font-black text-primary-200">{children}</h1>
  )
}
