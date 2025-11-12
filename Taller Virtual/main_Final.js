// ===== OOP: VEHICLES =====
class Vehicle {
  constructor(brand, model, year, mileage) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.mileage = mileage;
    this.inMaintenance = false;
  }
  startMaintenance() {
    this.inMaintenance = true;
    return `${this.brand} ${this.model} ahora está en mantenimiento.`;
  }
  finishMaintenance() {
    this.inMaintenance = false;
    return `${this.brand} ${this.model} ha terminado el mantenimiento.`;
  }
}

class Car extends Vehicle {
  constructor(brand, model, year, mileage, fuelType) {
    super(brand, model, year, mileage);
    this.fuelType = fuelType;
  }
  startMaintenance() {
    return super.startMaintenance() + " Cambio de aceite y revisión de frenos.";
  }
}

class Motorcycle extends Vehicle {
  constructor(brand, model, year, mileage, engineCC) {
    super(brand, model, year, mileage);
    this.engineCC = engineCC;
  }
  startMaintenance() {
    return super.startMaintenance() + " Presión de cadena y neumáticos.";
  }
}

class Truck extends Vehicle {
  constructor(brand, model, year, mileage, maxLoad) {
    super(brand, model, year, mileage);
    this.maxLoad = maxLoad;
  }
  startMaintenance() {
    return super.startMaintenance() + " Inspección de suspensión y frenos de aire.";
  }
}

// ===== WORKSHOP (MANAGER) CON LOCAL STORAGE =====
class Workshop {
  constructor(name) {
    this.name = name;
    this.vehicles = [];
    this.load(); // cargamos al iniciar
  }

  addVehicle(vehicle) {
    this.vehicles.push(vehicle);
    this.save();
  }

  removeVehicle(index) {
    this.vehicles.splice(index, 1);
    this.save();
  }

  listVehicles() {
    return this.vehicles;
  }

  save() {
    const data = this.vehicles.map(v => {
      const base = { brand: v.brand, model: v.model, year: v.year, mileage: v.mileage, inMaintenance: v.inMaintenance };
      if (v instanceof Car) return { ...base, type: "Car", fuelType: v.fuelType };
      if (v instanceof Motorcycle) return { ...base, type: "Motorcycle", engineCC: v.engineCC };
      if (v instanceof Truck) return { ...base, type: "Truck", maxLoad: v.maxLoad };
    });
    localStorage.setItem("vehicles", JSON.stringify(data));
  }

  load() {
    const stored = localStorage.getItem("vehicles");
    if (!stored) return;
    const arr = JSON.parse(stored);
    arr.forEach(obj => {
      let vehicle;
      if (obj.type === "Car") vehicle = new Car(obj.brand, obj.model, obj.year, obj.mileage, obj.fuelType);
      else if (obj.type === "Motorcycle") vehicle = new Motorcycle(obj.brand, obj.model, obj.year, obj.mileage, obj.engineCC);
      else if (obj.type === "Truck") vehicle = new Truck(obj.brand, obj.model, obj.year, obj.mileage, obj.maxLoad);
      vehicle.inMaintenance = obj.inMaintenance;
      this.vehicles.push(vehicle);
    });
  }
}

// ===== DOM HOOKS =====
const myWorkshop  = new Workshop("Virtual Workshop");
const form        = document.getElementById("vehicleForm");
const typeSelect  = document.getElementById("type");
const extraField  = document.getElementById("extraField");
const vehicleList = document.getElementById("vehicleList");

// Render extra input based on type
typeSelect.addEventListener("change", renderExtraField);
renderExtraField();

function renderExtraField() {
  const type = typeSelect.value;
  extraField.innerHTML = "";
  if (type === "Car") {
    extraField.innerHTML = `
      <label>Tipo de combustible:</label>
      <input type="text" id="extra" placeholder="Gasolina / Diesel">
    `;
  } else if (type === "Motorcycle") {
    extraField.innerHTML = `
      <label>CC del motor:</label>
      <input type="number" id="extra" placeholder="689">
    `;
  } else {
    extraField.innerHTML = `
      <label>Carga máxima (kg):</label>
      <input type="number" id="extra" placeholder="25000">
    `;
  }
}

// ===== VALIDATION HELPERS =====
function isBlank(s) { return !s || s.trim().length === 0; }
function isValidYear(y) {
  const n = Number(y);
  const current = new Date().getFullYear();
  return Number.isInteger(n) && n >= 1900 && n <= current + 1;
}
function isValidPositiveNumber(n) {
  const v = Number(n);
  return Number.isFinite(v) && v >= 0;
}

// ===== FORM SUBMIT =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const type     = typeSelect.value;
  const brand    = document.getElementById("brand").value;
  const model    = document.getElementById("model").value;
  const yearStr  = document.getElementById("year").value;
  const kmStr    = document.getElementById("mileage").value;
  const extraRaw = document.getElementById("extra")?.value ?? "";

  // Basic validation
  if (isBlank(brand) || isBlank(model) || isBlank(yearStr) || isBlank(kmStr)) {
    alert("Por favor, rellene todos los campos obligatorios.");
    return;
  }
  if (!isValidYear(yearStr)) {
    alert("Por favor ingrese un año válido (1900...el año siguiente).");
    return;
  }
  if (!isValidPositiveNumber(kmStr) || kmStr <= 0) {
    alert("El kilometraje debe ser un número no negativo.");
    return;
  }

  const year = Number(yearStr);
  const mileage = Number(kmStr);

  if (type === "Motorcycle" || type === "Truck") {
    if (!isValidPositiveNumber(extraRaw)) {
      alert(`Por favor, introduzca un número válido para ${type === "Motorcycle" ? "Engine CC" : "Max Load"}.`);
      return;
    }
  }

  // Create instance
  let vehicle;
  if (type === "Car") vehicle = new Car(brand.trim(), model.trim(), year, mileage, extraRaw.trim());
  else if (type === "Motorcycle") vehicle = new Motorcycle(brand.trim(), model.trim(), year, mileage, Number(extraRaw));
  else vehicle = new Truck(brand.trim(), model.trim(), year, mileage, Number(extraRaw));

  myWorkshop.addVehicle(vehicle);
  alert(`${brand} ${model} añadido correctamente.`);
  form.reset();
  renderExtraField();
  updateList();
});

// ===== RENDER LIST =====
function updateList() {
  vehicleList.innerHTML = "";
  myWorkshop.listVehicles().forEach((v, i) => {
    const li = document.createElement("li");
    li.className = "vehicle-item";
    if (v.inMaintenance) li.classList.add("maintenance-active");

    li.innerHTML = `
      <span>
        ${v.brand} ${v.model} (${v.year}) – ${v.mileage} km
        ${v.inMaintenance ? "<span class='badge'>(En mantenimiento)</span>" : ""}
      </span>
      <div>
        <button class="btnMaint"  data-index="${i}" ${v.inMaintenance ? "disabled" : ""}>Mantenimiento</button>
        <button class="btnFinish" data-index="${i}">Finalizar</button>
        <button class="btnDelete" data-index="${i}">Borrar</button>
      </div>
    `;

    vehicleList.appendChild(li);
  });

  // Eventos (vuelven a enlazarse tras cada render)
  document.querySelectorAll(".btnMaint").forEach(btn => {
    btn.onclick = (e) => {
      const i = Number(e.currentTarget.dataset.index);
      alert(myWorkshop.vehicles[i].startMaintenance());
      myWorkshop.save(); // guardamos cambios automáticamente
      updateList();
    };
  });

  document.querySelectorAll(".btnFinish").forEach(btn => {
    btn.onclick = (e) => {
      const i = Number(e.currentTarget.dataset.index);
      alert(myWorkshop.vehicles[i].finishMaintenance());
      myWorkshop.save();
      updateList();
    };
  });

  document.querySelectorAll(".btnDelete").forEach(btn => {
    btn.onclick = (e) => {
      const i = Number(e.currentTarget.dataset.index);
      if (confirm("¿Estás seguro de que quieres eliminar este vehículo?")) {
        myWorkshop.removeVehicle(i);
        updateList();
      }
    };
  });
}

// Primer render
updateList();
