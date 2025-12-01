
// === Elementos del DOM ===
 // TODO: Crear constantes para manejar tus elementos del DOM
 const form = document.getElementById('formGasto');
 const mensaje = document.getElementById('mensaje');
 const resumen = document.getElementById('resumen'); 
 const total = document.getElementById('total')
 const lista = document.getElementById('listaGastos')
 const boton = form.querySelector('button[type="submit"]');

// Campos del formulario
 // TODO: Crear constantes para manejar tus elementos del formulario
 const conceptoInput = document.getElementById('concepto');
 const fechaInput = document.getElementById('fecha');
 const importeInput = document.getElementById('importe');
 const categoriaSelect = document.getElementById('categoria');
// === Clase GestorGastos ===
class GestorGastos {
  constructor() {
    // TODO: Crear array para guardar los gastos
    // TODO: Variable para gasto en edición 
    this.gastos = [];
    this.gastoEnEdicion = null;
  }

  // --- Agregar gasto ---
  agregar(gasto) {
    // TODO: Añadir gasto al array
    // TODO: Ordenar por fecha
    // TODO: Mostrar lista y actualizar total
    // TODO: Mostrar mensaje de éxito
    this.gastos.push(gasto);
    this.ordenar();
    this.mostrar();
    this.calcularTotal();
    this.mostrarMensaje("Gasto Agregado con Éxito", true);
  }

  // --- Eliminar gasto ---
  eliminar(id) {
    // TODO: Filtrar el array para eliminar el gasto
    // TODO: Mostrar lista actualizada
    // TODO: Actualizar total y mostrar mensaje
    this.gastos = this.gastos.filter(g => g.id !== id);
    this.mostrar();
    this.calcularTotal();
    this.mostrarMensaje("Gasto Eliminado con Éxito", true);
  }

  // --- Editar gasto ---
  editar(id) {
    // TODO: Buscar gasto con ese id
    // TODO: Rellenar el formulario con sus datos
    // TODO: Cambiar texto del botón a "Guardar cambios"
    const g = this.gastos.find(g => g.id === id);
    if(!g) return;

    conceptoInput.value = g.concepto;
    fechaInput.value = g.fecha;
    importeInput.value = g.importe;
    categoriaSelect.value = g.categoria;

    this.gastoEnEdicion = g;
    boton.textContent = 'Guardar Cambios';

  }

  // --- Guardar cambios ---
  guardarEdicion() {
    // TODO: Actualizar los datos del gasto editado
    // TODO: Reordenar, mostrar y recalcular total
    // TODO: Mostrar mensaje de éxito
    // TODO: Resetear formulario y volver a modo "nuevo"
    if(!this.gastoEnEdicion) return;

    this.gastoEnEdicion.concepto = conceptoInput.value.trim();
    this.gastoEnEdicion.fecha = fechaInput.value;
    this.gastoEnEdicion.importe = importeInput.value.trim();
    this.gastoEnEdicion.categoria = categoriaSelect.value.trim();

    this.ordenar();
    this.mostrar();
    this.calcularTotal();
    this.mostrarMensaje("Gasto Actualizado con Éxito", true);
    boton.textContent = 'Guardar';
    form.reset();
  }

  // --- Calcular total gastado ---
  calcularTotal() {
    // TODO: Sumar los importes del array
    // TODO: Mostrar el total en pantalla con 2 decimales como máximo si hubiera
    this.total = this.gastos.reduce((total, gasto) => total + gasto.amount, 0);
    
}

  // --- Ordenar por fecha ---
  ordenar() {
    // TODO: Ordenar el array por fecha del gasto más reciente
    this.gastos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    
  }

  // --- Mostrar lista de gastos ---
   mostrar() {
    lista.innerHTML = '';
    if (this.gastos.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No hay gastos registrados';
      lista.appendChild(li);
      return;
    }

    this.gastos.forEach(g => {
      const li = document.createElement('li');
      if (g.categoria) li.dataset.categoria = g.categoria;

      li.innerHTML = `
        <div class="fila-top">
          <span class="concepto">${g.concepto}</span>
          <span class="importe">${g.importe} €</span>
        </div>
        <div class="meta">
          <span>${g.fecha}</span>
          ${g.categoria ? ` · <span>${g.categoria}</span>` : ''}
        </div>
        <div class="acciones">
          <button class="editar">Editar</button>
          <button class="eliminar">Eliminar</button>
        </div>
      `;

      li.querySelector('.editar').addEventListener('click', () => this.editar(g.id));
      li.querySelector('.eliminar').addEventListener('click', () => this.eliminar(g.id));

      lista.appendChild(li);
    });
  }

  // --- Mostrar mensajes ---
  mostrarMensaje(texto, exito) {
    mensaje.textContent = texto;
    mensaje.style.display = 'block';
    mensaje.className = exito ? 'ok' : 'error';
    setTimeout(() => (mensaje.style.display = 'none'), 2000);
  }
}

// === Instancia ===
const gestor = new GestorGastos();

// === Evento del formulario ===
form.addEventListener('submit', e => {
  e.preventDefault();

  // --- Validaciones ---
  // TODO: Comprobar campos vacíos. Ningún campo del formulario puede quedar vacío.
  // TODO: Validar que la fecha no sea futura
    if(
        !conceptoInput.value.trim() || 
        !fechaInput.value.trim() || 
        !importeInput.value.trim() || 
        !categoriaSelect.value.trim() 
  ) {
    gestor.mostrarMensaje("Completa todos los Campos", false)
    return;
  }
  // --- Si se está editando ---
  // TODO: Llamar a edicion y salir
    if(this.gastoEnEdicion){
        return;
    }
  // --- Crear objeto gasto ---
  const nuevoGasto = {
    id: Date.now(),
    // TODO: Añadir propiedades: concepto, fecha, importe, categoria
    concepto: conceptoInput.value.trim(),
    fecha: fechaInput.value,
    importe: importeInput.value.trim(),
    concepto: conceptoInput.value.trim()
  };

  // TODO: Llamar a gestor.agregar(nuevoGasto)
  // TODO: Resetear formulario
  gestor.agregar(nuevoGasto);
  form.reset();
  conceptoInput.focus();
});
