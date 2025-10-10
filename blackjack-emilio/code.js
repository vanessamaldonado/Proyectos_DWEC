function startGame() {
  console.log("Holas");

  let deck = createAndMixDeck();

 console.log( drawCard(deck));
 
}



function createAndMixDeck() {
  const symbol = ["P", "C", "T", "D"];
  const value = [
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

  let deck = [];

  for (let s of symbol) {
    for (let v of value) {
      deck.push(`${v}${s}`);
    }
  }

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}


 function drawCard(deck) {
   for (let i = deck.length - 1; i > 0; i--) {
     return deck[i];
  }
 }

 function getCardValue(card){
  const valor=card.slice(0,-1);

 }

startGame();
