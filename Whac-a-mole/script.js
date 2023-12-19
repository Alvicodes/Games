const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#timeLeft');
const yourScore = document.querySelector('#score');

let result = 0
let hitPosition
let currentTime = 60;
let timerId = null;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    })

    let randomSquare = squares[Math.floor(Math.random() * squares.length)];
    randomSquare.classList.add('mole');
    
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

function moveMole() {
    timerId = setInterval(randomSquare, 1000);
}

moveMole();

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('Game Over! Your score is'+ result );
    }
}

let countDownTimerId = setInterval(countDown, 1000);

// randomSquare();
