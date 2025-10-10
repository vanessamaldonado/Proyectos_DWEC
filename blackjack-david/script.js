// === VARIABLES DEL JUEGO ===
let deck = [];
let playerHand = [];
let dealerHand = [];
let gameOver = false;

// === GENERAR LA BARAJA ===
function createDeck() {
  const suits = ["♥️", "♦️", "♠️", "♣️"];
  const values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

  deck = _.shuffle(
    suits.flatMap((suit) => values.map((value) => ({ value, suit })))
  );
}

// Iniciar juego
function newGame() {
  createDeck();
  playerHand = [];
  dealerHand = [];
  document.querySelector(".playerHand").innerHTML = "";
  document.querySelector(".dealerHand").innerHTML = "";

  gameOver = false;

  // Reiniciamos puntuación
  document.querySelector(".pointsP").innerText = "0";
  document.querySelector(".pointsD").innerText = "0";

  // Ensenñamos la baraja
  document.querySelector(".deck").style.display = "inline-block";

  // Inicio de 2 cartas
  playerHand.push(deck.pop(), deck.pop());
  dealerHand.push(deck.pop(), deck.pop());

  renderHands();
  updateScores();
}

// Score de la mano
function getScore(hand) {
  let total = 0;
  let aces = 0;

  for (let card of hand) {
    if (card.value === "A") {
      total += 11;
      aces++;
    } else if (["J", "Q", "K"].includes(card.value)) {
      total += 10;
    } else {
      total += Number(card.value);
    }
  }

  // Ajustar Ases si total > 21
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

// Actualizar el Score
function updateScores() {
  document.querySelector(".pointsP").innerText = getScore(playerHand);
  document.querySelector(".pointsD").innerText = getScore(dealerHand);
}

// Robar
function drawCard() {
  if (gameOver || deck.length === 0) return;

  playerHand.push(deck.pop());
  renderHands();
  updateScores();

  if (getScore(playerHand) > 21) {
    endGame("¡Te pasaste de 21! Gana el dealer 😢");
  }
}

// stand up
document.querySelector(".pedir").addEventListener("click", () => {
  if (gameOver) return;

  // Dealer roba hasta llegar a 17
  while (getScore(dealerHand) < 17) {
    dealerHand.push(deck.pop());
  }

  renderHands();
  updateScores();

  // Determinar quien gana
  const playerScore = getScore(playerHand);
  const dealerScore = getScore(dealerHand);

  if (dealerScore > 21) endGame("¡El dealer se pasó! Ganaste 🎉");
  else if (dealerScore > playerScore) endGame("Gana el dealer 😔");
  else if (dealerScore < playerScore) endGame("¡Ganaste! 🎉");
  else endGame("Empate 🤝");
});

// Enseñar las cartas
function renderHands() {
  const playerDiv = document.querySelector(".playerHand");
  const dealerDiv = document.querySelector(".dealerHand");

 
  playerDiv.innerHTML = "";
  dealerDiv.innerHTML = "";

  // Crear cartas después de robar
  function createCardElement(card) {
    const div = document.createElement("div");
    div.className = "miniCard";
    div.style.color = ["♥️", "♦️"].includes(card.suit) ? "red" : "black";
    div.innerHTML = `
      <div class="corner top">${card.value}${card.suit}</div>
      <div class="suit">${card.suit}</div>
      <div class="corner bottom">${card.value}${card.suit}</div>
    `;
    return div;
  }

 
  dealerHand.forEach((card) => dealerDiv.appendChild(createCardElement(card)));
  playerHand.forEach((card) => playerDiv.appendChild(createCardElement(card)));
}

// end game
function endGame(message) {
  gameOver = true;
  renderHands();
  updateScores();
  alert(message);
}

// crear y limpiar texto
const text = document.getElementsByClassName("robar");
function texto() {
  text[0].style.display = "block";
}
function eliminar() {
  text[0].style.display = "none";
}
