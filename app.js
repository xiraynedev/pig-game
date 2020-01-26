/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//debugger;
var scores,
  finalScore,
  roundScore,
  activePlayer,
  diceImage1,
  diceImage2,
  gamePlaying,
  timer;
diceImage1 = document.querySelector(".dice1");
diceImage1.style.display = "none";
diceImage2 = document.querySelector(".dice2");
diceImage2.style.display = "none";
resetGame();
resetPlayerScore();
resetCurrentUiScore();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. Generate random number
    var dice1 = Math.floor(Math.random() * 6 + 1);
    var dice2 = Math.floor(Math.random() * 6 + 1);

    // 2. Display the result
    diceImage1.style.display = "block";
    diceImage1.src = "dice-" + dice1 + ".png";

    diceImage2.style.display = "block";
    diceImage2.src = "dice-" + dice2 + ".png";

    // 4. Update round score IF the rolled number was NOT a 1
    // 3. Compare previous roll to current roll
    if (dice1 === 6 && dice2 === 6) {
      scores[activePlayer] = 0;
      document.getElementById("score-" + activePlayer).textContent = 0;
      nextPlayer(dice1, dice2);
    } else if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      previousRoll = dice1 + dice2;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer(dice1, dice2);
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];
    resetCurrentUiScore();

    nextPlayer();
  }
});

document.querySelector(".btn-new").addEventListener("click", function() {
  resetPlayerScore();
  resetCurrentUiScore();
  resetGame();
});

function nextPlayer(dice1 = 0, dice2 = 0) {
  if (scores[activePlayer] >= finalScore) {
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    diceImage1.style.display = "none";
    diceImage2.style.display = "none";
    document.querySelector(".btn-roll").classList.add("hide");
    document.querySelector(".btn-hold").classList.add("hide");
    return;
  }

  if (dice1 === 1 || dice2 === 1) {
    document.getElementById("name-" + activePlayer).textContent =
      "You rolled a one!";
    var nameChange = setInterval(() => {
      if (timer === 2) {
        if (activePlayer === 0) {
          document.getElementById("name-1").textContent = "Player 2";
        } else if (activePlayer === 1) {
          document.getElementById("name-0").textContent = "Player 1";
        }

        clearInterval(nameChange);
        timer = 0;
      }
      timer++;
    }, 500);
  } else if (dice1 === 6 && dice2 === 6) {
    document.getElementById("name-" + activePlayer).textContent =
      "You rolled two sixes!";
    var nameChange = setInterval(() => {
      if (timer === 2) {
        if (activePlayer === 0) {
          document.getElementById("name-1").textContent = "Player 2";
        } else if (activePlayer === 1) {
          document.getElementById("name-0").textContent = "Player 1";
        }

        clearInterval(nameChange);
        timer = 0;
      }
      timer++;
    }, 500);
  }

  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  roundScore = 0;
  resetCurrentUiScore();

  toggleActiveClass();

  diceImage1.style.display = "none";
  diceImage2.style.display = "none";
}

function resetCurrentUiScore() {
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
}

function resetPlayerScore() {
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
}

function resetGame() {
  gamePlaying = true;
  scores = [0, 0];
  finalScore = 50;
  roundScore = 0;
  activePlayer = 0;
  diceImage1.style.display = "none";
  diceImage2.style.display = "none";
  previousRoll = null;
  timer = 0;
  document.querySelector("#form-input").classList.remove("hide-form");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".btn-roll").classList.remove("hide");
  document.querySelector(".btn-hold").classList.remove("hide");
  document.querySelector(".btn-roll").classList.add("show");
  document.querySelector(".btn-hold").classList.add("show");
}

function toggleActiveClass() {
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

const form = document.querySelector("#form-input");
form.addEventListener("submit", e => {
  e.preventDefault();
  finalScore = e.target.input.value;
  form.reset();
  form.classList.add("hide-form");
});
