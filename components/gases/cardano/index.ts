const cbrt = (x: number) => Math.sign(x) * Math.cbrt(Math.abs(x));
const sqrt = (x: number) => Math.sqrt(x);

export function croot(coef: number[]): number | string {
    if (coef.length !== 4) {
        return "Error: Debe haber exactamente 4 coeficientes."; // Error si no hay 4 coeficientes
    }

    // Asignar valores a los coeficientes
    const [a, b, c, d] = coef;

    if (a === 0) throw new Error("El coeficiente cúbico (a) no puede ser 0.");

    // Calcular las variables intermedias p, q y delta
    const p = (3 * a * c - b ** 2) / (3 * a ** 2);
    const q = (2 * b ** 3 - 9 * a * b * c + 27 * a ** 2 * d) / (27 * a ** 3);
    const delta = q ** 2 + (4 * p ** 3) / 27;
    const shift = -b / (3 * a)

    const eps = 1e-12 // tolerancia, se evitan situaciones limite que pueden conducir a errores de redondeo o devoluciones de NaN


    /* ---------- Δ  > 0  (una raíz real) --------------------------- */
    if (delta > eps) {
        return (
            cbrt((-q + sqrt(delta)) / 2) + 
            cbrt((-q - sqrt(delta)) / 2) + shift
        )
    }

    /* ---------- Δ  < 0  (tres raíces reales) ---------------------- */
    else if (delta < -eps) {
        //const theta = Math.acos((3 * q) / (2 * p) * sqrt(-3 / p));
        const arg = (3 * q) / (2 * p) * Math.sqrt(-3 / p);
        const theta = Math.acos(Math.max(-1, Math.min(1, arg)));  // clamp de robustez que evita que el acos dé NaN si arg es mayor que 1 o menos que -1 debido a redondeo
        const r = 2 * sqrt(-p / 3); // p es negativo en el caso de discriminante negativo, por eso es posible hacer la raíz

        const y0 = r * Math.cos(theta / 3);               // k = 0
        const y1 = r * Math.cos((theta + 2 * Math.PI) / 3); // k = 1
        const y2 = r * Math.cos((theta + 4 * Math.PI) / 3); // k = 2

        //return [y0, y1, y2].sort((a, b) => a - b); // Para devolver las 3 raices si fuera el caso
        return Math.max(y0, y1, y2) + shift;

    /* ---------- |Δ| ≤ eps  (raíces múltiples) --------------------- */
    } else {
        if (Math.abs(p) < eps && Math.abs(q) < eps) {  // Originalmente es el caso p === 0 && q === 0 pero adaptado al eps
            return shift;                 // raíz triple
        }

        const zDouble = (-3 * q) / (2 * p); // Debería ser la mayor, apreciable a simple vista por pura algebra
        const zSimple =  (3 * q) / p;

        //return [zDouble, zDouble, zSimple]; // Para devolver las 3 raices si fuera el caso
        
        return Math.max(zSimple, zDouble) + shift;


/*         // Forzar tratamiento como 3 raíces reales si hay dudas numéricas
        const arg = (3 * q) / (2 * p) * Math.sqrt(-3 / p);
        const theta = Math.acos(Math.max(-1, Math.min(1, arg)));
        const r = 2 * Math.sqrt(-p / 3);

        const y0 = r * Math.cos(theta / 3);
        const y1 = r * Math.cos((theta + 2 * Math.PI) / 3);
        const y2 = r * Math.cos((theta + 4 * Math.PI) / 3);

        return Math.max(y0, y1, y2) + shift;  // siempre devuelve fase vapor */
    } 
}