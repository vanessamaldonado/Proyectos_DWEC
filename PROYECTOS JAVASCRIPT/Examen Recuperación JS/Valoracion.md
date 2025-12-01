# EXAMEN — Gestor de Reservas de mesa en Javascript

## Validación de fecha y hora (MAX 1 punto)
El proyecto debe validar correctamente que no se pueda reservar en fechas y horas pasadas.
> SOLUCION
```js
    const ahora = new Date();
    const fechaSeleccionada = new Date(`${fechaInput.value} ${horaInput.value}`);

    if (fechaSeleccionada < ahora) {
        gestor.mostrarMensaje('La fecha y/o hora seleccionadas ya han pasado.', false);
        return;
    }
```

## Mensajes de confirmación y/o error duplicados (MAX 1 punto)
Solo deben mostrase los mensajes de confirmación y/o error resaltados en cajas verdes o rojas que aparecen debajo de los botones del formulario. El resto de mensajes no deben aparecer.
> SOLUCION
```js
mostrarMensaje(texto, exito) {
    //Sobre el bloque comentado
   /* const container = document.querySelector('.container');
    const divMessage = document.createElement('div');
    divMessage.classList.add('alert-success');
    divMessage.textContent = texto;
     
    container.appendChild(divMessage);*/

    mensaje.textContent = texto;
    mensaje.className = `alert ${exito ? 'alert-success' : 'alert-danger'} mensaje`;
    mensaje.style.display = 'block';
    setTimeout(() => (mensaje.style.display = 'none'), 3000);
  }
```

## Error al editar reservas (MAX 1 punto)
El proyecto no permite editar correctamente una reserva.
> SOLUCION
```js
  editar(id) {
    const reserva = this.reservas.find(r => r.id === id);
    if (!reserva) return;
    nombreInput.value = reserva.nombre;
    telefonoInput.value = reserva.telefono;
    fechaInput.value = reserva.fecha;
    horaInput.value = reserva.hora;
    personasInput.value = reserva.personas;
    //faltaba esta linea  
    this.reservaEditando = reserva;
    guardarBtn.textContent = 'Guardar cambios';
  }
```


## Ordenación por fecha y hora (MAX 1 punto)
El proyecto debe ordenar las reservas por fecha y hora más reciente.
> SOLUCION
```js
    //Faltaba incluir la hora en el sort.
    ordenar() {
    this.reservas.sort((a, b) => {
      const fechaA = new Date(`${a.fecha} ${a.hora}`);
      const fechaB = new Date(`${b.fecha} ${b.hora}`);
      return fechaA - fechaB;
    });
  }
 
```
## Error al eliminar reserva (MAX 2 punto)
Al pulsar el botón eliminar de una de las reservas ya creadas, se crea una lista de reservas `undefined`.
> SOLUCION
```js
 eliminar(id) {
    //Habia que cambiar map por filter.
    //this.reservas = this.reservas.map(r => r.id !== id);
    this.reservas = this.reservas.filter(r => r.id !== id);
    this.mostrar();
    this.mostrarMensaje('Reserva eliminada correctamente.', true);
  }
```
## Reservas duplicadas (MAX 2 punto)
Algunas reservas se muestran por duplicado en la lista de reservas, al editarlas o crear más de una reserva seguida.
> SOLUCION
```js
 mostrar(lista = this.reservas) {
    //Faltaba esta linea que inicializa el contenedor.
    listaReservas.innerHTML = '';

    if (lista.length === 0) {
      listaReservas.innerHTML = `
        <li class="list-group-item text-center text-muted fst-italic">
          No hay reservas registradas.
        </li>`;
      return;
    }

    lista.forEach(reserva => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row';

      li.innerHTML = `
        <div>
          <strong>${reserva.nombre}</strong> (${reserva.telefono})<br>
          ${reserva.fecha} — ${reserva.hora} — ${reserva.personas} personas
        </div>
        <div class="mt-2 mt-md-0">
          <button class="btn btn-sm btn-outline-secondary me-2">Editar</button>
          <button class="btn btn-sm btn-outline-danger">Eliminar</button>
        </div>
      `;
      li.querySelector('.btn-outline-danger').addEventListener('click', () => this.eliminar(reserva.id));
      li.querySelector('.btn-outline-secondary').addEventListener('click', () => this.editar(reserva.id));
      listaReservas.appendChild(li);
    });
  }

```

## Botón borrar todas no funciona (MAX 2 punto)
El botón borrar todas, debe eliminar toda la lista de reservas que se hayan creado.

> SOLUCION
```js
document.getElementById("btnBorrarTodo").addEventListener("click", () => {
    //poner null es un error, la forma de dejar un array vacio es con []
    //gestor.reservas = null;
    gestor.reservas = [];
    gestor.mostrar();
    gestor.mostrarMensaje("Todas las reservas han sido eliminadas.", true);
});
```