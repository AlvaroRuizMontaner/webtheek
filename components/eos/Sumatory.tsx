import { Gas } from '@/types/eos'
import React from 'react'
import { rowClassName } from './Row'

type SumatoryProps = {
    gases: Gas[]
}

export default function Sumatory({gases}: SumatoryProps) {

  const sum = gases.reduce((acc, gas) => {
    const molarFraction: unknown = gas.molarFraction
    return acc + parseFloat(molarFraction as string)
  }, 0)

  return (
    <div className="relative w-full text-accent-300">
        <div key={"RowTotal"} className={`${rowClassName} cursor-context-menu`} >
            <div className='text-center cell border-black'></div>
            <div className='text-center cell col-start-2 bg'>Total</div>
            <div className={`text-center cell col-start-3 ${sum > 1 ? "bg-accent-danger-300/0." : "white"}`}>{sum}</div>
        </div>
    </div>
  )
}
