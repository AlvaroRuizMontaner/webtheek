import "./styles.scss"
import { ReactNode } from "react"


type PanelProps = {
    children: ReactNode
    button: JSX.Element
    increment?: JSX.Element
}


export default function Panel({children, button, increment}: PanelProps) {

  return (
    <section className="relative">
      <div className="panel justify-center sm:justify-between sm:gap-0 text-accent-100 py-[6%]">
        {children}
        <div className="hidden sm:flex justify-center gap-4u">
          {button}
          {increment}
        </div>
      </div>
      <div className=" bg-accent-900 mt-4u flex sm:hidden justify-center gap-4">
        {button}
        {increment}
      </div>
    </section>
  )
}