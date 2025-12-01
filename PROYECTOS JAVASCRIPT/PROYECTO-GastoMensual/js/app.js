// === Elementos del DOM ===
const form = document.getElementById('formGasto');
const lista = document.getElementById('listaGastos');
const mensaje = document.getElementById('mensaje');
const totalSpan = document.getElementById('total');

const conceptoInput = document.getElementById('concepto');
const fechaInput = document.getElementById('fecha');
const importeInput = document.getElementById('importe');
const categoriaInput = document.getElementById('categoria');
const filtroCategoria = document.getElementById('filtroCategoria');


// === Clase GestorGastos ===
class GestorGastos {
  constructor() {
    this.gastos = [];
    this.gastoEditando = null;
  }

  agregar(gasto) {
    this.gastos.push(gasto);
    this.ordenar();
    this.calcularTotal();
    this.mostrar();
   
    this.mostrarMensaje('Gasto añadido correctamente', true);
  }

  eliminar(id) {
    this.gastos = this.gastos.filter(g => g.id !== id);
    this.calcularTotal();
    this.mostrar();
    this.mostrarMensaje('Gasto eliminado', true);
  }

   editar(id) {
    const g = this.gastos.find(x => x.id === id);
    if (!g) return;
    conceptoInput.value = g.concepto;
    fechaInput.value = g.fecha;
    importeInput.value = g.importe.toFixed(2);
    categoriaInput.value = g.categoria || '';
    this.gastoEditando = g;
  }

  guardarEdicion() {
    if (!this.gastoEditando) return;
    this.gastoEditando.concepto = conceptoInput.value.trim();
    this.gastoEditando.fecha = fechaInput.value;
    this.gastoEditando.importe = Number(importeInput.value);
    this.gastoEditando.categoria = categoriaInput.value || '';
    this.ordenar();
    this.calcularTotal();
    this.mostrar();
    
    this.mostrarMensaje('Gasto actualizado', true);
    this.gastoEditando = null;
    form.reset();
  }

  calcularTotal() {
    const total = this.gastos.reduce((acc, g) => acc + g.importe, 0);
    totalSpan.textContent = total.toFixed(2);
  }

  ordenar() {
    this.gastos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  }

  mostrar() {
    lista.innerHTML = '';
    const filtro = filtroCategoria.value;
    const filtrados = filtro === "Todos"
      ? this.gastos
      : this.gastos.filter(g => g.categoria === filtro);

    if (filtrados.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No hay gastos registrados';
      lista.appendChild(li);
      return;
    }

    filtrados.forEach(g => {
      const li = document.createElement('li');
      if (g.categoria) li.dataset.categoria = g.categoria;

      li.innerHTML = `
        <div class="fila-top">
          <span class="concepto">${g.concepto}</span>
          <span class="importe">${g.importe.toFixed(2)} €</span>
        </div>
        <div class="meta">
          <span>${g.fecha}</span> · <span>${g.categoria}</span>
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

  mostrarMensaje(texto, exito) {
    mensaje.textContent = texto;
    mensaje.style.display = 'block';
    mensaje.className = exito ? 'ok' : 'error';
    setTimeout(() => (mensaje.style.display = 'none'), 2000);
  }
}

// === Instancia ===
const gestor = new GestorGastos();

// === Validaciones ===
function validarCampos() {
  const concepto = conceptoInput.value.trim();
  const fecha = fechaInput.value;
  const importeTexto = importeInput.value.trim();
  const categoria = categoriaInput.value;

  if (!concepto || !fecha || !importeTexto || !categoria) {
    gestor.mostrarMensaje('Completa todos los campos', false);
    return false;
  }
  if (new Date(fecha) > new Date()) {
    gestor.mostrarMensaje('La fecha no puede ser futura', false);
    return false;
  }
  return true;
}

// === Eventos ===
form.addEventListener('submit', e => {
  e.preventDefault();

  if (!validarCampos()) return;

  if (gestor.gastoEditando) {
    gestor.guardarEdicion();
    return;
  }

  const nuevoGasto = {
    id: Date.now(),
    concepto: conceptoInput.value.trim(),
    fecha: fechaInput.value,
    importe: Number(importeInput.value),
    categoria: categoriaInput.value
  };

  gestor.agregar(nuevoGasto);
  form.reset();
});