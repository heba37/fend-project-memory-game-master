var card       = document.getElementsByClassName("card");
var cards      = [...card];
console.log(cards);
var timer2 ;
var deck       = document.getElementById("card-deck");
var moves      = 0;
var tracker    = document.querySelector(".moves");
var stars      = document.querySelectorAll(".fa-star");
var starRating = document.querySelector(".stars").innerHTML;
var matchedCard = document.getElementsByClassName("match");
var list        = document.querySelectorAll(".stars li");
var closeButt   = document.querySelector(".close");
var modal       = document.getElementById("msg")
var opendCards  = [];

document.body.onload = PlayGame();


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

// start PlayGame()
// shuffle deck
function PlayGame(){
    
    cards = shuffle(cards);
    // remove exisit classes
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(symbol) {
            deck.appendChild(symbol);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    tracker.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#3ADF00";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0   mins  0  secs";
    clearInterval(timer2);
}


//   display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


//  cards are match or unmatch
function cardsOpend() {
    opendCards.push(this);
    var  m = opendCards.length;
    if(m === 2){
        movetracker();
        if(opendCards[0].type === opendCards[1].type){
            matchedCards();
        } else {
            unmatchedCards();
        }
    }
};


//  if cards match
function matchedCards(){
    opendCards[0].classList.add("match", "disabled");
    opendCards[1].classList.add("match", "disabled");
    opendCards[0].classList.remove("show", "open"  );
    opendCards[1].classList.remove("show", "open"  );
    opendCards = [];
}


// if cards  unmatch
function unmatchedCards(){
    opendCards[0].classList.add("unmatched");
    opendCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        opendCards[0].classList.remove("show", "open","unmatched");
        opendCards[1].classList.remove("show", "open","unmatched");
        enable();
        opendCards = [];
    },1000);
}


//  disable cards 
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


//  enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// Track move
function movetracker(){
    moves++;
    tracker.innerHTML = moves;
    //start timer 
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        setTimer();
    }
    if (moves > 10 && moves < 15){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 16){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// set timer
var second = 0;
var minute = 0; 
var  hour = 0;
var timer = document.querySelector(".timer");
var timer2;
function setTimer(){
    timer2 = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// winner msg
//move, rate , time on 
//closeButt

function winner(){
    if (matchedCard.length == 16){
        clearInterval(timer2);
        finalTime = timer.innerHTML;
        modal.classList.add("show");
        var starRating = document.querySelector(".stars").innerHTML;

        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        closeModal();
    };
}


//  closeButt
function closeModal(){
    closeButt.addEventListener("click", function(e){
        modal.classList.remove("show");
        PlayGame();
    });
}


//  play Again 
function playAgain(){
    modal.classList.remove("show");
    PlayGame();
}


// add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardsOpend);
    card.addEventListener("click", winner);
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move tracker and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
