import "./eos.scss";
import { useAppSelector } from "@/redux/hooks";
import Table from "@/components/eos/Table";
import { SystemState, ZModes } from "@/types/eos";
import { ChangeEvent, useState } from "react";
import RadioTabs from "@/components/eos/RadioTabs";
import Curves from "@/components/eos/Curves";
import Isotherms from "@/components/eos/Isotherms";
import Factors from "@/components/eos/Factors";


  const lineColors = [
    // 🔵 Azules profundos → verdes claros
/*     "#0B1123",
    "#1F2A44",
    "#2E3B55", */
    "#4E79A7",
    "#6399C5",
    "#7DB9E8",
    "#A3D0F5",
    "#CAE7FF",
    "#76B7B2",
    "#45B39D",
    "#66BB6A",
  
    // 🟢 Verdes
    "#59A14F",
    "#4CAF50",
    "#6FBF73",
    "#81C784",
    "#A5D6A7",
  
    // 🟡 Verde amarillento → amarillos
    "#B9D98D",
    "#D4E157",
    "#EDC949",
    "#E6EE9C",
    "#F0F4C3",
    "#FFF9C4",
  
    // 🧡 Amarillos → naranjas
    "#FFEB3B",
    "#FDD835",
    "#FBC02D",
    "#F4D03F",
    "#F4A259",
    "#F28E2B",
    "#FB8C00",
  
    // 🔴 Naranjas intensos → rojos
    "#EF6C00",
    "#E65100",
    "#E15759",
    "#D1495B",
    "#E53935",
    "#F44336",
    "#C21807",
  
    // 🩷 Rosados suaves → intensos
    "#FF9DA7",
    "#FFC4BF",
    "#FADADD",
    "#F8BBD0",
    "#F48FB1",
  
    // 🟣 Violetas (reincorporados)
    "#AF7AA1",
    "#C48ACB",
    "#D5A6E2",
    "#BA68C8",
    "#9C27B0",
  
    // ⚪ Grises claros → oscuros
    "#BAB0AC",
    "#A5A5A5",
    "#8D8D8D",
    "#757575",
    "#606060",
    "#3C3C3C",
    "#000000"
];
  
  
export function filterSystemState(systemState: SystemState) {
    const newSystemState: SystemState = JSON.parse(JSON.stringify(systemState))
    newSystemState.gases = newSystemState.gases.filter((gas) => (gas.molarFraction !== 0) && (gas.name !== "-"))

    return newSystemState
}


const tabsInfo = [
    {
        name: "radio",
        value: "1",
        label: "Curvas líquido-vapor" 
    },
    {
        name: "radio",
        value: "2",
        label: "Isotermas clásicas"
    },
    {
        name: "radio",
        value: "3",
        label: "Factor de compresibilidad (Z)"
    },
]

const zTabsInfo = [
    {
        name: "zradio",
        value: "Z-V",
        label: "Z vs V"
    },
    {
        name: "zradio",
        value: "Z-P",
        label: "Z vs P"
    },
]

const graphicOptions = ["Van der Waals", "Redlich-Kwong", "S.-Redlich-Kwong-M", "Peng-Robinson", "Ideal"]
const customMargin = {
    l: 60,  // left margin
    r: 80,  // right margin
    t: 60,  // top margin
    b: 50,  // bottom margin
}
const lineWidth = 1.5

export default function EosView() {

    const [selectedMode, setSelectedMode] = useState("1")
    const [selectedZMode, setSelectedZMode] = useState<ZModes>("Z-V")


    const systemState = useAppSelector(state => state.eosReducer)


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedMode(e.target.value)
    }
    const handleZChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedZMode(e.target.value as ZModes)
    }


    
    if(systemState) return (
    <div className=''>
        <div className="flex flex-col gap-16">
            <Table gases={systemState.gases} />
            <div>
                <RadioTabs
                    info={tabsInfo}
                    selectedMode={selectedMode}
                    handleChange={handleChange}
                    >
                    {({ radio, inputProps, labelProps }) => (
                        <label className={`flex items-center panel-button relative cursor-pointer max-w-64 ${selectedMode === radio.value ? "!bg-accent-300/60" : ""}`} {...labelProps}>
                            <span className="text-center">{radio.label ?? "Sin etiqueta"}</span>
                            <input className="opacity-0 absolute" {...inputProps} />
                        </label>
                    )}
                </RadioTabs>
                {selectedMode === "3" && <RadioTabs
                    info={zTabsInfo}
                    selectedMode={selectedZMode}
                    handleChange={handleZChange}
                    >
                    {({ radio, inputProps, labelProps }) => (
                        <label className={`flex items-center panel-button relative cursor-pointer max-w-64 ${selectedZMode === radio.value ? "!bg-accent-300/60" : ""}`} {...labelProps}>
                            <span className="text-center">{radio.label ?? "Sin etiqueta"}</span>
                            <input className="opacity-0 absolute" {...inputProps} />
                        </label>
                    )}
                </RadioTabs>}
            </div>
            {selectedMode === "1" && <Curves systemState={systemState} customMargin={customMargin} graphicOptions={graphicOptions} lineWidth={lineWidth} lineColors={lineColors}/>}
            {selectedMode === "2" && <Isotherms systemState={systemState} customMargin={customMargin} graphicOptions={graphicOptions} lineWidth={lineWidth} lineColors={lineColors}/>}
            {selectedMode === "3" && <Factors selectedZMode={selectedZMode} systemState={systemState} customMargin={customMargin} graphicOptions={graphicOptions} lineWidth={lineWidth} lineColors={lineColors}/>}
        </div>

    </div>
  )
}
