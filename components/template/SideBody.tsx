import SectionSideBody from "./SectionSideBody";
import { SectionSideBodyInfoType } from "./curriculum.info";


export default function SideBody({page}:{page: SectionSideBodyInfoType[]}) {
  return (
    <div className='flex flex-col justify-center gap-5 p-[1.25rem] text-white'>
      {page.map((seccion, seccionIndx) => (
        <SectionSideBody key={seccionIndx} {...seccion} />
      ))}
    </div>
  )
}
