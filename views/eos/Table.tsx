import { useDispatch } from "react-redux"
import "./eos.scss"
import { Gas, SystemState } from '@/types/eos'
import { editGasMolarfraction } from "@/redux/features/eosSlice"
import { ChangeEvent } from "react"

type RowProps = {
    gas: Gas
    gasIndex: number
}

type TableProps = {
  gases: SystemState["gases"]
}


const defaultValues: Record<string, string> = {
  name: "Nombre",
  formula: "Fórmula",
  molarMass: "M (Kg/mol)",
  molarFraction: "Fracción Molar",
}

const rowClassName = "grid grid-cols-4 justify-center"

function Row({gas, gasIndex}: RowProps) {
  const dispatch = useDispatch()

  const handleInput = (gasIndex: number) => (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    dispatch(editGasMolarfraction({newMolarFraction: e.target.value, gasIndex }))
  }

  return (
    <div key={"Row" + gasIndex} className={`${rowClassName}`}>
        <p className='text-center'>{gas.name}</p>
        <p className='text-center'>{gas.formula}</p>
        <p className='text-center'>{gas.molarMass}</p>
        <p className=''>
          <input onChange={handleInput(gasIndex)} className="p-0 border-0 block w-full text-center h-full" type="text" value={gas.molarFraction} />
        </p>
    </div>
  )
}

export default function Table({gases}: TableProps) {
  return (
    <section className="grid bg-white eos-table">
      <div className={`${rowClassName} bg-primary-300`}>
        <p className='text-center'>{defaultValues.name}</p>
        <p className='text-center'>{defaultValues.formula}</p>
        <p className='text-center'>{defaultValues.molarMass}</p>
        <p className='text-center'>{defaultValues.molarFraction}</p>
      </div>
      {gases.map((gas, gasIndex) => {
          return(
              <Row gasIndex={gasIndex} key={gasIndex} gas={gas}/>
          )
      })}
    </section>
  )
}
