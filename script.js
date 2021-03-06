'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
let score, playing, currentScore, playerActive;
const init = function () {
  //Set all score 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  currentScore = 0;
  playerActive = 0;
  score = [0, 0];

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  //Set player1 active
  player0El.classList.add('player--active');
  playing = true;
};

init();

//Switch player functionality
const switchPlayer = function () {
  document.getElementById(`current--${playerActive}`).textContent = 0;
  playerActive = playerActive === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Display dice roll
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      //Display the score
      document.getElementById(`current--${playerActive}`).textContent =
        currentScore;
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to total score
    score[playerActive] += currentScore;
    //Display total score
    document.querySelector(`#score--${playerActive}`).textContent =
      score[playerActive];
    if (score[playerActive] >= 100) {
      //Finish game
      playing = false;
      document
        .querySelector(`.player--${playerActive}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});
