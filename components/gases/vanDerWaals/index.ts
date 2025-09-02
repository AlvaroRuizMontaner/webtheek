// Cúbica de van der Waals
// P*Vm3 − (Pb+RT)*Vm2 + (a+RTb)*Vm − ab = 0

import { SystemState } from "@/types/eos";
import { croot } from "../cardano";
import { Pressures, pressureSItopressureBar, RBL, RSI } from "../constantes";

/* export const fVDW = {
    calc_a(Tc: number, Pc: number) {
      const currentP = pressureSItopressureBar(Pc)
      return (27 * (RBL*Tc) ** 2) / (64 * currentP);
    },
    calc_b(Tc: number, Pc: number) {
      const currentP = pressureSItopressureBar(Pc)
      return (RBL * Tc) / (8 * currentP);
    },
    calcT(P: number, Vm: number, a: number, b: number) {
        return ((P * (Vm - b)) / RBL) + (a / (RBL * Math.pow(Vm, 2))) * (Vm - b);
    },
    calcP(T: number, Vm: number, a: number, b: number) {
        return (RBL * T) / (Vm - b) - (a / Math.pow(Vm, 2));
    }
}; */

//const A = P;                                  // Pa
//const B = -(P * b + R * T);                   // Pa·m³·mol⁻¹
//const C =  a + R * T * b;                     // Pa·m⁶·mol⁻²
//const D = -a * b;                             // Pa·m⁶·mol⁻²

function arrayParamsVDWBarL(gases: SystemState["gases"]) {
  const aArray = gases.map(gas => {
    const Pc = pressureSItopressureBar(gas.Pc)

    return (27 * RBL**2 * gas.Tc**2) / (64 * Pc)
  });
  const bArray = gases.map(gas => {
    const Pc = pressureSItopressureBar(gas.Pc)

    return (RBL * gas.Tc) / (8 * Pc)
  });

  return { aArray, bArray }
}
function arrayParamsVDW(gases: SystemState["gases"]) {
  const aArray = gases.map(gas => (27 * RSI**2 * gas.Tc**2) / (64 * gas.Pc));
  const bArray = gases.map(gas => (RSI * gas.Tc) / (8 * gas.Pc));

  return { aArray, bArray }
}

function mixParamsVDW(aArray: number[], bArray: number[], systemState: SystemState) {

  if(aArray.length === bArray.length && aArray.length === systemState.gases.length) {
    // mixing rules
    let a_mix = 0, b_mix = 0;
    systemState.gases.forEach((gi, i) => {
      b_mix += gi.molarFraction * bArray[i];
      systemState.gases.forEach((gj, j) => {
        a_mix += gi.molarFraction * gj.molarFraction * Math.sqrt(aArray[i] * aArray[j]); // k_ij = 0
      });
    });

    //console.log(`a_mix: ${a_mix}, b_mix: ${b_mix}`)

    return { a_mix, b_mix }
  } else {
    throw new Error("Las longitudes de los arrays no coinciden")
  }
}


export function calculateVmPoints(pressures: Pressures, T: number, systemState: SystemState) {

  const {aArray, bArray} = arrayParamsVDW(systemState.gases)
  const {a_mix, b_mix} = mixParamsVDW(aArray, bArray, systemState)

  const calculatedPoints = pressures.map((P) => {

    const coef = [
      P,
      -(P*b_mix + RSI*T),
      a_mix + RSI*T*b_mix,
      -a_mix*b_mix
    ];
    const Vm = croot(coef/* , P, T */) as number;        // m³·mol⁻¹
    //console.log(`Caso ${i+1}: Vm = ${Vm} m3/mol, P = ${P}, T = ${T}`);
    return Vm
  });

  return calculatedPoints
}
export function calculateVmPointsBarL(pressures: Pressures, T: number, systemState: SystemState) {

  const {aArray, bArray} = arrayParamsVDWBarL(systemState.gases)
  const {a_mix, b_mix} = mixParamsVDW(aArray, bArray, systemState)

  const calculatedPoints = pressures.map((P) => {
    const PBar = pressureSItopressureBar(P)

    const coef = [
      PBar,
      -(PBar*b_mix + RBL*T),
      a_mix + RBL*T*b_mix,
      -a_mix*b_mix
    ];
    const Vm = croot(coef) as number;        // m³·mol⁻¹
    //console.log(`Caso ${i+1}: Vm = ${Vm} m3/mol, P = ${P}, T = ${T}`);
    return Vm
  });

  return calculatedPoints
}


