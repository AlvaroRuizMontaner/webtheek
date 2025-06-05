import { editGasMolarfraction } from '@/redux/features/eosSlice'
import { Gas } from '@/types/eos'
import { Dispatch as ReduxDispatch, UnknownAction } from '@reduxjs/toolkit'
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'

type InputAutocompleteProps = {
    showSuggestions: boolean
    setSuggestions: Dispatch<SetStateAction<Gas[]>>
    setShowSuggestions: Dispatch<SetStateAction<boolean>>
    suggestions: Gas[]
    handleInput: (e: ChangeEvent<HTMLInputElement>) => void
    inputValue: string
    setInputValue: Dispatch<SetStateAction<string>>
    gasIndex: number
    dispatch: ReduxDispatch<UnknownAction>
}

export default function InputAutocomplete({showSuggestions, setShowSuggestions, suggestions, handleInput, inputValue, setInputValue, gasIndex, dispatch}: InputAutocompleteProps) {
  
    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion)
        setShowSuggestions(false)
        dispatch(editGasMolarfraction({ newMolarFraction: suggestion, gasIndex }))
    }

    console.log(showSuggestions && suggestions.length)
  
    return (
        <div className="relative block">
            <input
                onChange={handleInput}
                className="body3 p-0 border-0 w-full text-center cursor-text"
                type="text"
                value={inputValue}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto shadow-md">
                    {suggestions.map((s, idx) => (
                    <li
                        key={idx}
                        className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSuggestionClick(s.name)}
                    >
                        {s.name}
                    </li>
                    ))}
                </ul>
            )}
    </div>
  )
}
