const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('results-choice');
const possibleChoises = document.querySelectorAll('button');
let userChoice;
let computerChoice;
let result;
possibleChoises.forEach(possibleChoise => possibleChoise.addEventListener('click', (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice();
    getResult();
}));

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3) // or you can use possibleChoises.length

    if (randomNumber === 0) {
        computerChoice = 'rock';
    }
    else if (randomNumber === 1) {
        computerChoice = 'paper';
    }
    else {
        computerChoice = 'scissors';
    }

    computerChoiceDisplay.innerHTML = computerChoice;
}

function getResult() {
    if (userChoice === computerChoice) {
        result = 'Tie';
    }
    else if (userChoice === 'rock' && computerChoice === 'paper') {
        result = 'You Lose';
    }
    else if (userChoice === 'rock' && computerChoice === 'scissors') {
        result = 'You Win';
    }
    else if (userChoice === 'paper' && computerChoice === 'rock') {
        result = 'You Win';
    }
    else if (userChoice === 'paper' && computerChoice === 'scissors') {
        result = 'You Lose';
    }
    else if (userChoice === 'scissors' && computerChoice === 'rock') {
        result = 'You Lose';
    }
    else {
        result = 'You Win';
    }

    resultDisplay.innerHTML = result;
}


/* const computerChoice = Math.floor(Math.random() * 3);
computerChoiceDisplay.innerHTML = computerChoice;
if (userChoice === computerChoice) {
    resultDisplay.innerHTML = 'Tie';
} else if (userChoice === 'rock' && computerChoice ==='scissors') {
    resultDisplay.innerHTML = 'You Win';
} else if (userChoice === 'paper' && computerChoice === 'rock') {
    resultDisplay.innerHTML = 'You Win';
} else if (userChoice ==='scissors' && computerChoice === 'paper') {
    resultDisplay.innerHTML = 'You Win';
} else {
    resultDisplay.innerHTML = 'You Lose';
} */
