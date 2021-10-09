let score = 0;
let started = false;
let ended = false;
let isJumping = false;

let scoreUpdater = null;
let collisionChecker = null;


// Utilities
function randomRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function gameStart() {

}

function gameEnd() {

}

function updateScore() {

}

function spawnRock() {
  
}

function catJump() {

}


// When the game window is clicked or spacebar is clicked.
gameDiv.addEventListener('mousedown', () => {

});

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {

  }
});
