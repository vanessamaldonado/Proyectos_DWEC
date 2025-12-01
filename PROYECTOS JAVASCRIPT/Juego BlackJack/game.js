// ==========================
// VARIABLES GLOBALES
// ==========================

let deck = [];          // Baraja de 52 cartas
let playerHand = [];    // Mano del jugador
let dealerHand = [];    // Mano del dealer (banca)
let gameOver = false;   // Controla si la partida ha terminado

// ==========================
// ELEMENTOS DEL DOM
// ==========================
const playerCards = document.getElementById('cartas-jugador');
const dealerCards = document.getElementById('cartas-dealer');
const playerPoints = document.getElementById('puntos-jugador');
const dealerPoints = document.getElementById('puntos-dealer');
const message = document.getElementById('mensaje');

const btnNewGame = document.getElementById('nuevo');
const btnHit = document.getElementById('pedir');
const btnStand = document.getElementById('plantarse');

// ==========================
// FUNCIONES PRINCIPALES
// ==========================

// Crea la baraja de 52 cartas y la mezcla
function createDeck() {
  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  deck = [];

  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }

  // Barajar con Lodash
  deck = _.shuffle(deck);
}

// Roba una carta del mazo
function drawCard() {
  if (deck.length === 0) {
    console.error('No quedan cartas en la baraja.');
    message.textContent = 'No quedan cartas en la baraja. Reinicia el juego.';
    gameOver = true;
    return null;
  }
  return deck.pop();
}

// Devuelve el valor numérico de una carta
function getCardValue(card) {
  if (['J', 'Q', 'K'].includes(card.value)) return 10;
  if (card.value === 'A') return 11;
  return parseInt(card.value);
}

// Calcula el total de puntos de una mano
function calculatePoints(hand) {
  let total = 0;
  let aces = 0;

  for (let card of hand) {
    total += getCardValue(card);
    if (card.value === 'A') aces++;
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

// Muestra las cartas y actualiza los puntos en pantalla
function displayHands() {
  playerCards.innerHTML = playerHand.map(c => `<div>${c.value}${c.suit}</div>`).join('');
  dealerCards.innerHTML = dealerHand.map(c => `<div>${c.value}${c.suit}</div>`).join('');

  playerPoints.textContent = calculatePoints(playerHand);
  dealerPoints.textContent = calculatePoints(dealerHand);
}

// El jugador pide una carta
function hitCard() {
  if (gameOver) return;

  playerHand.push(drawCard());
  displayHands();

  const points = calculatePoints(playerHand);
  if (points > 21) {
    message.textContent = 'Te pasaste de 21. Pierdes.';
    gameOver = true;
  }
}

// El jugador se planta, juega el dealer
function stand() {
  if (gameOver) return;

  while (calculatePoints(dealerHand) < 17) {
    dealerHand.push(drawCard());
  }

  const playerScore = calculatePoints(playerHand);
  const dealerScore = calculatePoints(dealerHand);

  displayHands();

  if (dealerScore > 21 || playerScore > dealerScore) {
    message.textContent = '¡Has ganado!';
  } else if (playerScore === dealerScore) {
    message.textContent = 'Empate.';
  } else {
    message.textContent = 'Gana el dealer.';
  }

  gameOver = true;
}

// Inicia un nuevo juego
function newGame() {
  createDeck();
  playerHand = [drawCard(), drawCard()];
  dealerHand = [drawCard(), drawCard()];
  gameOver = false;
  message.textContent = '';

  displayHands();
}

// ==========================
// EVENTOS DE LOS BOTONES
// ==========================
btnNewGame.addEventListener('click', newGame);
btnHit.addEventListener('click', hitCard);
btnStand.addEventListener('click', stand);

// ==========================
// INICIO AUTOMÁTICO
// ==========================
newGame();
