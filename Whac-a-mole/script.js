const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#timeLeft');
const yourScore = document.querySelector('#score');

let result = 0
let hitPosition;
let currentTime = 60;
let timerId;
let countDownTimerId;
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
        if (square.id === hitPosition) {
            result++;
            yourScore.textContent = result;
            hitPosition = null;
        }
        else {
            result--;
            yourScore.textContent = result;
            hitPosition = null;
        }

    })
})

const levelEasy = document.getElementById('easy');
const levelMedium = document.getElementById('medium');
const levelHard = document.getElementById('hard');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');





function moveMole() {
    
    let interval = 1000; //Default interval (easy) setting

    levelEasy.addEventListener('click', () => {
        interval = 1000;
    });
    levelMedium.addEventListener('click', () => {
        interval = 750;
    });
    levelHard.addEventListener('click', () => {
        interval = 500;
    });

    timerId = setInterval(randomSquare, interval);
    
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);

    function startGame() {
        countDownTimerId = setInterval(countDown, 1000);
        result = 0;
        yourScore.textContent = result;

    }
    function resetGame() {
        clearInterval(countDownTimerId);
        // clearInterval(timerId);
        result = 0;
        currentTime = 60;
        yourScore.textContent = result;
        timeLeft.textContent = currentTime;
    }
}
moveMole();


function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('Game Over! Your score is' + result);
    }

}


// randomSquare();

