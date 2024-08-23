import React, { ReactNode } from 'react'

type LabelProps = {
    children: ReactNode
}

export default function Label({children}: LabelProps) {
  return (
    <label className="bg-white font-bold px-3 rounded-t text-primary-400 border-2 border-primary-700">
        {children}
    </label>
  )
}
