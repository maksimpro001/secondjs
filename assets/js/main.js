const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Малюнки
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "assets/img/player.png";
bg.src = "assets/img/bg.png";
fg.src = "assets/img/fg.png";
pipeUp.src = "assets/img/pipeUp.png";
pipeBottom.src = "assets/img/pipeBottom.png";

var pipe = [];
pipe[0] = {
  x: canvas.width,
  y: 0,
};

var player = {
  xPos: 20,
  yPos: 200,
  gravity: 1.5,
};
// нажатия на кнопку

document.addEventListener("keydown", moveUp);

function moveUp() {
  player.yPos -= 30;
}

// отрисовка
var gap = 80;
var balls = 0;

function draw() {
  context.drawImage(bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    context.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    if (pipe[i].x == 100) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
      });
    }

    if (
      (player.xPos + bird.width >= pipe[i].x &&
        player.xPos <= pipe[i].x + pipeUp.width &&
        (player.yPos <= pipe[i].y + pipeUp.height ||
          player.yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
      player.yPos + bird.height >= canvas.height - fg.height
    ) {
      location.reload();
    }

    if (pipe[i].x == 5) {
      balls++;
    }
  }

  context.drawImage(bird, player.xPos, player.yPos);
  context.drawImage(fg, 0, canvas.height - fg.height);

  context.fillStyle = "000";
  context.font = "24px Arial";
  context.fillText("Очки: " + balls, canvas.width / 2.5, 20);

  player.yPos += player.gravity;
  requestAnimationFrame(draw);
}
pipeBottom.onload = draw;
