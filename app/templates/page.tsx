import {Template} from '@/components/template/Template'
import { cuerpoCentralPaginas } from '@/components/template/curriculum.info'


export default function page() {
  return (
    <Template sections={cuerpoCentralPaginas} />
  )
}
