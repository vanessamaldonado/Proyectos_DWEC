# Guía paso a paso: Proyecto TypeScript básico

Esta guía explica cómo crear un proyecto TypeScript desde cero con la estructura:

- Carpeta **src/** → aquí escribimos el código TypeScript (`.ts`)
- Carpeta **dist/** → aquí se genera el JavaScript (`.js`)
- Archivos typeScrript `*.ts` → donde escribimos nuestro código
- Ejecución por consola con **Node** o generando un ***.html**
---

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
Sirve para:
- tener el proyecto “formalizado”
- poder añadir scripts como `npm start` más adelante
- facilitar que el proyecto se comparta o mueva a otros equipos

> No es obligatorio para que TypeScript funcione, pero es buena práctica.

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
### ¿Qué significa cada opción?

- `"rootDir": "./src"` → tu código TypeScript estará en la carpeta `src`.
- `"outDir": "./dist"` → el JavaScript generado se guardará en la carpeta `dist`.
- `"strict": true` → TypeScript será estricto con los tipos.
- `"module": "commonjs"` y `"target": "ES2016"` → configuración estándar para Node.

---

## Crear la carpetas **src** 
En el panel del explorador de VS Code, y dentro de la carpeta de tu proyecto, crea una carpeta llamada `src`

> La carpeta `dist` se autogenerará al compilar. Ahí aparecerán los `.js` cuando compilemos.

---

## Crear el archivo o los archivos donde vas a escribir tu código ts:  `*.ts` dentro de `src`

Dentro de la carpeta **src**, crea los archivos *.ts con los que vas a trabajar.
Comienza a escribir tu código en el fichero `*.ts`, por ejemplo:
```ts
let edad: number = 20;
console.log("Edad:", edad);
```
---

## Compilar TypeScript a JavaScript
### Opción A: Compilar una vez
En la terminal (siempre situada en la carpeta del proyecto), ejecuta:
```bash
tsc
```
TypeScript leerá `tsconfig.json`, mirará la carpeta `src`, y generará los `.js` en `dist`.

---

### Opción B (recomendada): Compilar automáticamente con `tsc -w`

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

## Cómo ejecutar y probar nuestro código desde la consola
Ejecuta:
```bash
node dist/tuarchivo.js (si estas en la raiz del proyecto)
node tuarchivo.js (si te posicionas dentro de la carpeta dist)
```
Si todo está bien, deberías ver en la consola el resultado de tu código.

---


A partir de aquí, usarás SIEMPRE el mismo flujo:

1. Editar tus archivos `*.ts` que estan en `src`
2. Guardas cambios
3. (si tienes `tsc -w` activo, se compila solo)
4. Probar tu código:
   ```bash
   node dist/tiposBasicos.js
   ```
---

## (Opcional) Crear un script `npm start` para simplificar

Si antes hiciste `npm init -y` y tienes `package.json`, puedes añadir un script para no tener que escribir `node dist/tiposBasicos.js` todo el rato.

Abre `package.json` y dentro de `"scripts"` añade algo así:

```json
{
  "scripts": {
    "start": "node dist/tufichero.js"
  }
}
```
Ahora podrás ejecutar:

```bash
npm start
```
en lugar de:

```bash
node dist/tiposBasicos.js
```
---

