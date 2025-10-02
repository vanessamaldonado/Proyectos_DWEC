const options = ["Piedra", "Papel", "Tijera"];

const confirmGame = () => {
    if (confirm("¿Confirma que iniciará el juego?")) {
        startGame();
    } else {
        alert("Si se arrepiente, pulse el botón 'Iniciar Juego'...");
    }
};

const startGame = () => {
    const userChoice = parseInt(
        prompt(`Elige una opción entre <0-2>:
0: Piedra
1: Papel
2: Tijera`)
    );

    if (isNaN(userChoice)) {
        alert("El valor ingresado no es un número...");
        return;
    }

    if (userChoice < 0 || userChoice > 2) {
        alert("El número ingresado no corresponde a una opción válida.");
        return;
    }

    const jsChoice = getRandomNumber(0, 2);
    const result = determineWinner(jsChoice, userChoice);

    if (result === true) {
        alert("¡Felicitaciones! Acaba de ganar.");
    } else if (result === false) {
        alert("Lo sentimos, el ganador es Javascript.\nVuelva a intentar...");
    } else {
        alert("¡Empate!");
    }
};

// Devuelve un número entero aleatorio entre min y max (inclusive)
const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

// Determina el ganador: true si gana el usuario, false si gana JS, null si empate
const determineWinner = (jsChoice, userChoice) => {
    alert(`Usuario: ${options[userChoice]}    VS    Javascript: ${options[jsChoice]}`);

    if (userChoice === jsChoice) return null; // Empate

    // Reglas de Piedra, Papel, Tijera
    if (
        (options[userChoice] === "Piedra" && options[jsChoice] === "Tijera") ||
        (options[userChoice] === "Papel" && options[jsChoice] === "Piedra") ||
        (options[userChoice] === "Tijera" && options[jsChoice] === "Papel")
    ) {
        return true; // Gana el usuario
    }

    return false; // Gana Javascript
};