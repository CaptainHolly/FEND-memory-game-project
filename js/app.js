/*
 * Create a list that holds all of your cards
 */
const listOfCards = ['fa-diamond', 'fa-diamond', 
					'fa-paper-plane-o', 'fa-paper-plane-o', 
					'fa-anchor', 'fa-anchor', 
					'fa-bolt', 'fa-bolt', 
					'fa-cube', 'fa-cube', 
					'fa-leaf', 'fa-leaf', 
					'fa-bicycle', 'fa-bicycle', 
					'fa-bomb', 'fa-bomb'];

function makeCard(card) {
	return `<li class="card" data-card=${card}><i class="fa ${card}"></i></li>`;

}




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
const moveCounter = document.querySelector('.moves')
let moves = 0;
moveCounter.innerHTML = moves;

//game initiating function
function initiateGame() {
	const deck = document.querySelector('.deck');
	const cardHTML = shuffle(listOfCards).map(function(card) {
		return makeCard(card);
	});
	deck.innerHTML = cardHTML.join('')
	moves = 0;
}

initiateGame();

const allCards = document.querySelectorAll('.card');
let arrayOfOpenCards = [];

// Card opening function and event listener
allCards.forEach(function(card) {
	card.addEventListener('click', function() {

		if (!card.classList.contains('match') && !card.classList.contains('open') && !card.classList.contains('show'))  {
			arrayOfOpenCards.push(card);
			card.classList.add('open', 'show');
			if (arrayOfOpenCards.length === 2) {
				moves++
				moveCounter.innerHTML = moves;
				const thirdStar = document.querySelector('#third');
				const secondStar = document.querySelector('#second');
				const firstStar = document.querySelector('#first');
				if (moves >=10) {
					thirdStar.style.display = 'none';
				}
					if (moves >=20) {
					secondStar.style.display = 'none';
					} 
						if (moves >=30) {
							firstStar.style.display = 'none';
						}
				//Checks if open cards match
				if (arrayOfOpenCards[0].dataset.card == arrayOfOpenCards[1].dataset.card) {
						arrayOfOpenCards[0].classList.add('match');
						arrayOfOpenCards[1].classList.add('match');
						arrayOfOpenCards = [];
				} else {
					//Hide open cards if no match
					setTimeout(function() {
						arrayOfOpenCards.forEach(function(card) {
							card.classList.remove('open', 'show');
							});
						arrayOfOpenCards = [];
					}, 500);
				}				
			}
		};
	});
});


