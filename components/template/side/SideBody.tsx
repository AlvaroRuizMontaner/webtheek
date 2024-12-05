import { SectionSideBodyInfoType } from "../curriculum.info";
import SectionSideBody from "./SectionSideBody";



export default function SideBody({page, pageNumber}:{page: SectionSideBodyInfoType[], pageNumber:number}) {
  return (
    <div className='flex flex-col justify-center gap-5 p-[1.25rem] text-white'>
      {page.map((bodyChild, bodyChildIndex) => (
        <SectionSideBody pageNumber={pageNumber} key={bodyChildIndex} bodyChildIndex={bodyChildIndex} {...bodyChild} />
      ))}
    </div>
  )
}
