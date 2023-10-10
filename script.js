
const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score-display');
const eatSound = document.getElementById('eatSound');
const dieSound = document.getElementById('dieSound');

const gridSize = 20;
const snakeColor = 'white';
const foodColor = 'red';

let snake = [
    { x: gridSize * 10, y: gridSize * 5 },
    { x: gridSize * 9, y: gridSize * 5 },
    { x: gridSize * 8, y: gridSize * 5 }
];
let dx = gridSize;
let dy = 0;

let food = {};

let score = 0;

let gameStarted = false;
let gameInterval;

const speedControl = document.getElementById('speed-slider');
let speed = parseInt(speedControl.value);

resizeCanvas();

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

document.addEventListener('keydown', function (event) {
    if (event.key === ' ' && !gameStarted) {
        startGame();
    }
});

function startGame() {
    gameStarted = true;
    snake = [
        { x: gridSize * 10, y: gridSize * 5 },
        { x: gridSize * 9, y: gridSize * 5 },
        { x: gridSize * 8, y: gridSize * 5 }
    ];
    dx = gridSize;
    dy = 0;
    score = 0;
    updateScoreDisplay();
    generateFood();
    gameInterval = setInterval(gameLoop, 100 - (speed * 10));
}

function gameLoop() {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateScoreDisplay();
        generateFood();

        eatSound.play();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function generateFood() {
    const maxX = canvas.width - gridSize;
    const maxY = canvas.height - gridSize;
    food.x = Math.floor(Math.random() * maxX / gridSize) * gridSize;
    food.y = Math.floor(Math.random() * maxY / gridSize) * gridSize;
}

function checkCollision() {
    const head = snake[0];

    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(gameInterval);

    dieSound.play();

    alert(`Game Over! Your score is ${score}`);
    gameStarted = false;
}

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    if (gameStarted) {
        switch (event.key) {
            case 'ArrowUp':
                if (dy !== gridSize) {
                    dx = 0;
                    dy = -gridSize;
                }
                break;
            case 'ArrowDown':
                if (dy !== -gridSize) {
                    dx = 0;
                    dy = gridSize;
                }
                break;
            case 'ArrowLeft':
                if (dx !== gridSize) {
                    dx = -gridSize;
                    dy = 0;
                }
                break;
            case 'ArrowRight':
                if (dx !== -gridSize) {
                    dx = gridSize;
                    dy = 0;
                }
                break;
        }
    }
}

speedControl.addEventListener('input', function () {
    speed = parseInt(speedControl.value);
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100 - (speed * 10));
});

function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
}

generateFood();
gameLoop();
