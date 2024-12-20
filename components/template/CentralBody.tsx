import SectionCentralBody from './SectionCentralBody'
import { SectionCentralBodyInfoType } from './curriculum.info'



export default function CentralBody({page, pageNumber}: {page: SectionCentralBodyInfoType[], pageNumber:number}) {
  return (
    <div className='flex flex-col justify-center gap-10 p-[1.25rem]'>
        {page.map((bodyChild, bodyChildIndex) => (
            <SectionCentralBody bodyChildIndex={bodyChildIndex} pageNumber={pageNumber} key={bodyChildIndex} {...bodyChild}/>
        ))}
    </div>
  )
}
