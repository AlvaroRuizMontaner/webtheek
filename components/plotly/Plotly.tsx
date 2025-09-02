import dynamic from 'next/dynamic';
import { ModeBarButtonAny } from 'plotly.js-dist-min';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState, useId } from 'react';

// https://dev.to/composite/how-to-integrate-plotlyjs-on-nextjs-14-with-app-router-1loj

// Usamos dynamic import para cargar Plotly de manera dinámica, y deshabilitamos el SSR (Server-Side Rendering).
// Esto es porque Plotly debe ejecutarse en el cliente, ya que depende del DOM.

type PlotlyComponentProps = {
  id?: string,
  className?: string,
  data: Plotly.Data[],
  layout: Partial<Plotly.Layout>,
  config?: Plotly.Config,
  editable?: boolean,
  modeBarButtonsToAdd?: ModeBarButtonAny[]
  setLoading: (bool: boolean) => void
}

const Plotly = dynamic(
    () =>
      import('plotly.js-dist-min').then(({ react, purge }) => { //plotly.react es mas eficiente y rapido que plotly.newPlot
  
        // 'forwardRef' es un patrón en React que permite pasar una referencia (ref) de un componente hijo
        // al componente padre. Esto es útil cuando queremos manejar la referencia a un DOM elemento de manera
        // explícita y personalizada, como en el caso de Plotly.
        const PlotlyComponent = forwardRef(
          (
            // Desestructuramos las props que el componente va a recibir:
            // 'id' y 'className' son para controlar el identificador y la clase CSS del div.
            // 'data', 'layout', y 'config' son los datos que pasaremos a Plotly para renderizar el gráfico.
            { id, className, data, layout, config, editable=false, modeBarButtonsToAdd, setLoading }: PlotlyComponentProps,
            ref
          ) => {
            // 'useId' es un hook de React que nos da un identificador único para este componente, útil si no pasamos 'id' como prop.
            const originId = useId();
            const realId = id || originId; // Si no se pasa un 'id', usamos el generado por 'useId'.
            
            // 'useRef' es un hook de React que crea una referencia mutable a un elemento del DOM.
            // 'originRef' es la referencia al div donde Plotly va a renderizar el gráfico.
            const originRef = useRef<HTMLDivElement | null>(null);
            
            // 'useState' se usa para almacenar el estado de la instancia de Plotly una vez que el gráfico ha sido renderizado.
            const [handle, setHandle] = useState<Plotly.PlotlyHTMLElement | undefined>(undefined); 
  
            // 'useEffect' se ejecuta después del renderizado del componente.
            // Aquí usamos 'useEffect' para crear el gráfico de Plotly solo cuando los datos, el diseño o la configuración cambian.
            useEffect(() => {
              let instance: Plotly.PlotlyHTMLElement | undefined;

              const updatedLayout = {
                ...layout,
                modeBar: {
                  orientation: 'h', // Esto asegura que la barra de herramientas esté horizontal
                },
              };

              // Si 'originRef.current' está disponible (lo que significa que el div ha sido renderizado),
              // llamamos a 'newPlot' de Plotly para renderizar el gráfico.
              if (originRef.current && modeBarButtonsToAdd) {
                react(originRef.current, data, updatedLayout, { ...config, scrollZoom: true, modeBarButtonsToAdd, editable, displaylogo: false, responsive: true }).then((ref: Plotly.PlotlyHTMLElement) => {
                  // Cuando el gráfico ha sido renderizado, guardamos la instancia de Plotly en el estado.
                  instance = ref
                  setHandle(ref);

                  console.log("ayy lmao")

                  // Escuchamos el evento de que Plotly terminó de dibujar
                  setLoading(false);
                });
              }
  
              // La función de retorno limpia la instancia de Plotly cuando el componente se desmonta o cambia el gráfico.
              return () => {
                instance && purge(instance);
              };
            }, [data, layout, config]); // Este efecto se ejecuta cada vez que los datos, el diseño o la configuración cambian.
  
            // 'useImperativeHandle' es un hook que se utiliza para exponer valores o funciones del componente hijo al componente padre.
            // En este caso, estamos exponiendo la referencia del gráfico para que el componente padre pueda acceder a ella si lo necesita.
            useImperativeHandle(ref, () => (handle ?? originRef.current ?? document.createElement('div')), [handle]);
  
            // Finalmente, el componente devuelve el div donde Plotly renderizará el gráfico.
            // 'realId' se usa para asignar el ID del div, y 'originRef' es la referencia del div para que Plotly lo use.
            return <div id={realId} ref={originRef} className={className}></div>;
          }
        );
  
        // Asignamos un nombre para depuración. Es útil cuando inspeccionamos el árbol de componentes en herramientas como React DevTools.
        PlotlyComponent.displayName = 'Plotly';
        
        // Devolvemos el componente Plotly con 'forwardRef' para que pueda manejar las referencias correctamente.
        return PlotlyComponent;
      }),
    // Desactivamos SSR para que Plotly solo se cargue en el cliente.
    { ssr: false }
  );
  
  export default Plotly;
  
