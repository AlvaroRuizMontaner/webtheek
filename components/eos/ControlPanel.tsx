import { Dispatch, SetStateAction } from "react";
import "./styles.scss";

type ControlPanelProps = {
    graphicOptions: string[]
    selectedGraphicOptions: string[]
    setSelectedGraphicOptions: Dispatch<SetStateAction<string[]>>
}

export default function ControlPanel({graphicOptions, selectedGraphicOptions, setSelectedGraphicOptions}: ControlPanelProps) {

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


    return (
    <div className='marco-eos'>
        {graphicOptions.map((option, optionIndx) => (
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
