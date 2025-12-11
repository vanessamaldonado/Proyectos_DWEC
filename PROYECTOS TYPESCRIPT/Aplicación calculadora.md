# Aplicación de consola en TypeScript

## Crear la carpeta del proyecto
1. Elige una carpeta en tu ordenador (el directorio donde sueles trabajar siempre).
2. Crea dentro una nueva carpeta con el nombre del proyecto (o el quieras), y abrela con VS Code:
Ejemplo: 

```bash
C:\DWEC\TypeScript\Calculadora
```

## Inicializar proyecto con npm
En VS Code, abre la **terminal integrada**:
Ejecuta, estando en la carpeta del proyecto (la que acabas de crear):
```bash
npm init -y
```
Esto creará un fichero `package.json` en la raíz del proyecto.  
---

## Crear el archivo de configuración de TypeScript (`tsconfig.json`)
En la misma terminal y dentro de la carpeta del proyecto, ejecuta:
```bash
tsc --init
```
Esto creará un archivo llamado:
```text
tsconfig.json
```
Ábrelo desde VS Code y **borra todo el contenido** que haya dentro.  
Déjalo solo con esta configuración mínima:
```json
{
  "compilerOptions": {
    "target": "ES2016",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "noEmitOnError": true,
    "sourceMap": true,
    "removeComments": true
  }
}
```

## Crear la carpeta **src** 
En el panel del explorador de VS Code, y dentro de la carpeta de tu proyecto, crea una carpeta llamada `src`, aqui crearemos el archivo o los archivos donde estará el código ts:  `*.ts` 

> La carpeta `dist` se autogenerará al compilar. Ahí aparecerán los `.js` cuando compilemos.

---

### Activa modo observador para compilar automáticamente con `tsc -w`

En lugar de compilar manualmente cada vez, podemos decirle a TypeScript que “vigile” los archivos.
En la terminal (siempre situada en la carpeta del proyecto), ejecuta:
```bash
tsc -w
```
- `-w` significa **watch** (modo observador).
- Cada vez que guardes un `.ts` en `src`, se regenerará el `.js` correspondiente en `dist`.

> Deja esa terminal abierta con `tsc -w` mientras trabajas.  
> Si quieres pararla, pulsa `Ctrl + C`.

---

## Cómo ir ejecutando y probando nuestro código desde la consola
Ejecuta:
```bash
node dist/tuarchivo.js (si estas en la raiz del proyecto)
node tuarchivo.js (si te posicionas dentro de la carpeta dist)
```
Si todo está bien, deberías ver en la consola el resultado de tu código.
---

## Construyendo el objeto central: `Calculator`

Añadimos el fichero que va a contener nuestra clase `Calculator`. En esta clase, implementará varios métodos para realizar operaciones matemáticas como suma, resta, división, multiplicación, potencia y raíz cuadrada. Cada método realiza los cálculos correspondientes y devuelve el resultado.

La estructura de la clase es la siguiente:
```ts
// TODO: Completar la clase implementando los métodos pedidos en el enunciado.
export class Calculator 
{
    constructor() {}
  
    /**
     * Calcula la suma de los números en un arreglo.
     * @param numbers - Arrray de números.
     * @returns La suma de los números.
     */

    // TODO: Implementar el método sum(numbers: number[]): number
  
    /**
     * Realiza la resta de un número y los elementos de otro arreglo.
     * @param number - Número inicial.
     * @param numberN - Arreglo de números a restar.
     * @returns El resultado de la resta.
     */

    // TODO: Implementar el método minus(number: number, numberN: number[]): number
  
    /**
     * Realiza la división entre dos números.
     * @param numberi - Dividendo.
     * @param numberb - Divisor.
     * @returns El resultado de la división.
     */

    // TODO: Implementar el método div(numberi: number, numberb: number): number
  
    /**
     * Realiza la multiplicación de varios números.
     * @param numbers - Arreglo de números a multiplicar.
     * @returns El resultado de la multiplicación.
     */

    // TODO: Implementar el método multiplied(numbers: number[]): number
  
    /**
     * Calcula la potencia de un número elevado a un exponente.
     * @param number - Número base.
     * @param exponente - Exponente.
     * @returns El resultado de la potencia.
     */

    // TODO: Implementar el método exponentiation(number: number, exponente: number): number
  
    /**
     * Calcula la raíz cuadrada de un número.
     * @param numero - Número.
     * @returns La raíz cuadrada del número.
     * @throws Error si se intenta calcular la raíz cuadrada de un número negativo.
     */

   // TODO: Implementar el método sqrt(number: number): number
}
```

## IMPORT y EXPORT

En TypeScript, cada archivo es como una “caja” independiente.
Si quieres usar algo que está dentro de una caja (una clase, función o variable) desde otra caja, necesitas exportarlo y luego importarlo.

**export**
Sirve para decir: *“Quiero que este elemento pueda usarse desde otros archivos.”*

Syntax:
```ts
export class Calculator { }
```
**import**
Sirve para hacer uso de algo que se exportó desde otro archivo.

Syntax:
```ts
import { Calculator } from "./Calculator";
```
## Crear un archivo principal para usar la clase

Nos crearemos un archivo `main.ts` para ir probando nuestra clase:

```ts
import { Calculator } from "./calculator";

const calc = new Calculator();

console.log("Suma:", calc.sum([1, 2, 3, 4]));
console.log("Resta:", calc.minus(10, [2, 3]));
console.log("Multiplicación:", calc.multiplied([2, 5, 2]));
console.log("División:", calc.div(20, 4));
console.log("Potencia:", calc.exponentiation(2, 3));
console.log("Raíz:", calc.sqrt(16));
```

## Creación del diagrama de flujo y construcción de la aplicación principal

Con la clase `calculator` finalizada comenzaremos a construir la aplicación en consola. Aquí está el diagrama de flujo que vamos a seguir:

1. Utilizaremos el archivo `main.ts` que ya tenemos, solo hay que comentar el bloque de los `console.log`
2. Importar el módulo readline para leer la entrada del usuario.
```ts
import * as readline from 'readline';
```
>[!Note] 
> El módulo `readline` es un módulo integrado que permite leer datos de un flujo de entrada (como la consola) línea por línea, ideal para crear aplicaciones interactivas que piden información al usuario.

3. Importar la clase `calculator` (ya lo tenemos importado).
4. Definir una función `printMenu` para mostrar las opciones del programa.
```ts
function printMenu() {
  console.log("=== Calculadora ===");
  console.log("1. Suma");
  console.log("2. Resta");
  console.log("3. División");
  console.log("4. Multiplicación");
  console.log("5. Exponencial");
  console.log("6. Raíz cuadrada");
  console.log("0. Salir");
}
```
5. Definir una función `createInterface` para crear la interfaz de lectura de entrada y escritura de salida.

Cada vez que se quiere hacer uso de `readline`, se necesita crear una interfaz especificando input y output:
```ts
// Conexión
function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}
```
6. Definir una función `readNumbers` para leer una serie de números separados por espacios.
7. Definir una función `waitForKey` para esperar a que el usuario presione una tecla antes de continuar.
8. Definir una función `readNumber` para leer un número individual.
9. implementar la función principal `calculate`, que ejecute la lógica de la calculadora:
```ts
async function calculate() {
  // Variables globales
  const calc = new Calculator();
  let option = -1;

    while (option !== 0) {
    // Home
    printMenu();

    // TODO: lanzar la primera pregunta

     // Opción
    switch (option) {
      case 1: {
        // TODO implementar opción 1 suma
        break;
      }
      case 2: {
        // TODO implementar opción 2 resta
        break;
      }
      case 3: {
         // TODO implementar opción 3 División
        break;
      }
      case 4: {
         // TODO implementar opción 4 multiplicación
        break;
      }
      case 5: {
        // TODO implementar opción 5 Exponencial
        break;
      }
      case 6: {
         // TODO implementar opción 6 raiz cuadrada
        break;
      }
      case 0: {
        console.log("Saliendo de la calculadora...");
        break;
      }
      default: {
        console.log("Opción inválida. Inténtalo de nuevo.");
        break;
      }
    }
}
```
