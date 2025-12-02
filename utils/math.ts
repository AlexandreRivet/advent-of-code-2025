/**
 * Return positive a % b no matter what the sign of a
 * @param {number} a number modulo
 * @param {number} b number modulo from
 * @returns {number} positive modulo
 */
export const negativeModulo = (a: number, b: number) => {
    const mod = a % b;
    return mod < 0 ? mod + b : mod;
} 