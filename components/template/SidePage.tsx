import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import Header from './header/Header';
import SideBody from './side/SideBody';
import { SectionHeader, SectionSideBodyInfoType } from './curriculum.info';

type SidePageProps = {
    themeName: string
    side: SectionSideBodyInfoType[]
    header?: SectionHeader
    pageNumber: number
    showOptions: boolean
    setShowDashLine: Dispatch<SetStateAction<boolean>>
}

export default function SidePage({side, header, themeName, pageNumber, showOptions, setShowDashLine}: SidePageProps) {
    const sidePageRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        if(sidePageRef && sidePageRef.current) {
          console.log(sidePageRef.current.offsetHeight)
          if(sidePageRef.current.offsetHeight > 1027) {
            setShowDashLine(true)
          } else {
            setShowDashLine(false)
          }
        }
    },[side, header])

  return (
    <section ref={sidePageRef} className={`side ${themeName}`}>
      {pageNumber === 0 && (
        <Header themeName={themeName} {...header} />
      )}
      <SideBody
        showOptions={showOptions}
        pageNumber={pageNumber}
        sidePage={side}
      />
    </section>
  );
}
