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
    pressures: {
        data: number[],
        increment: number
    }
    molarVolume?: number
    gases: Gas[]
    temperatures: {
        data: number[],
        increment: number
    }
    volumes: {
        data: number[],
        increment: number
    }
}

export type Pressures = SystemState["pressures"]["data"]
export type Volumes = SystemState["volumes"]["data"]

export type Branch = { P: number[]; V: number[] };
export type CurvePoints = {
    liquid: Branch;
    vapor: Branch
}

export type ZModes = "Z-V" | "Z-P"


export type CalculationFunction = (pressures: number[], temperatures: number, newSystemState: SystemState) => CurvePoints
export type IsothermCalculationFunction = (volumes: number[], temperatures: number, newSystemState: SystemState) => SystemState["volumes"]["data"]