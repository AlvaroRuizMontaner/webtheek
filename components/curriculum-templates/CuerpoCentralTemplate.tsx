import SeccionCuerpoCentral from './SeccionCuerpoCentral'
import { CuerpoCentralPaginas } from './templates.info'

type CuerpoCentralTemplateProps = {
  page: CuerpoCentralPaginas
}

export default function CuerpoCentralTemplate({ page }: CuerpoCentralTemplateProps) {
  return (
    <div className="flex flex-col justify-center gap-10 p-[1.25rem]">
      {page.map((seccion, seccionIndx) => {
        return <SeccionCuerpoCentral key={`template${seccionIndx}`} title={seccion[0]} info={seccion[1]}
        />
      })}
    </div>
  );
}
