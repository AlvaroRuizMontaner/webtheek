import { deletePressureByIndex } from "@/redux/features/eosSlice"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { Dispatch as ReduxDispatch, UnknownAction } from "@reduxjs/toolkit"
import { useState } from "react"

type RowPressureProps = {
    pressure: number
    pressureIndex: number
    dispatch: ReduxDispatch<UnknownAction>
}

export const rowPressureClassName = "grid justify-center"

export function RowPressure({pressure, pressureIndex, dispatch}: RowPressureProps) {

  const [showIcons, setShowIcons] = useState(false)

/*   const handleChangepressure = (pressureIndex: number) => (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(editPressureByIndex({pressure: e.target.value, pressureIndex }))
  } */

  return (
    <div className="relative max-w-[3rem] sm:max-w-[5rem] lg:max-w-[7rem]" onMouseOver={() => setShowIcons(true)} onMouseOut={() => setShowIcons(false)}>
      <div key={"Row" + pressureIndex} className={`text-center cursor-context-menu`} >
        <span className="bg-transparent body2 p-0 border-0 block w-24 text-center cursor-text">{pressure.toExponential(2)}</span>
      </div>
      {showIcons && <div className='absolute -right-6 top-1/2 -translate-y-1/2 !mt-0 flex'>
        <XMarkIcon className='x-icon'
            onClick={() => {dispatch(deletePressureByIndex({pressureIndex}))}}
        />
      </div>}
    </div>
  )
}