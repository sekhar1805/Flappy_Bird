const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
//parallex effect (moves in slightly diff speeds relative to each other)
let gamespeed = 2;

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop("0.4", "#fff");
gradient.addColorStop("0.5", "#000");
gradient.addColorStop("0.55", "#4040ff");
gradient.addColorStop("0.6", "#000");
gradient.addColorStop("0.9", "#fff");

const background = new Image();
background.src = "bg.jpg";
const bg = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};
function handleBackground() {
  if (bg.x1 <= -bg.width + gamespeed) bg.x1 = bg.width;
  else bg.x1 -= gamespeed;
  if (bg.x2 <= -bg.width + gamespeed) bg.x2 = bg.width;
  else bg.x2 -= gamespeed;
  ctx.drawImage(background, bg.x1, bg.y, bg.width, bg.height);
  ctx.drawImage(background, bg.x2, bg.y, bg.width, bg.height);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.fillRect(10, canvas.height - 90, 50, 50);
  handleBackground();
  handleObstacles();
  handleParticles();
  bird.update();
  bird.draw();
  ctx.fillStyle = gradient;
  ctx.font = "90px Georgia";
  ctx.strokeText(score, 450, 70);
  ctx.fillText(score, 450, 70);
  handleCollision();
  if (handleCollision()) return;
  requestAnimationFrame(animate);
  angle += 0.12;
  hue++;
  frame++;
}
animate();

window.addEventListener("keydown", function (e) {
  if (e.code === "Space") spacePressed = true;
});

window.addEventListener("keyup", function (e) {
  if (e.code === "Space") spacePressed = false;
  bird.frameX = 0;
});

const bang = new Image();
bang.src = "bang.png";
function handleCollision() {
  for (let i = 0; i < obstaclesArr.length; i++) {
    if (
      bird.x < obstaclesArr[i].x + obstaclesArr[i].width &&
      bird.x + bird.width > obstaclesArr[i].x &&
      ((bird.y < 0 + obstaclesArr[i].top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - obstaclesArr[i].bottom &&
          bird.y + bird.height < canvas.height))
    ) {
      // collision Detection
      ctx.drawImage(bang, bird.x, bird.y, 50, 50);
      ctx.font = "25px sans-serif";
      ctx.fillStyle = "white";
      ctx.fillText(
        "GameOver, your score is" + score,
        160,
        canvas.height / 2 - 10
      );
      return true;
    }
  }
}
