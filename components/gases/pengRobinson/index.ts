// ──────────────────────  Peng‑Robinson (PR)  ──────────────────────
//
//   P = RT/(Vm − b) − a·α(T,ω) / [ Vm(Vm + b) + b(Vm − b) ]
//
//   a = 0.45724 · R² · Tc² / Pc
//   b  = 0.07780 · R · Tc / Pc
//   κ  = 0.37464 + 1.54226·ω − 0.26992·ω²      (PR original; ver nota ⇩)
//   α  = [1 + κ (1 − √(T/Tc))]²
//
//   Cúbica en Vm      A·Vm³ + B·Vm² + C·Vm + D = 0
//   ──────────────────────────────────────────────────────────────
//     A =  P
//     B =  P·b − R·T
//     C =  a·α − 3P·b² − 2R·T·b
//     D =  P·b³ + R·T·b² − a·α·b
// ────────────────────────────────────────────────────────────────

import { Pressures, RSI, sanitizeVolumes } from "../constantes";
import { croot } from "../cardano";
import { PressionAndVolumeData, SystemState, Volumes } from "@/types/eos";

/* ---------- utilidades PR ---------- */
export const fPR = {
  calc_a(Tc: number, Pc: number) {
    return 0.45724 * RSI**2 * Tc * Tc / Pc;           // Pa·m⁶·mol⁻²
  },
  calc_b(Tc: number, Pc: number) {
    return 0.07780 * RSI * Tc / Pc;                    // m³·mol⁻¹
  },
  calcP(T: number, Vm: number, aAlpha: number, b: number) {
    return RSI * T / (Vm - b) - aAlpha / (Vm**2 + 2*b*Vm - b**2);
  },
};

function arrayParamsPR(gases: SystemState["gases"], T: number) {
  const aArray: number[] = []
  const bArray: number[] = []

  gases.forEach((gas) => {
    const {omega, Tc, Pc} = gas
    const kappa = omega <= 0.491 ? (0.37464 + 1.54226 * omega - 0.26992 * omega**2) : (0.379642 + 1.48503 * omega - 0.164423 * omega ** 2 + 0.016666 * omega ** 3)

    const Tr = T / Tc;
    const alpha = (1 + kappa * (1 - Math.sqrt(Tr)))**2;
  
    aArray.push(0.45724 * RSI**2 * Tc**2 / Pc * alpha); // El array de a's ya llevara el alpha incorporado
    bArray.push(0.07780 * RSI * Tc / Pc);
  })

  return { aArray, bArray }
}

export function mixParamsPR(aArray: number[], bArray: number[], systemState: SystemState) {

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


/** Devuelve los Vm (m³·mol⁻¹) con Peng‑Robinson (raíz real mayor = fase gas) */
export function calculateVmPointsPR(pressures: Pressures, T: number, systemState: SystemState) {
  const {aArray, bArray} = arrayParamsPR(systemState.gases, T)
  const {a_mix, b_mix} = mixParamsPR(aArray, bArray, systemState)

  let calculatedPoints = pressures.map((P) => {
    const coef = [
      P,
      P * b_mix - RSI * T,
      a_mix - 3 * P * b_mix**2 - 2 * RSI * T * b_mix,
      P * b_mix ** 3 + RSI * T * b_mix ** 2 - a_mix * b_mix,
    ];

    const Vm = croot(coef) as number;            // (–) usa mayor → gas
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


export function calculatePressurePointsPR(volumes: Volumes, T: number, systemState: SystemState): PressionAndVolumeData {

  const {aArray, bArray} = arrayParamsPR(systemState.gases, T)
  const {a_mix, b_mix} = mixParamsPR(aArray, bArray, systemState)

  const filteredVolumes = sanitizeVolumes(volumes, b_mix)

  const pressures = calculatePressure(filteredVolumes, T, a_mix, b_mix);

  return {pressureData: pressures, volumeData: filteredVolumes}
}