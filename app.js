/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, gamePlaying, roundScore, diceDOM, rollBtn, newBtn, holdBtn;


diceDOM = document.querySelector('.dice'),
rollBtn = document.querySelector(".btn-roll"),
newBtn  = document.querySelector(".btn-new"),
holdBtn = document.querySelector(".btn-hold");

init();

rollBtn.addEventListener("click", function () {

	if (gamePlaying) {
		//Random No.
		var dice = Math.floor(Math.random() * 6) + 1;
		console.log("Rolling " + dice);

		//Display result (Dice)
		diceDOM.style.display = 'block';
		diceDOM.src = "dice-" + dice + ".png";

		//if round score is'nt 1 logic..
		if (dice !== 1) {
			//Add Score
			roundScore += dice;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
		} else {
			//Next Player
			nextPlayer();
		}
	}	
});

holdBtn.addEventListener("click", function () {	

	if (gamePlaying) {
		//Add current score to global score
		scores[activePlayer] += roundScore;

		// Update UI
		document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

		// Check if player won the game
		if (scores[activePlayer] >= 100) {
			document.querySelector("#name-" + activePlayer).textContent = "Winner !";
			diceDOM.style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
	        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	        gamePlaying = false;
		} else {
			//next player
			nextPlayer();		
		}
	}
});


newBtn.addEventListener("click", init);


//////////////////////////////////////////////////////////////////////////////////////////

function init () {
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	diceDOM.style.display = 'none';

	document.getElementById("score-0").textContent = '0';
	document.getElementById("score-1").textContent = '0';
	document.getElementById("current-0").textContent = '0';
	document.getElementById("current-1").textContent = '0';
	document.getElementById("name-0").textContent = "Player 1";
	document.getElementById("name-1").textContent = "Player 2";

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

}


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}
