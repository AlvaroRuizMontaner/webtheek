import { MinusIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { IconType } from 'react-icons/lib'

type AddFunctions = {
  function: (p: any) => void
  icon: IconType
}[]

type ControlBoundaryProps = {
    dispatch: (p: any) => void
    pageNumber: number
    bodyChildIndex: number
    infoChildIndex?: number
    orientation?: "vertical" | "horizontal"
    color: string
    deleteFunction: (p: any) => void
    addFunctions: AddFunctions
    width?: string
}

export default function ControlBoundary({color, width="w-[116.5%]", pageNumber, bodyChildIndex, infoChildIndex, dispatch, deleteFunction, addFunctions, orientation="horizontal"}: ControlBoundaryProps) {

    const verticalClasses = "flex-col top-[50%] py-1"
    const horizontalClasses = "top-0 left-[50%] px-1 flex"
    const orientationClasses = orientation == "vertical" ? verticalClasses : horizontalClasses

    function AddIcon({ icon }: {icon: IconType}) {
      const IconComponent = icon
      return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
    }

  return (
    <div>
      <div className={`border-${color} ${width} absolute border-[3px]  top-0 right-0 h-[105%] translate-x-[5%] -translate-y-[2.5%] z-20`}>
        <div className={`bg-${color} ${orientationClasses} absolute -translate-y-[50%] -translate-x-[50%] gap-2 rounded-md z-10`}>
          <span
            className="cursor-pointer "
            onClick={() =>
              dispatch(
                deleteFunction({
                  pageNumber,
                  bodyChildIndex,
                  infoChildIndex,
                })
              )
            }
          >
            <MinusIcon className="w-5 h-5" />
          </span>
          {addFunctions.map((addFunction, addFunctionIndex) => (
            <span
              key={"AddFunction" + addFunctionIndex}
              className="cursor-pointer"
              onClick={() =>
                dispatch(
                  addFunction.function({ pageNumber, bodyChildIndex, infoChildIndex })
              )}
            >
              <AddIcon icon={addFunction.icon} />
            </span>
          ))}
{/*           <span
            className="cursor-pointer"
            onClick={() =>
              dispatch(
                addFunction({ pageNumber, bodyChildIndex, infoChildIndex })
              )
            }
          >
            <PlusIcon className="w-5 h-5" />
          </span> */}
        </div>
      </div>
    </div>
  );
}
