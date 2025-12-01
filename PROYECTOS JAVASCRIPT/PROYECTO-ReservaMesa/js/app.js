// ----------------------
// Selectores
// ----------------------
const form = document.getElementById('reservaForm');
const mensaje = document.getElementById('mensaje');
const listaReservas = document.getElementById('listaReservas');

// Campos del formulario
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
    this.reservas = []; // guardadas solo en memoria
  }

  agregar(reserva) {
    /*****************COMPLETAR************** */
  }

  eliminar(id) {
     /*****************COMPLETAR************** */
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
        <button class="btn btn-sm btn-outline-danger mt-2 mt-md-0">Eliminar</button>
      `;

      li.querySelector('button').addEventListener('click', () => this.eliminar(reserva.id));
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
form.addEventListener('submit', agregarReserva);

// ----------------------
// Funciones
// ----------------------
function agregarReserva(e) {
  e.preventDefault();

  // Validación básica
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
  form.reset();
}
