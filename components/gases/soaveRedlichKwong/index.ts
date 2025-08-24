// ──────────────────────────  Soave‑Redlich‑Kwong variante MSRK  ──────────────────────────
//
//   P = RT/(Vm − b) − a·α(T,ω) / [ Vm(Vm + b) ]
//
//   con
//     a = 0.42747 · R² · Tc² / Pc
//     b  = 0.08664 · R · Tc / Pc
//     κ  = 0.48508 + 1.55171·ω − 0.15613·ω²
//     α  = [1 + κ (1 − √(T/Tc))]²
//
// → forma cúbica estándar  A·Vm³ + B·Vm² + C·Vm + D = 0
//    A =  P
//    B = −R·T
//    C =  a·α − R·T·b − P·b²
//    D = −a·α·b
// ────────────────────────────────────────────────────────────────────────────

import { Pressures, RSI } from "../constantes";
import { croot } from "../cardano";
import { SystemState } from "@/types/eos";

/** utilidades SRK */
export const fSRK = {
  /** a₀ (solo depende de Tc, Pc)  – Pa·m⁶·mol⁻² */
  calc_a(Tc: number, Pc: number, alpha: number) {
    return 0.42747 * RSI**2 * (Tc ** 2) / Pc * alpha;
  },

  /** b – m³·mol⁻¹ */
  calc_b(Tc: number, Pc: number) {
    return 0.08664 * RSI * Tc / Pc;
  },

  /** P=f(T,Vm) – útil para iterativos */
  calcP(T: number, Vm: number, aAlpha: number, b: number) {
    return RSI * T / (Vm - b) - aAlpha / (Vm * (Vm + b));
  },
};


function arrayParamsSRK(gases: SystemState["gases"], T: number) {
  const aArray: number[] = []
  const bArray: number[] = []

  gases.forEach((gas) => {
    const {omega, Tc, Pc} = gas
    const kappa = 0.48508 + 1.55171 * omega - 0.15613 * omega**2

    const Tr = T / Tc;
    const alpha = (1 + kappa * (1 - Math.sqrt(Tr)))**2;
  
    aArray.push(0.42748 * RSI**2 * Tc**2 / Pc * alpha); // El array de a's ya llevara el alpha incorporado
    bArray.push(0.08664 * RSI * Tc / Pc);
  })

  return { aArray, bArray }
}

export function mixParamsSRK(aArray: number[], bArray: number[], systemState: SystemState) {

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


/** Devuelve Vm (m³·mol⁻¹) para cada par (T,P) con el modelo SRK. */
export function calculateVmPointsSRK(
  pressures: Pressures,
  T: number,
  systemState: SystemState
) {
  const {aArray, bArray} = arrayParamsSRK(systemState.gases, T)
  const {a_mix, b_mix} = mixParamsSRK(aArray, bArray, systemState)

  return pressures.map((P) => {

    const coef = [
      P,
      -RSI * T,
      a_mix - RSI * T * b_mix - P * b_mix**2,
      -a_mix * b_mix,
    ];

    const Vm = croot(coef) as number;   // raíz real mayor = fase vapor
    //console.log(`Caso ${i + 1}: Vm = ${Vm} m³/mol, P = ${P} Pa, T = ${T} K`);
    return Vm;
  });
}