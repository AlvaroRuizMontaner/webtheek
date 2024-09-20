import React, { ReactNode } from 'react'

type TitleProps = {
    children: ReactNode
    variant?: string
    as?: "h1" | "h2" | "h3" | "h4"
    className?: string
}

export default function Title({children, variant="light", as="h1", className=""}: TitleProps) {
  return (
    <>
      {as === "h1" && (
        <h1 className={`headline1 font-black ${variant === "light" ? "text-primary-200" : "text-primary-800"} ${className}`}>
          {children}
        </h1>
      )}
      {as === "h2" && (
        <h2 className={`headline2 font-black ${variant === "light" ? "text-primary-200" : "text-primary-800"} ${className}`}>
          {children}
        </h2>
      )}
      {as === "h3" && (
        <h3 className={`headline3 font-black ${variant === "light" ? "text-primary-200" : "text-primary-800"} ${className}`}>
          {children}
        </h3>
      )}
      {as === "h4" && (
        <h4 className={`headline4 font-black ${variant === "light" ? "text-primary-200" : "text-primary-800"} ${className}`}>
          {children}
        </h4>
      )}
    </>
  )
}
