import { useDispatch } from "react-redux"
import "./styles.scss"
import { Gas, SystemState } from '@/types/eos'
import { addGas } from "@/redux/features/eosSlice"
import { Row, rowClassName } from "./Row"
import { useEffect, useState } from "react"
import Sumatory from "./Sumatory"
import Panel from "./Panel"


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

  const buttonTSX = (
    <button 
      className="panel-button beveled"
      onClick={() => {
        dispatch(addGas(defaultGas))
        setControlledGases(prev => [...prev, defaultGas])
      }}
      >
      Añadir Gas
    </button>
  )

  return (
    <Panel button={buttonTSX}>
      <div className="panel-content overflow-auto">
        <div className={`${rowClassName} text-white w-full border-b-2 border-accent-500 bg-accent-300/80 cursor-context-menu`}>
          <div className='text-center'>{defaultValues.name}</div>
          <div className='text-center'>{defaultValues.formula}</div>
          <div className='text-center'>{defaultValues.molarFraction}</div>
        </div>
        {gases.map((gas, gasIndex) => {
          return(
            <Row gasIndex={gasIndex} controlledGas={controlledGases[gasIndex]} setControlledGases={setControlledGases} key={gasIndex} gas={gas} dispatch={dispatch}/>
          )
        })}
        <Sumatory gases={gases} />
      </div>
    </Panel>
  )
}