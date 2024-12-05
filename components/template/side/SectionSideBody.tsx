import { addBodyChildByIndex, deleteBodyChildByIndex } from '@/redux/features/curriculumSlice'
import ControlBoundary from '../ControlBoundary'
import { SectionSideBodyInfoType } from '../curriculum.info'
import InfoChild from './InfoChild'
import { useAppDispatch } from '@/redux/hooks'
import { useCallback, useState } from 'react'

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
      {showBodyChildOptions && <ControlBoundary pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} dispatch={dispatch} addFunction={addBodyChildByIndex} deleteFunction={deleteBodyChildByIndex} color="blue-500 text-white" />}
    </div>
  )
}
