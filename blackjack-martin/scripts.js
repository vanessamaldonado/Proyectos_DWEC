const suits = ['♠', '♥', '♦', '♣'];
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let deck = [];
let playerHand = [];
let aiHand = [];
let playerWins = 0;
let aiWins = 0;
let round = 1;
let playerTurn = false;

const playerCardsDiv = document.getElementById("playerCards");
const aiCardsDiv = document.getElementById("aiCards");
const playerPointsSpan = document.getElementById("playerPoints");
const aiPointsSpan = document.getElementById("aiPoints");
const roundSpan = document.getElementById("round");
const playerWinsSpan = document.getElementById("playerWins");
const aiWinsSpan = document.getElementById("aiWins");
const messageDiv = document.getElementById("message");

const btnAsk = document.getElementById("btnAsk");
const btnRefuse = document.getElementById("btnRefuse");
const btnStart = document.getElementById("btnStart");

function createDeck() {
    deck = [];
    for (let s of suits) {
        for (let n of numbers) {
            deck.push({ value: n, suit: s });
        }
    }
}

function shuffle() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function drawCard() {
    return deck.pop();
}

function calculatePoints(hand) {
    let total = 0;
    for (let card of hand) {
        if (['J', 'Q', 'K'].includes(card.value)) total += 10;
        else if (card.value === 'A') total += (total <= 10 ? 11 : 1);
        else total += parseInt(card.value);
    }
    return total;
}

function showCards() {
    playerCardsDiv.innerHTML = "";
    aiCardsDiv.innerHTML = "";

    playerHand.forEach(card => {
        const div = document.createElement("div");
        div.className = "card" + (['♥', '♦'].includes(card.suit) ? " red" : "");
        div.textContent = `${card.value}${card.suit}`;
        playerCardsDiv.appendChild(div);
    });

    aiHand.forEach(card => {
        const div = document.createElement("div");
        div.className = "card" + (['♥', '♦'].includes(card.suit) ? " red" : "");
        div.textContent = `${card.value}${card.suit}`;
        aiCardsDiv.appendChild(div);
    });

    playerPointsSpan.textContent = calculatePoints(playerHand);
    aiPointsSpan.textContent = calculatePoints(aiHand);
}

function newRound() {
    if (round > 5) return endGame();

    roundSpan.textContent = round;
    messageDiv.textContent = `🃏 Comienza la ronda ${round}`;

    createDeck();
    shuffle();

    playerHand = [drawCard(), drawCard()];
    aiHand = [drawCard(), drawCard()];
    playerTurn = true;

    btnAsk.disabled = false;
    btnRefuse.disabled = false;
    btnStart.disabled = true;

    showCards();
}

function endRoundPlayer() {
    playerTurn = false;
    btnAsk.disabled = true;
    btnRefuse.disabled = true;
    roundIA();
}

function roundIA() {
    let aiPoints = calculatePoints(aiHand);

    const interval = setInterval(() => {
        aiPoints = calculatePoints(aiHand);
        if (aiPoints < 17) {
            aiHand.push(drawCard());
            showCards();
        } else {
            clearInterval(interval);
            setTimeout(() => whoWin(), 500);
        }
    }, 800);
}

function whoWin() {
    const playerPoints = calculatePoints(playerHand);
    const aiPoints = calculatePoints(aiHand);
    let result = "";

    if (playerPoints > 21 && aiPoints > 21) result = "🤝 Empate (ambos se pasaron)";
    else if (playerPoints > 21) { result = "💀 Te pasaste, gana la IA"; }
    else if (aiPoints > 21) { result = "🎉 La IA se pasó, ¡ganas tú!";} 
    else if (playerPoints > aiPoints) { result = "🏆 ¡Ganas esta ronda!"; playerWins++; }
    else if (playerPoints < aiPoints) { result = "🤖 Gana la IA"; aiWins++; }
    else result = "🤝 Empate";

    messageDiv.textContent = result;
    playerWinsSpan.textContent = playerWins;
    aiWinsSpan.textContent = aiWins;

    round++;
    setTimeout(() => {
        if (round <= 5) newRound();
        else endGame();
    }, 1500);
}

function endGame() {
    let finalMsg = "";
    if (playerWins > aiWins) finalMsg = "🏆 ¡Ganaste el juego!";
    else if (playerWins < aiWins) finalMsg = "🤖 Gana la IA.";
    else finalMsg = "🤝 Empate final";

    messageDiv.textContent = `🎯 Fin del juego: ${finalMsg}`;
    btnAsk.disabled = true;
    btnRefuse.disabled = true;
    btnStart.disabled = false;
}

btnAsk.addEventListener("click", () => {
    if (!playerTurn) return;
    playerHand.push(drawCard());
    showCards();
    if (calculatePoints(playerHand) > 21) {
        messageDiv.textContent = "💀 Te pasaste, gana la IA";
        aiWins++;
        playerWinsSpan.textContent = playerWins;
        aiWinsSpan.textContent = aiWins;
        endRoundPlayer();
    }
});

btnRefuse.addEventListener("click", endRoundPlayer);

btnStart.addEventListener("click", () => {
    playerWins = 0;
    aiWins = 0;
    round = 1;
    playerWinsSpan.textContent = playerWins;
    aiWinsSpan.textContent = aiWins;
    newRound();
});