import React from 'react'
import SeccionCuerpoLateral from './SeccionCuerpoLateral'
import { seccionCuerpoLateralCodeInfo, seccionCuerpoLateralContactoInfo, seccionCuerpoLateralIdiomasInfo, seccionCuerpoLateralSkillsInfo } from './curriculum.info'

export default function CuerpoLateral() {
  return (
    <div className='flex flex-col justify-center gap-10 p-[1.25rem] text-white'>
        <SeccionCuerpoLateral {...seccionCuerpoLateralContactoInfo} />
        <SeccionCuerpoLateral {...seccionCuerpoLateralIdiomasInfo} />
        <SeccionCuerpoLateral {...seccionCuerpoLateralCodeInfo} />
        <SeccionCuerpoLateral {...seccionCuerpoLateralSkillsInfo} />
    </div>
  )
}
