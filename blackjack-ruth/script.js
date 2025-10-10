
let gameOver = false;
let firstAceUsed = false;
let playerTotalPoints = 0;
let dealerTotalPoints = 0;
let deck = [];
let playerCards = [];
let dealerCards = [];
let playerCard = "";
let dealerCard = "";

 const playerImageUI= document.querySelector("#playerImage p");
 const dealerImageUI= document.querySelector("#dealerImage p");

 const playerPointsUI= document.getElementById("playerPoints");
 const dealerPointsUI= document.getElementById("dealerPoints");
 const info = document.querySelector("#information p");
 const winnerUI=document.querySelector("#winner p");
 const drawCardBtn = document.getElementById("drawCard");
 const newGameBtn=document.getElementById("newGame");
 const toStandBtn=document.getElementById("toStand");

/*Se crea una nueva baraja*/ 

function newDeck() {

  const suits = ["♠", "♥", "♦", "♣"];

  const values = [
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
    "A",
  ];

  gameOver = false;
  deck = [];

  playerTotalPoints = 0;
  dealerTotalPoints = 0;

  for (let suit of suits) {
    for (let value of values) {
      deck.push(suit + value);
    }
  }

  deck = _.shuffle(deck);
}

newDeck();


/*Función que sirve para robar una carta*/

function drawCard() {

  if (deck.length === 0) {
    console.log("Error!! Sin cartas!");
    info.innerText = "No quedan más cartas! ";
    return;
  }

  return deck.pop();

}

/* Reparte las dos cartas iniciales al jugador y al dealer y muestra la información en pantalla. 
Además severifica si se gana inmediatamente. */

function initialDeal() {

  if (gameOver) return;

  playerTotalPoints = 0;
  dealerTotalPoints = 0;

  // Se roban dos cartas
  for (let i = 0; i < 2; i++) {
    playerCard = drawCard();
    dealerCard = drawCard();

    playerTotalPoints += getCardValue(playerCard);
    dealerTotalPoints += getCardValue(dealerCard);

    playerCards.push(playerCard);
    dealerCards.push(dealerCard);

  }

info.innerText =
  "Dos cartas iniciales del jugador: " + playerCards[0] + ", " + playerCards[1] +
  "\nDos cartas iniciales del dealer: " + dealerCards[0] + ", " + dealerCards[1];

  playerImageUI.innerText= playerCards[1];
  dealerImageUI.innerText= dealerCards[1];

  playerPointsUI.innerText =
    "Jugador: " + playerTotalPoints + " puntos.";
  dealerPointsUI.innerText =
    "Dealer: " + dealerTotalPoints + " puntos.";
  
   // Revisar BlackJack inmediato
  if (playerTotalPoints === 21 || dealerTotalPoints === 21) {
    gameOver = true;
    determineWinner();
  }
}

/*Turno del jugador*/

function playerTurn() {
  if (gameOver) return;

  playerCard = drawCard();
  playerCards.push(playerCard);

  playerTotalPoints = playerTotalPoints + getCardValue(playerCard);


  updateUI();

  /*Funcionalidad */

  if (playerTotalPoints >=21) {
    determineWinner();
    gameOver = true;
  }

  if (gameOver) {
    updateButtons(true);
  }
}

drawCardBtn.addEventListener("click", playerTurn);

/*Función que devuelve el valor de las cartas*/

function getCardValue(card) {

  const cardValue = card.slice(1); //Trabajamos sin los palos

  // El primer As del juego es 11, después devolverá 1
  if (cardValue == "A") {
    if (!firstAceUsed) {
      firstAceUsed = true;
      return 11;
    } else {
      return 1;
    }
  } else if (["J", "Q", "K"].includes(cardValue)) {
    return 10;
  }
  return parseInt(cardValue);
}

/*Determinamos quién gana*/

function determineWinner() {

  switch (true) {
    case (playerTotalPoints > 21):
      winnerUI.innerText = "Ha ganado el dealer.";
      break;

    case (dealerTotalPoints > 21):
      winnerUI.innerText = "Has ganado!!!";
      break;

    case (playerTotalPoints === 21 && dealerTotalPoints !== 21):
      winnerUI.innerText = "BlackJack! Ganaste.";
      break;

    case (dealerTotalPoints === 21 && playerTotalPoints !== 21):
      winnerUI.innerText = "BlackJack! Gana el dealer.";
      break;

    case (playerTotalPoints > dealerTotalPoints):
      winnerUI.innerText = "Has ganado!";
      break;

    case (playerTotalPoints < dealerTotalPoints):
      winnerUI.innerText = "Ha ganado el dealer.";
      break;

    default:
     winnerUI.innerText = "Empate";
  }
}

/*Activar y desactivar botones*/

function updateButtons(value) {
  drawCardBtn.disabled = value;
  toStandBtn.disabled = value;
}

/*Cuando te plantas, interviene el dealer*/

function stand() {
  if (gameOver) return;

  while (dealerTotalPoints < 17) {
    dealerCard = drawCard();
    dealerCards.push(dealerCard);
    
    dealerTotalPoints = dealerTotalPoints + getCardValue(dealerCard);
    updateUI();
  }

  gameOver = true;

  if (gameOver) {
    updateButtons(true);
  }

  determineWinner();
}

toStandBtn.addEventListener("click", stand);

/*Actualizamos la interfaz*/

function updateUI() {

  // Mostramos los puntos
  playerPointsUI.innerText =
    "Jugador: " + playerTotalPoints + " puntos.";
  dealerPointsUI.innerText =
    "Dealer: " + dealerTotalPoints + " puntos.";

  //Mostramos solo la última carta robada
  const ultimaCartaJugador = playerCards[playerCards.length - 1];
  const ultimaCartaDealer = dealerCards[dealerCards.length - 1];

 playerImageUI.innerText = ultimaCartaJugador;
 dealerImageUI.innerText = ultimaCartaDealer;

  // Mostramos la información
  info.innerText =
    "Última carta del jugador: " + ultimaCartaJugador +
    "\nÚltima carta del dealer: " + ultimaCartaDealer;

    
}

/*Iniciamos nuevo juego y reiniciamos las variables, crea un mazo nuevo y reparte las cartas iniciales*/

function newGame() {
  playerCards = [];
  dealerCards = [];
  firstAceUsed = false;
  winnerUI.innerText = "";
  info.innerText = "";
  playerImageUI.innerText = "";
  dealerImageUI.innerText = "";
  playerPointsUI.innerText = "";
  dealerPointsUI.innerText = "";

  newDeck();
  initialDeal();
  updateButtons(false);

  if (playerTotalPoints === 21 || dealerTotalPoints === 21) {
    gameOver = true;
    updateButtons(true);
    determineWinner();

    info.innerText = "¡Blackjack inicial!";
  }
}

newGameBtn.addEventListener("click", newGame);






