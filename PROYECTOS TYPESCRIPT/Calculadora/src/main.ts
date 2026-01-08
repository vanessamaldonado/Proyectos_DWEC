import * as readline from "readline";
import { Calculator } from "./calculator";

// Menú
function printMenu() {
  console.log("\n=== Calculadora ===");
  console.log("1. Suma");
  console.log("2. Resta");
  console.log("3. División");
  console.log("4. Multiplicación");
  console.log("5. Exponencial");
  console.log("6. Raíz cuadrada");
  console.log("0. Salir");
}

/**
 * Crea una interfaz de lectura y escritura por consola usando el módulo readline.
 * Esta interfaz permite:
 * - Leer texto que introduce el usuario por teclado (entrada estándar).
 * - Mostrar preguntas y mensajes por consola (salida estándar).
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Muestra una pregunta por consola y espera a que el usuario introduzca un texto.
 * La función no devuelve el valor inmediatamente, sino mediante una Promesa,
 * ya que la entrada por teclado es una operación asíncrona.
 *
 * @param question - Texto que se muestra al usuario como pregunta.
 * @returns Una promesa que se resuelve con la respuesta introducida por el usuario.
 */
function askUser(question: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer));
  });
}

/**
 * Solicita al usuario una serie de números separados por espacios
 * y los convierte en un array de valores numéricos.
 *
 * La función es asíncrona porque espera la entrada del usuario
 * mediante la función askUser.
 *
 * @returns Un array de números introducidos por el usuario.
 */
async function readNumbers(): Promise<number[]> {
  const input = await askUser("Introduce números separados por espacios: ");
  return input.split(" ").map(Number);
}

/**
 * Función principal de la calculadora.
 * Controla el flujo del programa mostrando el menú,
 * leyendo la opción elegida por el usuario y ejecutando
 * la operación correspondiente.
 *
 * La función es asíncrona porque necesita esperar
 * constantemente a la entrada del usuario.
 */
async function calculate() {
   /**
   * Instancia del objeto Calculator que contiene
   * los métodos matemáticos (suma, resta, división, etc.).
   */
  const calc = new Calculator();
   /**
   * Variable que almacena la opción del menú seleccionada.
   * Se inicializa con un valor distinto de 0 para
   * que el bucle se ejecute al menos una vez.
   */
  let option = -1;

  /**
   * Bucle principal del programa.
   * Se repite mientras el usuario no elija la opción 0 (salir).
   */
  while (option !== 0) {
    // Muestra el menú por consola
    printMenu();
     /**
     * Solicita al usuario que elija una opción del menú.
     * Se convierte a número porque la entrada por teclado
     * siempre llega como texto.
     */
    option = Number(await askUser("Elige una operación de la calculadora: "));

     /**
     * Evalúa la opción introducida por el usuario
     * y ejecuta la operación correspondiente.
     */
    switch (option) {
      /**
       * Opción 1: Suma de varios números.
       */
      case 1: {
        const nums = await readNumbers();
        console.log("Resultado:", calc.sum(nums));
        break;
      }
       /**
       * Opción 2: Resta de varios números a partir de un valor inicial.
       */
      case 2: {
        const base = Number(await askUser("Número inicial: "));
        const nums = await readNumbers();
        console.log("Resultado:", calc.minus(base, nums));
        break;
      }
       /**
       * Opción 3: División entre dos números.
       */
      case 3: {
        const a = Number(await askUser("Dividendo: "));
        const b = Number(await askUser("Divisor: "));
        console.log("Resultado:", calc.div(a, b));
        break;
      }
       /**
       * Opción 4: Multiplicación de varios números.
       */
      case 4: {
        const nums = await readNumbers();
        console.log("Resultado:", calc.multiply(nums));
        break;
      }
       /**
       * Opción 5: Potencia de un número.
       */
      case 5: {
        const base = Number(await askUser("Base: "));
        const exp = Number(await askUser("Exponente: "));
        console.log("Resultado:", calc.exponentiation(base, exp));
        break;
      }
      /**
       * Opción 6: Cálculo de la raíz cuadrada.
       */
      case 6: {
        const n = Number(await askUser("Número: "));
        console.log("Resultado:", calc.sqrt(n));
        break;
      }
      /**
       * Opción 0: Salir del programa.
       * Se cierra la interfaz readline.
       */
      case 0:
        console.log("Saliendo de la calculadora...");
        rl.close();
        break;
         /**
       * Cualquier otra opción no válida.
       */
      default:
        console.log("Opción inválida. Inténtalo de nuevo.");
    }
  }
}
calculate();