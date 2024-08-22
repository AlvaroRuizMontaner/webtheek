import React, { ReactNode } from 'react'

type TitleProps = {
    children: ReactNode
    variant?: string
}

export default function Title({children, variant="light"}: TitleProps) {
  return (
    <h1 className={`headline1 font-black ${variant === "light" ? "text-primary-200" : "text-primary-800"}`}>{children}</h1>
  )
}
