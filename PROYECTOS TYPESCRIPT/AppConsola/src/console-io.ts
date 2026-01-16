import * as readline from "readline";

export class ConsoleIO {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  public close(): void {
    this.rl.close();
  }

  public ask(question: string): Promise<string> {
    return new Promise((resolve) => this.rl.question(question, resolve));
  }

  public async readMenuOption(question: string): Promise<number> {
    while (true) {
      const raw = (await this.ask(question)).trim();
      const n = Number(raw);

      if (Number.isInteger(n) && n >= 0 && n <= 8) return n;
      console.log("Opción inválida. Introduce un número entre 0 y 8.");
    }
  }

  public async readFiveNumbers(question: string): Promise<number[]> {
    while (true) {
      const input = (await this.ask(question)).trim();
      const parts = input.split(/\s+/).filter(Boolean);

      if (parts.length !== 5) {
        console.log("Debes introducir exactamente 5 números separados por espacios.");
        continue;
      }

      const nums = parts.map(Number);
      if (nums.some((x) => Number.isNaN(x))) {
        console.log("Entrada inválida: introduce solo números.");
        continue;
      }

      return nums;
    }
  }

  public async readFiveStrings(question: string): Promise<string[]> {
    while (true) {
      const input = (await this.ask(question)).trim();
      const parts = input.split(/\s+/).filter(Boolean);

      if (parts.length !== 5) {
        console.log("Debes introducir exactamente 5 textos separados por espacios.");
        continue;
      }

      return parts;
    }
  }
}