import { addSideBodyChildByIndex, addSideBodyChildByIndex2, addSideBodyChildByIndex3, deleteSideBodyChildByIndex } from '@/redux/features/curriculumSlice'
import ControlBoundary from '../ControlBoundary'
import { SectionSideBodyInfoType } from '../curriculum.info'
import InfoChild from './InfoChild'
import { useAppDispatch } from '@/redux/hooks'
import { useCallback, useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { IconType } from 'react-icons/lib'
import { BsPlusCircle, BsPlusSlashMinus } from 'react-icons/bs'

interface SectionSideBodyProps extends SectionSideBodyInfoType {
  pageNumber: number
  bodyChildIndex: number
}


export default function SectionSideBody({ title, info, pageNumber, bodyChildIndex}: SectionSideBodyProps) {
  const dispatch = useAppDispatch()
  const [showBodyChildOptions, setShowBodyChildOptions] = useState(true)

  const handleOnBlur = useCallback(() => {
    setTimeout(() => setShowBodyChildOptions(false), 100)
  },[])
  const handleOnFocus = useCallback(() => {
      setTimeout(() => setShowBodyChildOptions(true), 100)
  },[])

  const options = [
    {
      function: addSideBodyChildByIndex,
      icon: PlusIcon as IconType
    },
    {
      function: addSideBodyChildByIndex2,
      icon: BsPlusSlashMinus
    },
    {
      function: addSideBodyChildByIndex3,
      icon: BsPlusCircle
    },
  ]

  return (
    <div className='relative z-10'>
      <section className='flex flex-col gap-4 relative z-50'>
        <div className='flex gap-2 font-bold'>
          <span className={title.classNameIcon}>{title.nameIcon}</span>
          <h2 className='text-xl'>{title.text}</h2>
        </div>

        <div className='space-y-2'>
          {info.map((infoChild, infoChildIndex) => (
            <InfoChild pageNumber={pageNumber} handleOnFocus={handleOnFocus} handleOnBlur={handleOnBlur} key={infoChildIndex} infoChild={infoChild} infoChildIndex={infoChildIndex} bodyChildIndex={bodyChildIndex} />
          ))}
        </div>
      </section>
      {showBodyChildOptions && <ControlBoundary pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} dispatch={dispatch} addFunctions={options} deleteFunction={deleteSideBodyChildByIndex} color="blue-500 text-white" />}
    </div>
  )
}
