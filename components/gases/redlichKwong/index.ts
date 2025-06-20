// ----------------  Redlich‑Kwong (RK)  ----------------
//
//   P = RT/(Vm − b) − a / [ √T · Vm (Vm + b) ]
//
// → forma cúbica en Vm
//   A · Vm³ + B · Vm² + C · Vm + D = 0
//   ────────────────────────────────────────────────
//   A =  P                                 [Pa]
//   B = −R·T                               [Pa·m³·mol⁻¹]
//   C =  a/√T − R·T·b − P·b²              [Pa·m⁶·mol⁻²]
//   D = −a·b / √T                         [Pa·m⁹·mol⁻³]
//
//   Parámetros característicos:
//     a = 0.42748 · R² · Tc^(5/2) / Pc
//     b = 0.08664 · R · Tc / Pc
//------------------------------------------------------

import { SystemState } from "@/types/eos";
import { croot } from "../cardano";
import { Pressures, R } from "../constantes";

/** Herramientas específicas RK */
export const fRK = {
  /** a(Tc, Pc)  [Pa·m⁶·mol⁻²] */
  calc_a(Tc: number, Pc: number) {
    return 0.42748 * R**2 * Math.pow(Tc, 2.5) / Pc;
  },

  /** b(Tc, Pc)  [m³·mol⁻¹] */
  calc_b(Tc: number, Pc: number) {
    return 0.08664 * R * Tc / Pc;
  },

  /** Presión a partir de T y Vm (ecuación original RK) */
  calcP(T: number, Vm: number, a: number, b: number) {
    return (R * T) / (Vm - b) - a / (Math.sqrt(T) * Vm * (Vm + b));
  },

  /** (opcional) – T a partir de P y Vm requiere resolver numéricamente */
};

function arrayParamsRK(gases: SystemState["gases"]) {
  const aArray = gases.map(gas => (0.42748 * R**2 * Math.pow(gas.Tc, 2.5) / gas.Pc));
  const bArray = gases.map(gas => (0.08664 * R * gas.Tc / gas.Pc));

  return { aArray, bArray }
}

function mixParamsRK(aArray: number[], bArray: number[], systemState: SystemState) {

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

/** Devuelve los Vm (m³·mol⁻¹) para cada par (T,P) con el modelo RK */
export function calculateVmPointsRK(pressures: Pressures, T: number, systemState: SystemState) {
  const {aArray, bArray} = arrayParamsRK(systemState.gases)
  const {a_mix, b_mix} = mixParamsRK(aArray, bArray, systemState)

  return pressures.map((P) => {
    const coef = [
      P,
      -R * T,
      a_mix / Math.sqrt(T) - R * T * b_mix - P * b_mix**2,
      -a_mix * b_mix / Math.sqrt(T),
    ];
    const Vm = croot(coef) as number; // m³·mol⁻¹ – se usa la raíz real mayor
    //console.log(`Caso ${i + 1}: Vm = ${Vm} m³/mol, P = ${P} Pa, T = ${T} K`);
    return Vm;
  });
}