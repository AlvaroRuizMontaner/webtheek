import { useEffect, useRef } from 'react'
import SectionCentralBody from './SectionCentralBody'
import { SectionCentralBodyInfoType } from './curriculum.info'



export default function CentralBody({page, pageNumber}: {page: SectionCentralBodyInfoType[], pageNumber:number}) {
  const bodyRef = useRef<HTMLDivElement | undefined>(undefined)

  useEffect(() => {
      if(bodyRef) {
        console.log(bodyRef.current?.offsetHeight)
      }
    },[page])

  return (
    <div ref={bodyRef} className='flex flex-col justify-center gap-10 px-[1.25rem]'> {/* px en vez de p provisional */}
        {page.map((bodyChild, bodyChildIndex) => (
            <SectionCentralBody bodyChildIndex={bodyChildIndex} pageNumber={pageNumber} key={bodyChildIndex} {...bodyChild}/>
        ))}
    </div>
  )
}
