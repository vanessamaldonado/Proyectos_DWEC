// Variables and Selectors
const form = document.getElementById('agregar-gasto');
const expenseList = document.querySelector('#gastos ul');

// Events
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', askBudget);
    form.addEventListener('submit', addExpense);
    expenseList.addEventListener('click', deleteExpense);
}

/***************************COMPLETAR************************* */
// Classes  
class Budget {
    constructor(budget) {
       
    }

    newExpense(expense) {
       
    }

    removeExpense(id) {
       
    }

    calculateRemaining() {
      
    }
}

class UI {
    insertBudget(budgetObj) {
        document.querySelector('#total').textContent = budgetObj.budget;
        document.querySelector('#restante').textContent = budgetObj.remaining;
    }

    showAlert(message, type) {
         /****************************SOLVENTAR Multiples mensajes de alertas************************* */

        const divMessage = document.createElement('div');
        divMessage.classList.add('text-center', 'alert');

        if (type === 'error') {
            divMessage.classList.add('alert-danger');
        } else {
            divMessage.classList.add('alert-success');
        }

        divMessage.textContent = message;

        document.querySelector('.primario').insertBefore(divMessage, form);

        setTimeout(() => {
            const alert = document.querySelector('.primario .alert');
            if (alert) alert.remove();
        }, 3000);
    }

    // Display expenses in the list
    addExpenseToList(expenses) {
        this.clearHTML();

        expenses.forEach(expense => {
            const { name, amount, id } = expense;

            const newExpense = document.createElement('li');
            newExpense.className = 'list-group-item d-flex justify-content-between align-items-center';
            newExpense.dataset.id = id;

            // Display with euro symbol
            newExpense.innerHTML = `
                ${name}
                <span class="badge badge-primary badge-pill"> ${amount} €</span>
            `;

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn', 'btn-danger', 'delete-expense');
            deleteBtn.textContent = 'Delete';
            newExpense.appendChild(deleteBtn);

            expenseList.appendChild(newExpense);
        });
    }

    updateRemaining(remaining) {
        document.querySelector('span#restante').textContent = remaining;
    }

    // Change color based on remaining budget
    checkBudget(budgetObj) {
        const { budget, remaining } = budgetObj;
        const remainingDiv = document.querySelector('.restante');

        if ((budget / 4) > remaining) {
            remainingDiv.classList.remove('alert-success', 'alert-warning');
            remainingDiv.classList.add('alert-danger');
        } else if ((budget / 2) > remaining) {
            remainingDiv.classList.remove('alert-success');
            remainingDiv.classList.add('alert-warning');
        } else {
            remainingDiv.classList.remove('alert-danger', 'alert-warning');
            remainingDiv.classList.add('alert-success');
        }

        if (remaining <= 0) {
            ui.showAlert('El presupuesto se ha agotado', 'error');
            form.querySelector('button[type="submit"]').disabled = true;
        }
    }

    clearHTML() {
        while (expenseList.firstChild) {
            expenseList.removeChild(expenseList.firstChild);
        }
    }
}

const ui = new UI();
let budget;

// Ask for user budget
function askBudget() {
    const userBudget = prompt('¿Cual es tu presupuesto?');

    if (userBudget === '' || userBudget === null || isNaN(userBudget) || userBudget <= 0) {
        window.location.reload();
    }

    /*************************************SOLVENTAR limitar el presupueto a introducir************** */
    budget = new Budget(userBudget);
    ui.insertBudget(budget);
}

// Add expense
function addExpense(e) {
    e.preventDefault();

    const name = document.querySelector('#gasto').value;
    const amount = Number(document.querySelector('#cantidad').value);

    if (name === '' || amount === '') {
        ui.showAlert('Ambos campos son obligatorios', 'error');
    } else if (amount <= 0 || isNaN(amount)) {
        ui.showAlert('Cantidad no válida', 'error');
    } else {
        const expense = { name, amount, id: Date.now() };

        budget.newExpense(expense);
        ui.showAlert('Gasto agregado correctamente', 'success');

        const { expenses } = budget;
        ui.addExpenseToList(expenses);

        ui.checkBudget(budget);

        const { remaining } = budget;
        ui.updateRemaining(remaining);

        form.reset();
    }
}

// Delete expense
function deleteExpense(e) {
    if (e.target.classList.contains('delete-expense')) {
        const { id } = e.target.parentElement.dataset;
        budget.removeExpense(id);

        ui.checkBudget(budget);

        const { remaining } = budget;
        ui.updateRemaining(remaining);

        e.target.parentElement.remove();
    }
}
