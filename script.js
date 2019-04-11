const enclousure    = document.querySelector(".enclosure");
const greenButton   = document.querySelector(".green");
const redButton     = document.querySelector(".red");
const yellowButton  = document.querySelector(".yellow");
const blueButton    = document.querySelector(".blue");
const greenTone     = new Audio("sounds/green.mp3");
const redTone       = new Audio("sounds/red.mp3");
const yellowTone    = new Audio("sounds/yellow.mp3");
const blueTone      = new Audio("sounds/blue.mp3");
const errorTone     = new Audio("sounds/wrong.mp3");
const buttons       = [greenButton, redButton, yellowButton, blueButton];
let sequence        = [];
let answerIndex     = 0;
let playing         = true;

newGame();
startTurn();

function startTurn() {
  addToSequence();
  playSequence();
}

function newGame() {
  sequence = [];
  playerAnser = [];
}

function addToSequence() {
  sequence.push(buttons[Math.floor(Math.random() * 4)]);
}

function playSequence() {
  answerIndex = 0;
  let delay1 = 750;
  let delay2 = 1500;
  for(let i = 0; i < sequence.length; i++) {
    setTimeout(function() {
      animateButton(sequence[i]);
    }, delay1);
    setTimeout(function() {
      resetColors();
    }, delay2);
    delay1 += 750;
    delay2 += 750;
  }
}

function checkAnswer(button) {
  if (button === sequence[answerIndex]) {
      answerIndex++;
      if(answerIndex === sequence.length) {
        startTurn();
      }
  } else if(button !== sequence[answerIndex]) {
      errorTone.play();
      alert("Game Over");
      playing = false;
  }
  console.log("Player Answer:", button);
  console.log("Sequence:", sequence)
}

function resetColors() {
  greenButton.style.backgroundColor   = "#0F9D58";
  redButton.style.backgroundColor     = "#DB4437";
  yellowButton.style.backgroundColor  = "#F4B400";
  blueButton.style.backgroundColor    = "#4285F4";
}

function animateButton(button) {
  switch(button) {
    case greenButton:
      greenButton.style.backgroundColor = "#25c679";
      greenTone.currentTime = 0;
      greenTone.play();
      break;
    case redButton: 
      redButton.style.backgroundColor = "#ef675b";
      redTone.currentTime = 0;
      redTone.play();
      break;
    case yellowButton:
      yellowButton.style.backgroundColor= "#f4c953";
      yellowTone.currentTime = 0;
      yellowTone.play();
      break;
    case blueButton:
      blueButton.style.backgroundColor = "#77a6f4";
      blueTone.currentTime = 0;
      blueTone.play();
      break;
  }
}

enclousure.addEventListener("click", function(event){
  if(event.target.classList.contains("segment")) {
    checkAnswer(event.target);
    if(playing) {
      animateButton(event.target);
      setTimeout(resetColors, 500);
    }
  }
});