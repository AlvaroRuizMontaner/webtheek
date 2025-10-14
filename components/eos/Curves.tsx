import React, { useState } from 'react'
import Pressures from './Pressures'
import Temperatures from './Temperatures'
import ControlPanel from './ControlPanel'
import { CalculationFunction, SystemState } from '@/types/eos';
import { calculateVmPoints } from '../gases/vanDerWaals';
import { filterSystemState } from '@/views/eos/EosView';
import { AutoLoadingWrapper } from './AutoLoadingWrapper';
import Plotly from '../../components/plotly/Plotly';
import { calculateVmPointsRK } from '../gases/redlichKwong';
import { calculateVmPointsSRK } from '../gases/soaveRedlichKwong';
import { calculateVmPointsPR } from '../gases/pengRobinson';

type MarginKeys = "l" | "r" | "t" | "b";


type CurvesProps = {
    systemState: SystemState
    customMargin: Record<MarginKeys, number>;
    graphicOptions: string[]
    lineWidth: number
    lineColors: string[]
    selectedMode: number
};

export default function Curves({systemState, customMargin, graphicOptions, lineWidth, lineColors, selectedMode}: CurvesProps) {

    const [selectedGraphicOptions, setSelectedGraphicOptions] = useState<string[]>([])

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
    
            return temperatures.data.flatMap((T, indx) => {
    
                let currentColor: string | undefined = undefined
                const lenLines = lineColors.length
                const lenData = newSystemState.temperatures.data.length
    
                if(indx < lenLines*(counter+1)) {
                    if (lenData < 15) {
                        currentColor // plotly maneja automaticamente cuando el color es undefined
                    } else {
                        currentColor = lineColors[indx-lenLines*counter]
                    }
                } else {
                    // La primera vez que corre este bloque es para indx = len por tanto:
                    currentColor = lineColors[indx-lenLines*counter]
                    counter++
                }
    
                //const color = lineColors[indx % lineColors.length];
    
                const { liquid, vapor } = calcFunction(pressures.data, T, newSystemState);
                console.log(`liquid: ${liquid.V.length} vapor: ${vapor.V.length} T=${T}`)

                const localTraces: Partial<Plotly.PlotData>[] = [];

    
    
                // Rama vapor (sólida)
                if (vapor.V.length && vapor.P.length) {
                    localTraces.push({
                    x: vapor.V,              // m³/mol
                    y: vapor.P,              // Pa (o MPa si ya conviertes)
                    type: "scatter",
                    mode: "lines",
                    name: `${T} K - vapor`,
                    legendgroup: `${T}K`,
                    legendgrouptitle: { text: `${T} K` },
                    showlegend: true,
                    line: { width: lineWidth, color: currentColor, dash: "solid" },
                    hovertemplate: `T=${T} K<br>P=%{y}<br>V=%{x}<extra></extra>`
                    });
                }
            
                // Rama líquido (discontinua)
                if (liquid.V.length && liquid.P.length) {
                    localTraces.push({
                    x: liquid.V,
                    y: liquid.P,
                    type: "scatter",
                    mode: "lines",
                    name: `${T} K - líquido`,
                    legendgroup: `${T}K`,
                    legendgrouptitle: { text: `${T} K` },
                    showlegend: true,
                    line: { width: lineWidth, color: currentColor, dash: "dash" },
                    hovertemplate: `T=${T} K<br>P=%{y}<br>V=%{x}<extra></extra>`
                    });
                }

                /*             const calculations: Partial<PlotData> = {
                    x: calcFunction(pressures.data, T, newSystemState).vapor.V,
                    y: pressures.data,
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: currentColor, width: 0.5,},
                    name: T.toString(),
                    line: {
                        width: lineWidth, // Grosor de la línea
                        color: currentColor // Color de la línea
                    },
                } */
    
                return localTraces
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
    
    
        /* ----------------------------------------------GI---------------------------------------------- */
        //const GIData: Plotly.Data[] = calculateVmLines(newSystemState, calculateVmPointsGI)

  return (
    <section>
        <div className='flex flex-col gap-16'>
            <Pressures pressures={systemState.pressures} />
            <Temperatures temperatures={systemState.temperatures} />
            <ControlPanel graphicOptions={graphicOptions} selectedGraphicOptions={selectedGraphicOptions} setSelectedGraphicOptions={setSelectedGraphicOptions} selectedMode={selectedMode}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-10 mt-8">
            {selectedGraphicOptions.includes(graphicOptions[0]) && (
                <AutoLoadingWrapper>
                    {(setLoading) => (
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
                        setLoading={setLoading}
                    />
                    )}
                </AutoLoadingWrapper>
            )}
            {selectedGraphicOptions.includes(graphicOptions[1]) && (
                <AutoLoadingWrapper>
                    {(setLoading) => (
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
                            setLoading={setLoading}
                        />
                    )}
                </AutoLoadingWrapper>
            )}
            {selectedGraphicOptions.includes(graphicOptions[2]) && (
                <AutoLoadingWrapper>
                    {(setLoading) => (
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
                            setLoading={setLoading}
                        />
                    )}
                </AutoLoadingWrapper>
            )}
            {selectedGraphicOptions.includes(graphicOptions[3]) && (
                <AutoLoadingWrapper>
                    {(setLoading) => (
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
                            setLoading={setLoading}
                        />
                    )}
                </AutoLoadingWrapper>
            )}
{/*             {selectedGraphicOptions.includes(graphicOptions[4]) && (
                <AutoLoadingWrapper>
                    {(setLoading) => (
                        <Plotly
                            className="w-full max-w-3xl aspect-[4/3]"
                            editable={false}
                            data={GIData}
                            layout={
                                {
                                    //width: 820,
                                    //height: 540,
                                    autosize: true,
                                    title: {
                                        text: 'P-V (GI)',
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
                            setLoading={setLoading}
                        />
                    )}
                </AutoLoadingWrapper>
            )} */}
        </div>
    </section>
  )
}
