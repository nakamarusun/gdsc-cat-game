let score = 0;
let started = false;
let ended = false;
let isJumping = false;
let scoreUpdater = null;
let collisionChecker = null;
let rockPositions = [];
const cat = document.getElementById("game-cat");
const grass = document.getElementById("game-grass");
const gameDiv = document.getElementById("game");

// Utilities
function randomRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateScore() {
  document.getElementById("game-score").innerText = score.toString(10).padStart(7, "0");
}

function catJump() {
  if (!isJumping) {
    isJumping = true;
    cat.classList.add("cat-jump");
    setTimeout(() => {
      isJumping = false;
      cat.classList.remove("cat-jump");
    }, 800);
  }
}

function startGame() {
  started = true;

  // Update the scoreboard every 100ms
  scoreUpdater = setInterval(() => {
    score += 1;
    updateScore();
  }, 100);

  // Move the grass and add the cat
  cat.classList.remove("gone");
  grass.classList.add("move-left");

  // Start rock spawner
  spawnRock();

  collisionChecker = setInterval(() => {
    // Every 100ms, we check the collisions of the rock with the cat.
    // Because the speed of the rock is 512px/s, we must reduce by 51.2px
    rockPositions = rockPositions.map((x) => {
      // Check if the rock is in the cat's range, if it does, end the game.
      // Cat's position is around 64px to 128px.
      if (!isJumping && x > (160) && x < (256 + 64)) {
        gameEnd();
      }

      return x - 51.2;
    });
  }, 100);
}

function gameEnd() {
  ended = true;

  // Clear updaters
  clearInterval(scoreUpdater);
  clearInterval(collisionChecker);

  // Stop grass from moving
  grass.classList.remove("move-left");

  // Remove cat
  cat.classList.add("gone");

  // Remove all rocks
  for (rock of document.querySelectorAll(".game-rock")) {
    gameDiv.removeChild(rock);
  }

  // Display game over
  document.getElementById("game-over").classList.remove("gone");
}

function spawnRock() {
  // Can only spawn if game is started
  if (!ended) {
    // Spawn the rock
    const rock = document.createElement("div");
    rock.classList.add("game-rock");
    gameDiv.appendChild(rock);

    // Add the current rock's x position to the array
    rockPositions.push(gameDiv.offsetWidth);

    // Set timer to delete rock and clear first entry in array
    setTimeout(() => {
      gameDiv.removeChild(rock);
      rockPositions.shift();
    }, 10000);

    // Set next timer
    setTimeout(spawnRock, randomRange(800, 1700));
  }
}

gameDiv.addEventListener('mousedown', () => {
  if (started) {
    catJump();
  } else {
    startGame();
  }
});

document.addEventListener("keydown", (ev) => {
  if (ev.key === " ") {
    if (started) {
      catJump();
    } else {
      startGame();
    }
  }
});

updateScore();
