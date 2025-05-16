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

import { croot } from "../cardano";
import { ElementData, Points, R } from "../constantes";

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

/** Devuelve los Vm (m³·mol⁻¹) para cada par (T,P) con el modelo RK */
export function calculateVmPointsRK(points: Points, elementData: ElementData) {
  const { Tc, Pc } = elementData;
  const a = fRK.calc_a(Tc, Pc);
  const b = fRK.calc_b(Tc, Pc);

  return points.map(({ T, P }, i) => {
    const coef = [
      P,
      -R * T,
      a / Math.sqrt(T) - R * T * b - P * b**2,
      -a * b / Math.sqrt(T),
    ];
    const Vm = croot(coef) as number; // m³·mol⁻¹ – se usa la raíz real mayor
    console.log(
      `Caso ${i + 1}: Vm = ${Vm} m³/mol, P = ${P} Pa, T = ${T} K`
    );
    return Vm;
  });
}