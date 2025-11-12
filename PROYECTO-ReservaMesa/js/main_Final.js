// ----------------------
// Selectores
// ----------------------
const form = document.getElementById('reservaForm');
const mensaje = document.getElementById('mensaje');
const listaReservas = document.getElementById('listaReservas');
const guardarBtn = document.querySelector('#reservaForm button[type="submit"]');

const nombreInput = document.getElementById('nombre');
const telefonoInput = document.getElementById('telefono');
const fechaInput = document.getElementById('fecha');
const horaInput = document.getElementById('hora');
const personasInput = document.getElementById('personas');

// ----------------------
// Clase: Gestor de Reservas
// ----------------------
class GestorReservas {
  constructor() {
    this.reservas = [];
    this.reservaEditando = null; //Guardará la reserva en edición
  }

  agregar(reserva) {
    this.reservas.push(reserva);
    this.ordenar();
    this.mostrar();
  }

  eliminar(id) {
    this.reservas = this.reservas.filter(r => r.id !== id);
    this.mostrar();
    this.mostrarMensaje('Reserva eliminada correctamente.', true);
  }

  editar(id) {
    const reserva = this.reservas.find(r => r.id === id);
    if (!reserva) return;

    // Rellenar formulario con los datos actuales
    nombreInput.value = reserva.nombre;
    telefonoInput.value = reserva.telefono;
    fechaInput.value = reserva.fecha;
    horaInput.value = reserva.hora;
    personasInput.value = reserva.personas;

    this.reservaEditando = reserva;
    guardarBtn.textContent = 'Guardar cambios';
  }

  guardarEdicion() {
    if (!this.reservaEditando) return;

    // Actualizar los datos de la reserva
    this.reservaEditando.nombre = nombreInput.value.trim();
    this.reservaEditando.telefono = telefonoInput.value.trim();
    this.reservaEditando.fecha = fechaInput.value.trim();
    this.reservaEditando.hora = horaInput.value.trim();
    this.reservaEditando.personas = personasInput.value.trim();

    this.ordenar();
    this.mostrar();
    this.mostrarMensaje('Reserva actualizada correctamente.', true);

    // Limpiar todo después de editar
    this.reservaEditando = null;
    guardarBtn.textContent = 'Reservar';
    form.reset(); // limpia los campos
    nombreInput.focus(); // opcional: vuelve a enfocar el primer campo
  }

  ordenar() {
    this.reservas.sort((a, b) => {
      const fechaA = new Date(`${a.fecha} ${a.hora}`);
      const fechaB = new Date(`${b.fecha} ${b.hora}`);
      return fechaA - fechaB; // más reciente primero
    });
  }

  mostrar() {
    listaReservas.innerHTML = '';

    if (this.reservas.length === 0) {
      listaReservas.innerHTML = `
        <li class="list-group-item text-center text-muted fst-italic">
          No hay reservas registradas.
        </li>`;
      return;
    }

    this.reservas.forEach(reserva => {
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

      // Botón eliminar
      li.querySelector('.btn-outline-danger').addEventListener('click', () => this.eliminar(reserva.id));

      // Botón editar
      li.querySelector('.btn-outline-secondary').addEventListener('click', () => this.editar(reserva.id));

      listaReservas.appendChild(li);
    });
  }

  mostrarMensaje(texto, exito) {
    mensaje.textContent = texto;
    mensaje.className = `alert ${exito ? 'alert-success' : 'alert-danger'} mensaje`;
    mensaje.style.display = 'block';
    setTimeout(() => (mensaje.style.display = 'none'), 3000);
  }
}

// ----------------------
// Instancia del gestor
// ----------------------
const gestor = new GestorReservas();

// ----------------------
// Eventos
// ----------------------
document.addEventListener('DOMContentLoaded', () => gestor.mostrar());
form.addEventListener('submit', manejarFormulario);

// ----------------------
// Funciones
// ----------------------
function manejarFormulario(e) {
  e.preventDefault();

  if (
    !nombreInput.value.trim() ||
    !telefonoInput.value.trim() ||
    !fechaInput.value.trim() ||
    !horaInput.value.trim() ||
    !personasInput.value
  ) {
    gestor.mostrarMensaje('Por favor completa todos los campos.', false);
    return;
  }

  // Validar que el teléfono contenga solo números
  const telefonoVal = telefonoInput.value.trim();
  const soloNumeros = /^[0-9]+$/;
  if (!soloNumeros.test(telefonoVal)) {
    gestor.mostrarMensaje('El teléfono solo puede contener números.', false);
    return;
  }

  //no permitir fechas pasadas
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fechaSeleccionada = new Date(fechaInput.value);

  if (fechaSeleccionada < hoy) {
    gestor.mostrarMensaje('No puedes reservar en fechas pasadas.', false);
    return;
  }

  // Si estamos editando
  if (gestor.reservaEditando) {
    gestor.guardarEdicion();
    return;
  }

  // Si estamos agregando una nueva reserva
  const nuevaReserva = {
    id: Date.now(),
    nombre: nombreInput.value.trim(),
    telefono: telefonoInput.value.trim(),
    fecha: fechaInput.value.trim(),
    hora: horaInput.value.trim(),
    personas: personasInput.value.trim()
  };

  gestor.agregar(nuevaReserva);
  gestor.mostrarMensaje('¡Reserva añadida correctamente!', true);

  // Limpiar el formulario después de agregar
  form.reset();
  nombreInput.focus();
}
