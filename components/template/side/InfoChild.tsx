import React from 'react'
import EditableMain from './EditableSideMain'

type InfoChildProps = {
    pageNumber: number
    infoChild: any
    infoChildIndex: number
    bodyChildIndex: number
    handleOnFocus: () => void
    handleOnBlur: () => void
}

export default function InfoChild({pageNumber, infoChild, infoChildIndex, bodyChildIndex, handleOnFocus, handleOnBlur}: InfoChildProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className=" text-[14px] flex gap-2">
        {infoChild.icon.name && (
          <span className={infoChild.icon.className}>{infoChild.icon.name}</span>
        )}{" "}
        <EditableMain pageNumber={pageNumber} infoChild={infoChild} infoChildIndex={infoChildIndex} bodyChildIndex={bodyChildIndex} handleOnFocus={handleOnFocus} handleOnBlur={handleOnBlur}/>
        {infoChild.main && infoChild.aux && <span className="text-gray-400 font-bold">{infoChild.aux}</span>}
      </div>
      {infoChild.bar && (
        <div className="h-5 w-full bg-indigo-400 mb-2">
          <div style={{ width: infoChild.bar }} className={`h-full bg-blue-500`}></div>
        </div>
      )}
    </div>
  );
}
