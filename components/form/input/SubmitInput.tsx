import Spinner from '@/components/spinners/Spinner'
import React from 'react'

type SubmitInputProps = {
    isLoading: boolean
    value: string
}

export default function SubmitInput({isLoading, value}: SubmitInputProps) {
  return (
    <div className="bg-accent-500 hover:bg-accent-700 w-full flex justify-center h-[52px] text-white text-xl cursor-pointer relative rounded-md transition-color duration-300">
        {!isLoading ? <input
        type="submit"
        value={value}
        className="block w-full h-full p-3 cursor-pointer"
        /> : <Spinner />}
    </div>
  )
}
