import { useState } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { icons } from '../icons.info'

type EditableSideIconProps = {
  title: {
      classNameIcon: string,
      nameIcon: string
  }
  bodyChildIndex: number
  pageNumber: number
  infoChildIndex?: number | undefined
  addFunction: (p: any) => any
  isEditable: boolean
}

type RadioInputIconProps = {
  icon: {
    classNameIcon: string,
    nameIcon: string
  }
  bodyChildIndex: number
  pageNumber: number
  infoChildIndex: number | undefined
  addFunction: (p: any) => any
  setShowIconList: (p: boolean) => void
}

function RadioInputIcon({icon, pageNumber, bodyChildIndex, infoChildIndex, addFunction, setShowIconList}: RadioInputIconProps) {
  const dispatch = useAppDispatch()

  function handleChange() {
    dispatch(addFunction({nameIcon: icon.nameIcon, pageNumber: pageNumber, bodyChildIndex: bodyChildIndex, infoChildIndex: infoChildIndex }))
    setShowIconList(false)
  }

  return (
    <label htmlFor={"icon" + icon.nameIcon + bodyChildIndex + infoChildIndex} className="bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center">
      <div className={`text-white cursor-pointer ${icon.classNameIcon}`}>{icon.nameIcon}</div>
      <input className="absolute w-0 h-0 opacity-0" type="radio" name={"icons" + bodyChildIndex} id={"icon" + icon.nameIcon + bodyChildIndex + infoChildIndex} onChange={handleChange}/>
    </label>
  )
}

export default function EditableSideIcon({title, pageNumber, bodyChildIndex, addFunction, infoChildIndex=undefined, isEditable}: EditableSideIconProps) {

  const [showIconList, setShowIconList] = useState(false)

  return (
    <div className="relative z-10 h-6">
      <span onClick={() => setShowIconList(true)} className={`text-white cursor-pointer ${title.classNameIcon}`}>
        {title.nameIcon}
      </span>
      {showIconList && isEditable && (
        <div className='absolute w-80 h-40 bg-blue-700 left-0 -translate-x-full'>
          <div className='p-4u bg-white shadow-md h-full grid grid-cols-4 gap-4 justify-center overflow-y-scroll'>
            {icons.map((icon, iconIndex) => (
              <RadioInputIcon setShowIconList={setShowIconList} infoChildIndex={infoChildIndex} addFunction={addFunction} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} key={"icon" + iconIndex + bodyChildIndex} icon={icon} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
