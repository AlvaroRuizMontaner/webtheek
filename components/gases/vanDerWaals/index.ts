// Cúbica de van der Waals
// P*Vm3 − (Pb+RT)*Vm2 + (a+RTb)*Vm − ab = 0

import { croot } from "../cardano";
import { ElementData, Points, R } from "../constantes";

export const fVDW = {
    calc_a(Tc: number, Pc: number) {
      return (27 * (R*Tc) ** 2) / (64 * Pc);
    },
    calc_b(Tc: number, Pc: number) {
      return (R * Tc) / (8 * Pc);
    },
    calcT(P: number, Vm: number, a: number, b: number) {
        return ((P * (Vm - b)) / R) + (a / (R * Math.pow(Vm, 2))) * (Vm - b);
    },
    calcP(T: number, Vm: number, a: number, b: number) {
        return (R * T) / (Vm - b) - (a / Math.pow(Vm, 2));
    }
};

//const A = P;                                  // Pa
//const B = -(P * b + R * T);                   // Pa·m³·mol⁻¹
//const C =  a + R * T * b;                     // Pa·m⁶·mol⁻²
//const D = -a * b;                             // Pa·m⁶·mol⁻²


export function calculateVmPoints(points: Points, elementData: ElementData) {
    const {Tc, Pc} = elementData
    const a = fVDW.calc_a(Tc, Pc)
    const b = fVDW.calc_b(Tc, Pc)

    const calculatedPoints = points.map(({T,P}, i) => {
        const coef = [
          P,
          -(P*b + R*T),
          a + R*T*b,
          -a*b
        ];
        const Vm = croot(coef) as number;        // m³·mol⁻¹
        console.log(`Caso ${i+1}: Vm = ${Vm} m3/mol, P = ${P}, T = ${T}`);
        return Vm
    });

    return calculatedPoints
}


