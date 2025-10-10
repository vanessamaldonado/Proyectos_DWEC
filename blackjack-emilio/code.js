
// =====================
// VARIABLES GLOBALES
// =====================
let deck = []; // Baraja actual
let playerHand = []; // Cartas del jugador
let dealerHand = []; // Cartas del dealer

// =====================
// EVENTO AL CARGAR
// =====================

//Eventos de los botones
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".startGame").addEventListener("click", startGame);
  document.querySelector(".hit").addEventListener("click", hit);
  document.querySelector(".stand").addEventListener("click", stand);
  clearTable();
});

// =====================
// FUNCIONES PRINCIPALES
// =====================

function startGame() {
  console.clear();
  console.log("🃏 ¡Empieza la partida!");

  // Reiniciar estado
  deck = createAndMixDeck();
  playerHand = [drawCard(deck), drawCard(deck)];
  dealerHand = [drawCard(deck), drawCard(deck)];

  console.log("Jugador:", playerHand);
  console.log("Dealer:", dealerHand);

  // Calcular valores
  const playerValue = calculateValueAce(playerHand);
  const dealerValue = calculateValueAce(dealerHand);

  // Mostrar en pantalla
  displayHands(playerHand, dealerHand);
  displayValues(playerValue, dealerValue);

  console.log("Jugador =>", playerValue);
  console.log("Dealer  =>", dealerValue);
   setButtonsEnabled(true);
}

// =====================
// FUNCIONES DE JUEGO
// =====================

function createAndMixDeck() {
  const suits = ["♠", "♥", "♣", "♦"]; // símbolos reales
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const newDeck = [];

  for (let s of suits) {
    for (let v of values) {
      newDeck.push(`${v}${s}`); // ej: "A♠", "10♥"
    }
  }

  // Barajar (Fisher–Yates)
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

//Funcion que reparte la carta y la quita del mazo
function drawCard(deck) {
  return deck.pop(); // Saca y elimina una carta del mazo
}

//Funcion que le da un valor numerico a las cartas
function getCardValue(card) {
  const valor = card.slice(0, -1);
  if (["J", "Q", "K"].includes(valor)) return 10;
  if (valor === "A") return 11;
  return parseInt(valor);
}

//Funcion que calcula el valor del AS
function calculateValueAce(hand) {
  let value = 0;
  let aces = 0;

  for (let card of hand) {
    const cardValue = getCardValue(card);
    if (cardValue === 11) aces++;
    value += cardValue;
  }

  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }

  return value;
}

//Funcion que hace que el boton de pedir carta funcione
function hit() {
  if (deck.length === 0) {
    console.warn("No quedan cartas en el mazo");
    return;
  }

  // Robar una carta y añadirla a la mano del jugador
  const newCard = drawCard(deck);
  playerHand.push(newCard);

  // Mostrar visualmente solo esa carta nueva
  const playerDiv = document.getElementById("playerCards");
  const cardEl = document.createElement("div");
  cardEl.classList.add("card");
  cardEl.textContent = newCard;
  playerDiv.appendChild(cardEl);

  // Calcular nuevo valor del jugador
  const playerValue = calculateValueAce(playerHand);
  document.getElementById("playerValue").textContent = `Puntos: ${playerValue}`;

  console.log(`Jugador pidió: ${newCard} -> total ${playerValue}`);

  //  Si se pasa de 21
  if (playerValue > 21) {
    setTimeout(() => {
      alert(`Te pasaste de 21 . ¡Has perdido!`);
      clearTable(); // limpiar la mesa después del alert
      playerHand = [];
      dealerHand = [];
    }, 150); // pequeño retardo (150 ms) para que se renderice la carta
  }
}


//Funcion que hace que funcione el boton de stand
function stand() {
  if (playerHand.length === 0 || dealerHand.length === 0) return; // No hay partida activa

  setButtonsEnabled(false); // Desactivar botones durante el turno del dealer
  playDealer(); // Iniciar turno automático del dealer
}


//Funcion que hace que dealer robe hasta 17
function playDealer() {
  let dealerValue = calculateValueAce(dealerHand);

  if (dealerValue < 17) {
    setTimeout(() => {
      dealerValue = drawForDealer(); 
      playDealer(); 
    }, 600);
  } else {


  
    setTimeout(() => {
      const playerValue = calculateValueAce(playerHand);
      const result = decideWin(playerValue, dealerValue);

      alert(result); 
      clearTable(); 
      
      
      playerHand = [];
      dealerHand = [];
    }, 800);
  }
}


 //Roba una carta del mazo para el dealer, la muestra en la mesa y devuelve su nuevo valor total.

function drawForDealer() {
  const dealerDiv = document.getElementById("dealerCards");

  // Robar carta del mazo y añadirla a la mano del dealer
  const newCard = drawCard(deck);
  dealerHand.push(newCard);

  // Crear y mostrar la carta visualmente
  const cardEl = document.createElement("div");
  cardEl.classList.add("card");
  cardEl.textContent = newCard;
  dealerDiv.appendChild(cardEl);

  // Recalcular y actualizar valores
  const playerValue = calculateValueAce(playerHand);
  const dealerValue = calculateValueAce(dealerHand);
  displayValues(playerValue, dealerValue);

  return dealerValue;
}

//Funcion que decide quien gana
function decideWin(playerValue, dealerValue) {
  if (dealerValue > 21) {
    return ` ¡Ganas! El dealer se pasó (${dealerValue}).`;
  } else if (playerValue > dealerValue) {
    return ` ¡Ganas! ${playerValue} vs ${dealerValue}.`;
  } else if (playerValue === dealerValue) {
    return ` Empate: ${playerValue} a ${dealerValue}.`;
  } else {
    return ` Pierdes. ${playerValue} vs ${dealerValue}.`;
  }
}


//Funcion que desactiva los botones
function setButtonsEnabled(enabled) {
  document.querySelector(".hit").disabled = !enabled;
  document.querySelector(".stand").disabled = !enabled;
}


// =====================
// FUNCIONES VISUALES
// =====================

function displayHands(playerHand, dealerHand) {
  const dealerDiv = document.getElementById("dealerCards");
  const playerDiv = document.getElementById("playerCards");

  dealerDiv.innerHTML = "";
  playerDiv.innerHTML = "";

  dealerHand.forEach((card) => {
    const el = document.createElement("div");
    el.classList.add("card");
    el.textContent = card;
    dealerDiv.appendChild(el);
  });

  playerHand.forEach((card) => {
    const el = document.createElement("div");
    el.classList.add("card");
    el.textContent = card;
    playerDiv.appendChild(el);
  });
}

function displayValues(playerValue, dealerValue) {
  document.getElementById("playerValue").textContent = `Puntos: ${playerValue}`;
  document.getElementById("dealerValue").textContent = `Puntos: ${dealerValue}`;
}

function clearTable() {
  document.getElementById("dealerCards").innerHTML = "";
  document.getElementById("playerCards").innerHTML = "";
  document.getElementById("dealerValue").textContent = "";
  document.getElementById("playerValue").textContent = "";
}
