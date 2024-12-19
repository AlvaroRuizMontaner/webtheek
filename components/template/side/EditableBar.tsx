import { editBarWidth } from '@/redux/features/curriculumSlice'
import { useAppDispatch } from '@/redux/hooks'
import React, { useState } from 'react'

type EditableBarProps = {
    barWidth: string
    infoChildIndex: number
    bodyChildIndex: number
    pageNumber: number
}

function makeNumberToStringPercentage(param: number) {
    return (param.toString() + "%")
}
function makeStringPercentageToNumber(param: string) {
    return parseInt(param.replace("%", ""))
}



export default function EditableBar({barWidth, pageNumber, infoChildIndex, bodyChildIndex}: EditableBarProps) {
    const [showInput, setShowInput] = useState(false)
    const [width, setWidth] = useState(() => makeStringPercentageToNumber(barWidth))
    const dispatch = useAppDispatch()

    function handleOnBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
        dispatch(editBarWidth({pageNumber, bodyChildIndex, infoChildIndex, barWidth: e.target.value + "%"}))
        setShowInput(false)
    }

  return (
    <div className="h-5 w-full bg-indigo-400 mb-2 relative">
      <label
        style={{ width: makeNumberToStringPercentage(width)}}
        htmlFor={"bar" + infoChildIndex}
        className={`h-full bg-blue-500 block cursor-pointer`}
        onClick={() => setShowInput(true)}
      ></label>
      <input
        onChange={(e) => setWidth(parseInt(e.target.value))}
        onBlur={handleOnBlur}
        className={`absolute text-black p-1 h-12 w-12 -right-[24px] top-[10px] -translate-y-[50%] translate-x-[100%] ${showInput ? "block" : "hidden"}`}
        type="number"
        name="bar"
        id={"bar" + infoChildIndex}
        value={width}
        min="0"
        max="100"
        step="5"
      />
    </div>
  );
}
