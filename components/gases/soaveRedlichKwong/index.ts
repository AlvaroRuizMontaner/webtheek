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

import { Pressures, RSI, sanitizeVolumes } from "../constantes";
import { croot } from "../cardano";
import { PressionAndVolumeData, SystemState, Volumes } from "@/types/eos";

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

  let calculatedPoints = pressures.map((P) => {

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

  calculatedPoints = calculatedPoints.filter((Vm) => Vm > b_mix * (1 + 1e-12)) // Se descartan los casos donde Vm sea menor que b_mix

  return calculatedPoints
}

//---------------------------------------------Isotherms---------------------------------------------


function calculatePressure(volumes: Volumes, T: number, a_mix: number, b_mix: number) {
  return volumes.map((V) => (
    (RSI*T)/(V-b_mix) - a_mix/(V * (V + b_mix))
  ))
}


export function calculatePressurePointsSRK(volumes: Volumes, T: number, systemState: SystemState): PressionAndVolumeData {

  const {aArray, bArray} = arrayParamsSRK(systemState.gases, T)
  const {a_mix, b_mix} = mixParamsSRK(aArray, bArray, systemState)

  const filteredVolumes = sanitizeVolumes(volumes, b_mix)

  const pressures = calculatePressure(filteredVolumes, T, a_mix, b_mix);

  return {pressureData: pressures, volumeData: filteredVolumes}
}