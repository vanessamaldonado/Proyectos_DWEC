export class MenuOperations {
  public sumOfSquaresFirstFive(): number {
    let sum = 0;
    for (let i = 1; i <= 5; i++) sum += i * i;
    return sum;
  }

  public productOfFirstFiveFibonacci(): number {
    const fib = [1, 1, 2, 3, 5];
    let product = 1;
    for (const x of fib) product *= x;
    return product;
  }

  // Segundo mayor distinto + índice original (0-based). null si no existe.
  public findSecondLargestDistinct(numbers: number[]): { value: number; index: number } | null {
    const max = Math.max(...numbers);
    const candidates = numbers.filter((n) => n !== max);
    if (candidates.length === 0) return null;

    const second = Math.max(...candidates);
    const index = numbers.indexOf(second);
    return { value: second, index };
  }

  public cityPopulationExtremes(cities: string[], populations: number[]) {
    let maxIdx = 0;
    let minIdx = 0;

    for (let i = 1; i < populations.length; i++) {
      if (populations[i] > populations[maxIdx]) maxIdx = i;
      if (populations[i] < populations[minIdx]) minIdx = i;
    }

    return {
      max: { city: cities[maxIdx], population: populations[maxIdx], index: maxIdx },
      min: { city: cities[minIdx], population: populations[minIdx], index: minIdx },
    };
  }

  public primesInArray(numbers: number[]): number[] {
    const isPrime = (n: number): boolean => {
      if (!Number.isInteger(n) || n < 2) return false;
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
      }
      return true;
    };

    return numbers.filter(isPrime);
  }

  public salaries(hours: number[], rates: number[]): number[] {
    const result: number[] = [];
    for (let i = 0; i < hours.length; i++) result.push(hours[i] * rates[i]);
    return result;
  }

  public sortAscending(values: number[]): number[] {
    return [...values].sort((a, b) => a - b);
  }

  public countAboveMean(values: number[]): { mean: number; count: number } {
    let sum = 0;
    for (const v of values) sum += v;

    const mean = sum / values.length;

    let count = 0;
    for (const v of values) if (v > mean) count++;

    return { mean, count };
  }
}
