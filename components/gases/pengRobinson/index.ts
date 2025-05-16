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

import { ElementData, Points, R } from "../constantes";
import { croot } from "../cardano";

/* ---------- utilidades PR ---------- */
export const fPR = {
  calc_a(Tc: number, Pc: number) {
    return 0.45724 * R**2 * Tc * Tc / Pc;           // Pa·m⁶·mol⁻²
  },
  calc_b(Tc: number, Pc: number) {
    return 0.07780 * R * Tc / Pc;                    // m³·mol⁻¹
  },
  calcP(T: number, Vm: number, aAlpha: number, b: number) {
    return R * T / (Vm - b) - aAlpha / (Vm**2 + 2*b*Vm - b**2);
  },
};


/** Devuelve los Vm (m³·mol⁻¹) con Peng‑Robinson (raíz real mayor = fase gas) */
export function calculateVmPointsPR(points: Points, element: ElementData) {
  const { Tc, Pc, omega } = element;

  const a = fPR.calc_a(Tc, Pc);
  const b = fPR.calc_b(Tc, Pc);
  const kappa  = 0.37464 + 1.54226 * omega - 0.26992 * omega**2;

  return points.map(({ T, P }, i) => {
    const alpha = (1 + kappa * (1 - Math.sqrt(T / Tc))) ** 2;

    const coef = [
      P,
      P * b - R * T,
      a * alpha - 3 * P * b * b - 2 * R * T * b,
      P * b ** 3 + R * T * b ** 2 - a * alpha * b,
    ];

    const Vm = croot(coef) as number;            // (–) usa mayor → gas
    console.log(`Caso ${i + 1}: Vm = ${Vm} m³/mol, P = ${P} Pa, T = ${T} K`);
    return Vm;
  });
}