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

function filterSystemState(systemState: SystemState) {
    const newSystemState: SystemState = JSON.parse(JSON.stringify(systemState))
    newSystemState.gases = newSystemState.gases.filter((gas) => (gas.molarFraction !== 0) && (gas.name !== "-"))

    console.log(newSystemState)

    return newSystemState
}

export default function EosView() {
    const customMargin = {
        l: 60,  // left margin
        r: 50,  // right margin
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
        

        return temperatures.map((T) => {

            const calculations: Partial<PlotData> = {
                x: calcFunction(pressures, T, newSystemState),
                y: pressures,
                type: 'scatter',
                mode: 'lines',
                marker: {color: '#2299ff', width: 0.5,},
                name: T.toString(),
                line: {
                    width: lineWidth, // Grosor de la línea
                    color: '#2299ff' // Color de la línea
                },
            }

            return calculations
        })
    }


    /* ---------------------------------------------VDW--------------------------------------------- */

/*     function calculateMultipleVmLinesVDW(pressures: number[], temperatures: number[], newSystemState: SystemState): Plotly.Data[] {
        return temperatures.map((T) => (
            {
                x: calculateVmPoints(pressures, T, newSystemState),
                y: pressures,
                type: 'scatter',
                mode: 'lines',
                marker: {color: '#2299ff', width: 0.5,},
                name: T.toString(),
                line: {
                    width: lineWidth, // Grosor de la línea
                    color: '#2299ff' // Color de la línea
                },
            }
        ))
    } */

    const VDWData: Plotly.Data[] = calculateVmLines(pressures, config, newSystemState, calculateVmPoints)


/*     const xtestVDW = calculateVmPoints(pressures, 280, newSystemState)
    const ytestVDW = pressures.map((P) => {
        return P
    }) */

/*     const VDWData: Plotly.Data[] = [
        {
            x: xtestVDW,
            y: ytestVDW,
            ...config
        }
    ] */

    /* ---------------------------------------------RK---------------------------------------------- */

    /* const xtestRK = calculateVmPointsRK(pressures, 280, newSystemState)
    const ytestRK = pressures.map((P) => {
        return P
    })

    const RKData: Plotly.Data[] = [
        {
            x: xtestRK,
            y: ytestRK,
            ...config
        }
    ] */

    const RKData: Plotly.Data[] = calculateVmLines(pressures, config, newSystemState, calculateVmPointsRK)


    /* ---------------------------------------------SRK--------------------------------------------- */

    /* const xtestSRK = calculateVmPointsSRK(pressures, 280, newSystemState)
    const ytestSRK = pressures.map((P) => {
        return P
    })

    const SRKData: Plotly.Data[] = [
        {
            x: xtestSRK,
            y: ytestSRK,
            ...config
        }
    ] */

    const SRKData: Plotly.Data[] = calculateVmLines(pressures, config, newSystemState, calculateVmPointsSRK)


    /* ---------------------------------------------PR---------------------------------------------- */

    /* const xtestPR = calculateVmPointsPR(pressures, 280, newSystemState)
    const ytestPR = pressures.map((P) => {
        return P
    })

    const PRData: Plotly.Data[] = [
        {
            x: xtestPR,
            y: ytestPR,
            ...config
        }
    ] */

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
                        title: {text: 'P-V (VDW)'},
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
