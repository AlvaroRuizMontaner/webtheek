import { deleteGas, editGasMolarfraction } from "@/redux/features/eosSlice"
import { Gas } from "@/types/eos"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { Dispatch as ReduxDispatch, UnknownAction } from "@reduxjs/toolkit"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import InputAutocomplete from "../form/input/InputAutocomplete"

type RowProps = {
    gas: Gas
    gasIndex: number
    dispatch: ReduxDispatch<UnknownAction>
    controlledGas: Gas
    setControlledGases: Dispatch<SetStateAction<Gas[]>>
}

const gasSuggestions: Gas[] = [
    {
        name: "Carbon Dioxide",
        formula: "CO2",
        molarFraction: 0,
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
        molarFraction: 0,
        molarMass: 0.02802,
        Tc: 126.2,
        Pc: 3.39e6,
        omega: 0.039
    },
    {
        name: "Hydrogen",
        formula: "H2",
        molarFraction: 0,
        molarMass: 0.00201568,
        Tc: 32.938,
        Pc: 12.8e5,
        omega: -0.216
    },
    {
        name: "Water",
        formula: "H2O",
        molarFraction: 0,
        molarMass: 0.01801528,
        Tc: 647.096,
        Pc: 22.064e6,
        omega: 0.344
    },
]

export const rowClassName = "grid grid-cols-3 justify-center"

export function Row({gas, controlledGas, setControlledGases, gasIndex, dispatch}: RowProps) {

  const [showIcons, setShowIcons] = useState(false)
  const [suggestions, setSuggestions] = useState(gasSuggestions)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleMolarFraction = (gasIndex: number) => (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(editGasMolarfraction({newMolarFraction: e.target.value, gasIndex }))
  }

  const handleGasName = (gasIndex: number)  => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setControlledGases((prev) => {
        const prevGases = [...prev]
        const updatedGas = { ...prevGases[gasIndex], name: value }
        prevGases[gasIndex] = updatedGas
        return prevGases
    })

    //Controla los suggestions del autocomplete
    setSuggestions(gasSuggestions.filter(g => g.name.toLowerCase().includes(value.toLowerCase())))
    setShowSuggestions(true)
  }

  const resetSuggestions = () => {
    setShowSuggestions(false)
  }

  const properties = {
    showSuggestions,
    setSuggestions,
    resetSuggestions,
    suggestions,
    handleInput: handleGasName,
    value: /* gas.name */controlledGas.name,
    gasIndex,
    dispatch
  }

  return (
    <div className="relative w-full border-b border-accent-100/10 hover:bg-accent-100/5" onMouseOver={() => setShowIcons(true)} onMouseOut={() => setShowIcons(false)}>
      <div key={"Row" + gasIndex} className={`${rowClassName} cursor-context-menu`} >
        <div className='text-center'>
            <InputAutocomplete {...properties} />
        </div>
        <div className='text-center'>{gas.formula}</div>
        <div className="">
          <input onChange={handleMolarFraction(gasIndex)} className=" body3 p-0 border-0 block w-full text-center h-full cursor-text" type="text" value={gas.molarFraction} />
        </div>
      </div>
      {showIcons && <div className='absolute left-1/3 top-0 !mt-0 flex'>
        <XMarkIcon className='x-icon'
            onClick={() => {
                dispatch(deleteGas({gasIndex}))
                setControlledGases((prev) => {
                    const prevGases = [...prev]
                    return prevGases.filter((_, prevGasIndex) => prevGasIndex !== gasIndex)
                })
            }}
        />
      </div>}
    </div>
  )
}