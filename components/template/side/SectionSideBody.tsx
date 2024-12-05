import { SectionSideBodyInfoType } from '../curriculum.info'
import InfoChild from './InfoChild'

interface SectionSideBodyProps extends SectionSideBodyInfoType {
  pageNumber: number
  bodyChildIndex: number
}


export default function SectionSideBody({ title, info, pageNumber, bodyChildIndex}: SectionSideBodyProps) {


  return (
    <div className='relative z-10'>
      <section className='flex flex-col gap-4 z-50'>
        <div className='flex gap-2 font-bold'>
          <span className={title.classNameIcon}>{title.nameIcon}</span>
          <h2 className='text-xl'>{title.text}</h2>
        </div>

        <div className='space-y-2'>
          {info.map((infoChild, infoChildIndex) => (
            <InfoChild pageNumber={pageNumber} key={infoChildIndex} infoChild={infoChild} infoChildIndex={infoChildIndex} bodyChildIndex={bodyChildIndex} />
          ))}
        </div>
      </section>
    </div>
  )
}
