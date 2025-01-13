import { deletePage } from '@/redux/features/curriculumSlice'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { IconType } from 'react-icons/lib'

type AddFunctions = {
  function: (p: any) => void
  icon: IconType
}[]

type ControlOptionsProps = {
    contentLength: number
    dispatch: (p: any) => void
    pageNumber: number
    color: string
    addFunctions: AddFunctions
    position?: "side" | "body"
    isEditable?: boolean
}

export default function ControlOptions({color, contentLength, position="body", pageNumber, dispatch, addFunctions, isEditable=true}: ControlOptionsProps) {

    function AddIcon({ icon }: {icon: IconType}) {
      const IconComponent = icon
      return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
    }

  return (
    <div className={`bg-${color} absolute text-white top-0 right-0 flex gap-2 z-10`}>
      {pageNumber !== 0 && position === "body" && isEditable && (
        <span
        className="cursor-pointer"
        onClick={() => dispatch(deletePage({ pageNumber }))}
      >
        <XMarkIcon className="w-5 h-5" />
      </span>
      )}
      {contentLength ===0 && addFunctions.map((addFunction, addFunctionIndex) => (
        <span
          key={"AddFunction" + addFunctionIndex}
          className="cursor-pointer"
          onClick={() =>
            dispatch(
              addFunction.function({ pageNumber, bodyChildIndex: 0 })
          )}
        >
          <AddIcon icon={addFunction.icon} />
        </span>
      ))}
    </div>
  );
}
