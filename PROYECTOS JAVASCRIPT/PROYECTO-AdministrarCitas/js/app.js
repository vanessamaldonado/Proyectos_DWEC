// Input fields
const petInput = document.querySelector('#pet');
const ownerInput = document.querySelector('#owner');
const phoneInput = document.querySelector('#phone');
const dateInput = document.querySelector('#date');
const timeInput = document.querySelector('#time');
const symptomsInput = document.querySelector('#symptoms');
// New appointment form
const form = document.querySelector('#new-appointment');
form.addEventListener('submit', newAppointment);

// Botones adicionales
const btnClear = document.querySelector('#btn-clear');
const btnDeleteAll = document.querySelector('#btn-delete-all');

// Listeners para los botones
btnClear.addEventListener('click', clearForm);
btnDeleteAll.addEventListener('click', deleteAllAppointments);

// Container for appointments
const appointmentsContainer = document.querySelector('#appointment');

let editing = false;

// Appointment object
const appointmentObj = {
    pet: '',
    owner: '',
    phone: '',
    date: '',
    time: '',
    symptoms: ''
}

// Event listeners
setupEventListeners();
function setupEventListeners() {
    petInput.addEventListener('change', captureAppointmentData);
    ownerInput.addEventListener('change', captureAppointmentData);
    phoneInput.addEventListener('change', captureAppointmentData);
    dateInput.addEventListener('change', captureAppointmentData);
    timeInput.addEventListener('change', captureAppointmentData);
    symptomsInput.addEventListener('change', captureAppointmentData);
}

// Capture input data
function captureAppointmentData(e) {
    appointmentObj[e.target.name] = e.target.value;
}

function newAppointment(e) {
    e.preventDefault();

    const { pet, owner, phone, date, time, symptoms } = appointmentObj;
    if(pet === '' || owner === '' || phone === '' || date === '' || time === '' || symptoms === '') {
        showAlert('Todos los campos son obligatorios', 'error');
        return;
    }
   
    /************************comprobación fecha pasada********************* */
    const appointmentDate = new Date(date.replace('-','/')+ ' ' +time);
    if (appointmentDate <= new Date()){
        showAlert('No puede elegir una fecha pasada','error');
        return;
    }


    if(editing) {
        manageAppointments.editAppointment({ ...appointmentObj });
        showAlert('Guardado correctamente','success');

        form.querySelector('button[type="submit"]').textContent = 'Crear cita';
        editing = false;
    } else {
        appointmentObj.id = Date.now();
        manageAppointments.addAppointment({ ...appointmentObj });
        showAlert('Añadido correctamente','success');
    }

    resetAppointmentObj();
    form.reset();
}

 function showAlert(message, type) {
        // Si ya existe una alerta, no crees otra
        const container = document.querySelector('.container');
        if (container.querySelector('.alert')) return;
        
        const divMessage = document.createElement('div');
        divMessage.classList.add('text-center', 'alert');

        (type === 'error') ? divMessage.classList.add('alert-danger') : divMessage.classList.add('alert-success');
        divMessage.textContent = message;

       container.insertBefore(divMessage, document.querySelector('#content'));
    
        setTimeout(() => divMessage.remove(), 3000);
    }

// Classes
class Appointments {
    constructor() {
        this.appointments = [];
    }

    addAppointment(appointment) {
        this.appointments.push(appointment);
        displayAppointments(this.appointments);
    }

    editAppointment(updatedAppointment) {
        this.appointments = this.appointments.map(
            appointment => appointment.id === updatedAppointment.id ? updatedAppointment : appointment
        );
         displayAppointments(this.appointments);
    }

    deleteAppointment(id) {
        this.appointments = this.appointments.filter(
            appointment => appointment.id !== id
        );
    }
}
const manageAppointments = new Appointments();

   function clearHTML() {
        while(appointmentsContainer.firstChild) {
            appointmentsContainer.removeChild(appointmentsContainer.firstChild);
        }
    }

    function  displayAppointments( appointments ) {
        clearHTML();

        appointments.sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
     
        appointments.forEach(appointment => {
            const { pet, owner, phone, date, time, symptoms, id } = appointment;

            const divAppointment = document.createElement('div');
            divAppointment.classList.add('cita', 'p-3');
            divAppointment.dataset.id = id;

            const petEl = document.createElement('h2');
            petEl.classList.add('card-title', 'font-weight-bolder');
            petEl.innerHTML = `${pet}`;

            const ownerEl = document.createElement('p');
            ownerEl.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${owner}`;

            const phoneEl = document.createElement('p');
            phoneEl.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${phone}`;

            const dateEl = document.createElement('p');
            dateEl.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${date}`;

            const timeEl = document.createElement('p');
            timeEl.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${time}`;

            const symptomsEl = document.createElement('p');
            symptomsEl.innerHTML = `<span class="font-weight-bolder">Sintomas: </span> ${symptoms}`;

            // Delete button
            const btnDelete = document.createElement('button');
            btnDelete.onclick = () => deleteAppointment(id);
            btnDelete.classList.add('btn', 'btn-danger', 'mr-2');
            btnDelete.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

            // Edit button
            const btnEdit = document.createElement('button');
            btnEdit.onclick = () => loadEdit(appointment);
            btnEdit.classList.add('btn', 'btn-info');
            btnEdit.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

            // Append to container
            divAppointment.appendChild(petEl);
            divAppointment.appendChild(ownerEl);
            divAppointment.appendChild(phoneEl);
            divAppointment.appendChild(dateEl);
            divAppointment.appendChild(timeEl);
            divAppointment.appendChild(symptomsEl);
            divAppointment.appendChild(btnDelete);
            divAppointment.appendChild(btnEdit);

            appointmentsContainer.appendChild(divAppointment);
        });
    }

function resetAppointmentObj() {
    appointmentObj.pet = '';
    appointmentObj.owner = '';
    appointmentObj.phone = '';
    appointmentObj.date = '';
    appointmentObj.time = '';
    appointmentObj.symptoms = '';
}

function deleteAppointment(id) {
    manageAppointments.deleteAppointment(id);
    displayAppointments(manageAppointments.appointments);
}

function loadEdit(appointment) {
    const { pet, owner, phone, date, time, symptoms, id } = appointment;

    appointmentObj.pet = pet;
    appointmentObj.owner = owner;
    appointmentObj.phone = phone;
    appointmentObj.date = date;
    appointmentObj.time = time;
    appointmentObj.symptoms = symptoms;
    appointmentObj.id = id;

    petInput.value = pet;
    ownerInput.value = owner;
    phoneInput.value = phone;
    dateInput.value = date;
    timeInput.value = time;
    symptomsInput.value = symptoms;

    form.querySelector('button[type="submit"]').textContent = 'Guardar cambios';
    editing = true;
}

function clearForm() {
    form.reset();
    resetAppointmentObj();
    showAlert('Formulario limpiado', 'success');
}

function deleteAllAppointments() {
    if (manageAppointments.appointments.length === 0) {
        showAlert('No hay citas para borrar', 'error');
        return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar todas las citas?')) {
        manageAppointments.appointments = [];
        clearHTML();
        showAlert('Todas las citas han sido eliminadas', 'success');
    }
}
