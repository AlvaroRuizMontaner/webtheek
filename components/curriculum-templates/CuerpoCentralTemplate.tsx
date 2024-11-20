import SeccionCuerpoCentral from './SeccionCuerpoCentral'
import { CuerpoCentralPaginas } from './templates.info'

type CuerpoCentralTemplateProps = {
  page: CuerpoCentralPaginas
}

export default function CuerpoCentralTemplate({page}: CuerpoCentralTemplateProps) {

  return (
    <div className='flex flex-col justify-center px-[1.25rem]'>
        {page.map((seccion, seccionIndx) => (
            <SeccionCuerpoCentral key={seccionIndx} title={seccion[0]} info={seccion[1]}/>
        ))}
    </div>
  )
}
