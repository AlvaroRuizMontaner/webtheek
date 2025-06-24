import "./eos.scss";
import Plotly from '../../components/plotly/Plotly';
import { calculateVmPoints } from '@/components/gases/vanDerWaals';
import { pressures } from '@/components/gases/constantes';
import { calculateVmPointsRK } from '@/components/gases/redlichKwong';
import { calculateVmPointsSRK } from '@/components/gases/soaveRedlichKwong';
import { calculateVmPointsPR } from '@/components/gases/pengRobinson';
import { useAppSelector } from "@/redux/hooks";
import Table from "@/components/eos/Table";
import { CalculationFunction, SystemState } from "@/types/eos";
import Temperatures from "@/components/eos/Temperatures";
import { PlotData } from "plotly.js";

/* const lineColors = [
    "#4E79A7", // Azul principal
    "#F28E2B", // Naranja vibrante
    "#E15759", // Rojo suave
    "#76B7B2", // Verde azulado
    "#59A14F", // Verde más saturado
    "#EDC949", // Amarillo dorado
    "#AF7AA1", // Lila suave
    "#FF9DA7", // Rosa pálido
    "#9C755F", // Marrón grisáceo
    "#BAB0AC"  // Gris suave para series menos relevantes
  ]; */

  const lineColors = [
    // 🔵 AZULES
    "#4E79A7",
    "#6399C5",
    "#7DB9E8",
    "#A3D0F5",
    "#CAE7FF",
  
    // 🔵🟢 AZULADOS → VERDES
    "#76B7B2",
    "#59A14F",
    "#6FBF73",
    "#8BD494",
    "#A8E8B4",
  
    // 🟢 VERDES PUROS
    "#45B39D",
    "#4CAF50",
    "#66BB6A",
    "#81C784",
    "#A5D6A7",
  
    // 🟡 VERDES AMARILLENTOS
    "#B9D98D",
    "#D4E157",
    "#E6EE9C",
    "#F0F4C3",
    "#FFF9C4",
  
    // 🟡 AMARILLOS
    "#EDC949",
    "#FFEB3B",
    "#F4D03F",
    "#FBC02D",
    "#FDD835",
  
    // 🧡 NARANJAS
    "#F4A259",
    "#F28E2B",
    "#FB8C00",
    "#EF6C00",
    "#E65100",
  
    // 🔴 ROJOS
    "#E15759",
    "#D1495B",
    "#C21807",
    "#E53935",
    "#F44336",
  
    // 🔴 ROSADOS
    "#FF9DA7",
    "#FFC4BF",
    "#FADADD",
    "#F8BBD0",
    "#F48FB1",
  
    // 🟣 VIOLETAS
/*     "#AF7AA1",
    "#C48ACB",
    "#D5A6E2",
    "#BA68C8",
    "#9C27B0", */
  
    // ⚪ GRIS CLARO
    "#BAB0AC",
    "#A5A5A5",
    "#8D8D8D",
    "#757575",
  
    // ⚫ GRIS OSCURO → NEUTROS
    "#606060",
    "#3C3C3C",
    "#2E3B55",
    "#1F2A44",
    "#152137",
    "#0B1123",
    "#000000"
  ];
  

function filterSystemState(systemState: SystemState) {
    const newSystemState: SystemState = JSON.parse(JSON.stringify(systemState))
    newSystemState.gases = newSystemState.gases.filter((gas) => (gas.molarFraction !== 0) && (gas.name !== "-"))

    console.log(newSystemState)

    return newSystemState
}

export default function EosView() {
    const customMargin = {
        l: 60,  // left margin
        r: 110,  // right margin
        t: 60,  // top margin
        b: 50,  // bottom margin
    }

    const lineWidth = 1.5

    const systemState = useAppSelector(state => state.eosReducer)
    const newSystemState = filterSystemState(systemState)

    /* ---------------------------------------------Config--------------------------------------------- */

    const config: Partial<Plotly.Data> = {
        type: 'scatter',
        mode: 'lines',
        marker: {color: '#2299ff', width: 0.5,},
    }

    /* --------------------------------------Wrapper calculations-------------------------------------- */

    function calculateVmLines(pressures: number[], config: Partial<Plotly.Data>, newSystemState: SystemState, calcFunction: CalculationFunction) {
        const {temperatures} = newSystemState

        let counter = 0
        

        return temperatures.map((T, indx) => {

            let currentColor = "#fff"
            const len = lineColors.length

            if(indx < len*(counter+1)) {
                console.log(`indx: ${indx}, len*(counter+1): ${len*(counter+1)}`)
                currentColor = lineColors[indx-len*counter]
            } else {
                // La primera vez que corre este bloque es para indx = len por tanto:
                currentColor = lineColors[indx-len*counter]
                console.log(currentColor)
                counter++
            }

            const calculations: Partial<PlotData> = {
                x: calcFunction(pressures, T, newSystemState),
                y: pressures,
                type: 'scatter',
                mode: 'lines',
                marker: {color: currentColor, width: 0.5,},
                name: T.toString(),
                line: {
                    width: lineWidth, // Grosor de la línea
                    color: currentColor // Color de la línea
                },
            }

            return calculations
        })
    }


    /* ---------------------------------------------VDW--------------------------------------------- */
    const VDWData: Plotly.Data[] = calculateVmLines(pressures, config, newSystemState, calculateVmPoints)


    /* ---------------------------------------------RK---------------------------------------------- */
    const RKData: Plotly.Data[] = calculateVmLines(pressures, config, newSystemState, calculateVmPointsRK)


    /* ---------------------------------------------SRK--------------------------------------------- */
    const SRKData: Plotly.Data[] = calculateVmLines(pressures, config, newSystemState, calculateVmPointsSRK)


    /* ---------------------------------------------PR---------------------------------------------- */
    const PRData: Plotly.Data[] = calculateVmLines(pressures, config, newSystemState, calculateVmPointsPR)



    
    if(systemState) return (
    <div className=''>
        <Table gases={systemState.gases} />
        <br />
        <br />
        <Temperatures temperatures={systemState.temperatures} />
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-10 mt-8">
            <Plotly
                className="w-full max-w-3xl aspect-[4/3]"
                editable={false}
                data={VDWData}
                layout={
                    {
                        autosize: true,
                        title: {
                            text: "P-V (VDW)",
                            font: {
                              family: "Rubik, sans-serif",
                              size: 20,
                              color: "#cdd6ff"
                            }
                        },
                        plot_bgcolor: "#1f233d",  // Fondo del área de gráfico (tu primary-900)
                        paper_bgcolor: "#1e1b4b", // Fondo del canvas completo
                        font: {
                            family: "Rubik, sans-serif",
                            color: "#cdd6ff",
                            size: 12
                        },
                        margin: customMargin,
                        modebar: {orientation: 'h', color: "green"},
                        xaxis: {
                            title: {
                                text: 'Vm (m3/mol)',       
                                font: {
                                color: "#cdd6ff"
                                }   
                            },
                            color: "#cdd6ff", // Color de ticks y números
                            showgrid: true,
                            gridcolor: "rgba(217, 226, 255, 0.15)",
                            zeroline: false
                            //tickformat: ".2e", // Notación científica en el eje X con 2 decimales
                        },
                        yaxis: {
                            title: {
                              text: "P (Pa)",
                              font: {
                                color: "#cdd6ff"
                              }
                            },
                            color: "#cdd6ff",
                            showgrid: true,
                            gridcolor: "rgba(217, 226, 255, 0.15)",
                            zeroline: false
                        },
                        legend: {
                            orientation: "v",
                            x: 1.02,
                            y: 1,
                            bgcolor: "rgba(30,27,75,0.6)",  // Semi-transparente sobre el fondo
                            bordercolor: "#444",
                            borderwidth: 1,
                            font: {
                              color: "#cdd6ff"
                            }
                        },
                        showlegend: true
                    }
                }
                modeBarButtonsToAdd={
                    [
                        {
                            name: 'color toggler',
                            title: "", 
                            icon: {
                                path: 'M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z',
                                width: 500,
                                height: 600
                            },
                            click: function() {
                                console.log("hola k ase")
                            }
                        },
                        {
                            name: 'color toggler 2',
                            title: "", 
                            icon: {
                                path: 'M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z',
                                width: 500,
                                height: 600
                            },
                            click: function() {
                                console.log("funcion 2")
                            }
                        },
                    ]
                }
            />
            <Plotly
                className="w-full max-w-3xl aspect-[4/3]"
                editable={false}
                data={RKData}
                layout={
                    {
                        //width: 820,
                        //height: 540,
                        autosize: true,
                        title: {text: 'P-V (RK)'},
                        margin: customMargin,
                        modebar: {orientation: 'h', color: "green"},
                        xaxis: {
                            title: {text: 'Vm (m3/mol)'},
                            //tickformat: ".2e", // Notación científica en el eje X con 2 decimales
                        },
                        yaxis: {
                            title: {text: 'P (Pa)'},
                            //tickformat: ",.0f", // Sin notación científica en el eje Y
                        },
                        //legend: customLegend,
                        showlegend: true
                    }
                }
                modeBarButtonsToAdd={
                    [
                        {
                            name: 'color toggler',
                            title: "", 
                            icon: {
                                path: 'M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z',
                                width: 500,
                                height: 600
                            },
                            click: function() {
                                console.log("hola k ase")
                            }
                        },
                        {
                            name: 'color toggler 2',
                            title: "", 
                            icon: {
                                path: 'M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z',
                                width: 500,
                                height: 600
                            },
                            click: function() {
                                console.log("funcion 2")
                            }
                        },
                    ]
                }
            />
            <Plotly
                className="w-full max-w-3xl aspect-[4/3]"
                editable={false}
                data={SRKData}
                layout={
                    {
                        //width: 820,
                        //height: 540,
                        autosize: true,
                        title: {text: 'P-V (SRK-M)'},
                        margin: customMargin,
                        modebar: {orientation: 'h', color: "green"},
                        xaxis: {
                            title: {text: 'Vm (m3/mol)'},
                            //tickformat: ".2e", // Notación científica en el eje X con 2 decimales
                        },
                        yaxis: {
                            title: {text: 'P (Pa)'},
                            //tickformat: ",.0f", // Sin notación científica en el eje Y
                        },
                        //legend: customLegend,
                        showlegend: true
                    }
                }
                modeBarButtonsToAdd={
                    [
                        {
                            name: 'color toggler',
                            title: "", 
                            icon: {
                                path: 'M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z',
                                width: 500,
                                height: 600
                            },
                            click: function() {
                                console.log("hola k ase")
                            }
                        },
                        {
                            name: 'color toggler 2',
                            title: "", 
                            icon: {
                                path: 'M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z',
                                width: 500,
                                height: 600
                            },
                            click: function() {
                                console.log("funcion 2")
                            }
                        },
                    ]
                }
            />
            <Plotly
                className="w-full max-w-3xl aspect-[4/3]"
                editable={false}
                data={PRData}
                layout={
                    {
                        //width: 820,
                        //height: 540,
                        autosize: true,
                        title: {text: 'P-V (PR)'},
                        margin: customMargin,
                        modebar: {orientation: 'h', color: "green"},
                        xaxis: {
                            title: {text: 'Vm (m3/mol)'},
                            //tickformat: ".2e", // Notación científica en el eje X con 2 decimales
                        },
                        yaxis: {
                            title: {text: 'P (Pa)'},
                            //tickformat: ",.0f", // Sin notación científica en el eje Y
                        },
                        //legend: customLegend,
                        showlegend: true
                    }
                }
                modeBarButtonsToAdd={
                    [
                        {
                            name: 'color toggler',
                            title: "", 
                            icon: {
                                path: 'M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z',
                                width: 500,
                                height: 600
                            },
                            click: function() {
                                console.log("hola k ase")
                            }
                        },
                        {
                            name: 'color toggler 2',
                            title: "", 
                            icon: {
                                path: 'M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z',
                                width: 500,
                                height: 600
                            },
                            click: function() {
                                console.log("funcion 2")
                            }
                        },
                    ]
                }
            />
        </div>
    </div>
  )
}
