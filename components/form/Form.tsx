import React, { FormEventHandler, ReactNode } from 'react'

type FormProps = {
    children: ReactNode
    onSubmit: FormEventHandler<HTMLFormElement> | undefined
}

export default function Form({children, onSubmit}: FormProps) {
  return (
    <form
        className="space-y-8u p-8u sm:p-12u bg-white"
        noValidate
        onSubmit={onSubmit}
    >
        {children}
    </form>
  )
}
