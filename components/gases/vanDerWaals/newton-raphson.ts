import { RSI as R } from "../constantes";

export function calcA(Tc: number, Pc: number): number {
    return (27 * Math.pow(R, 2) * Math.pow(Tc, 2)) / (64 * Pc);
}

export function calcB(Tc: number, Pc: number): number {
    return (R * Tc) / (8 * Pc);
}

export function calcT(P: number, Vm: number, a: number, b: number): number {
    return ((P * (Vm - b)) / R) + (a / (R * Math.pow(Vm, 2))) * (Vm - b);
}

export function calcP(T: number, Vm: number, a: number, b: number): number {
    return (R * T) / (Vm - b) - (a / Math.pow(Vm, 2));
}


export function calcVm(P: number, T: number, a: number, b: number): number {
    let Vm = T / P;  // Establecer un valor inicial aproximado para Vm
    const maxIteraciones = 1000;
    const tolerancia = 1e-6;  // Establecer una tolerancia para el cálculo iterativo
  
    for (let i = 0; i < maxIteraciones; i++) {
      const fVm = (R * T) / (Vm - b) - (a / Math.pow(Vm, 2)) - P;  // Ecuación para P en función de Vm
      const fPrimeVm = -((R * T) / Math.pow(Vm - b, 2)) + (2 * a) / Math.pow(Vm, 3);  // Derivada de la ecuación
  
      const VmNuevo = Vm - fVm / fPrimeVm;  // Método de Newton-Raphson
  
      // Verificar la convergencia
      if (Math.abs(VmNuevo - Vm) < tolerancia) {
        return VmNuevo;
      }
  
      Vm = VmNuevo;
    }
  
    throw new Error("No se alcanzó la convergencia para calcular Vm.");
}
