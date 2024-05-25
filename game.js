//  ------------ Setup ------------
window.focus;
const SCREENWIDTH = 1000;
const SCREENHEIGHT = 950;
let gameCanvas = document.getElementById("gameCanvas");
let c = gameCanvas.getContext("2d"); // Drawing object
gameCanvas.height = SCREENHEIGHT / 2;
gameCanvas.width = SCREENWIDTH / 2;
// -------------------------------------
// Player variables
let playerX = 300;
let playerY = 0;
let playerWidth = 100;
let playerHeight = 100;
let dx = 0.5;
let dy = 2;
let directions = {
  left: false,
  right: false,
  up: false,
  down: false,
};

class lowerObstacle {
  constructor(x, y, height, width) {
    this.color = "black";
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.dx = -5;
    this.dy = 0;
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
  }
}

O1 = new lowerObstacle(500, 300, 200, 50);
O4 = new upperObstacle(500, -200, 300, 50);
O3 = new lowerObstacle(20, 30, 40, 50);

lowerObstacles = [O1, O3];
upperObstacles = [O4];

setInterval(function createObstacles() {
  let rand = Math.random() * 100 + 300;
  let lower = new lowerObstacle(500, rand, 200, 50);
  let upper = new upperObstacle(500, rand - 400, 250, 50);

  lowerObstacles.push(lower);
  upperObstacles.push(upper);
}, 2000);

// -------------------------------------
// ------------ Player movement ------------
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case " ":
      directions.up = true;
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case " ":
      directions.up = false;
      break;
  }
});

/*function GameOver() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = "48px sans-serif";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", 500, 500);
}
*/
// Animation
function animate() {
  requestAnimationFrame(animate); // Run gameloop recursively
  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Clear screen

  c.drawImage(bild, playerX, playerY, playerWidth, playerHeight); // Draw player

  console.log(upperObstacles);
  for (let i = 0; i < upperObstacles.length; i++) {
    obs = upperObstacles[i];
    obs.x += obs.dx;
    c.fillRect(obs.x, obs.y, obs.width, obs.height);
    // if (obs.x < playerX + playerWidth) {
    //  break;
    // }
  }

  for (let i = 0; i < lowerObstacles.length; i++) {
    obs = lowerObstacles[i];
    obs.x += obs.dx;
    c.fillRect(obs.x, obs.y, obs.width, obs.height);
    // if (obs.x < playerX + playerWidth) {
    //  break;
    // }
  }

  if (directions.up) {
    playerY -= 15;
    dy = 0;
  }

  if (playerY + playerHeight < SCREENHEIGHT / 2 + 27);
  {
    playerY += dy;
  }
  dy += 0.3;

  /*if (playerY + 23 >= 950) {
    GameOver();
  }
  */

  /*  if (playerX + 100 == lowerObstacle.X and playerY + 100 == lowerObstacle.Y);
    break
  if (playerX + 100 == upperObstacle.x and playerY + 100 == upperObstacle.Y)
    break
  */
}

bild = document.createElement("img");
bild.src = "tomato.png";

// -------------------------------------
// ------------ Start game ------------

animate();
