export type ElementData = { 
    name: string; 
    formula?: string; 
    Tc: number; 
    Pc: number; 
    Vc: number; 
    molarMass: number, 
    omega: number 
};

export type Gas = Pick<ElementData, "name" | "Tc" | "Pc" | "omega" | "formula" | "molarMass"> & {molarFraction: number}

export type SystemState = {
    pressure?: number
    temperature?: number
    molarVolume?: number
    gases: Gas[]
    temperatures: number[]
}