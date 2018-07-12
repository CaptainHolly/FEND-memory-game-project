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

const moveCounter = document.querySelector('.moves')
let moves = 0;
moveCounter.innerText = moves;
const deck = document.querySelector('.deck');
const cardHTML = shuffle(listOfCards);
deck.innerHTML = cardHTML.join('');

//game initializing function
function initiateGame() {
	const cardHTML = shuffle(listOfCards).map(function(card) {
		return makeCard(card);
	});
	deck.innerHTML = cardHTML.join('')
	moves = 0;
	listen()
}

initiateGame();


const timer = document.querySelector('.timer');
let seconds = 0;
let liveClock;
timer.innerHTML = `${seconds} seconds`;


function startClock() {
	liveClock = setInterval(function() {
		timer.innerHTML = `${seconds} seconds`
		seconds++;
	}, 1000);
};

function resetClock() {
	clearInterval(liveClock);
}


const allCards = document.querySelectorAll('.card');
let arrayOfOpenCards = [];
const thirdStar = document.querySelector('#third');
const secondStar = document.querySelector('#second');

const restartButton = document.querySelector('.restart');

restartButton.addEventListener('click', function(e) {
	allCards.forEach(function(card) {
		card.classList.remove('open', 'show', 'match');
	});
	arrayOfOpenCards = [];
	initiateGame();
	listen();
	resetClock();
	seconds = 0;
	timer.innerHTML = `${seconds} seconds`
	moveCounter.innerHTML = 0;
	thirdStar.style.display = 'initial';
	secondStar.style.display = 'initial';
});




// Card opening function and event listener
function listen() {
	const allCards = document.querySelectorAll('.card');
	allCards.forEach(function(card) {
		card.addEventListener('click', function() {
			if (!card.classList.contains('match') && !card.classList.contains('open') && !card.classList.contains('show') && (arrayOfOpenCards.length <= 1))  {
				arrayOfOpenCards.push(card);
				card.classList.add('open', 'show');
				//trigger timer
				if ((seconds === 0) && (arrayOfOpenCards.length === 1)) {
						startClock();
				} else if (arrayOfOpenCards.length === 2) {
				 	moves++
					moveCounter.innerHTML = moves;
					
					if (moves >=10) {
					thirdStar.style.display = 'none';
					}
						if (moves >=20) {
						secondStar.style.display = 'none';
						} 
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
					}, 1000);
				}				
		
			};
		});
	});
};


