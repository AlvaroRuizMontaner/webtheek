import { ElementData } from "@/types/eos";

export type Pressures = number[];

export const RSI=8.314462618  // J mol−1 K−1
export const RBL=0.08314462618  // J mol−1 K−1

export const pressuresSI = [ 5e5, 10e5, 15e5, 20e5, 25e5, 30e5, 35e5, 40e5, 45e5, 50e5, 55e5, 60e5, 65e5, 70e5, 75e5, 80e5, 85e5, 90e5 ];
export const pressuresBL = [ 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90 ];

export function pressureSItopressureBar(pressureSI: number) {
    return pressureSI/10e5
}

export const co2Data: ElementData = {
    name: "Carbon Dioxide",
    formula: "CO2",
    Tc: 304.1282,          // K         (temperatura crítica)
    Pc: 7.3773e6,          // Pa        (7.3773 MPa)
    Vc: 9.4e-5,            // m³/mol    (94 cm³·mol⁻¹)
    molarMass: 0.0440095,          // kg/mol    (44.0095 g·mol⁻¹)
    omega: 0.225
}
export const o2Data: ElementData = {
    name: "Oxygen",
    formula: "O2",
    Tc: 154.581,           // K
    Pc: 5.043e6,           // Pa        (5.043 MPa)
    Vc: 7.34e-5,           // m³/mol    (73.4 cm³·mol⁻¹)
    molarMass: 0.031998,           // kg/mol    (31.998 g·mol⁻¹)
    omega: 0.318
}