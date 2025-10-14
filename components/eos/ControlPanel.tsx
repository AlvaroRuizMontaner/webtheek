import { Dispatch, SetStateAction } from "react";
import "./styles.scss";

type ControlPanelProps = {
    graphicOptions: string[]
    selectedGraphicOptions: string[]
    setSelectedGraphicOptions: Dispatch<SetStateAction<string[]>>
    selectedMode?: string
}

export default function ControlPanel({graphicOptions, selectedGraphicOptions, setSelectedGraphicOptions, selectedMode="2"}: ControlPanelProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
    
        setSelectedGraphicOptions((prev) => {
            if (checked) {
                // Activar: agregar si no está
                return [...prev, value];
            } else {
                // Desactivar: quitar si estaba
                return prev.filter((opt) => opt !== value);
            }
        });
    };

    const isSelected = (option: string) => {
        return selectedGraphicOptions.includes(option)
    }

    function classifyGraphicOptions(graphicOptions: string[]): string[] {
        const copyGraphicOptions = JSON.parse(JSON.stringify(graphicOptions))

        // Si es el caso de curvas, descarto el último, osea el de ideal
        if(selectedMode === "1") {
            copyGraphicOptions.pop()

            console.log(selectedMode)
            console.log(copyGraphicOptions)
         return copyGraphicOptions
        }
        console.log(typeof selectedMode)

        // En cualquier otro caso se queda igual

        return copyGraphicOptions
    }
    


    return (
    <div className='marco-eos'>
        {classifyGraphicOptions(graphicOptions).map((option, optionIndx) => (
            <div className='flex items-center' key={`${option + optionIndx}`}>
                <label className={` panel-button cursor-pointer relative ${isSelected(option) ? "!bg-accent-300/60" : ""}`} htmlFor={`${option}id`}>
                    <input onChange={handleChange} className='opacity-0 absolute' type="checkbox" name={option} id={`${option}id`} value={option} />
                    <span className=''>{option}</span>
                </label>
            </div>
        ))}
    </div>
    )
}
