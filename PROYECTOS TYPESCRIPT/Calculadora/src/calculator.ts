export class Calculator 
{
    constructor() {}
  
    /**
     * Calcula la suma de los números en un arreglo.
     * @param numbers - Arreglo de números.
     * @returns La suma de los números.
     */

    public sum(numbers: number[]): number 
    {
      let sum = 0;
      for (const num of numbers) {
        sum += num;
      }
      return sum;
    }

    public sum2(numbers: number[]): number {
        return numbers.reduce((sum, num) => sum + num, 0);
    }

  
    /**
     * Realiza la resta de un número y los elementos de otro array.
     * @param number - Número inicial.
     * @param numberN - Array de números a restar.
     * @returns El resultado de la resta.
     */

    public minus(number: number, numberN: number[]): number 
    {
      let sum = 0;
      for (const num of numberN) {
        sum += num;
      }
      const resta = number - sum;
      return resta;
    }

    public minus2(number: number, numberN: number[]): number {
        const sum = numberN.reduce((acc, num) => acc + num, 0);
        return Math.max(0, number - sum);
    }
  
    /**
     * Realiza la división entre dos números.
     * @param dividend - Dividendo.
     * @param divider - Divisor.
     * @returns El resultado de la división.
     */

    public div(dividend: number, divider: number): number 
    {
      if (divider === 0) {
        throw new Error("No se puede dividir entre cero.");
      }
         return dividend / divider;
    }
  
    /**
     * Realiza la multiplicación de varios números.
     * @param numbers - Arreglo de números a multiplicar.
     * @returns El resultado de la multiplicación.
     */

    public multiply(numbers: number[]): number 
    {
      let mul = 1;
      for (const num of numbers) {
        mul *= num;
      }
      return mul;
    }

    public multiply2(numbers: number[]): number {
     return numbers.reduce((acc, num) => acc * num, 1);
    }
  
    /**
     * Calcula la potencia de un número elevado a un exponente.
     * @param number - Número base.
     * @param exponent - Exponente.
     * @returns El resultado de la potencia.
     */

    public exponentiation(number: number, exponent: number): number 
    {
      const expon = number ** exponent;
      return expon;
    }
  
    /**
     * Calcula la raíz cuadrada de un número.
     * @param number - Número.
     * @returns La raíz cuadrada del número.
     * @throws Error si se intenta calcular la raíz cuadrada de un número negativo.
     */

    public sqrt(number: number): number {
     if (number < 0) throw new Error("Raíz cuadrada no definida para números negativos.");
     return Math.sqrt(number);
    }

}