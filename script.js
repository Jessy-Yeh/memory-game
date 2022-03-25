const cards = document.querySelectorAll(".memory-card");
let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;
let popUp = document.querySelector(".popup");
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
let clickNumber = 0;
let timerId;

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  let valString = String(val);
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function flipCard() {
  ++clickNumber;
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (clickNumber === 1) {
    timerId = setInterval(setTime, 1000);
  }

  if ([...cards].every((card) => card.classList.contains("flip"))) {
    clearInterval(timerId);
    popUp.classList.add("display");
    popUp.innerHTML = `Congrats٩(●˙▿˙●)۶…⋆ฺ Your complete time is ${totalSeconds} seconds`;
  }

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  //second click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
