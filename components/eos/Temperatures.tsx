import { useDispatch } from "react-redux"
import "./styles.scss"
import { useState } from "react"
import { Rowtemperature } from "./RowTemperature"
import { addTemperature } from "@/redux/features/eosSlice"


type TemperaturesProps = {
    temperatures: number[]
}


export default function Temperatures({temperatures}: TemperaturesProps) {
  const dispatch = useDispatch()

  const [mod] = useState(20)

  return (
    <section className="relative">
      <div className="panel-temperature-container text-accent-100 py-[6%]">
        <div className="panel-temperature-content">
          {temperatures.map((temperature, temperatureIndex) => (
              <Rowtemperature temperatureIndex={temperatureIndex} temperature={temperature}  key={temperatureIndex} dispatch={dispatch}/>
          ))}
        </div>
        <div className="hidden md:flex justify-center">
          <button 
            className="panel-button beveled"
            onClick={() => {
              const defaultTemperature: unknown = temperatures[temperatures.length-1]
              dispatch(addTemperature((parseFloat(defaultTemperature as string) || 0) + mod))
            }}
            >
            Añadir Temperatura
          </button>
        </div>
      </div>
      <div className=" bg-accent-900 flex md:hidden justify-center">
          <button 
            className="panel-button beveled"
            onClick={() => {
              const defaultTemperature: unknown = temperatures[temperatures.length-1]
              dispatch(addTemperature((parseFloat(defaultTemperature as string) || 0) + mod))
            }}
            >
            Añadir Temperatura
          </button>
        </div>
    </section>
  )
}