import { useDispatch } from "react-redux"
import "./styles.scss"
import { Rowtemperature } from "./RowTemperature"
import { addTemperature, deleteAll, minusIncrementTemperature, plusIncrementTemperature } from "@/redux/features/eosSlice"
import Panel from "./Panel"
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid"


type TemperaturesProps = {
    temperatures: {
      data: number[]
      increment: number
    }
}


export default function Temperatures({temperatures}: TemperaturesProps) {
  const dispatch = useDispatch()

  const increment = temperatures.increment

  const buttonTSX = (
    <button 
      className="panel-button beveled"
      onClick={() => {
        const defaultTemperature: unknown = temperatures.data[temperatures.data.length-1]
        dispatch(addTemperature((parseFloat(defaultTemperature as string) || 0) + increment))
      }}
      >
      Añadir Temperatura
    </button>
  )

  const incrementTSX = (
    <div className="flex items-center justify-between border-t-accent-300/40 border-b-accent-300/40 border-r-accent-300/70 border-l-accent-300/70 rounded-[32px] border-4 text-accent-100 ">
      <button onClick={() => dispatch(minusIncrementTemperature())}>
        <MinusCircleIcon className="w-8 h-8" />
      </button>
      <span className="max-w-16u block w-12u p-0 text-center border-0 bg-transparent">{temperatures.increment}</span>
      <button onClick={() => dispatch(plusIncrementTemperature())}>
        <PlusCircleIcon className="w-8 h-8" />
      </button>
  </div>
  )

  const deleteAllTSX = (
    <button className="panel-button beveled" onClick={() => {dispatch(deleteAll("temperatures"))}}>
      Borrar Todo
    </button>
  )

  return (
    <Panel button={buttonTSX} increment={incrementTSX} deleteAll={deleteAllTSX}>
      <div className={`text-white border-b-2 border-accent-500 bg-accent-300/80 cursor-context-menu w-[70%]`}>
        <div className='text-center'>Isotermas (K)</div>
      </div>
      <div className="panel-temperature-content overflow-auto">
        {temperatures.data.map((temperature, temperatureIndex) => (
            <Rowtemperature temperatureIndex={temperatureIndex} temperature={temperature}  key={temperatureIndex} dispatch={dispatch}/>
        ))}
      </div>
    </Panel>
  )
}