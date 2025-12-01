// === Elementos del DOM ===
const form = document.getElementById('formPrestamo');
const lista = document.getElementById('listaPrestamos');
const mensaje = document.getElementById('mensaje');

// Campos del formulario
const idSocioInput = document.getElementById('idSocio');
const nombreLectorInput = document.getElementById('nombreLector');
const telefonoInput = document.getElementById('telefono');
const tituloLibroInput = document.getElementById('tituloLibro');
const idLibroInput = document.getElementById('idLibro');
const fPrestamo = document.getElementById('fechaPrestamo');
const fDevolucion = document.getElementById('fechaDevolucion');
const boton = form.querySelector('button[type="submit"]');

// === Clase GestorPrestamos ===
class GestorPrestamos {
  constructor() {
    // TODO: Crear el array para guardar los préstamos
    // TODO: Variable para saber si se está editando
  }

  // --- Agregar un préstamo nuevo ---
  agregar(prestamo) {
    // TODO: Añadir el préstamo al array
    // TODO: Ordenar los préstamos
    // TODO: Mostrar los préstamos en pantalla
    // TODO: Mostrar mensaje de confirmación
  }

  // --- Eliminar un préstamo ---
  eliminar(id) {
    // TODO: Filtrar el array para eliminar el préstamo con ese id
    // TODO: Volver a mostrar los préstamos actualizados
    // TODO: Mostrar mensaje de eliminación
  }

  // --- Editar un préstamo existente ---
  editar(id) {
    // TODO: Buscar el préstamo con el id recibido
    // TODO: Rellenar los campos del formulario con los datos del préstamo
    // TODO: Cambiar el texto del botón a "Guardar cambios"
  }

  // --- Guardar los cambios de una edición ---
  guardarEdicion() {
    // TODO: Actualizar los valores del préstamo editado
    // TODO: Ordenar y mostrar de nuevo los préstamos
    // TODO: Mostrar mensaje de éxito
    // TODO: Resetear formulario y volver al modo "nuevo"
  }

  // --- Ordenar préstamos por fecha de devolución ---
  ordenar() {
    // TODO: Usar sort() con new Date(a.fechaDevolucion) para ordenarlos
  }

  // --- Mostrar los préstamos en pantalla ---
   mostrar() {
    lista.innerHTML = '';

    if (this.prestamos.length === 0) {
      lista.innerHTML = `<li>No hay préstamos registrados</li>`;
      return;
    }

    this.prestamos.forEach(p => {
      const li = document.createElement('li');
      const hoy = new Date();
      const devol = new Date(p.fechaDevolucion);
      const atrasado = devol < hoy;

      li.className = atrasado ? 'atrasado' : 'activo';
     li.innerHTML = `
      <strong>${p.idSocio} - ${p.nombreLector}</strong>(${p.telefono})<br>
      <em>${p.tituloLibro}</em> (${p.idLibro})<br>
      <small>${p.fechaPrestamo} → ${p.fechaDevolucion}</small>
      <div>
        <button class="editar">Editar</button>
        <button class="eliminar">Eliminar</button>
      </div>
    `;
      li.querySelector('.editar').addEventListener('click', () => this.editar(p.id));
      li.querySelector('.eliminar').addEventListener('click', () => this.eliminar(p.id));

      lista.appendChild(li);
    });
  }

  // --- Mostrar mensajes de alerta o confirmación ---
  mostrarMensaje(texto, exito) {
    mensaje.textContent = texto;
    mensaje.style.display = 'block';
    mensaje.className = exito ? 'ok' : 'error';
    setTimeout(() => (mensaje.style.display = 'none'), 2000);
  }
}

// === Crear instancia del gestor ===
const gestor = new GestorPrestamos();

// === Evento principal del formulario ===
form.addEventListener('submit', e => {
  e.preventDefault();

  // --- VALIDACIONES ---
  // TODO: Comprobar que todos los campos del formulario estén completos
  // TODO: Validar que la fecha de devolución no sea anterior a la de préstamo

  // TODO: Comprobar si el libro ya está prestado (mismo idLibro)
  // TODO: Comprobar si el socio tiene un préstamo duplicado del mismo libro

  // --- Si está editando, guardar cambios ---
  // TODO: Llamar a gestor.guardarEdicion() si corresponde

  // --- Crear objeto con los datos del préstamo ---
  const nuevoPrestamo = {
    id: Date.now(),
    // TODO: Añadir las propiedades con los valores de los campos del formulario
    // idSocio, nombreLector, telefono, tituloLibro, idLibro, fechaPrestamo, fechaDevolucion
  };

  // TODO: Llamar a gestor.agregar(nuevoPrestamo)

  // TODO: Limpiar el formulario y enfocar el primer campo
});
