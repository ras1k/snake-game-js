
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

    // Move the snake
    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
  
        // Check if the snake ate the food
        if (head.x === food.x && head.y === food.y) {
          score += 10;
          updateScoreDisplay();
          generateFood();
        } else {
          snake.pop();
        }
      }
  
      // Draw the snake
      function drawSnake() {
        ctx.fillStyle = snakeColor;
        snake.forEach(segment => {
          ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
        });
      }
  
      // Draw the food
      function drawFood() {
        ctx.fillStyle = foodColor;
        ctx.fillRect(food.x, food.y, gridSize, gridSize);
      }
  
      // Generate random food position
      function generateFood() {
        const maxX = canvas.width - gridSize;
        const maxY = canvas.height - gridSize;
        food.x = Math.floor(Math.random() * maxX / gridSize) * gridSize;
        food.y = Math.floor(Math.random() * maxY / gridSize) * gridSize;
      }
  
      // Check collision with walls or itself
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
  
      // Game over
      function gameOver() {
        clearInterval(gameInterval);
        alert(`Game Over! Your score is ${score}`);
        gameStarted = false;
      }
  
      // Handle key presses for arrow keys
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
  
      // Update speed when the slider changes
      speedControl.addEventListener('input', function() {
        speed = parseInt(speedControl.value);
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 100 - (speed * 10));
      });
  
      // Update the score display
      function updateScoreDisplay() {
        scoreDisplay.textContent = `Score: ${score}`;
      }
  
      // Start the game
      generateFood();
      gameLoop();
  