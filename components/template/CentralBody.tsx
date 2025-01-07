import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import SectionCentralBody from './SectionCentralBody'
import { SectionCentralBodyInfoType } from './curriculum.info'

type CentralBodyProps = {
  bodyPage: SectionCentralBodyInfoType[]
  pageNumber: number
  setShowDashLine: Dispatch<SetStateAction<boolean>>
}

export default function CentralBody({bodyPage, pageNumber, setShowDashLine}: CentralBodyProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if(bodyRef && bodyRef.current) {
      if(bodyRef.current.offsetHeight > 1027) {
        setShowDashLine(true)
      } else {
        setShowDashLine(false)
      }
    }
  },[bodyPage])

  return (
    <div ref={bodyRef} className='flex flex-col justify-center gap-10 px-[1.25rem]'> {/* px en vez de p provisional */}
        {bodyPage.map((bodyChild, bodyChildIndex) => (
            <SectionCentralBody bodyChildIndex={bodyChildIndex} pageNumber={pageNumber} key={bodyChildIndex} {...bodyChild}/>
        ))}
    </div>
  )
}
