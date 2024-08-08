import Spinner from '@/components/spinners/Spinner'
import React from 'react'

type SubmitInputProps = {
    isLoading: boolean
    value: string
}

export default function SubmitInput({isLoading, value}: SubmitInputProps) {
  return (
    <div className="bg-info hover:bg-dark-secondary w-full flex justify-center h-[52px] text-white font-black text-xl cursor-pointer relative rounded-md">
        {!isLoading ? <input
        type="submit"
        value={value}
        className="block w-full h-full p-3 cursor-pointer"
        /> : <Spinner />}
    </div>
  )
}
