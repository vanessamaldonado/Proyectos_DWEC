// === Elementos del DOM ===
const form = document.getElementById('formPrestamo');
const lista = document.getElementById('listaPrestamos');
const mensaje = document.getElementById('mensaje');

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
    this.prestamos = [];
    this.editando = null;
  }

  agregar(prestamo) {
    this.prestamos.push(prestamo);
    this.ordenar();
    this.mostrar();
    this.mostrarMensaje('Préstamo registrado correctamente', true);
  }

  eliminar(id) {
    this.prestamos = this.prestamos.filter(p => p.id !== id);
    this.mostrar();
    this.mostrarMensaje('Préstamo eliminado', true);
  }

  editar(id) {
    const p = this.prestamos.find(p => p.id === id);
    if (!p) return;

    idSocioInput.value = p.idSocio;
    nombreLectorInput.value = p.nombreLector;
    telefonoInput.value = p.telefono;
    tituloLibroInput.value = p.tituloLibro;
    idLibroInput.value = p.idLibro;
    fPrestamo.value = p.fechaPrestamo;
    fDevolucion.value = p.fechaDevolucion;

    this.editando = p;
    boton.textContent = 'Guardar cambios';
  }

  guardarEdicion() {
    if (!this.editando) return;

    this.editando.idSocio = idSocioInput.value.trim();
    this.editando.nombreLector = nombreLectorInput.value.trim();
    this.editando.telefono = telefonoInput.value.trim();
    this.editando.tituloLibro = tituloLibroInput.value.trim();
    this.editando.idLibro = idLibroInput.value.trim();
    this.editando.fechaPrestamo = fPrestamo.value;
    this.editando.fechaDevolucion = fDevolucion.value;

    this.ordenar();
    this.mostrar();
    this.mostrarMensaje('Préstamo actualizado', true);

    this.editando = null;
    boton.textContent = 'Guardar';
    form.reset();
  }

  ordenar() {
    this.prestamos.sort((a, b) => new Date(a.fechaDevolucion) - new Date(b.fechaDevolucion));
  }

  mostrar() {
    lista.innerHTML = '';
console.log("lista");

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

  mostrarMensaje(texto, exito) {
    mensaje.textContent = texto;
    mensaje.style.display = 'block';
    mensaje.className = exito ? 'ok' : 'error';
    setTimeout(() => (mensaje.style.display = 'none'), 2000);
  }
}

// === Inicialización ===
const gestor = new GestorPrestamos();

form.addEventListener('submit', e => {
  e.preventDefault();

  if (
    !idSocioInput.value.trim() ||
    !nombreLectorInput.value.trim() ||
    !telefonoInput.value.trim() ||
    !tituloLibroInput.value.trim() ||
    !idLibroInput.value.trim() ||
    !fPrestamo.value ||
    !fDevolucion.value
  ) {
    gestor.mostrarMensaje('Completa todos los campos', false);
    return;
  }

  // Validar duplicados
  const libroPrestado = gestor.prestamos.find(p => p.idLibro === idLibroInput.value.trim());
  if (libroPrestado && !gestor.editando) {
    gestor.mostrarMensaje('Este libro ya está prestado', false);
    return;
  }

  const socioPrestamoIgual = gestor.prestamos.find(p => p.idSocio === idSocioInput.value.trim() && p.idLibro === idLibroInput.value.trim());
  if (socioPrestamoIgual && !gestor.editando) {
    gestor.mostrarMensaje('Este socio ya tiene este libro registrado', false);
    return;
  }

  const fechaPrestamo = new Date(fPrestamo.value);
  const fechaDevolucion = new Date(fDevolucion.value);
  if (fechaDevolucion < fechaPrestamo) {
    gestor.mostrarMensaje('La devolución no puede ser anterior al préstamo', false);
    form.reset();
    return;
  }

  if (gestor.editando) {
    gestor.guardarEdicion();
    return;
  }

  const nuevoPrestamo = {
    id: Date.now(),
    idSocio: idSocioInput.value.trim(),
    nombreLector: nombreLectorInput.value.trim(),
    telefono: telefonoInput.value.trim(),
    tituloLibro: tituloLibroInput.value.trim(),
    idLibro: idLibroInput.value.trim(),
    fechaPrestamo: fPrestamo.value,
    fechaDevolucion: fDevolucion.value
  };

  gestor.agregar(nuevoPrestamo);
  form.reset();
  idSocioInput.focus();
});
