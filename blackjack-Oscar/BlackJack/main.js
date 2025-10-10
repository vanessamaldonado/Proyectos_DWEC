const suits = ['♠', '♥', '♦', '♣'];
const suitValues = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
let card = "";
let shuffleDeck = [];

function generateDeck(){
    
    // Se devuelve el valor de cada carta para cada palo y se devuelve el valor
    // de la baraja mezclada shuffleDeck[]
    const deck = _.flatMap(suits, suit => {
        return suitValues.map(value => value + suit);
    })

    shuffleDeck = _.shuffle(deck);
    return shuffleDeck;
}

function drawCard(){

    if(shuffleDeck.length === 0){
        console.log("ERROR.");
        return null;
    }
    // Se devuelve el valor de la ultima carta de la barja y se disminuye su tamaño.s
    card = shuffleDeck.pop();
    return card;
}

function getCardValue(card, currentScore){
    const value = card.slice(0, -1);
    const cardValues = {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
        '7': 7, '8': 8, '9': 9, '10': 10,
        'J': 10, 'Q': 10, 'K': 10, 'A': 11
    };

    if (value === 'A' && currentScore + 11 > 21) {
        return 1;
    }

    return cardValues[value];
}

function determineWinner() {
    if (playerScore > 21 ) {
        playerScore = 0;
        dealerScore = 0;
        alert("Has perdido");
    } else if (dealerScore > 21 || playerScore > dealerScore) {
        alert("¡Has ganado!");
    } else if (playerScore === dealerScore) {
        alert("Empate");
    }else {
        alert("Has Perdido");
    }
}

function newGame() {
    deck = generateDeck();
    playerScore = 0;
    dealerScore = 0;
    updateScore('score-Player', playerScore);
    updateScore('score-Dealer', dealerScore);
    playerTurn();
    dealerTurn();
}

function playerTurn() {
    const card = drawCard();
    const value = getCardValue(card, playerScore);
    playerScore += value;
    updateScore('score-Player', playerScore);
    console.log(`Jugador recibe ${card} (valor: ${value})`);
}

function dealerTurn() {
    const card = drawCard();
    const value = getCardValue(card, dealerScore);
    dealerScore += value;
    updateScore('score-Dealer', dealerScore);
    console.log(`Dealer recibe ${card} (valor: ${value})`);
}

const newGameBtn = document.getElementById('newGameBtn');
const getCardBtn = document.getElementById('getCardBtn');
const stayBtn = document.getElementById('stayBtn');
const resultMessage = document.getElementById('resultMessage');

newGameBtn.addEventListener('click', () => {
    newGame();
    resultMessage.textContent = "Puntuación:";
});

getCardBtn.addEventListener('click', () => {
    playerTurn();

});

stayBtn.addEventListener('click', () => {
    while (dealerScore < 17) {
        dealerTurn();
    }
    determineWinner();
});

function updateScore(id, score) {
  document.getElementById(id).textContent = score;
}
