import { useDispatch } from "react-redux"
import "./styles.scss"
import { Gas, SystemState } from '@/types/eos'
import { addGas } from "@/redux/features/eosSlice"
import Button from "../button/Button"
import { Row, rowClassName } from "./Row"
import { useEffect, useState } from "react"
import Sumatory from "./Sumatory"


type TableProps = {
  gases: SystemState["gases"]
}


const defaultValues: Record<string, string> = {
  name: "Nombre",
  formula: "Fórmula",
  molarMass: "M (Kg/mol)",
  molarFraction: "χ",
}

const defaultGas: Gas = {
    name: "-",
    Tc: 0,
    Pc: 0,
    omega: 0,
    formula: "-",
    molarMass: 0,
    molarFraction: 0
}


export default function Table({gases}: TableProps) {
  const dispatch = useDispatch()

  const [controlledGases, setControlledGases] = useState(gases)

  // Sincronizar el estado local cuando el estado de Redux cambie
  useEffect(() => {
    setControlledGases(gases)
  }, [gases])

  return (
    <section className="flex flex-col gap-8u">
      <div className="grid bg-white eos-table">
        <div className={`${rowClassName} bg-primary-300 cursor-context-menu`}>
          <div className='text-center cell'>{defaultValues.name}</div>
          <div className='text-center cell'>{defaultValues.formula}</div>
          <div className='text-center cell'>{defaultValues.molarFraction}</div>
        </div>
        {gases.map((gas, gasIndex) => {
          return(
            <Row gasIndex={gasIndex} controlledGas={controlledGases[gasIndex]} setControlledGases={setControlledGases} key={gasIndex} gas={gas} dispatch={dispatch}/>
          )
        })}
        <Sumatory gases={gases} />
      </div>
      <Button text="Añadir Gas" 
        onClick={() => {
          dispatch(addGas(defaultGas))
          setControlledGases(prev => [...prev, defaultGas])
        }}
      />
    </section>
  )
}
