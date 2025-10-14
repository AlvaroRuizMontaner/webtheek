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

import { PressionAndVolumeData, RootsAndPressuresList, SystemState, Volumes } from "@/types/eos";
import { croot } from "../cardano";
import { calculateCurvesVL, Pressures, RSI, sanitizeVolumes } from "../constantes";

// Herramientas específicas RK /
/* export const fRK = {
  calc_a(Tc: number, Pc: number) {
    return 0.42748 * RSI**2 * Math.pow(Tc, 2.5) / Pc;
  },

  calc_b(Tc: number, Pc: number) {
    return 0.08664 * RSI * Tc / Pc;
  },

  calcP(T: number, Vm: number, a: number, b: number) {
    return (RSI * T) / (Vm - b) - a / (Math.sqrt(T) * Vm * (Vm + b));
  },

  // (opcional) – T a partir de P y Vm requiere resolver numéricamente
}; */

function solveRootsByPressure(
  pressures: number[],
  T: number,
  a_mix: number,
  b_mix: number
): RootsAndPressuresList[] {
  return pressures.map(P => {
    const coef = [
      P,
      -RSI * T,
      a_mix / Math.sqrt(T) - RSI * T * b_mix - P * b_mix**2,
      -a_mix * b_mix / Math.sqrt(T),
    ];
    const roots = croot(coef);               // [1] o [3] raíces (en V), sin filtrar
    return { P, roots };
  });
}

function filterValidVolumes(rootsAndPressuresList: RootsAndPressuresList[], b_mix: number): RootsAndPressuresList[] {
  const eps = 1e-12;
  return rootsAndPressuresList.filter(({ roots }) => {
    const currentVm = roots[0]
    return Number.isFinite(currentVm) && currentVm > b_mix * (1 + eps)
  });
}

function arrayParamsRK(gases: SystemState["gases"]) {
  const aArray = gases.map(gas => (0.42748 * RSI**2 * Math.pow(gas.Tc, 2.5) / gas.Pc));
  const bArray = gases.map(gas => (0.08664 * RSI * gas.Tc / gas.Pc));

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

  const rootsAndPressures = solveRootsByPressure(pressures, T, a_mix, b_mix);
  const validRoots = filterValidVolumes(rootsAndPressures, b_mix);
  const curvePoints = calculateCurvesVL(T, validRoots, b_mix, "RK")

  return curvePoints
}

//---------------------------------------------Isotherms---------------------------------------------


function calculatePressure(volumes: Volumes, T: number, a_mix: number, b_mix: number) {
  return volumes.map((V) => (
    (RSI*T)/(V-b_mix) - a_mix/(T**0.5 * V * (V + b_mix))
  ))
}


export function calculatePressurePointsRK(volumes: Volumes, T: number, systemState: SystemState): PressionAndVolumeData {

  const {aArray, bArray} = arrayParamsRK(systemState.gases)
  const {a_mix, b_mix} = mixParamsRK(aArray, bArray, systemState)

  const filteredVolumes = sanitizeVolumes(volumes, b_mix)

  const pressureData = calculatePressure(filteredVolumes, T, a_mix, b_mix);

  return {pressureData, volumeData: filteredVolumes}
}