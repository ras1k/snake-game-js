
    const canvas = document.getElementById('game-board');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('score-display');

    // Constants
    const gridSize = 20;
    const snakeColor = 'white';
    const foodColor = 'red';

    // Snake
    let snake = [
      { x: gridSize * 10, y: gridSize * 5 },
      { x: gridSize * 9, y: gridSize * 5 },
      { x: gridSize * 8, y: gridSize * 5 }
    ];
    let dx = gridSize;
    let dy = 0;

    // Food
    let food = {};

    // Score
    let score = 0;

    // Game state
    let gameStarted = false;
    let gameInterval;

    // Speed control
    const speedControl = document.getElementById('speed-slider');
    let speed = parseInt(speedControl.value);

    // Full-screen canvas
    resizeCanvas();

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);

    // Start the game when space is pressed
    document.addEventListener('keydown', function (event) {
      if (event.key === ' ' && !gameStarted) {
        startGame();
      }
    });

    // Start the game
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

    // Game loop
    function gameLoop() {
      clearCanvas();
      moveSnake();
      drawSnake();
      drawFood();
      checkCollision();
    }

    // Clear the canvas
    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

