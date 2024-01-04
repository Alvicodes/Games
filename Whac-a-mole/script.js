const squares = document.querySelectorAll('.square');
const timeLeft = document.querySelector('#timeLeft');
const yourScore = document.querySelector('#score');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const difficultyButtons = document.querySelectorAll('#difficulty button');


let result = 0;
let hitPosition;
let currentTime = 1;
let timerId;
let countDownTimerId;
let gameStarted = false;
function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole', 'rise-shake');
    });

    let randomSquare = squares[Math.floor(Math.random() * squares.length)];
    randomSquare.classList.add('mole', 'rise-shake');
    hitPosition = randomSquare.id;

}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (gameStarted && square.id === hitPosition) {
            result++;
            yourScore.textContent = result;
            hitPosition = null;
        }
        else {
            result--;
            yourScore.textContent = result;
            hitPosition = null;
        }
    });
});

difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
        //Remove active classs from all buttons
        difficultyButtons.forEach(btn => btn.classList.remove('active'));
        //Add active classs to the clicked button
        button.classList.add('active');
    });
});

startBtn.addEventListener('click', () => {
    const selectedDifficulty = document.querySelector('#difficulty button.active');
    if (!selectedDifficulty) {
        alert('Please select a difficulty level before starting the game.');
        return;
    }
    const interval = parseInt(selectedDifficulty.dataset.interval, 10);
    startGame(interval);

});

resetBtn.addEventListener('click', resetGame);

function startGame(interval) {
    if (gameStarted) {
        return;
    }

    gameStarted = true;
    countDownTimerId = setInterval(countDown, 1000);
    timerId = setInterval(randomSquare, interval);
}


function resetGame() {
    gameStarted = false;
    difficultyButtons.forEach(btn => btn.classList.remove('active'));
    squares.forEach(square => square.classList.remove('lose'));
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    result = 0;
    currentTime = 60;
    yourScore.textContent = result;
    timeLeft.textContent = currentTime;
}

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        gameStarted = false;
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        squares.forEach(square => square.classList.add('lose'));
        alert('Game Over! Your score is ' + result + "" + 'Reset the game to play again!');
    }

}


