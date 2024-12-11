import { XMarkIcon } from '@heroicons/react/20/solid'
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
}

type RadioInputIconProps = {
  icon: {
    classNameIcon: string,
    nameIcon: string
  }
  bodyChildIndex: number
  pageNumber: number
}

function RadioInputIcon({icon, pageNumber, bodyChildIndex}: RadioInputIconProps) {
  const dispatch = useAppDispatch()

  function handleChange() {
    console.log(icon.nameIcon, bodyChildIndex)
    dispatch(editIcon({nameIcon: icon.nameIcon, pageNumber: pageNumber, bodyChildIndex: bodyChildIndex }))
  }

  return (
    <label htmlFor={"icon" + icon.nameIcon + bodyChildIndex} className="bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center">
      <div className={`text-white cursor-pointer ${icon.classNameIcon}`}>{icon.nameIcon}</div>
      <input className="absolute w-0 h-0 opacity-0" type="radio" name={"icons" + bodyChildIndex} id={"icon" + icon.nameIcon + bodyChildIndex} onChange={handleChange}/>
    </label>
  )
}

export default function EditableIcon({title, pageNumber, bodyChildIndex}: EditableIconProps) {

  const [showIconList, setShowIconList] = useState(false)

  return (
    <div className="bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center relative z-10">
      <span onClick={() => setShowIconList(true)} className={`text-white cursor-pointer ${title.classNameIcon}`}>
        {title.nameIcon}
      </span>
      {showIconList && (
        <div className='absolute w-80 h-40 bg-blue-700 right-0 translate-x-full'>
          <span onClick={() => setShowIconList(false)} className='cursor-pointer absolute top-0 right-0 bg-gray-200'><XMarkIcon className='w-6 h-6' /></span>
          <div className='p-6u bg-gray-300 h-full grid grid-cols-4 gap-4 justify-center overflow-y-scroll'>
            {icons.map((icon, iconIndex) => (
              <RadioInputIcon pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} key={"icon" + iconIndex + bodyChildIndex} icon={icon} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
