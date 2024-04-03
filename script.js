'use strict';
//score elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

//dice
const diceEl = document.querySelector('.dice');

//players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//buttons
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

//Win message
const winMsg1 = document.querySelector('.winner-0');
const winMsg2 = document.querySelector('.winner-1');

function newGame() {
    
  score0El.textContent = 0;
  score1El.textContent = 0;
    
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');

  winMsg1.style.display = 'none';
  winMsg2.style.display = 'none';

  rollDiceBtn.disabled = false;
  holdBtn.disabled = false;
}

function activePlayer() {  
  //check active player
  if (player0El.classList.contains('player--active')) {
    return [score0El, currentScore0El, winMsg1 ];
  } else if (player1El.classList.contains('player--active')) {
    return [score1El, currentScore1El, winMsg2];
  }
}


function toggleActivePlayer() {
  console.log('toggle')
  if (player0El.classList.contains('player--active')) {
    player0El.classList.remove('player--active');
    player1El.classList.add('player--active');
     
  } else if (player1El.classList.contains('player--active')) {
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
  }
}

function gameOver() {
  rollDiceBtn.disabled = true;
  holdBtn.disabled = true;
}

function play(scoreEl, currentScoreEl) {

  let currentScore, score;

  currentScore = Number(currentScoreEl.textContent);
  score = Number(scoreEl.textContent);
  
  
  //generate dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`

  //check for 1
  if (dice === 1) {
    currentScore = 0
    toggleActivePlayer();     
  } else {
    currentScore += dice;
  }

  currentScoreEl.textContent = currentScore;
}


function hold(scoreEl, currentScoreEl, winMsg) {
  let currentScore, score;

  currentScore = Number(currentScoreEl.textContent);
  score = Number(scoreEl.textContent);

  score += currentScore;

  if (score >= 20) {
    winMsg.style.display = 'block';
    gameOver();
  }

  scoreEl.textContent = score;

  currentScore = 0;
  currentScoreEl.textContent = currentScore;

  toggleActivePlayer();
  
}

newGame();

rollDiceBtn.addEventListener('click', function () {  
  play(activePlayer()[0], activePlayer()[1])
});


holdBtn.addEventListener('click', function () {  
  hold(activePlayer()[0], activePlayer()[1],activePlayer()[2])

})

newGameBtn.addEventListener('click', newGame);





















