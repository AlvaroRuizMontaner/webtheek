// Cúbica de van der Waals
// P*Vm3 − (Pb+RT)*Vm2 + (a+RTb)*Vm − ab = 0

import { Branch, PressionAndVolumeData, SystemState, Volumes } from "@/types/eos";
import { croot } from "../cardano";
import { Pressures, pressureSItopressureBar, RBL, RSI, sanitizeVolumes } from "../constantes";

type RootsAndPressuresList = { P: number; roots: number[] };

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


function solveRootsByPressure(
  pressures: number[],
  T: number,
  a_mix: number,
  b_mix: number
): RootsAndPressuresList[] {
  return pressures.map(P => {
    const coef = [ P, -(P*b_mix + RSI*T), a_mix, -a_mix*b_mix ];
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


function calculateCurvesVL( T: number, rootsAndPressuresList: RootsAndPressuresList[], b_mix: number) {
  const liquid: Branch = { P: [], V: [] };
  const vapor : Branch = { P: [], V: [] };

  const Vc = 3 * b_mix;

  rootsAndPressuresList.forEach(({P, roots}) => {
    if (roots.length === 3) {
      liquid.P.push(P); liquid.V.push(roots[0]);     // menor = líquido
      vapor.P.push(P); vapor.V.push(roots[2]);     // mayor = vapor
    } else if (roots.length === 1) {
      const V = roots[0];

      // solo se añade si pasa el filtro físico
      if (V > b_mix) {
        if (V < Vc) {
          liquid.P.push(P);
          liquid.V.push(V);
        } else {
          vapor.P.push(P);
          vapor.V.push(V);
        }
      }
    }
  })

  return { liquid, vapor };
}


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

  const rootsAndPressures = solveRootsByPressure(pressures, T, a_mix, b_mix);

  const validRoots = filterValidVolumes(rootsAndPressures, b_mix);
  
  const curvePoints = calculateCurvesVL(T, validRoots, b_mix)
  
  //console.table(validRoots)
  //console.log(`T: ${T}, a_mix: ${a_mix}, b_mix: ${b_mix}`)

  console.log(`T: ${T}, ${validRoots[0].roots}`)

  return curvePoints
}
export function calculateVmPointsBarL(pressures: Pressures, T: number, systemState: SystemState) {

  const {aArray, bArray} = arrayParamsVDWBarL(systemState.gases)
  const {a_mix, b_mix} = mixParamsVDW(aArray, bArray, systemState)

  const calculatedPoints = pressures.map((P) => {
    const PBar = pressureSItopressureBar(P)

    const coef = [
      PBar,
      -(PBar*b_mix + RBL*T),
      a_mix,
      -a_mix*b_mix
    ];
    const Vm = croot(coef);        // m³·mol⁻¹
    //console.log(`Caso ${i+1}: Vm = ${Vm} m3/mol, P = ${P}, T = ${T}`);
    return Vm
  });

  return calculatedPoints
}

//---------------------------------------------Isotherms---------------------------------------------


function calculatePressure(volumes: Volumes, T: number, a_mix: number, b_mix: number) {
  return volumes.map((V) => (
    (RSI*T)/(V-b_mix) - a_mix/V**2
  ))
}


export function calculatePressurePoints(volumes: Volumes, T: number, systemState: SystemState): PressionAndVolumeData {

  const {aArray, bArray} = arrayParamsVDW(systemState.gases)
  const {a_mix, b_mix} = mixParamsVDW(aArray, bArray, systemState)

  const filteredVolumes = sanitizeVolumes(volumes, b_mix)

  const pressureData = calculatePressure(filteredVolumes, T, a_mix, b_mix);

  return {pressureData, volumeData: filteredVolumes}
}
