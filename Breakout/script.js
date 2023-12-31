const grid = document.querySelector('.grid');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
const userStart = [230, 10];
const scoreDisplay = document.querySelector('#score');
let currentUserPosition = userStart;

const ballStart = [270, 40];
let currentBallPosition = ballStart;

let timerId;
let xDirection = -2;
let yDirection = 2;
let score = 0;
// Create block 
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth + yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

//all my blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),

]


//Draw all my block
function addBlock() {

    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}
addBlock();

// add User

const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

//draw user
function drawUser() {
    user.style.left = currentUserPosition[0] + 'px';
    user.style.bottom = currentUserPosition[1] + 'px';
}

// draw ball
function drawBall() {
    ball.style.left = currentBallPosition[0] + 'px';
    ball.style.bottom = currentBallPosition[1] + 'px';
}


//move user

function moveUser(e) {
    switch (e.key) {

        case 'ArrowLeft':
            if (currentUserPosition[0] > 0) {
                currentUserPosition[0] -= 10;
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentUserPosition[0] < boardWidth - blockWidth) {
                currentUserPosition[0] += 10;
                drawUser()
            }
            break;
    }

}
document.addEventListener('keydown', moveUser);

// Add Ball

const ball = document.createElement('div');
ball.classList.add('ball');
ball.style.left = currentBallPosition[0] + 'px';
ball.style.bottom = currentBallPosition[1] + 'px';
grid.appendChild(ball);

//move ball

function moveBall() {
    currentBallPosition[0] += xDirection;
    currentBallPosition[1] += yDirection;
    drawBall();
    checkCollision();
}

timerId = setInterval(moveBall, 30);

// check collision

function checkCollision() {
    // Check for block collisions
    for (let i = 0; i < blocks.length; i++) {
        if (
            (currentBallPosition[0] > blocks[i].bottomLeft[0] && currentBallPosition[0] < blocks[i].bottomRight[0]) && ((currentBallPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && currentBallPosition[1] < blocks[i].topLeft[1] + blockHeight)
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);
            changeDirection();
            score++;
            scoreDisplay.innerHTML = score;

            // CHeck for Win
            if (blocks.length === 0) {
                clearInterval(timerId);
                scoreDisplay.innerHTML = 'You Win!'
                document.removeEventListener('keydown', moveUser);
            }
        }
    }

    // wall collisions
    if (currentBallPosition[0] >= (boardWidth - ballDiameter) || currentBallPosition[1] >= (boardHeight - ballDiameter) || currentBallPosition[0] <= 0 || currentBallPosition[1] <= 0) {
        changeDirection()
    }
    // Check for user collisions

    if ((currentBallPosition[0] > currentUserPosition[0] && currentBallPosition[0] < currentUserPosition[0] + blockWidth) && (currentBallPosition[1] > currentUserPosition[1] && currentBallPosition[1] < currentUserPosition[1] + blockHeight)) {
        changeDirection()
    }

    // Check for game over
    if (currentBallPosition[1] <= 0) {
        clearInterval(timerId);
        scoreDisplay.innerHTML = 'You lose!'
        document.removeEventListener('keydown', moveUser);
    }

}


function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2;
        return;
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return;
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2;
        return;
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2;
        return;
    }
}