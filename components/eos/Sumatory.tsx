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
    <div className="relative">
        <div key={"RowTotal"} className={`${rowClassName} cursor-context-menu`} >
            <div className='text-center cell grid col-start-2 border-black'></div>
            <div className='text-center cell grid col-start-3 bg'>Total</div>
            <div className={`text-center cell col-start-4 ${sum > 1 ? "bg-accent-danger-300" : "white"}`}>{sum}</div>
        </div>
    </div>
  )
}
