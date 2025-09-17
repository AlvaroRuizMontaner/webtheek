import { deleteVolumeByIndex } from "@/redux/features/eosSlice"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { Dispatch as ReduxDispatch, UnknownAction } from "@reduxjs/toolkit"
import { useState } from "react"

type RowolumeProps = {
    volume: number
    volumeIndex: number
    dispatch: ReduxDispatch<UnknownAction>
}

export const rowvolumeClassName = "grid justify-center"

export function RowVolume({volume, volumeIndex, dispatch}: RowolumeProps) {

  const [showIcons, setShowIcons] = useState(false)


  return (
    <div className="relative max-w-[3rem] sm:max-w-[5rem] lg:max-w-[7rem]" onMouseOver={() => setShowIcons(true)} onMouseOut={() => setShowIcons(false)}>
      <div key={"Row" + volumeIndex} className={`text-center cursor-context-menu`} >
        <span className="bg-transparent body2 p-0 border-0 block w-24 text-center cursor-text">{volume.toExponential(2)}</span>
      </div>
      {showIcons && <div className='absolute -right-6 top-1/2 -translate-y-1/2 !mt-0 flex'>
        <XMarkIcon className='x-icon'
            onClick={() => {dispatch(deleteVolumeByIndex({volumeIndex}))}}
        />
      </div>}
    </div>
  )
}