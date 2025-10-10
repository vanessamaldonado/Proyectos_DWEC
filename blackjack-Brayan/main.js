let deck = [];
let playerPoints = 0;
let dealerPoints = 0;


const suitsOfTheDeck = ['♣️', '♦️', '♥️', '♠️'];
const cardsOfTheDeck = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

const btnNew = document.querySelector('#btn-new');
const btnHit = document.querySelector('#btn-hit');
const btnStand = document.querySelector('#btn-stand');
const message = document.querySelector('#message');
const dealerCards = document.querySelector('#dealer-cards');
const playerCards = document.querySelector('#player-cards');
const dealerScore = document.querySelector('#dealer-score');
const playerScore = document.querySelector('#player-score');


function createDeck() {
  
  deck = _.flatMap(suitsOfTheDeck, suit => {
    return cardsOfTheDeck.map(value => value + suit);
  });

  deck = _.shuffle(deck);
}


function drawCard() {
  if (deck.length === 0) {
    alert('No quedan cartas en la baraja');
    return 'Baraja vacía';
  }
  return deck.pop();
}


function getCardValue(card) {
  const value = card.slice(0, -2); 
  if (['J', 'Q', 'K'].includes(value)) return 10;
  if (value === 'A') return 11; 
  return parseInt(value);
}

function showCard(card, container) {
  const div = document.createElement('div');
  div.classList.add('card');
  div.textContent = card;
  container.append(div);
}


function updateScores() {
  dealerScore.textContent = dealerPoints;
  playerScore.textContent = playerPoints;
}


function playerTurn() {
  const card = drawCard();
  playerPoints += getCardValue(card);
  showCard(card, playerCards);
  adjustForAce();
  updateScores();

  if (playerPoints > 21) {
    message.textContent = 'Te pasaste. Dealer gana 😞';
    endGame();
  } else if (playerPoints === 21) {
    message.textContent = '¡Blackjack! 🎉';
    dealerTurn();
  }
}

function adjustForAce() {
  if (playerPoints > 21) {
    const playerCardsText = Array.from(playerCards.children).map(c => c.textContent);
    const hasAce = playerCardsText.some(c => c.startsWith('A'));
    if (hasAce) playerPoints -= 10;
  }
}


function dealerTurn() {
  while (dealerPoints < 17 && dealerPoints < playerPoints && playerPoints <= 21) {
    const card = drawCard();
    dealerPoints += getCardValue(card);
    showCard(card, dealerCards);
    updateScores();
  }
  determineWinner();
}


function determineWinner() {
  if (playerPoints > 21) {
    message.textContent = 'Dealer gana 😞';
  } else if (dealerPoints > 21) {
    message.textContent = 'Jugador gana 🎉';
  } else if (playerPoints === dealerPoints) {
    message.textContent = 'Empate 🤝';
  } else if (playerPoints > dealerPoints) {
    message.textContent = 'Jugador gana 🎉';
  } else {
    message.textContent = 'Dealer gana 😞';
  }
  endGame();
}


function newGame() {
  createDeck();
  playerPoints = 0;
  dealerPoints = 0;
  playerCards.innerHTML = '';
  dealerCards.innerHTML = '';
  message.textContent = '';
  updateScores();
  btnHit.disabled = false;
  btnStand.disabled = false;
}


function endGame() {
  btnHit.disabled = true;
  btnStand.disabled = true;
}


btnNew.addEventListener('click', newGame);
btnHit.addEventListener('click', playerTurn);
btnStand.addEventListener('click', dealerTurn);


newGame();