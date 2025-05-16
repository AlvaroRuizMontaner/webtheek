"use client"
import React from 'react'
import Plotly from '../../../components/plotly/Plotly';
import "../styles.scss"
import { calculateVmPoints } from '@/components/gases/vanDerWaals';
import { co2Data, points } from '@/components/gases/constantes';
import { calculateVmPointsRK } from '@/components/gases/redlichKwong';
import { calculateVmPointsSRK } from '@/components/gases/soaveRedlichKwong';
import { calculateVmPointsPR } from '@/components/gases/pengRobinson';
import Table from '@/components/eos/Table';

export default function Page() {
    const customMargin = {
        l: 60,  // left margin
        r: 50,  // right margin
        t: 60,  // top margin
        b: 50,  // bottom margin
    }

    const lineWidth = 1.5


    const xtestVDW = calculateVmPoints(points, co2Data)
    const ytestVSW = points.map(({P}) => {
        return P
    })

    const xtestRK = calculateVmPointsRK(points, co2Data)
    const ytestRK = ytestVSW

    const xtestSRK = calculateVmPointsSRK(points, co2Data)
    const ytestSRK = ytestVSW

    const xtestPR = calculateVmPointsPR(points, co2Data)
    const ytestPR = ytestVSW

    const molarFraction = 1;

  return (
    <div className='gap-4 plots'>
        <Table data={[{...co2Data, molarFraction}]} />
        <div className="grid grid-cols-2 justify-center items-center gap-10 ">
            <Plotly
                className="w-full max-w-3xl aspect-[4/3]"
                editable={false}
                data={[
                    {
                        x: xtestVDW,
                        y: ytestVSW,
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: '#2299ff', width: 0.5,},
                        name: "test",
                        line: {
                            width: lineWidth, // Grosor de la línea
                            color: '#2299ff' // Color de la línea
                        }
                    },
                ]}
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
                data={[
                    {
                        x: xtestRK,
                        y: ytestRK,
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: '#2299ff', width: 0.5,},
                        name: "test",
                        line: {
                            width: lineWidth, // Grosor de la línea
                            color: '#2299ff' // Color de la línea
                        }
                    },
                ]}
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
                data={[
                    {
                        x: xtestSRK,
                        y: ytestSRK,
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: '#2299ff', width: 0.5,},
                        name: "test",
                        line: {
                            width: lineWidth, // Grosor de la línea
                            color: '#2299ff' // Color de la línea
                        }
                    },
                ]}
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
                data={[
                    {
                        x: xtestPR,
                        y: ytestPR,
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: '#2299ff', width: 0.5,},
                        name: "test",
                        line: {
                            width: lineWidth, // Grosor de la línea
                            color: '#2299ff' // Color de la línea
                        }
                    },
                ]}
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
