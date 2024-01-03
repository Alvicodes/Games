const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseButton = document.querySelector('#start-pause-button');
const resetBtn = document.querySelector('#reset');
const squares = document.querySelectorAll('.grid div');
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right');
const tglCheckbox = document.getElementById("toggle");
const screenModeImg = document.querySelector('#moonImage');
const screenModeText = document.querySelector('#lightModeText');
const body = document.querySelector('body');

screenModeImg.addEventListener('click', () => {
  body.classList.toggle('darkmode');
})

console.log(squares);
let currentIndex = 76;
let timerId;
const width = 9;
let currentTime = 20;
let outcomeTimerId;
let countDownTimerId;

let interval = 1000;

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog');
    switch (e.key) {
        case 'ArrowLeft':
            if (currentIndex % width !== 0) currentIndex -= 1;
            break;
        case 'ArrowRight':
            if (currentIndex % width < width - 1) currentIndex += 1;
            break;
        case 'ArrowUp':
            if (currentIndex - width >= 0) currentIndex -= width;
            break;
        case 'ArrowDown':
            if (currentIndex + width < width * width) currentIndex += width;
            break;

    }
    squares[currentIndex].classList.add('frog');
}
document.addEventListener('keyup', moveFrog);

function autoMoveElements() {
    logsLeft.forEach(logLeft => moveLogLeft(logLeft));
    logsRight.forEach(logRight => moveLogRight(logRight));
    carLeft.forEach(carLeft => moveCarLeft(carLeft));
    carsRight.forEach(carRight => moveCarRight(carRight));
    checkOutcomes()
}
function checkOutcomes() {
    lose();
    win();
}

function moveLogLeft(logLeft) {
    switch (true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1');
            logLeft.classList.add('l2');
            break;
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2');
            logLeft.classList.add('l3');
            break;
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3');
            logLeft.classList.add('l4');
            break;
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4');
            logLeft.classList.add('l5');
            break;
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5');
            logLeft.classList.add('l1');
            break;

    }
}

function moveLogRight(logRight) {
    switch (true) {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1');
            logRight.classList.add('l5');
            break;
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2');
            logRight.classList.add('l1');
            break;
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3');
            logRight.classList.add('l2');
            break;
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4');
            logRight.classList.add('l3');
            break;
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5');
            logRight.classList.add('l4');
            break;
    }

}

function moveCarLeft(carLeft) {
    switch (true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1');
            carLeft.classList.add('c2');
            break;
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2');
            carLeft.classList.add('c3');
            break;
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3');
            carLeft.classList.add('c1');
            break;

    }
}

function moveCarRight(carRight) {
    switch (true) {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1');
            carRight.classList.add('c3');
            break;
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2');
            carRight.classList.add('c1');
            break;
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3');
            carRight.classList.add('c2');
            break;
    }
}

function lose() {
    if (squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        currentTime <= 0
    ) {
        resultDisplay.textContent = 'You lost!';
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        clearInterval(countDownTimerId);
        squares[currentIndex].classList.remove('frog');
        document.removeEventListener('keyup', moveFrog);
        startPauseButton.textContent = 'Start';
    }
}

function win() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = 'You won!';
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        clearInterval(countDownTimerId);
        squares[currentIndex].classList.add('shake');
        document.removeEventListener('keyup', moveFrog);

    }
}
function countdownTimer() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime;
}

startPauseButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        clearInterval(countDownTimerId)
        outcomeTimerId = null;
        timerId = null;
        countDownTimerId = null;
        document.removeEventListener('keyup', moveFrog);
        startPauseButton.textContent = 'Start';

    }
    else {
        countDownTimerId = setInterval(countdownTimer, 1000);
        timerId = setInterval(autoMoveElements, interval);
        outcomeTimerId = setInterval(checkOutcomes, 50);
        document.addEventListener('keyup', moveFrog);
        startPauseButton.textContent = 'Pause';
    }

})
function reset() {
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    clearInterval(countDownTimerId);
    outcomeTimerId = null;
    timerId = null;
    document.removeEventListener('keyup', moveFrog);
    startPauseButton.textContent = 'Start';
    resultDisplay.textContent = '';
    currentTime = 20;
    timeLeftDisplay.textContent = currentTime;
    squares[currentIndex].classList.remove('frog', 'shake');
    squares[currentIndex].classList.remove();
    currentIndex = 76;
    squares[currentIndex].classList.add('frog');

}
resetBtn.addEventListener('click', () => {
    reset();
}
)

//Toggle difficulty checkbox
tglCheckbox.addEventListener('change', () => {
    if (tglCheckbox.checked) {
        squares.forEach(square => {
            square.classList.add('circularPath');
            interval = 400;
            reset();

        })
    }
    else {
        squares.forEach(square => {
            square.classList.remove('circularPath');
            clearInterval(interval);
            interval = 1000;
            reset();
        })
    }
})




