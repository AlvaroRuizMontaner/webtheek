import Spinner from '@/components/spinners/Spinner'
import React from 'react'

type SubmitInputProps = {
    isLoading: boolean
    value: string
    disabled?: boolean
    className?: string
}

export default function SubmitInput({isLoading, value, disabled=false, className}: SubmitInputProps) {
  return (
    <div className={
      `${className} bg-accent-500 hover:bg-accent-700 w-full justify-center h-[52px] flex text-white text-xl
      cursor-pointer relative rounded-md transition-color duration-300
      ${disabled ? "opacity-60" : "opacity-100"}`
      }>
        {!isLoading ? <input
        type="submit"
        value={value}
        disabled={disabled}
        className="w-full h-full p-3 cursor-pointer block"
        /> : <Spinner />}
    </div>
  )
}
