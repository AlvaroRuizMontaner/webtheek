import React from 'react'
import { SectionSideBodyInfoType } from './curriculum.info'

export default function SectionSideBody({ title, info}: SectionSideBodyInfoType) {
  return (
    <div className='flex flex-col gap-4'>
        <div className='flex gap-2 font-bold'>
          <span className={title.className}>{title.name}</span>
          <h2 className='text-xl'>{title.text}</h2>
        </div>

        <div className='space-y-2'>
          {info.map((el, index) => (
            <div className='flex flex-col gap-1' key={index}>
              <div className=' text-[14px] flex gap-2'>
                {el.icon.name && <span className={el.icon.className}>{el.icon.name}</span>}
                {" "}
                <span className='text-white break-all flex items-center'>{el.main}</span>
                <span className='text-gray-400 font-bold'>{el.aux}</span>
              </div>
              {el.bar && (<div className='h-5 w-full bg-indigo-400 mb-2'>
                  <div style={{width: el.bar}} className={`h-full bg-blue-500`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
    </div>
  )
}
