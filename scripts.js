let cards = [
    {name: "ace",   type: "spade", value: 0,    picture: "slike/1.png"},
    {name: "two",   type: "spade", value: 2,    picture: "slike/2.png"},
    {name: "three", type: "spade", value: 3,    picture: "slike/3.png"},
    {name: "four",  type: "spade", value: 4,    picture: "slike/4.png"},
    {name: "five",  type: "spade", value: 5,    picture: "slike/5.png"},
    {name: "six",   type: "spade", value: 6,    picture: "slike/6.png"},
    {name: "seven", type: "spade", value: 7,    picture: "slike/7.png"},
    {name: "eight", type: "spade", value: 8,    picture: "slike/8.png"},
    {name: "nine",  type: "spade", value: 9,    picture: "slike/9.png"},
    {name: "ten",   type: "spade", value: 10,   picture: "slike/10.png"},
    {name: "jack",  type: "spade", value: 10,   picture: "slike/0.png"},
    {name: "king",  type: "spade", value: 10,   picture: "slike/11.png"},
    {name: "queen", type: "spade", value: 10,   picture: "slike/12.png"}
];

function generateCard() {
    const random = Math.floor(Math.random() * (cards.length - 1));
    return random;
};

const dealerCardsArray = [cards[generateCard()], cards[generateCard()]];
const playerCardsArray = [cards[generateCard()], cards[generateCard()]];

let dealerSum = 0;
let playerSum = 0;

const dealerCard1 = document.getElementById("dealerCard1");
const dealerCard2 = document.getElementById("dealerCard2");
const playerCard1 = document.getElementById("playerCard1");
const playerCard2 = document.getElementById("playerCard2");

document.getElementById("start").addEventListener("click", startGame);

function startGame() {
    document.querySelector("h1").classList.remove("hideElement");
    document.querySelector("h2").classList.remove("hideElement");
    document.querySelector("#stay").classList.remove("hideElement");
    document.querySelector("#next").classList.remove("hideElement");
    dealerCard1.classList.remove("hideElement");
    dealerCard2.classList.remove("hideElement");
    playerCard1.classList.remove("hideElement");
    playerCard2.classList.remove("hideElement");    
    document.getElementById("start").remove();
}

function game() {

    dealerCard1.src = dealerCardsArray[0].picture;
    dealerCard2.src = dealerCardsArray[1].picture;
    playerCard1.src = playerCardsArray[0].picture;
    playerCard2.src = playerCardsArray[1].picture;
    dealerCard2.classList.add("hiddenCard");

    if(dealerCardsArray[0].name == "Jack") dealerFirstJack();
    if(dealerCardsArray[1].name == "Jack") dealerSecondJack();
    
    calculateSum();
    createStayButton();
    createNextButton();
}

game();

function createStayButton() {
    const stayBtn = document.createElement("button");
    stayBtn.innerHTML = "Stay"
    document.getElementById("stay").appendChild(stayBtn);
    stayBtn.setAttribute("id", "stay");
    document.getElementById("stay").addEventListener("click", stay);
}

function createNextButton() {
    const nextCard = document.createElement("button");
    nextCard.innerHTML = "Next card"
    document.getElementById("next").appendChild(nextCard);
    nextCard.setAttribute("id", "nextCard");
    document.getElementById("nextCard").addEventListener("click", next);
}

function stay() {
    checkAce();
    calculateSum();
    dealerCard2.classList.remove("hiddenCard");
    
    if (playerSum < dealerSum || playerSum > 21) {
        lose();
    }
    else if (playerSum > dealerSum){
        win();
    }
}

function next() {
    playerCardsArray.push(cards[generateCard()]);
    const newCard = document.createElement("img");
    newCard.src = playerCardsArray[playerCardsArray.length - 1].picture;
    document.getElementById("player").appendChild(newCard);
}

function calculateSum() {
    dealerSum = 0;
    playerSum = 0;

    for(let i = 0; i < dealerCardsArray.length; i++){
        dealerSum += dealerCardsArray[i].value;
    }
    for(let i = 0; i < playerCardsArray.length; i++){
        playerSum += playerCardsArray[i].value;
    }
}

function checkAce() {
    for(let i = 0; i < playerCardsArray.length; i++){
        if(playerCardsArray[i].name == "ace") {
            let ace = window.prompt("What value shoud the Jack have?  (1 or 11)", "");

            while(Number(ace) !== 1 && Number(ace) !== 11) {
                ace = window.prompt("What value shoud the Jack have?  (1 or 11)", "");
            }
            playerCardsArray[i].value = Number(ace);
        }

    }
}

function dealerFirstJack() {
    if(dealerCardsArray[1].value <= 10) dealerCardsArray[0].value = 11;
}

function dealerSecondJack() {
    if(dealerCardsArray[0].value <= 10) dealerCardsArray[1].value = 11;
}

function win() {
    window.alert("You win!");
}

function lose() {
    window.alert("You lose.");
}