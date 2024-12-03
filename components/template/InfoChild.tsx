import { useState } from 'react';
import { InfoChildType } from './curriculum.info';
import { addInfoChild, deleteInfoChildByIndex } from '@/redux/features/curriculumSlice';
import { useAppDispatch } from '@/redux/hooks';
import EditableMain from './EditableMain';
import EditableDetail from './EditableDetail';
import EditableDate from './EditableDate';
import EditableListChild from './EditableListChild';
import ControlBoundary from './ControlBoundary';

type InfoChildProps = {
    infoChildIndex: number, 
    handleOnBlur: () => void, 
    handleOnFocus: () => void, 
    infoChild: InfoChildType,
    pageNumber: number
    bodyChildIndex: number
}

export default function InfoChild({infoChildIndex, handleOnBlur, handleOnFocus, infoChild, pageNumber, bodyChildIndex}: InfoChildProps) {
    const dispatch = useAppDispatch()
    const [showInfoChildOptions, setShowInfoChildOptions] = useState(false)

    const handleInfoOnBlur = () => {
        handleOnBlur()
        setTimeout(() => setShowInfoChildOptions(false), 100)
    }
    const handleInfoOnFocus = () => {
        handleOnFocus()
        setTimeout(() => setShowInfoChildOptions(true), 100)
    }

  return (
    <div className='relative z-10'>
      <div className="space-y-2 relative z-50" key={infoChildIndex}>
        {infoChild.main && <EditableMain infoChild={infoChild} handleInfoOnBlur={handleInfoOnBlur} handleInfoOnFocus={handleInfoOnFocus} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} main={infoChild.main} />}
        {infoChild && infoChild.detail && <div className="flex justify-between text-gray-400 text-sm">
          <EditableDetail infoChild={infoChild} handleInfoOnBlur={handleInfoOnBlur} handleInfoOnFocus={handleInfoOnFocus} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} detail={infoChild.detail} />
          {infoChild.date && <EditableDate handleInfoOnBlur={handleInfoOnBlur} handleInfoOnFocus={handleInfoOnFocus} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} date={infoChild.date} />}
        </div>}
        {infoChild.list && infoChild.list.length >= 1 && (
          <ul className=" text-[14px] list-disc">
            {infoChild.list.map((listChild, listChildIndex) => <EditableListChild key={"" + infoChildIndex + listChildIndex} listChild={listChild} handleInfoOnBlur={handleInfoOnBlur} handleInfoOnFocus={handleInfoOnFocus} pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} listChildIndex={listChildIndex} />)}
          </ul>
        )}
      </div>
      {showInfoChildOptions && (
        <ControlBoundary addFunction={addInfoChild} deleteFunction={deleteInfoChildByIndex} color="blue-900 text-white" pageNumber={pageNumber} bodyChildIndex={bodyChildIndex} infoChildIndex={infoChildIndex} dispatch={dispatch} orientation='vertical' />
/*       <div>
        <div className='absolute border-[3px] border-blue-900 top-0 right-0 w-[116.5%] h-[105%] translate-x-[5%] -translate-y-[2.5%] z-20'></div>
        <div className="absolute -left-[50px] top-[50%] -translate-y-[50%] flex-col gap-2 py-1 rounded-md bg-blue-900 text-white z-30">
          <span className="cursor-pointer " onClick={() => dispatch(deleteInfoChildByIndex({pageNumber, bodyChildIndex, infoChildIndex}))}><MinusIcon className="w-5 h-5" /></span>
          <span className="cursor-pointer" onClick={() => dispatch(addInfoChild({pageNumber, bodyChildIndex, infoChildIndex}))}><PlusIcon className="w-5 h-5" /></span>
        </div>
      </div> */
      )}
    </div>
  );
}
