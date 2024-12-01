import SectionCentralBody from './SectionCentralBody'
import { SectionCentralBodyInfoType } from './curriculum.info'


export default function CentralBody({page}: {page: SectionCentralBodyInfoType[]}) {
  return (
    <div className='flex flex-col justify-center gap-10 p-[1.25rem]'>
        {page.map((seccion, seccionIndx) => (
            <SectionCentralBody key={seccionIndx} {...seccion}/>
        ))}
    </div>
  )
}
