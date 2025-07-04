import "./eos.scss";
import Plotly from '../../components/plotly/Plotly';
import { calculateVmPoints } from '@/components/gases/vanDerWaals';
import { calculateVmPointsRK } from '@/components/gases/redlichKwong';
import { calculateVmPointsSRK } from '@/components/gases/soaveRedlichKwong';
import { calculateVmPointsPR } from '@/components/gases/pengRobinson';
import { useAppSelector } from "@/redux/hooks";
import Table from "@/components/eos/Table";
import { CalculationFunction, SystemState } from "@/types/eos";
import Temperatures from "@/components/eos/Temperatures";
import { PlotData } from "plotly.js";
import Pressures from "@/components/eos/Pressures";


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
  
  
function filterSystemState(systemState: SystemState) {
    const newSystemState: SystemState = JSON.parse(JSON.stringify(systemState))
    newSystemState.gases = newSystemState.gases.filter((gas) => (gas.molarFraction !== 0) && (gas.name !== "-"))

    return newSystemState
}

export default function EosView() {
    
    const customMargin = {
        l: 60,  // left margin
        r: 80,  // right margin
        t: 60,  // top margin
        b: 50,  // bottom margin
    }

    const lineWidth = 1.5

    const systemState = useAppSelector(state => state.eosReducer)
    const newSystemState = filterSystemState(systemState)

    /* ---------------------------------------------Config--------------------------------------------- */

/*     const config: Partial<Plotly.Data> = {
        type: 'scatter',
        mode: 'lines',
        marker: {color: '#2299ff', width: 0.5,},
    } */

    /* --------------------------------------Wrapper calculations-------------------------------------- */

    function calculateVmLines(newSystemState: SystemState, calcFunction: CalculationFunction) {
        const {temperatures, pressures} = newSystemState

        let counter = 0
        

        return temperatures.data.map((T, indx) => {

            let currentColor: string | undefined = undefined
            const lenLines = lineColors.length
            const lenData = newSystemState.temperatures.data.length

            if(indx < lenLines*(counter+1)) {
                if (lenData < 15) {
                    currentColor
                } else {
                    currentColor = lineColors[indx-lenLines*counter]
                }
            } else {
                // La primera vez que corre este bloque es para indx = len por tanto:
                currentColor = lineColors[indx-lenLines*counter]
                counter++
            }

            const calculations: Partial<PlotData> = {
                x: calcFunction(pressures.data, T, newSystemState),
                y: pressures.data,
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
    const VDWData: Plotly.Data[] = calculateVmLines(newSystemState, calculateVmPoints)


    /* ---------------------------------------------RK---------------------------------------------- */
    const RKData: Plotly.Data[] = calculateVmLines(newSystemState, calculateVmPointsRK)


    /* ---------------------------------------------SRK--------------------------------------------- */
    const SRKData: Plotly.Data[] = calculateVmLines(newSystemState, calculateVmPointsSRK)


    /* ---------------------------------------------PR---------------------------------------------- */
    const PRData: Plotly.Data[] = calculateVmLines(newSystemState, calculateVmPointsPR)


    
    if(systemState) return (
    <div className=''>
        <Table gases={systemState.gases} />
        <br />
        <br />
        <Pressures pressures={systemState.pressures} />
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
                              color: "#80f4ff"
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
                        modebar: {orientation: 'h', color: "#80f4ff"},
                        xaxis: {
                            title: {
                                text: 'Vm (m3/mol)',       
                                font: {
                                    color: "#80f4ff"
                                }   
                            },
                            color: "rgba(128, 244, 255, 0.6)", // Color de ticks y números
                            showgrid: true,
                            gridcolor: "rgba(217, 226, 255, 0.15)",
                            zeroline: false
                            //tickformat: ".2e", // Notación científica en el eje X con 2 decimales
                        },
                        yaxis: {
                            title: {
                              text: "P (Pa)",
                              font: {
                                color: "#80f4ff"
                              }
                            },
                            color: "rgba(128, 244, 255, 0.6)",
                            showgrid: true,
                            gridcolor: "rgba(217, 226, 255, 0.15)",
                            zeroline: false
                        },
                        hoverlabel: {
                            bgcolor: '#80f4ff',
                            font: { color: '#1e1b4b' }
                        },
                        legend: {
                            orientation: "v",
                            x: 1.02,
                            y: 1,
                            bgcolor: "rgba(30,27,75,0.6)",  // Semi-transparente sobre el fondo
                            bordercolor: "rgba(128, 244, 255, 0.2)",
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
                        title: {
                            text: 'P-V (RK)',
                            font: {
                                family: "Rubik, sans-serif",
                                size: 20,
                                color: "#80f4ff",
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
                        modebar: {orientation: 'h', color: "#80f4ff"},
                        xaxis: {
                            title: {
                                text: 'Vm (m3/mol)',       
                                font: {
                                    color: "#80f4ff"
                                }   
                            },
                            color: "rgba(128, 244, 255, 0.6)", // Color de ticks y números
                            showgrid: true,
                            gridcolor: "rgba(217, 226, 255, 0.15)",
                            zeroline: false
                            //tickformat: ".2e", // Notación científica en el eje X con 2 decimales
                        },
                        yaxis: {
                            title: {
                              text: "P (Pa)",
                              font: {
                                color: "#80f4ff"
                              }
                            },
                            color: "rgba(128, 244, 255, 0.6)",
                            showgrid: true,
                            gridcolor: "rgba(217, 226, 255, 0.15)",
                            zeroline: false
                        },
                        hoverlabel: {
                            bgcolor: '#80f4ff',
                            font: {
                                color: '#1e1b4b' 
                                
                            }
                        },
                        legend: {
                            orientation: "v",
                            x: 1.02,
                            y: 1,
                            bgcolor: "rgba(30,27,75,0.6)",  // Semi-transparente sobre el fondo
                            bordercolor: "rgba(128, 244, 255, 0.2)",
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
                data={SRKData}
                layout={
                    {
                        //width: 820,
                        //height: 540,
                        autosize: true,
                        title: {
                            text: 'P-V (SRK-M)',
                            font: {
                                family: "Rubik, sans-serif",
                                size: 20,
                                color: "#80f4ff",
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
                        modebar: {orientation: 'h', color: "#80f4ff"},
                        xaxis: {
                            title: {
                                text: 'Vm (m3/mol)',       
                                font: {
                                    color: "#80f4ff"
                                }   
                            },
                            color: "rgba(128, 244, 255, 0.6)", // Color de ticks y números
                            showgrid: true,
                            gridcolor: "rgba(217, 226, 255, 0.15)",
                            zeroline: false
                            //tickformat: ".2e", // Notación científica en el eje X con 2 decimales
                        },
                        yaxis: {
                            title: {
                              text: "P (Pa)",
                              font: {
                                color: "#80f4ff"
                              }
                            },
                            color: "rgba(128, 244, 255, 0.6)",
                            showgrid: true,
                            gridcolor: "rgba(217, 226, 255, 0.15)",
                            zeroline: false
                        },
                        hoverlabel: {
                            bgcolor: '#80f4ff',
                            font: { color: '#1e1b4b' }
                        },
                        legend: {
                            orientation: "v",
                            x: 1.02,
                            y: 1,
                            bgcolor: "rgba(30,27,75,0.6)",  // Semi-transparente sobre el fondo
                            bordercolor: "rgba(128, 244, 255, 0.2)",
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
                data={PRData}
                layout={
                    {
                        //width: 820,
                        //height: 540,
                        autosize: true,
                        title: {
                            text: 'P-V (PR)',
                            font: {
                                family: "Rubik, sans-serif",
                                size: 20,
                                color: "#80f4ff",
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
                        modebar: {orientation: 'h', color: "#80f4ff"},
                        xaxis: {
                            title: {
                                text: 'Vm (m3/mol)',       
                                font: {
                                    color: "#80f4ff"
                                }   
                            },
                            color: "rgba(128, 244, 255, 0.6)", // Color de ticks y números
                            showgrid: true,
                            gridcolor: "rgba(217, 226, 255, 0.15)",
                            zeroline: false
                            //tickformat: ".2e", // Notación científica en el eje X con 2 decimales
                        },
                        yaxis: {
                            title: {
                              text: "P (Pa)",
                              font: {
                                color: "#80f4ff"
                              }
                            },
                            color: "rgba(128, 244, 255, 0.6)",
                            showgrid: true,
                            gridcolor: "rgba(217, 226, 255, 0.15)",
                            zeroline: false
                        },
                        hoverlabel: {
                            bgcolor: '#80f4ff',
                            font: { color: '#1e1b4b' }
                        },
                        legend: {
                            orientation: "v",
                            x: 1.02,
                            y: 1,
                            bgcolor: "rgba(30,27,75,0.6)",  // Semi-transparente sobre el fondo
                            bordercolor: "rgba(128, 244, 255, 0.2)",
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
        </div>
    </div>
  )
}
