import { deleteSideBodyChildByIndex, editSideIcon } from '@/redux/features/curriculumSlice'
import ControlBoundary from '../ControlBoundary'
import { SectionSideBodyInfoType } from '../curriculum.info'
import InfoChild from './InfoChild'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { memo, useCallback, useState } from 'react'
import { IconType } from 'react-icons/lib'
import EditableSideTitle from './EditableSideTitle'
import EditableSideIcon from './EditableSideIcon'
const MemoizedEditableSideTitle = memo(EditableSideTitle)

interface SectionSideBodyProps extends SectionSideBodyInfoType {
  pageNumber: number
  bodyChildIndex: number
  sideAddFunctionOptions: {
    function: any;
    icon: IconType;
  }[]
  isEditable: boolean
}


export default function SectionSideBody({ title, info, pageNumber, bodyChildIndex, sideAddFunctionOptions, isEditable}: SectionSideBodyProps) {
  const dispatch = useAppDispatch()
  const [showBodyChildOptions, setShowBodyChildOptions] = useState(false)
  const themeName = useAppSelector((state) => state.curriculumReducer).themeName

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
          <EditableSideIcon addFunction={editSideIcon} title={title} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} isEditable={isEditable}/>
          <MemoizedEditableSideTitle titleText={title.text} bodyChildIndex={bodyChildIndex} pageNumber={pageNumber} handleOnFocus={handleOnFocus} handleOnBlur={handleOnBlur} isEditable={isEditable}/>
        </div>

        <div className='space-y-2'>
          {info.map((infoChild, infoChildIndex) => (
            <InfoChild themeName={themeName} pageNumber={pageNumber} handleOnFocus={handleOnFocus} handleOnBlur={handleOnBlur} key={infoChildIndex} infoChild={infoChild} infoChildIndex={infoChildIndex} bodyChildIndex={bodyChildIndex} isEditable={isEditable}/>
          ))}
        </div>
      </section>
      {showBodyChildOptions && <ControlBoundary position="side" pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} dispatch={dispatch} addFunctions={sideAddFunctionOptions} deleteFunction={deleteSideBodyChildByIndex} color="blue-500 text-white" />}
    </div>
  )
}
