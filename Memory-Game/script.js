const cardArray = [
    {
        name: 'burger',
        img: 'images/burgers.png',
    },
    {
        name: 'cup-cake',
        img: 'images/cup-cake.png',
    },
    {
        name: 'donut',
        img: 'images/donut.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },
    {
        name: 'egg',
        img: 'images/egg.png',
    },
    {
        name: 'cake',
        img: 'images/cake.png',
    },
    {
        name: 'burger',
        img: 'images/burgers.png',
    },
    {
        name: 'cup-cake',
        img: 'images/cup-cake.png',
    },
    {
        name: 'donut',
        img: 'images/donut.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },
    {
        name: 'egg',
        img: 'images/egg.png',
    },
    {
        name: 'cake',
        img: 'images/cake.png',
    }
]

cardArray.sort(() => 0.5 - Math.random()); //makes the array random select

const gridDisplay = document.querySelector('#grid');
let cardChosen = [];
let cardsChosedIds = [];
const cardsWon = [];
const resultDisplay = document.querySelector('#result');

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/pattern.jpg');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gridDisplay.append(card);
    }
}
createBoard();
function checkMatch() {
    const cards = document.querySelectorAll('#grid img');
    const optionOneID = cardsChosedIds[0];
    const optionTwoID = cardsChosedIds[1];
    console.log(cards);
    console.log('Check for match');
    // if (optionOneID == optionTwoID) {
    //     cards[optionOneID].setAttribute('src', 'images/pattern.jpg');
    //     cards[optionTwoID].setAttribute('src', 'images/pattern.jpg');
    //     alert('You have clicked the same image!');
    // }

    if (cardChosen[0] == cardChosen[1]) {
        alert('Well Done!');
        cards[optionOneID].setAttribute('src', 'images/white-background.jpg');
        cards[optionTwoID].setAttribute('src', 'images/white-background.jpg');
        cards[optionOneID].removeEventListener('click', flipCard);
        cards[optionTwoID].removeEventListener('click', flipCard);
        cardsWon.push(cardChosen);
    }
    else {
        cards[optionOneID].setAttribute('src', 'images/pattern.jpg');
        cards[optionTwoID].setAttribute('src', 'images/pattern.jpg');
        alert('Try again!');

    }
    resultDisplay.textContent = cardsWon.length;
    cardChosen = []
    cardsChosedIds = []

    if (cardsWon.length == cardArray.length / 2) {
        resultDisplay.textContent = 'Congratulations you found them all';

    }
}
function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardChosen.push(cardArray[cardId].name);
    cardsChosedIds.push(cardId);
    console.log(cardChosen);
    console.log(cardsChosedIds);

    this.setAttribute('src', cardArray[cardId].img);
    if (cardChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

