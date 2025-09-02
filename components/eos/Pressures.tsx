import { useDispatch } from "react-redux"
import "./styles.scss"
import { addPressure, deleteAll, minusIncrementPressure, plusIncrementPressure } from "@/redux/features/eosSlice"
import Panel from "./Panel"
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid"
import { RowPressure } from "./RowPressure"


type PressuresProps = {
    pressures: {
      data: number[]
      increment: number
    }
}


export default function Pressures({pressures}: PressuresProps) {
  const dispatch = useDispatch()

  const increment = pressures.increment

  const buttonTSX = (
    <button 
      className="panel-button beveled"
      onClick={() => {
        const defaultTemperature: unknown = pressures.data[pressures.data.length-1]
        dispatch(addPressure((parseFloat(defaultTemperature as string) || 0) + increment))
      }}
      >
      Añadir Presión
    </button>
  )

  const incrementTSX = (
    <div className="flex items-center justify-between border-t-accent-300/40 border-b-accent-300/40 border-r-accent-300/70 border-l-accent-300/70 rounded-[32px] border-4 text-accent-100 ">
      <button onClick={() => dispatch(minusIncrementPressure())}>
        <MinusCircleIcon className="w-8 h-8" />
      </button>
      <span className="max-w-20 block w-20u p-0 text-center border-0 bg-transparent">{pressures.increment}</span>
      <button onClick={() => dispatch(plusIncrementPressure())}>
        <PlusCircleIcon className="w-8 h-8" />
      </button>
  </div>
  )

    const deleteAllTSX = (
      <button className="panel-button beveled" onClick={() => {dispatch(deleteAll("pressures"))}}>
        Borrar Todo
      </button>
    )

  return (
    <Panel button={buttonTSX} increment={incrementTSX} deleteAll={deleteAllTSX}>
      <div className={`text-white border-b-2 border-accent-500 bg-accent-300/80 cursor-context-menu w-[70%]`}>
        <div className='text-center'>Pressure data (Pa)</div>
      </div>
      <div className="panel-temperature-content overflow-auto">
        {pressures.data.map((pressure, pressureIndex) => (
            <RowPressure pressureIndex={pressureIndex} pressure={pressure}  key={pressureIndex} dispatch={dispatch}/>
        ))}
      </div>
    </Panel>
  )
}