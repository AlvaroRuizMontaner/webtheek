import { useDispatch } from "react-redux"
import "./styles.scss"
import { useState } from "react"
import { Rowtemperature } from "./RowTemperature"
import { addTemperature } from "@/redux/features/eosSlice"
import Panel from "./Panel"


type TemperaturesProps = {
    temperatures: number[]
}


export default function Temperatures({temperatures}: TemperaturesProps) {
  const dispatch = useDispatch()

  const [mod] = useState(20)

  const buttonTSX = (
    <button 
      className="panel-button beveled"
      onClick={() => {
        const defaultTemperature: unknown = temperatures[temperatures.length-1]
        dispatch(addTemperature((parseFloat(defaultTemperature as string) || 0) + mod))
      }}
      >
      Añadir Temperatura
    </button>
  )

  return (
    <Panel button={buttonTSX}>
      <div className="panel-temperature-content">
        {temperatures.map((temperature, temperatureIndex) => (
            <Rowtemperature temperatureIndex={temperatureIndex} temperature={temperature}  key={temperatureIndex} dispatch={dispatch}/>
        ))}
      </div>
    </Panel>
  )
}