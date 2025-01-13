import { editBarWidth } from '@/redux/features/curriculumSlice'
import { useAppDispatch } from '@/redux/hooks'
import React, { useState } from 'react'

type EditableBarProps = {
    barWidth: string
    infoChildIndex: number
    bodyChildIndex: number
    pageNumber: number
    themeName: string
    isEditable: boolean
}

function makeNumberToStringPercentage(param: number) {
    return (param.toString() + "%")
}
function makeStringPercentageToNumber(param: string) {
    return parseInt(param.replace("%", ""))
}



export default function EditableBar({barWidth, themeName, pageNumber, infoChildIndex, bodyChildIndex, isEditable}: EditableBarProps) {
    const [showInput, setShowInput] = useState(false)
    const [width, setWidth] = useState(() => makeStringPercentageToNumber(barWidth))
    const dispatch = useAppDispatch()

    function handleOnBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
        dispatch(editBarWidth({pageNumber, bodyChildIndex, infoChildIndex, barWidth: e.target.value + "%"}))
        setShowInput(false)
    }

  return (
    <label 
      className={`h-5 w-full offset-bar ${themeName} mb-2 relative cursor-pointer`}
      onClick={isEditable ? () => setShowInput(true) : undefined}
      htmlFor={"bar" + pageNumber + infoChildIndex}
    >
      <div
        style={{ width: makeNumberToStringPercentage(width)}}
        className={`h-full bar ${themeName} block`}
      ></div>
      <input
        onChange={(e) => setWidth(parseInt(e.target.value))}
        onBlur={handleOnBlur}
        className={`absolute text-black p-1 h-12 w-12 -right-[24px] top-[10px] -translate-y-[50%] translate-x-[100%] ${showInput ? "block" : "hidden"}`}
        type="number"
        name="bar"
        id={"bar" + pageNumber + infoChildIndex}
        value={width}
        min="0"
        max="100"
        step="5"
      />
    </label>
  );
}
