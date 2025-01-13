import EditableMain from './EditableSideMain'
import EditableAux from './EditableAux'
import EditableBar from './EditableBar'
import EditableSideIcon from './EditableSideIcon'
import { editSideInfoIcon } from '@/redux/features/curriculumSlice'

type InfoChildProps = {
    pageNumber: number
    infoChild: any
    infoChildIndex: number
    bodyChildIndex: number
    handleOnFocus: () => void
    handleOnBlur: () => void
    themeName: string
    isEditable: boolean
}

export default function InfoChild({pageNumber, themeName, infoChild, infoChildIndex, bodyChildIndex, handleOnFocus, handleOnBlur, isEditable}: InfoChildProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className=" text-[14px] flex gap-2">
        {infoChild.icon.nameIcon && (
          <EditableSideIcon addFunction={editSideInfoIcon} title={infoChild.icon} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} isEditable={isEditable}/>
        )}{" "}
        <EditableMain pageNumber={pageNumber} infoChild={infoChild} infoChildIndex={infoChildIndex} bodyChildIndex={bodyChildIndex} handleOnFocus={handleOnFocus} handleOnBlur={handleOnBlur} isEditable={isEditable} />
        {infoChild.main && infoChild.aux && <EditableAux themeName={themeName} bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} pageNumber={pageNumber} aux={infoChild.aux} handleInfoOnFocus={handleOnFocus} handleInfoOnBlur={handleOnBlur} isEditable={isEditable} />}
      </div>
      {infoChild.bar && <EditableBar themeName={themeName} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} barWidth={infoChild.bar} isEditable={isEditable} />}
    </div>
  );
}
