import { ConsoleIO } from "./console-io";
import { MenuOperations } from "./menu-operations";

function printMenu() {
  console.log("\n=== Menú ===");
  console.log("1. Suma de cuadrados de los primeros 5 números");
  console.log("2. Producto de los primeros 5 términos de Fibonacci");
  console.log("3. Segundo número más grande (distinto): valor y posición");
  console.log("4. Ciudades y poblaciones: ciudad mayor y menor");
  console.log("5. Primos presentes en un vector");
  console.log("6. Sueldo total por empleado (horas y tarifa)");
  console.log("7. Ordenar edades ascendente");
  console.log("8. Alturas de árboles: cuántos superan la media");
  console.log("0. Salir");
}

async function main() {
  const io = new ConsoleIO();
  const ops = new MenuOperations();

  try {
    let option = -1;

    while (option !== 0) {
      printMenu();
      option = await io.readMenuOption("Elige una opción: ");

      switch (option) {
        case 1: {
          console.log("Resultado:", ops.sumOfSquaresFirstFive());
          break;
        }

        case 2: {
          console.log("Resultado:", ops.productOfFirstFiveFibonacci());
          break;
        }

        case 3: {
          const nums = await io.readFiveNumbers("Introduce 5 números separados por espacios: ");
          const res = ops.findSecondLargestDistinct(nums);
          if (!res) console.log("No existe segundo mayor distinto (todos iguales).");
          else console.log(`Segundo mayor: ${res.value} | Posición (1..5): ${res.index + 1}`);
          break;
        }

        case 4: {
          const cities = await io.readFiveStrings("Introduce 5 ciudades separadas por espacios: ");
          const pops = await io.readFiveNumbers("Introduce 5 poblaciones separadas por espacios: ");
          const res = ops.cityPopulationExtremes(cities, pops);
          console.log(`Mayor: ${res.max.city} (${res.max.population}) | Posición: ${res.max.index + 1}`);
          console.log(`Menor: ${res.min.city} (${res.min.population}) | Posición: ${res.min.index + 1}`);
          break;
        }

        case 5: {
          const nums = await io.readFiveNumbers("Introduce 5 números separados por espacios: ");
          const primes = ops.primesInArray(nums);
          console.log("Primos:", primes.length ? primes.join(", ") : "Ninguno");
          break;
        }

        case 6: {
          const hours = await io.readFiveNumbers("Introduce 5 horas trabajadas separadas por espacios: ");
          const rates = await io.readFiveNumbers("Introduce 5 tarifas por hora separadas por espacios: ");
          const salaries = ops.salaries(hours, rates);
          salaries.forEach((s, i) => console.log(`Empleado ${i + 1}: ${s}`));
          break;
        }

        case 7: {
          const ages = await io.readFiveNumbers("Introduce 5 edades separadas por espacios: ");
          console.log("Ordenadas:", ops.sortAscending(ages).join(", "));
          break;
        }

        case 8: {
          const heights = await io.readFiveNumbers("Introduce 5 alturas (m) separadas por espacios: ");
          const res = ops.countAboveMean(heights);
          console.log(`Media: ${res.mean}`);
          console.log(`Por encima de la media: ${res.count}`);
          break;
        }

        case 0: {
          console.log("Saliendo...");
          break;
        }
      }
    }
  } finally {
    io.close();
  }
}

main().catch((err) => console.error("Error:", err));