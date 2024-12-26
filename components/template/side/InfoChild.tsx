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
}

export default function InfoChild({pageNumber, themeName, infoChild, infoChildIndex, bodyChildIndex, handleOnFocus, handleOnBlur}: InfoChildProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className=" text-[14px] flex gap-2">
        {infoChild.icon.nameIcon && (
          <EditableSideIcon addFunction={editSideInfoIcon} title={infoChild.icon} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} />
        )}{" "}
        <EditableMain pageNumber={pageNumber} infoChild={infoChild} infoChildIndex={infoChildIndex} bodyChildIndex={bodyChildIndex} handleOnFocus={handleOnFocus} handleOnBlur={handleOnBlur}/>
        {infoChild.main && infoChild.aux && <EditableAux bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} pageNumber={pageNumber} aux={infoChild.aux} handleInfoOnFocus={handleOnFocus} handleInfoOnBlur={handleOnBlur} />}
      </div>
      {infoChild.bar && <EditableBar themeName={themeName} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} barWidth={infoChild.bar} />}
    </div>
  );
}
