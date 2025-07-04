import "./styles.scss"
import { ReactNode } from "react"


type PanelProps = {
    children: ReactNode
    button: JSX.Element
    increment?: JSX.Element
    deleteAll?: JSX.Element
}


export default function Panel({children, button, increment, deleteAll}: PanelProps) {

  return (
    <section className="relative">
      <div className="panel justify-center sm:justify-between sm:gap-0 text-accent-100 py-[6%]">
        {children}
        <div className="hidden sm:flex justify-center gap-4u">
          {deleteAll}
          {button}
          {increment}
        </div>
      </div>
      <div className=" bg-accent-900 mt-4u flex sm:hidden justify-center flex-wrap gap-4">
        {deleteAll}
        {button}
        {increment}
      </div>
    </section>
  )
}