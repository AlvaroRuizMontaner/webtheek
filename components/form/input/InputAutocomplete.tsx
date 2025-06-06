import { editGasByIndex } from '@/redux/features/eosSlice'
import { Gas } from '@/types/eos'
import { Dispatch as ReduxDispatch, UnknownAction } from '@reduxjs/toolkit'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

type InputAutocompleteProps = {
    showSuggestions: boolean
    setSuggestions: Dispatch<SetStateAction<Gas[]>>
    resetSuggestions: () => void
    suggestions: Gas[]
    handleInput: (gasIndex: number)  => (e: ChangeEvent<HTMLInputElement>) => void
    value: string
    gasIndex: number
    dispatch: ReduxDispatch<UnknownAction>
}

export default function InputAutocomplete({showSuggestions, resetSuggestions, suggestions, handleInput, value, gasIndex, dispatch}: InputAutocompleteProps) {
  
    const handleSuggestionClick = ( sugIndx: number) => {
       dispatch(editGasByIndex({ gasIndex, gas: suggestions[sugIndx] }))
    }

  
    return (
        <span className="relative block">
            <input
                onChange={handleInput(gasIndex)}
                className="body3 p-0 border-0 w-full text-center cursor-text"
                type="text"
                value={value}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto shadow-md">
                    {suggestions.map((s, sugIdx) => (
                    <li
                        key={sugIdx}
                        className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                            handleSuggestionClick(sugIdx)
                            resetSuggestions()
                        }}
                    >
                        {s.name}
                    </li>
                    ))}
                </ul>
            )}
    </span>
  )
}
