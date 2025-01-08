import { InitialStateType, addBodyChildByIndex } from '@/redux/features/curriculumSlice'
import { useAppDispatch } from '@/redux/hooks'
import { PlusIcon } from '@heroicons/react/20/solid'
import { IconType } from 'react-icons/lib'
import ControlOptions from './ControlOptions'
import CentralBody from './CentralBody'
import { useState } from 'react'
import SidePage from './SidePage'

type PageProps = {
    page: InitialStateType["pages"][number]
    pageNumber: number
    showOptions: boolean
    themeName: string
}

export default function Page({page, pageNumber, showOptions, themeName}: PageProps) {
    const dispatch = useAppDispatch()
    const [showDashLine, setShowDashLine] = useState(false)

  return (
    <div
    key={"cuerpo" + pageNumber}
    className="relative bg-white h-[297mm] w-[785px] flex items-center m-auto overflow-y-hidden"
  >
    <div className="min-w-[42rem] h-full max-w-2xl bg-white p-12 px-0 mx-auto relative">
      {showOptions && (
        <ControlOptions
          contentLength={page.body.length}
          addFunctions={[
            {
              function: addBodyChildByIndex,
              icon: PlusIcon as IconType,
            },
          ]}
          dispatch={dispatch}
          color="gray-200"
          pageNumber={pageNumber}
        />
      )}
      <div className="contenedor h-full">
        <section className="">
          <CentralBody setShowDashLine={setShowDashLine} pageNumber={pageNumber} bodyPage={page.body} />
        </section>
        <SidePage pageNumber={pageNumber} side={page.side} header={page.header} themeName={themeName} setShowDashLine={setShowDashLine} showOptions={showOptions} />
      </div>
    </div>
    {showDashLine && showOptions && (
      <div className="absolute w-full bottom-[48px] border border-black border-dashed"></div>
    )}
  </div>
  )
}
