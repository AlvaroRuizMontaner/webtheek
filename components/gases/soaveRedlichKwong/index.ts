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

import { ElementData, R } from "../constantes";
import { croot } from "../cardano";

/** utilidades SRK */
export const fSRK = {
  /** a₀ (solo depende de Tc, Pc)  – Pa·m⁶·mol⁻² */
  calc_a(Tc: number, Pc: number) {
    return 0.42747 * R**2 * (Tc ** 2) / Pc;
  },

  /** b – m³·mol⁻¹ */
  calc_b(Tc: number, Pc: number) {
    return 0.08664 * R * Tc / Pc;
  },

  /** P=f(T,Vm) – útil para iterativos */
  calcP(T: number, Vm: number, aAlpha: number, b: number) {
    return R * T / (Vm - b) - aAlpha / (Vm * (Vm + b));
  },
};

type Points = { T: number; P: number }[];


/** Devuelve Vm (m³·mol⁻¹) para cada par (T,P) con el modelo SRK. */
export function calculateVmPointsSRK(
  points: Points,
  elementData: ElementData
) {
  const { Tc, Pc, omega } = elementData;

  const kappa = 0.48508 + 1.55171 * omega - 0.15613 * omega**2
  const a = fSRK.calc_a(Tc, Pc);
  const b = fSRK.calc_b(Tc, Pc);

  return points.map(({ T, P }, i) => {
    const alpha = (1 + kappa * (1 - Math.sqrt(T / Tc))) ** 2;

    const coef = [
      P,
      -R * T,
      a * alpha - R * T * b - P * b**2,
      -a * alpha * b,
    ];

    const Vm = croot(coef) as number;   // raíz real mayor = fase vapor
    console.log(
      `Caso ${i + 1}: Vm = ${Vm} m³/mol, P = ${P} Pa, T = ${T} K`
    );
    return Vm;
  });
}