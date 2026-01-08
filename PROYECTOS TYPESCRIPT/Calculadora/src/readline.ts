
import * as readline from "readline";

//Crear una interfaz de lectura
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


//Pide el nombre del usuario y muéstralo por consola.
/*rl.question("¿Cómo te llamas? ", answer => {
  console.log("Hola", answer);
  rl.close();
});*/

//Crea una función que permita hacer preguntas sin anidar llamadas, y úsala.
function askUser(question: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer));
  });
}

async function main() {
  const name = await askUser("Nombre: ");
  const age = await askUser("Edad: ");
  const city = await askUser("Ciudad: ");

  console.log(name, age, city);
  rl.close();
}
//main();

/*Crea un menú con estas opciones:
- Saludar
- Mostrar la hora
- Salir
El menú debe repetirse hasta que el usuario elija salir.*/

async function menu() {
  let option = -1;

  while (option !== 0) {
    console.log("1. Saludar");
    console.log("2. Mostrar hora");
    console.log("0. Salir");

    option = Number(await askUser("Opción: "));

    if (option === 1) {
      console.log("Hola!");
    } else if (option === 2) {
      console.log(new Date().toLocaleTimeString());
    }
  }

  rl.close();
}

menu();
