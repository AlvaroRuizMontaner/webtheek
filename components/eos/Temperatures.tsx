import { useDispatch } from "react-redux"
import "./styles.scss"
import Button from "../button/Button"
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
      <div className="panel-container px-[11%] py-[8%]">
        {temperatures.map((temperature, temperatureIndex) => (
            <Rowtemperature temperatureIndex={temperatureIndex} temperature={temperature}  key={temperatureIndex} dispatch={dispatch}/>
        ))}
      </div>
        <div className="flex justify-center mt-4u">
            <Button text="Añadir Temperatura" 
                onClick={() => {
                    const defaultTemperature: unknown = temperatures[temperatures.length-1]
                    dispatch(addTemperature((parseFloat(defaultTemperature as string) || 0) + mod))
                }}
            />
        </div>
    </section>
  )
}