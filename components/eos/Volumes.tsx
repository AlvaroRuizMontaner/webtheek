import { useDispatch } from "react-redux"
import "./styles.scss"
import { addVolume, deleteAll, minusIncrementVolume, plusIncrementVolume } from "@/redux/features/eosSlice"
import Panel from "./Panel"
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid"
import { RowVolume } from "./RowVolume"


type VolumesProps = {
    volumes: {
      data: number[]
      increment: number
    }
}


export default function Volumes({volumes}: VolumesProps) {
  const dispatch = useDispatch()

  const increment = volumes.increment

  const buttonTSX = (
    <button 
      className="panel-button beveled"
      onClick={() => {
        const defaultTemperature: unknown = volumes.data[volumes.data.length-1]
        dispatch(addVolume((parseFloat(defaultTemperature as string) || 0) + increment))
      }}
      >
      Añadir Volumen
    </button>
  )

  const incrementTSX = (
    <div className="flex items-center justify-between border-t-accent-300/40 border-b-accent-300/40 border-r-accent-300/70 border-l-accent-300/70 rounded-[32px] border-4 text-accent-100 ">
      <button onClick={() => dispatch(minusIncrementVolume())}>
        <MinusCircleIcon className="w-8 h-8" />
      </button>
      <span className="max-w-20 block w-20u p-0 text-center border-0 bg-transparent">{volumes.increment}</span>
      <button onClick={() => dispatch(plusIncrementVolume())}>
        <PlusCircleIcon className="w-8 h-8" />
      </button>
  </div>
  )

    const deleteAllTSX = (
      <button className="panel-button beveled" onClick={() => {dispatch(deleteAll("volumes"))}}>
        Borrar Todo
      </button>
    )

  return (
    <Panel button={buttonTSX} increment={incrementTSX} deleteAll={deleteAllTSX}>
      <div className={`text-white border-b-2 border-accent-500 bg-accent-300/80 cursor-context-menu w-[70%]`}>
        <div className='text-center'>Volume data (Pa)</div>
      </div>
      <div className="panel-temperature-content overflow-auto">
        {volumes.data.map((volume, volumeIndex) => (
          <RowVolume volumeIndex={volumeIndex} volume={volume}  key={volumeIndex} dispatch={dispatch}/>
        ))}
      </div>
    </Panel>
  )
}