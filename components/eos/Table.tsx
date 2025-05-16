import React from 'react'
import { ElementData } from '../gases/constantes'
import "./eos.scss"

type lol = {
  molarFraction: number
}

type Substance = Pick<ElementData, "name" | "formula" | "molarMass"> & lol

type RowProps = {
    substance: Substance
    substanceIndex: number
}

type TableProps = {
    data: Substance[]
}

const defaultValues: Record<string, string> = {
  name: "Nombre",
  formula: "Fórmula",
  molarMass: "M (Kg/mol)",
  molarFraction: "Fracción Molar",
}

const rowClassName = "grid grid-cols-4 justify-center"

function Row({substance, substanceIndex}: RowProps) {
  return (
    <div key={"Row" + substanceIndex} className={`${rowClassName}`}>
        <p className='text-center'>{substance.name}</p>
        <p className='text-center'>{substance.formula}</p>
        <p className='text-center'>{substance.molarMass}</p>
        <p className='text-center'>{substance.molarFraction}</p>
    </div>
  )
}

export default function Table({data}: TableProps) {
  return (
    <section className="grid my-8u bg-white eos-table">
        <div className={`${rowClassName} bg-primary-300`}>
          <p className='text-center'>{defaultValues.name}</p>
          <p className='text-center'>{defaultValues.formula}</p>
          <p className='text-center'>{defaultValues.molarMass}</p>
          <p className='text-center'>{defaultValues.molarFraction}</p>
        </div>
        {data.map((substance, substanceIndex) => {
            return(
                <Row substanceIndex={substanceIndex} key={substanceIndex} substance={substance}/>
            )
        })}
    </section>
  )
}
