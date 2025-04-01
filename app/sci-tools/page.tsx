"use client"
import React from 'react'
import Plotly from '../../components/plotly/Plotly';
import "./styles.scss"

export default function Page() {
    const customLegend = {
        orientation: 'h',  // Leyenda horizontal (en lugar de vertical)
        x: 0.5,            // Centrado
        xanchor: 'center', // Centrado horizontalmente
        y: 1.15,           // Coloca la leyenda por debajo del gráfico
        yanchor: 'top',    // Ancla en la parte superior de la leyenda
        font: {
            size: 12,        // Tamaño de la fuente de la leyenda
        },
    }
    const customMargin = {
        l: 40,  // left margin
        r: 40,  // right margin
        t: 60,  // top margin
        b: 40,  // bottom margin
    }

  return (
    <div className='gap-4 plots'>
        <div className="flex justify-center">
            <Plotly
                data={[
                    {
                    x: [1, 2, 3],
                    y: [2, 4, 6],
                    type: 'bar',
                    mode: 'lines+markers',
                    marker: {color: '#2299ff'},
                    },
                ]}
                layout={ {width: 320, height: 240, title: {text: 'Grafiquita 1'}, margin: customMargin, legend: customLegend, /* showlegend: false */} }
            />
        </div>
        <div className="flex justify-center">
            <Plotly
                data={[
                    {
                    x: [1, 2, 3],
                    y: [2, 4, 6],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: '#2299ff'},
                    },
                    {type: "scatter", x: [1, 2, 3], y: [3, 6, 9]},
                ]}
                layout={ {width: 320, height: 240, title: {text: 'Grafiquita 2'}, margin: customMargin, legend: customLegend} }
            />
        </div>
        <div className="flex justify-center">
            <Plotly
                data={[
                    {
                    x: [1, 2, 3],
                    y: [2, 4, 6],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: '#2299ff'},
                    },
                    {type: "scatter", x: [1, 2, 3], y: [3, 6, 9]},
                ]}
                layout={ {width: 320, height: 240, title: {text: 'Grafiquilla wena ahii'}, margin: customMargin, legend: customLegend} }
            />
        </div>
    </div>
  )
}
