import "./styles.scss"
import { ReactNode } from "react"


type PanelProps = {
    children: ReactNode
    button: JSX.Element
}


export default function Panel({children, button}: PanelProps) {

  return (
    <section className="relative">
      <div className="panel-temperature-container justify-center sm:justify-between sm:gap-0 text-accent-100 py-[6%]">
        {children}
        <div className="hidden sm:flex justify-center">
          {button}
        </div>
      </div>
      <div className=" bg-accent-900 mt-4u flex sm:hidden justify-center">
          {button}
        </div>
    </section>
  )
}