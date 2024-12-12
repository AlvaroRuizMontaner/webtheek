import { addSideBodyChildByIndex, addSideBodyChildByIndex2, addSideBodyChildByIndex3, deleteSideBodyChildByIndex, editSideIcon } from '@/redux/features/curriculumSlice'
import ControlBoundary from '../ControlBoundary'
import { SectionSideBodyInfoType } from '../curriculum.info'
import InfoChild from './InfoChild'
import { useAppDispatch } from '@/redux/hooks'
import { useCallback, useState } from 'react'
import { ChartBarIcon, ChatBubbleOvalLeftIcon, UserIcon } from '@heroicons/react/20/solid'
import { IconType } from 'react-icons/lib'
import EditableSideTitle from './EditableSideTitle'
import EditableSideIcon from './EditableSideIcon'

interface SectionSideBodyProps extends SectionSideBodyInfoType {
  pageNumber: number
  bodyChildIndex: number
}


export default function SectionSideBody({ title, info, pageNumber, bodyChildIndex}: SectionSideBodyProps) {
  const dispatch = useAppDispatch()
  const [showBodyChildOptions, setShowBodyChildOptions] = useState(false)

  const handleOnBlur = useCallback(() => {
    setTimeout(() => setShowBodyChildOptions(false), 100)
  },[])
  const handleOnFocus = useCallback(() => {
      setTimeout(() => setShowBodyChildOptions(true), 100)
  },[])

  const options = [
    {
      function: addSideBodyChildByIndex,
      icon: UserIcon as IconType
    },
    {
      function: addSideBodyChildByIndex2,
      icon: ChatBubbleOvalLeftIcon as IconType
    },
    {
      function: addSideBodyChildByIndex3,
      icon: ChartBarIcon as IconType
    },
  ]

  return (
    <div className='relative z-10'>
      <section className='flex flex-col gap-4 relative z-50'>
        <div className='flex gap-2 font-bold'>
          <EditableSideIcon addFunction={editSideIcon} title={title} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} />
          {/* <span className={title.classNameIcon}>{title.nameIcon}</span> */}
          {/* <h2 className='text-xl'>{title.text}</h2> */}
          <EditableSideTitle titleText={title.text} bodyChildIndex={bodyChildIndex} pageNumber={pageNumber} handleOnFocus={handleOnFocus} handleOnBlur={handleOnBlur} />
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
