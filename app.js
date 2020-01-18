/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, diceImage;
diceImage = document.querySelector('.dice');
diceImage.style.display = 'none';
resetGame();
resetPlayerScore();
resetCurrentScore();

document.querySelector('.btn-roll').addEventListener('click', function() {
    // 1. Generate random number
    var dice = Math.floor((Math.random() * 6) + 1);

    // 2. Display the result
    diceImage.style.display = 'block';
    diceImage.src = 'dice-' + dice + '.png';

    // 3. Update round score IF the rolled number was NOT a 1
    if (dice !== 1) {
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    resetCurrentScore();

    nextPlayer();
});

document.querySelector('.btn-new').addEventListener('click', function() {
    resetPlayerScore();
    resetCurrentScore();
    resetGame();
});

function nextPlayer() {
    if(scores[activePlayer] >= 10) {
       document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
       document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); 
       diceImage.style.display = 'none';
       document.querySelector('.btn-roll').style.display = 'none';
       document.querySelector('.btn-hold').style.display = 'none';
       return;
    }
    
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0
    }
    roundScore = 0;
    resetCurrentScore();

    toggleActiveClass();

    diceImage.style.display = 'none';
}

function resetCurrentScore() {
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
}

function resetPlayerScore() {
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
}

function resetGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    diceImage.style.display = 'none';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';

}

function toggleActiveClass() {
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

