const snakeImg = new Image();
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    const scoreText = document.getElementById("score");
    const restartBtn = document.getElementById("restart");

    const box = 20;
    let snake = [{ x: 200, y: 200 }];
    let direction = "RIGHT";
    let food = spawnFood();
    let score = 0;
    let speed = 150;
    let interval;

    function spawnFood() {
      return {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box,
      };
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
      else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
      else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
      else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw snake
      snake.forEach((part, i) => {
        ctx.fillStyle = i === 0 ? "#0f0" : "#5f5";
        ctx.fillRect(part.x, part.y, box, box);
      });

      // Draw food
      ctx.fillStyle = "red";
      ctx.fillRect(food.x, food.y, box, box);

      // Move
      const head = { ...snake[0] };
      if (direction === "UP") head.y -= box;
      if (direction === "DOWN") head.y += box;
      if (direction === "LEFT") head.x -= box;
      if (direction === "RIGHT") head.x += box;

      // Check game over
      if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.some((part) => part.x === head.x && part.y === head.y)
      ) {
        clearInterval(interval);
        scoreText.innerText = `Game Over! Final Score: ${score}`;
        restartBtn.style.display = "inline-block";
        return;
      }

      snake.unshift(head);

      // Eat food
      if (head.x === food.x && head.y === food.y) {
        score++;
        scoreText.innerText = `Score: ${score}`;
        food = spawnFood();
        // Increase speed every 5 points
        if (score % 5 === 0 && speed > 50) {
          clearInterval(interval);
          speed -= 10;
          interval = setInterval(draw, speed);
        }
      } else {
        snake.pop();
      }
    }

    function startGame() {
      snake = [{ x: 200, y: 200 }];
      direction = "RIGHT";
      food = spawnFood();
      score = 0;
      speed = 150;
      scoreText.innerText = `Score: 0`;
      restartBtn.style.display = "none";
      clearInterval(interval);
      interval = setInterval(draw, speed);
    }

    restartBtn.addEventListener("click", startGame);

    startGame();

    function changeDirection(newDir) {
      if (newDir === "UP" && direction !== "DOWN") direction = "UP";
      else if (newDir === "DOWN" && direction !== "UP") direction = "DOWN";
      else if (newDir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
      else if (newDir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
    }
