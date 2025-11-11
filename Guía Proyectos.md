# GUÍA COMPLETA PARA FORMULARIOS CON CLASE Y ARRAY DE OBJETOS

## Objetivo

Construir una pequeña aplicación CRUD en memoria (Create, Read, Update, Delete) que:
- Use un formulario HTML.
- Guarde cada registro como un objeto dentro de un array.
- Encapsule la lógica en una clase (gestor, controlador o manager).
- Muestre, edite y elimine los datos directamente en el DOM.

Este patrón es el utilizado en los proyectos vistos en clase.

## Estructura HTML mínima

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Gestor con Clase</title>
</head>
<body>

  <h1>Gestión de Elementos</h1>

  <div id="mensaje" style="display:none;"></div>

  <form id="miFormulario">
    <input id="campo1" placeholder="Nombre">
    <input id="campo2" placeholder="Teléfono">
    <input id="fecha"  type="date">
    <input id="hora"   type="time">
    <button type="submit">Guardar</button>
  </form>

  <ul id="lista"></ul>

  <script src="js/app.js"></script>
</body>
</html>
```

## Pasos para construir nuestra funcionalidad en JavaScript:

### Paso 1: Selectores y variables globales
```js
const form = document.getElementById('miFormulario');
const lista = document.getElementById('lista');
const mensaje = document.getElementById('mensaje');

const campo1 = document.getElementById('campo1');
const campo2 = document.getElementById('campo2');
const fecha = document.getElementById('fecha');
const hora = document.getElementById('hora');

const botonGuardar = form.querySelector('button[type="submit"]');
```

### Paso 2: Crear la clase Gestora
```js
class Gestor {
  constructor() {
    this.items = [];           // ← aquí guardamos todos los objetos
    this.itemEditando = null;  // ← referencia al objeto en edición
  }

  agregar(obj) {
    this.items.push(obj);
    this.ordenar();
    this.mostrar();
    this.mostrarMensaje('Elemento agregado correctamente', true);
  }

  eliminar(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.mostrar();
    this.mostrarMensaje('Elemento eliminado', true);
  }

  editar(id) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;

    campo1.value = item.campo1;
    campo2.value = item.campo2;
    fecha.value = item.fecha;
    hora.value = item.hora;

    this.itemEditando = item;
    botonGuardar.textContent = 'Guardar cambios';
  }

  guardarEdicion() {
    if (!this.itemEditando) return;

    this.itemEditando.campo1 = campo1.value.trim();
    this.itemEditando.campo2 = campo2.value.trim();
    this.itemEditando.fecha = fecha.value;
    this.itemEditando.hora = hora.value;

    this.ordenar();
    this.mostrar();
    this.mostrarMensaje('Elemento actualizado correctamente', true);

    this.itemEditando = null;
    form.reset();
    botonGuardar.textContent = 'Guardar';
  }

  ordenar() {
    this.items.sort((a, b) => new Date(`${a.fecha} ${a.hora}`) - new Date(`${b.fecha} ${b.hora}`));
  }

  mostrar() {
    lista.innerHTML = '';

    if (this.items.length === 0) {
      lista.innerHTML = `<li class="muted">No hay registros.</li>`;
      return;
    }

    this.items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between';
      li.innerHTML = `
        <div>
          <strong>${item.campo1}</strong> (${item.campo2})<br>
          ${item.fecha} — ${item.hora}
        </div>
        <div>
          <button class="editar">Editar</button>
          <button class="eliminar">Eliminar</button>
        </div>
      `;

      li.querySelector('.eliminar').addEventListener('click', () => this.eliminar(item.id));
      li.querySelector('.editar').addEventListener('click', () => this.editar(item.id));

      lista.appendChild(li);
    });
  }

  mostrarMensaje(texto, exito) {
    mensaje.textContent = texto;
    mensaje.style.display = 'block';
    mensaje.className = `alert ${exito ? 'alert-success' : 'alert-danger'}`;
    setTimeout(() => (mensaje.style.display = 'none'), 3000);
  }
}
```

## Paso 3: Instanciar la clase
```js
const gestor = new Gestor();
document.addEventListener('DOMContentLoaded', () => gestor.mostrar());
```

## Paso 4: Manejador del formulario
```js
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // 1. Validaciones
  if (!campo1.value.trim() || !campo2.value.trim() || !fecha.value || !hora.value) {
    gestor.mostrarMensaje('Por favor, completa todos los campos', false);
    return;
  }

  const seleccion = new Date(`${fecha.value} ${hora.value}`);
  if (seleccion <= new Date()) {
    gestor.mostrarMensaje('No puedes elegir una fecha pasada', false);
    return;
  }

  // 2. Modo edición o creación
  if (gestor.itemEditando) {
    gestor.guardarEdicion();
  } else {
    const nuevo = {
      id: Date.now(),
      campo1: campo1.value.trim(),
      campo2: campo2.value.trim(),
      fecha: fecha.value,
      hora: hora.value
    };
    gestor.agregar(nuevo);
    form.reset();
  }

  campo1.focus();
});
```

## Cómo funciona el ciclo completo

- El usuario rellena el formulario.
- JS crea un objeto con los datos → {id, campo1, campo2, fecha, hora}.
- Ese objeto se guarda en el array this.items dentro de la clase.
- Se llama a mostrar() para renderizar la lista en el DOM.
- Al pulsar Editar, se cargan los valores en el formulario.
- Al guardar, se actualiza ese objeto en el array.

---

# Distintas formas de encontrar un objeto dentro de un array según su id
Dado un array:
```js
this.items = [
  { id: 1, nombre: 'Ana' },
  { id: 2, nombre: 'Luis' },
  { id: 3, nombre: 'Marta' }
];
```
Queremos obtener el objeto cuyo id sea 2.

**Con .find()**
```js
const item = this.items.find(i => i.id === id);
```
Devuelve: El primer objeto que cumpla la condición o undefined si no existe.

**Con .filter()**
```js
const coincidencias = this.items.filter(i => i.id === id);
const item = coincidencias[0]; // o undefined si no hay ninguno
```
Devuelve: Un array con todos los que cumplan la condición.

**Con un bucle for...of**
```js
let item = null;
for (const i of this.items) {
  if (i.id === id) {
    item = i;
    break; // detenemos el bucle al encontrarlo
  }
}
```

## Cómo funciona el .sort()
.sort() es un método de los arrays que reordena sus elementos según una función de comparación que tú le pasas.
```js
array.sort(comparador);
```
Donde comparador es una función que recibe dos elementos del array (normalmente llamados a y b), y debe devolver un número que indica el orden:
| Resultado | Significado                    |
| --------- | ------------------------------ |
| `< 0`     | `a` va antes que `b`           |
| `> 0`     | `a` va después que `b`         |
| `0`       | el orden entre ambos no cambia |

**Cómo lo usa internamente JavaScript**

Cuando llamas a .sort(), el motor de JS compara pares de elementos del array repetidamente usando esa función.

- Toma dos elementos a y b.
- Llama a tu función comparador(a, b).
- Si devuelve un número negativo → deja a antes que b.
- Si devuelve positivo → pone b antes que a.
- Repite con los demás pares hasta que todo el array esté ordenado.

**Esto modifica el array original. No crea una copia.**

---

# Distintas formas de ordenar un array
Dado un array con objetos del tipo:
```js
this.items = [
  { id: 1, fecha: '2025-11-12', hora: '09:30' },
  { id: 2, fecha: '2025-11-11', hora: '19:15' },
  { id: 3, fecha: '2025-11-11', hora: '08:00' }
];
```
Queremos ordenarlos por fecha y hora cronológicamente.

**Forma estándar**
```js
this.items.sort(
  (a, b) => new Date(`${a.fecha} ${a.hora}`) - new Date(`${b.fecha} ${b.hora}`)
);
```
Convierte las cadenas en objetos Date y los resta (el resultado numérico indica orden).

**Separar fecha y hora en pasos**
```js
this.items.sort((a, b) => {
  const fechaA = new Date(a.fecha + 'T' + a.hora);
  const fechaB = new Date(b.fecha + 'T' + b.hora);
  return fechaA - fechaB;
});
```

**Ordenar primero por fecha, luego por hora**
```js
this.items.sort((a, b) => {
  if (a.fecha < b.fecha) return -1;
  if (a.fecha > b.fecha) return 1;
  // Si las fechas son iguales, compara la hora
  if (a.hora < b.hora) return -1;
  if (a.hora > b.hora) return 1;
  return 0;
});
```

**Orden manual con bucle for**
```js
for (let i = 0; i < this.items.length - 1; i++) {
  for (let j = i + 1; j < this.items.length; j++) {
    const fechaI = new Date(`${this.items[i].fecha} ${this.items[i].hora}`);
    const fechaJ = new Date(`${this.items[j].fecha} ${this.items[j].hora}`);
    if (fechaI > fechaJ) {
      const temp = this.items[i];
      this.items[i] = this.items[j];
      this.items[j] = temp;
    }
  }
}
```
