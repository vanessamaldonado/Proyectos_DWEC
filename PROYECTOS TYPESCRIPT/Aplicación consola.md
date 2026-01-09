# Proyecto TypeScript: Aplicación de consola

Vas a crear una aplicación de consola en TypeScript con menú interactivo (usando readline) y una o más clases con métodos para resolver 8 operaciones.

## Requisitos generales
- El programa debe tener un menú con opciones 1–10 y 0 para salir.
- Cada opción debe:
  - Pedir los datos necesarios por consola.
  - Llamar al método que corresponda.
  - Mostrar resultados por pantalla de forma clara.

## Opciones del menú
1. Suma de cuadrados de 1..N
2. Producto de los primeros N términos de Fibonacci
3. Segundo número más grande: valor y posición
4. Ciudades y poblaciones: ciudad mayor y menor
5. Primos presentes en un vector
6. Sueldo total por empleado (horas y tarifa)
7. Ordenar edades ascendente
8. Alturas de árboles: cuántos superan la media

## Enunciado de las opciones:

En todas las funciones, el programa debe solicitar los datos por consola. Cuando se indique “5 valores”, significa que el usuario debe introducir exactamente 5 entradas (una a una o en una misma línea, según decidas).

1. Función que calcule la suma de los cuadrados de los primeros 5 números enteros.
Ejemplo: 1² + 2² + 3² + 4² + 5².
2. Función que calcule el producto de los primeros 5 términos de la serie de Fibonacci
(usar la serie 1, 1, 2, 3, 5).
3. Función que solicite al usuario 5 números, los almacene en un array y muestre el segundo número más grande y su posición en el array.
4. Función que solicite al usuario 5 nombres de ciudades y, en otro array, sus poblaciones correspondientes. Mostrar la ciudad con la población más alta y la más baja.
5. Función que solicite al usuario 5 números, los almacene en un array y muestre todos los números primos presentes.
6. Función que solicite las horas trabajadas de 5 empleados y sus tarifas por hora, almacenándolas en dos arrays. Calcular y mostrar el sueldo total de cada empleado.
7. Función que solicite las edades de 5 personas, las almacene en un array y muestre las edades ordenadas de forma ascendente.
8. Función que solicite las alturas (en metros) de 5 árboles, las almacene en un array y muestre cuántos árboles tienen una altura superior a la media.
   
---

# Guia inicial del proyecto

## Crear la carpeta del proyecto
1. Elige una carpeta en tu ordenador (el directorio donde sueles trabajar siempre).
2. Crea dentro una nueva carpeta con el nombre del proyecto (o el quieras), y abrela con VS Code:

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

# Entrega
Sube tu código a un repositorio en tu cuenta de GitHub. El repositorio debe ser público para que yo pueda acceder.

¿Que debes subir al repositorio?
- La carpeta src/, que debe contener todos los archivos con el código fuente del proyecto (por ejemplo, main.ts, clases auxiliares, etc.).
- Cualquier otro archivo necesario para ejecutar correctamente el programa (por ejemplo, package.json o configuraciones si las utilizas).

## Requisitos del repositorio
- El repositorio debe ser público.
- El código debe compilar y ejecutarse sin errores.
- La estructura del proyecto debe ser clara y ordenada.

## Entrega del enlace

- Entrega únicamente el enlace al repositorio de GitHub en la plataforma Classroom.

- No es necesario subir archivos comprimidos (.zip).
