import { useState } from 'react'
import { icons } from './icons.info'
import { useAppDispatch } from '@/redux/hooks'
import { editIcon } from '@/redux/features/curriculumSlice'

type EditableIconProps = {
  title: {
      classNameIcon: string,
      nameIcon: string
  }
  bodyChildIndex: number
  pageNumber: number
  themeName: string
  isEditable: boolean
}

type RadioInputIconProps = {
  icon: {
    classNameIcon: string,
    nameIcon: string
  }
  bodyChildIndex: number
  pageNumber: number
  setShowIconList: (p: boolean) => void
  themeName: string
}

function RadioInputIcon({icon, pageNumber, bodyChildIndex, setShowIconList, themeName}: RadioInputIconProps) {
  const dispatch = useAppDispatch()

  function handleChange() {
    dispatch(editIcon({nameIcon: icon.nameIcon, pageNumber: pageNumber, bodyChildIndex: bodyChildIndex }))
    setShowIconList(false)
  }

  return (
    <label htmlFor={"icon" + icon.nameIcon + bodyChildIndex} className={`body-icon ${themeName} h-8 w-8 rounded-full flex items-center justify-center`}>
      <div className={`text-white cursor-pointer ${icon.classNameIcon}`}>{icon.nameIcon}</div>
      <input className="absolute w-0 h-0 opacity-0" type="radio" name={"icons" + bodyChildIndex} id={"icon" + icon.nameIcon + bodyChildIndex} onChange={handleChange}/>
    </label>
  )
}

export default function EditableIcon({title, pageNumber, bodyChildIndex, themeName, isEditable}: EditableIconProps) {

  const [showIconList, setShowIconList] = useState(false)

  return (
    <div className={`body-icon ${themeName} h-8 w-8 rounded-full flex items-center justify-center relative z-10`}>
      <span onClick={() => setShowIconList(true)} className={`text-white cursor-pointer ${title.classNameIcon}`}>
        {title.nameIcon}
      </span>
      {showIconList && isEditable && (
        <div className={`absolute w-80 h-40 body-icon ${themeName} right-0 translate-x-full`}>
          <div className='p-6u bg-white shadow-md h-full grid grid-cols-4 gap-4 justify-center overflow-y-scroll'>
            {icons.map((icon, iconIndex) => (
              <RadioInputIcon themeName={themeName} setShowIconList={setShowIconList} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} key={"icon" + iconIndex + bodyChildIndex} icon={icon} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
