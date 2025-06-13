import { deleteTemperatureByIndex, editTemperatureByIndex } from "@/redux/features/eosSlice"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { Dispatch as ReduxDispatch, UnknownAction } from "@reduxjs/toolkit"
import { ChangeEvent, useState } from "react"

type RowTemperatureProps = {
    temperature: number
    temperatureIndex: number
    dispatch: ReduxDispatch<UnknownAction>
}

export const rowtemperatureClassName = "grid justify-center"

export function Rowtemperature({temperature, temperatureIndex, dispatch}: RowTemperatureProps) {

  const [showIcons, setShowIcons] = useState(false)

  const handleChangeTemperature = (temperatureIndex: number) => (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(editTemperatureByIndex({temperature: e.target.value, temperatureIndex }))
  }

  return (
    <div className="relative max-w-[3rem] sm:max-w-[5rem] lg:max-w-[7rem]" onMouseOver={() => setShowIcons(true)} onMouseOut={() => setShowIcons(false)}>
      <div key={"Row" + temperatureIndex} className={`text-center cursor-context-menu`} >
        <input onChange={handleChangeTemperature(temperatureIndex)} 
          className="bg-transparent body2 p-0 border-0 block w-full text-center cursor-text"
          type="text" value={temperature}
        />
      </div>
      {showIcons && <div className='absolute right-0  top-1/2 -translate-y-1/2 !mt-0 flex'>
        <XMarkIcon className='x-icon'
            onClick={() => {dispatch(deleteTemperatureByIndex({temperatureIndex}))}}
        />
      </div>}
    </div>
  )
}