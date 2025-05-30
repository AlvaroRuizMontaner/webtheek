import { useDispatch } from "react-redux"
import "./styles.scss"
import { Gas, SystemState } from '@/types/eos'
import { addGas, deleteGas, editGasMolarfraction } from "@/redux/features/eosSlice"
import { ChangeEvent, useState } from "react"
import Button from "../button/Button"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/20/solid"

type RowProps = {
    gas: Gas
    gasIndex: number
    dispatch: Dispatch<UnknownAction>
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

const defaultGas: Gas = {
    name: "-",
    Tc: 0,
    Pc: 0,
    omega: 0,
    formula: "-",
    molarMass: 0,
    molarFraction: 0
}

const rowClassName = "grid grid-cols-4 justify-center"

function Row({gas, gasIndex, dispatch}: RowProps) {

  const [rowName, setRowName] = useState(defaultGas.name)
  const [isRowNameEditable, setIsRowNameEditable] = useState(false)
  const [showIcons, setShowIcons] = useState(false)

  const handleInput = (gasIndex: number) => (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(editGasMolarfraction({newMolarFraction: e.target.value, gasIndex }))
  }
  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setRowName(e.target.value)
    dispatch(editGasMolarfraction({newMolarFraction: e.target.value, gasIndex }))
  }

  return (
    <div className="relative" onMouseOver={() => setShowIcons(true)} onMouseOut={() => setShowIcons(false)}>
      <div key={"Row" + gasIndex} className={`${rowClassName} cursor-context-menu`} >
        <p className='text-center'>
          {isRowNameEditable ? <input onChange={handleNameInput} className=" body3 p-0 block w-full text-center h-full cursor-text" type="text" value={rowName} /> : <span>{gas.name}</span>}
        </p>
        <p className='text-center'>{gas.formula}</p>
        <p className='text-center'>{gas.molarMass}</p>
        <p className=''>
          <input onChange={handleInput(gasIndex)} className=" body3 p-0 border-0 block w-full text-center h-full cursor-text" type="text" value={gas.molarFraction} />
        </p>
      </div>
      {showIcons && <div className='absolute right-0 top-0 !mt-0 flex bg-gray-100'>
          <PencilSquareIcon onClick={() => setIsRowNameEditable(true)} className='w-6 h-6 text-accent-warning-400 cursor-pointer' />
          <XMarkIcon onClick={() => dispatch(deleteGas({gasIndex}))} className='w-6 h-6 text-accent-danger-400 cursor-pointer' />
      </div>}
    </div>
  )
}

export default function Table({gases}: TableProps) {
  const dispatch = useDispatch()
  return (
    <section className="flex flex-col gap-8u">
      <Button text="Añadir Gas" onClick={() => dispatch(addGas(defaultGas))} />
      <div className="grid bg-white eos-table">
        <div className={`${rowClassName} bg-primary-300 cursor-context-menu`}>
          <p className='text-center'>{defaultValues.name}</p>
          <p className='text-center'>{defaultValues.formula}</p>
          <p className='text-center'>{defaultValues.molarMass}</p>
          <p className='text-center'>{defaultValues.molarFraction}</p>
        </div>
        {gases.map((gas, gasIndex) => {
            return(
                <Row gasIndex={gasIndex} key={gasIndex} gas={gas} dispatch={dispatch}/>
            )
        })}
      </div>
    </section>
  )
}
