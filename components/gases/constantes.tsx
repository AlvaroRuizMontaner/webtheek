import { ElementData } from "@/types/eos";

export type Points = { T: number; P: number }[];

export const R=8.314462618  // J mol−1 K−1

export const points = [
    {T:280, P:5e5},
    {T:280, P:10e5},
    {T:280, P:15e5},
    {T:280, P:20e5},
    {T:280, P:25e5},
    {T:280, P:30e5},
    {T:280, P:35e5},
    {T:280, P:40e5},
    {T:280, P:45e5},
    {T:280, P:50e5},
    {T:280, P:55e5},
    {T:280, P:60e5},
    {T:280, P:65e5},
    {T:280, P:70e5},
    {T:280, P:75e5},
    {T:280, P:80e5},
    {T:280, P:85e5},
    {T:280, P:90e5},
];

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