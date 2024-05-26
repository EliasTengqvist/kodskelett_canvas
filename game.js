window.focus();
const SCREENWIDTH = 1000;
const SCREENHEIGHT = 950;
let gameCanvas = document.getElementById("gameCanvas");
let c = gameCanvas.getContext("2d");
gameCanvas.height = SCREENHEIGHT / 2;
gameCanvas.width = SCREENWIDTH / 2;

let playerX = 100;
let playerY = 150;
let playerWidth = 50;
let playerHeight = 50;
let dx = 0.5;
let dy = 2;
let directions = {
  left: false,
  right: false,
  up: false,
  down: false,
};


let lastJumpTime = 0;
const jumpCooldown = 100;
const jumpStrength = -7;

let isGameOver = false;
let score = 0;
let highScore = 0;
let isInvincible = false;
const invincibilityDuration = 5000;

function updateHighScore() {
  highScore = Math.max(score, highScore); // Update high score if current score is higher
  document.getElementById("highScoreValue").textContent = highScore; // Update high score display
}

class lowerObstacle {
  constructor(x, y,height, width) {
    this.color = "black";
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.dx = -5;
    this.dy = 0;
    this.passed = false;
  }
}

class upperObstacle {
  constructor(x, y, height, width) {
    this.color = "black";
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.dx = -5;
    this.dy = 0;
    this.passed = false;
  }
}

class PowerUp {
  constructor(x, y, size) {
    this.image = new Image();
    this.image.src = "bilder/Powerupp(1).png";
    this.size=size;
    this.x = x;
    this.y = y;
    this.dx = -5;
  }
}

let O1 = new lowerObstacle(500, 300, 200, 50);
let O4 = new upperObstacle(500, -200, 300, 50);
let lowerObstacles = [O1];
let upperObstacles = [O4];
let powerUps = [];

setInterval(function createObstacles() {
  if (!isGameOver) {
    let gap = 50;
    let rand = Math.random() * 100 + 300;
    let lower = new lowerObstacle(500, rand, 200, 50);
    let upper = new upperObstacle(500, rand - 400 - gap, 250, 50);

    lowerObstacles.push(lower);
    upperObstacles.push(upper);
  }
}, 2000);

setInterval(function createPowerUps() {
  if (!isGameOver) {
    let size = 30;
    let randY;
    let validLocation = false;

    while (!validLocation) {
      randY = Math.random() * (SCREENHEIGHT / 2 - size);
      validLocation = true;

      for (let obs of lowerObstacles) {
        if (
          randY < obs.y + obs.height &&
          randY + size > obs.y
        ) {
          validLocation = false;
          break;
        }
      }

      for (let obs of upperObstacles) {
        if (
          randY < obs.y + obs.height &&
          randY + size > obs.y
        ) {
          validLocation = false;
          break;
        }
      }
    }

    let powerUp = new PowerUp(500, randY, size);
    powerUps.push(powerUp);
  }
}, 15000);

document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    const currentTime = Date.now();
    if (currentTime - lastJumpTime > jumpCooldown) {
      directions.up = true;
      lastJumpTime = currentTime;
      dy = jumpStrength;
    }
  }
});

function GameOver() {
  isGameOver = true;
  c.font = "48px sans-serif";
  c.fillStyle = "red";
  c.textAlign = "center";
  c.fillText("Game Over", gameCanvas.width / 2, gameCanvas.height / 2);
  c.fillText(
    "Press R to Restart",
    gameCanvas.width / 2,
    gameCanvas.height / 2 + 60
  );
}

function restartGame() {
  isGameOver = false;
  playerX = 100;
  playerY = 150;
  dx = 0.5;
  dy = 2;
  lowerObstacles = [new lowerObstacle(500, 300, 200, 50)];
  upperObstacles = [new upperObstacle(500, -200, 300, 50)];
  powerUps = [];
  score = 0;
  isInvincible = false;
}

function isColliding(player, obstacle) {
  return (
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y
  );
}

function isCollidingWithPowerUp(player, powerUp) {
  return (
    player.x < powerUp.x + powerUp.size &&
    player.x + player.width > powerUp.x &&
    player.y < powerUp.y + powerUp.size &&
    player.y + player.height > powerUp.y
  );
}

function activatePowerUp() {
  isInvincible = true;
  setTimeout(() => {
    isInvincible = false;
  }, invincibilityDuration);
}

function drawScore() {
  c.font = "24px sans-serif";
  c.fillStyle = "black";
  c.textAlign = "left";
  c.fillText("Score: "
  + score, 10, 30);
}

function animate() {
  if (!isGameOver) {
    requestAnimationFrame(animate);
  }
  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  if (isInvincible) {
    c.drawImage(invincibleTomatoImage, playerX, playerY, playerWidth, playerHeight);
  } else {
    c.drawImage(normalTomatoImage, playerX, playerY, playerWidth, playerHeight);
  }

  for (let i = 0; i < upperObstacles.length; i++) {
    let obs = upperObstacles[i];
    if (!isGameOver) {
      obs.x += obs.dx;
    }
    c.fillStyle = obs.color;
    c.fillRect(obs.x, obs.y, obs.width, obs.height);
    if (!isInvincible && isColliding({ x: playerX, y: playerY, width: playerWidth, height: playerHeight }, obs)) {
      GameOver();
      return;
    }
  }

  for (let i = 0; i < lowerObstacles.length; i++) {
    let obs = lowerObstacles[i];
    if (!isGameOver) {
      obs.x += obs.dx;
    }
    c.fillStyle = obs.color;
    c.fillRect(obs.x, obs.y, obs.width, obs.height);
    if (!isInvincible && isColliding({ x: playerX, y: playerY, width: playerWidth, height: playerHeight }, obs)) {
      GameOver();
      return;
    }
  }

  for (let i = 0; i < powerUps.length; i++) {
    let powerUp = powerUps[i];
    if (!isGameOver) {
      powerUp.x += powerUp.dx;
    }
    c.drawImage(powerUp.image, powerUp.x, powerUp.y, powerUp.size, powerUp.size);
    if (isCollidingWithPowerUp({ x: playerX, y: playerY, width: playerWidth, height: playerHeight }, powerUp)) {
      powerUps.splice(i, 1);
      activatePowerUp();
    }
  }

  if (playerY + playerHeight < SCREENHEIGHT / 2) {
    playerY += dy;
  } else {
    GameOver();
    return;
  }
  dy += 0.4;

  for (let i = 0; i < lowerObstacles.length; i++) {
    let obs = lowerObstacles[i];
    if (obs.x + obs.width < playerX && !obs.passed) {
      score++;
      obs.passed = true;
    }
  }

  drawScore();
  updateHighScore();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "r" || e.key === "R") {
    restartGame();
    animate();
  }
});

let normalTomatoImage = new Image();
normalTomatoImage.src = "bilder/tomato.png";
let invincibleTomatoImage = new Image();
invincibleTomatoImage.src = "bilder/Tomato(2).png";

animate();
