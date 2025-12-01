// === Elementos del DOM ===
const form = document.getElementById('formGasto');
const lista = document.getElementById('listaGastos');
const mensaje = document.getElementById('mensaje');
const totalSpan = document.getElementById('total');

// Campos del formulario
const conceptoInput = document.getElementById('concepto');
const fechaInput = document.getElementById('fecha');
const importeInput = document.getElementById('importe');
const categoriaInput = document.getElementById('categoria');
const boton = form.querySelector('button[type="submit"]');

// Botones extra
const btnLimpiar = document.getElementById('btnLimpiar');
const btnEliminarTodos = document.getElementById('btnEliminarTodos');

// Utilidad: construir Date local desde "YYYY-MM-DD"
function dateFromInput(yyyy_mm_dd) {
  if (!yyyy_mm_dd) return null;
  const [y, m, d] = yyyy_mm_dd.split('-').map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}


// === Clase GestorGastos ===
class GestorGastos {
  constructor() {
    this.gastos = [];
    this.gastoEditando = null;
  }

  agregar(gasto) {
    this.gastos.push(gasto);
    this.ordenar();
    this.mostrar();
    this.calcularTotal();
    this.mostrarMensaje('Gasto añadido correctamente', true);
  }

  eliminar(id) {
    this.gastos = this.gastos.filter(g => g.id !== id);
    this.mostrar();
    this.calcularTotal();
    this.mostrarMensaje('Gasto eliminado', true);
  }

  eliminarTodos() {
    this.gastos = [];
    this.mostrar();
    this.calcularTotal();
    this.mostrarMensaje("Todos los gastos han sido eliminados", true);
  }

  editar(id) {
    const g = this.gastos.find(x => x.id === id);
    if (!g) return;

    conceptoInput.value = g.concepto;
    fechaInput.value = g.fecha;
    importeInput.value = g.importe.toFixed(2);
    categoriaInput.value = g.categoria || "";

    this.gastoEditando = g;
    boton.textContent = "Guardar cambios";
  }

  guardarEdicion() {
    if (!this.gastoEditando) return;

    this.gastoEditando.concepto = conceptoInput.value.trim();
    this.gastoEditando.fecha = fechaInput.value;
    this.gastoEditando.importe = Number(importeInput.value);
    this.gastoEditando.categoria = categoriaInput.value || "";

    this.ordenar();
    this.mostrar();
    this.calcularTotal();
    this.mostrarMensaje("Gasto actualizado", true);

    this.gastoEditando = null;
    boton.textContent = "Guardar";
    form.reset();
    conceptoInput.focus();
  }

  calcularTotal() {
    const total = this.gastos.reduce((acc, g) => acc + g.importe, 0);
    totalSpan.textContent = total.toFixed(2);
  }

  ordenar() {
    this.gastos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  }

  mostrar() {
    lista.innerHTML = "";
    if (this.gastos.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No hay gastos registrados";
      lista.appendChild(li);
      return;
    }

    this.gastos.forEach(g => {
      const li = document.createElement("li");

      li.innerHTML = `
        <div class="fila-top">
          <span class="concepto">${g.concepto}</span>
          <span class="importe">${g.importe.toFixed(2)} €</span>
        </div>
        <div class="meta">
          <span>${g.fecha}</span>
          ${g.categoria ? ` · <span>${g.categoria}</span>` : ""}
        </div>
        <div class="acciones">
          <button class="editar">Editar</button>
          <button class="eliminar">Eliminar</button>
        </div>
      `;

      li.querySelector(".editar").addEventListener("click", () => this.editar(g.id));
      li.querySelector(".eliminar").addEventListener("click", () => this.eliminar(g.id));

      lista.appendChild(li);
    });
  }

  mostrarMensaje(texto, exito) {
    mensaje.textContent = texto;
    mensaje.style.display = "block";
    mensaje.className = exito ? "ok" : "error";
    setTimeout(() => (mensaje.style.display = "none"), 2000);
  }
}



// === Instancia ===
const gestor = new GestorGastos();


// === Validaciones auxiliares ===
function validarCampos() {
  const concepto = conceptoInput.value.trim();
  const fecha = fechaInput.value;
  const importe = importeInput.value.trim();
  const categoria = categoriaInput.value;

  // Campos vacíos
  if (!concepto || !fecha || !importe) {
    gestor.mostrarMensaje("Completa todos los campos obligatorios", false);
    return false;
  }

  // Validación importe (regex decimal)
  const regexImporte = /^[0-9]+(\.[0-9]{1,2})?$/;
  if (!regexImporte.test(importe)) {
    gestor.mostrarMensaje("El importe debe ser un número válido (ej: 45.90)", false);
    return false;
  }

  const importeNum = Number(importe);
  if (importeNum <= 0 || importeNum > 5000) {
    gestor.mostrarMensaje("El importe debe ser mayor que 0€ y menor que 5000€", false);
    return false;
  }

  // Fecha futura
  const sel = dateFromInput(fecha);
  const hoy = new Date(); hoy.setHours(0,0,0,0);
  if (!sel || sel > hoy) {
    gestor.mostrarMensaje("La fecha no puede ser futura", false);
    return false;
  }

  // Evitar duplicados
  const existe = gestor.gastos.some(g =>
    g.concepto.toLowerCase() === concepto.toLowerCase() &&
    g.fecha === fecha &&
    g !== gestor.gastoEditando
  );

  if (existe) {
    gestor.mostrarMensaje("Ya existe un gasto con ese concepto y fecha", false);
    return false;
  }

  return true;
}



// === Evento del formulario ===
form.addEventListener("submit", e => {
  e.preventDefault();

  if (!validarCampos()) {
    return;
  }

  if (gestor.gastoEditando) {
    gestor.guardarEdicion();
    return;
  }

  const nuevoGasto = {
    id: Date.now(),
    concepto: conceptoInput.value.trim(),
    fecha: fechaInput.value,
    importe: Number(importeInput.value),
    categoria: categoriaInput.value || ""
  };

  gestor.agregar(nuevoGasto);
  form.reset();
  conceptoInput.focus();
});



// === Botón LIMPIAR FORMULARIO ===
btnLimpiar.addEventListener("click", () => {
  form.reset();
  conceptoInput.focus();
});



// === Botón ELIMINAR TODOS LOS GASTOS ===
btnEliminarTodos.addEventListener("click", () => {
  const confirmar = confirm("¿Seguro que quieres borrar todos los gastos?");
  if (confirmar) {
    gestor.eliminarTodos();
  }
});
