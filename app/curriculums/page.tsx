import BuildingTemplate from '@/components/curriculum-templates/BuildingTemplate'
import { cuerpoCentralPaginas } from '@/components/curriculum-templates/templates.info'

export default function page() {
  return (
    <BuildingTemplate sections={cuerpoCentralPaginas} />
  )
}
