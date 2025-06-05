import { deleteGas, editGasMolarfraction } from "@/redux/features/eosSlice"
import { Gas } from "@/types/eos"
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { ChangeEvent, useState } from "react"
import InputAutocomplete from "../form/input/InputAutocomplete"

type RowProps = {
    gas: Gas
    gasIndex: number
    dispatch: Dispatch<UnknownAction>
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

const gasSuggestions: Gas[] = [
    {
        name: "Carbon Dioxide",
        formula: "CO2",
        molarFraction: 0.45,
        molarMass: 0.0440095,
        Tc: 304.1282,
        Pc: 7.3773e6,
        omega: 0.225
    },
    {
        name: "Oxygen",
        formula: "O2",
        molarFraction: 0.55,
        molarMass: 0.031998,
        Tc: 154.581,
        Pc: 5.043e6,
        omega: 0.318
    },
        {
        name: "Nitrogen",
        formula: "N2",
        molarFraction: 0.3,
        molarMass: 0.02802,
        Tc: 126.2,
        Pc: 3.39e6,
        omega: 0.039
    },
    {
        name: "Hydrogen",
        formula: "H2",
        molarFraction: 0.25,
        molarMass: 0.00201568,
        Tc: 32.938,
        Pc: 12.8e5,
        omega: -0.216
    },
    {
        name: "Water",
        formula: "H2O",
        molarFraction: 0.15,
        molarMass: 0.01801528,
        Tc: 647.096,
        Pc: 22.064e6,
        omega: 0.344
    },
]

export const rowClassName = "grid grid-cols-4 justify-center"

export function Row({gas, gasIndex, dispatch}: RowProps) {

  const [rowName, setRowName] = useState(defaultGas.name)
  const [isRowNameEditable, setIsRowNameEditable] = useState(false)
  const [showIcons, setShowIcons] = useState(false)
  const [suggestions, setSuggestions] = useState(gasSuggestions)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleInput = (gasIndex: number) => (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(editGasMolarfraction({newMolarFraction: e.target.value, gasIndex }))
  }
  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRowName(value)

    //Controla los suggestions del autocomplete
    setSuggestions(gasSuggestions.filter(g => g.name.toLowerCase().includes(value.toLowerCase())))
    setShowSuggestions(true)

    dispatch(editGasMolarfraction({newMolarFraction: value, gasIndex }))
  }

  const properties = {
    showSuggestions,
    setShowSuggestions,
    setSuggestions,
    suggestions,
    handleInput: handleNameInput,
    setInputValue: setRowName,
    inputValue: rowName,
    gasIndex,
    dispatch
  }

  return (
    <div className="relative" onMouseOver={() => setShowIcons(true)} onMouseOut={() => setShowIcons(false)}>
      <div key={"Row" + gasIndex} className={`${rowClassName} cursor-context-menu`} >
        <div className='text-center cell'>
          {isRowNameEditable ? <InputAutocomplete {...properties} /> : <span>{gas.name}</span>}
        </div>
        <div className='text-center cell'>{gas.formula}</div>
        <div className='text-center cell'>{gas.molarMass}</div>
        <div className='cell'>
          <input onChange={handleInput(gasIndex)} className=" body3 p-0 border-0 block w-full text-center h-full cursor-text" type="text" value={gas.molarFraction} />
        </div>
      </div>
      {showIcons && <div className='absolute right-0 top-0 !mt-0 flex bg-gray-100'>
        <PencilSquareIcon onClick={() => setIsRowNameEditable(true)} className='w-6 h-6 text-accent-warning-400 cursor-pointer' />
        <XMarkIcon onClick={() => dispatch(deleteGas({gasIndex}))} className='w-6 h-6 text-accent-danger-400 cursor-pointer' />
      </div>}
    </div>
  )
}