let aiSequence = [];
let level = 0;
let playerSequence = [];

const startButton = document.querySelector(".js-start");
const info = document.querySelector(".js-info");
const heading = document.querySelector(".js-heading");
const tileContainer = document.querySelector(".js-container")

function nextStep() {
  const tiles = ["red", "green", "blue", "yellow"];
  const random = tiles[Math.floor(Math.random() * tiles.length)]
  return random;
}

function nextRound() {
  level+=1;
  tileContainer.classList.add("unclickable");
  info.textContent = "Wait for the AI to begin";
  heading.textContent = `Level ${level} of 50`;
  //Copy all of the elements in the AI sequence array to a new array called nextSequence
  const nextSequence = [...aiSequence] //nextSequence is referencing a completely new array object with the same values as aiSequence. If aiSequence is updated, nextSequence will still remain unchanged.
    
//const nextSequence = aiSequence -> nextSequence is pointing to the same array object as aiSequence. if aiSequence is updated, then nextSequence will also be updated no matter what
  //push()=append()
  nextSequence.push(nextStep());
  playRound(nextSequence);
  aiSequence = [...nextSequence];
  setTimeout(() => {
    playerTurn(level);
  }, level*300+1000);  
}

function startGame() {
  startButton.classList.add("hidden");
  info.classList.remove("hidden");
  info.textContent = "Wait for the AI to begin";
  nextRound();
}

function activateTile(color) {
  const tile = document.querySelector(`[data-tile=${color}]`);
  const sound = document.querySelector(`[data-sound=${color}]`);
  tile.classList.add("activated");
  sound.play();

 setTimeout(() => {
     tile.classList.remove("activated");
 }, 300);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index+1)*600);
  })
}

function handleClick(tile) {
  const index = playerSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound=${tile}]`);
  sound.play();
  
  const remainingTaps = aiSequence.length - playerSequence.length;
  console.log(remainingTaps);
  
  if(playerSequence[index] !== aiSequence[index]) {
      resetGame("Incorrect! Resetting...");
      return
  }
  
  if (playerSequence.length === aiSequence.length) {
    if(playerSequence.length === 50) {
      resetGame("You win! Resetting...");
      return
    }
    playerSequence = [];
    info.textContent = "Nice job!";
    setTimeout(() => {
      nextRound();
    }, 1000);
    return
  }
  info.textContent = `Your turn | ${remainingTaps} tap${remainingTaps > 1 ? 's' : ""}`;
}

function resetGame(text) {
  alert(text);
  playerSequence = [];
  aiSequence = [];
  level = 0;
  startButton.classList.remove("hidden");
  heading.textContent = "Simon Game";
  info.classList.add("hidden");
  tileContainer.classList.add("unclickable");
}

function playerTurn(level) {
  tileContainer.classList.remove("unclickable");
  info.textContent = `Your turn | ${level} tap${level > 1 ? 's' : ""}`;
}

startButton.addEventListener("click", startGame)
tileContainer.addEventListener("click", (event) => {
  const {tile} = event.target.dataset;
  if (tile) {
    handleClick(tile);
  }
})