import { useState } from 'react'
import { SectionSideBodyInfoType } from './curriculum.info'

export default function SectionSideBody({ title, info}: SectionSideBodyInfoType) {

  const [showSideInfoChildOptions, setShowSideInfoChildOptions] = useState()

  return (
    <div className='relative z-10'>
      <section className='flex flex-col gap-4 z-50'>
        <div className='flex gap-2 font-bold'>
          <span className={title.classNameIcon}>{title.nameIcon}</span>
          <h2 className='text-xl'>{title.text}</h2>
        </div>

        <div className='space-y-2'>
          {info.map((el, index) => (
            <div className='flex flex-col gap-1' key={index}>
              <div className=' text-[14px] flex gap-2'>
                {el.icon.name && <span className={el.icon.className}>{el.icon.name}</span>}
                {" "}
                <span className='text-white break-all flex items-center'>{el.main}</span>
                {el.main && <span className='text-gray-400 font-bold'>{el.aux}</span>}
              </div>
              {el.bar && (<div className='h-5 w-full bg-indigo-400 mb-2'>
                  <div style={{width: el.bar}} className={`h-full bg-blue-500`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      {showSideInfoChildOptions && (
      <div className=''>
        <span className="cursor-pointer absolute -left-5 top-[50%] -translate-y-[55%] bg-black text-white rounded-full" onClick={() => dispatch(deleteListChildByIndex({pageNumber, bodyChildIndex, infoChildIndex, listChildIndex}))}><MinusIcon className="w-4 h-4" /></span>
        <span className="cursor-pointer absolute -right-5 top-[50%] -translate-y-[55%]  bg-black text-white rounded-full" onClick={() => dispatch(addListChildByIndex({pageNumber, bodyChildIndex, infoChildIndex, listChildIndex}))}><PlusIcon className="w-4 h-4" /></span>
      </div>
      )}
    </div>
  )
}
