let playerWins = 0;
let computerWins = 0;

let playerScore = document.querySelector('.playerScore');
let compScore = document.querySelector('.compScore');
let resultTxt = document.querySelector('.result .text');
let resetPage = document.querySelector('.resetPage');
let resetText = document.querySelector('.resetText')
let buttons = document.querySelectorAll('.card-back');
let compChoice = document.querySelector('.compChoice');
let playerChoice = document.querySelector('.playerChoice');
let root =  document.querySelector(':root');
const scoreBell1 = document.querySelector('audio[data-sound="scoreBell1"]');
const scoreBell2 = document.querySelector('audio[data-sound="scoreBell2"]');
const victory = document.querySelector('audio[data-sound="victory"]');
const defeat = document.querySelector('audio[data-sound="defeat"]');


// Create the contents for REMATCH BUTTON for later use
let rematchButton = document.createElement('div');
rematchButton.textContent = "REMATCH?";
rematchButton.classList.add("rematchBtn");
rematchButton.addEventListener('click', rematch);

// Remove the 1st animation played after animations ends so we can can call it again in playRound()
resultTxt.addEventListener('animationend', function () { 
    resultTxt.classList.remove('animation');
});
// remove the 1st animation that ran when resetPage was hidden
resetText.classList.remove('animation2');


// Generates random number between 0 - 2 to represent mouse, cat, and dog
function getComputerChoice() {
    const options = ['mouse', 'cat', 'dog'];
    let choice = Math.floor(Math.random() * 3);
    compChoice.textContent = `Dr.Fluffball chooses ${options[choice].toUpperCase()}!!`;

    return options[choice];
}

function getPlayerChoice(e) {
    let choice = e.target.id;
    if(choice == '') {
        choice = e.target.parentElement.id;
    }
    playerChoice.textContent = `You choose ${choice.toUpperCase()}!!`

    return choice;
}

function disableButtons() {
    buttons.forEach(button => button.classList.toggle('disable-div'));
}
function activateButtons() {
    buttons.forEach(button => button.classList.toggle('disable-div'));
    resetPage.removeChild(rematchButton);
}

function showResetPage() {
    resetPage.classList.toggle('active');
    resetText.classList.add('animation2');
}

// RESETS ALL PROGRESS for rematch
function rematch() {
    playerWins = 0;
    computerWins = 0;
    playerScore.textContent = playerWins;
    compScore.textContent = computerWins;

    resultTxt.textContent = "";
    compChoice.textContent = "";
    playerChoice.textContent = "";

    // hide resetPage, reset its animation, reload audio
    resetPage.classList.toggle('active');
    resetText.classList.remove('animation2');
    victory.load();
    defeat.load();

    activateButtons();
}

function win() {
    //remove floatUpScore from class
    playerScore.classList.remove('floatUpScore');
    playerScore.style.animation = 'addScore .5s';
    // remove animation after ending
    playerScore.addEventListener('animationend', function () { this.style.animation = '' });

    scoreBell1.currentTime = 0;
    scoreBell1.play()
}

function lose() {
    //remove floatUpScore from class
    compScore.classList.remove('floatUpScore');
    compScore.style.animation = 'addScore .5s';
    // remove animation after ending
    compScore.addEventListener('animationend', function() { this.style.animation = '' });

    scoreBell2.currentTime = 0;
    scoreBell2.play()
}


// decides the winner base on the two choices (Player & Computer)
function playRound(e) {
    let playerChoice = getPlayerChoice(e);
    let computerChoice = getComputerChoice();

    switch (computerChoice) {
        case 'mouse':
            if (playerChoice == 'mouse') {
                resultTxt.innerHTML =  "It's a Tie!";
            } else if (playerChoice == 'cat')  {
                playerWins++;
                resultTxt.innerHTML = "You Win! <br> Cat beats Mouse";
                win();
            } else {
                computerWins++;
                resultTxt.innerHTML = "You Lose! <br> Mouse beats Dog";
                lose();
            }
            break;
        case 'cat':
            if (playerChoice == 'cat') {
                resultTxt.innerHTML = "It's a Tie!";
            } else if (playerChoice == 'dog')  {
                playerWins++;
                resultTxt.innerHTML = "You Win! <br> Dog beats Cat";
                win();
            } else {
                computerWins++;
                resultTxt.innerHTML = "You Lose! <br> Cat beats Mouse";
                lose();
            }
            break;
        case 'dog':
            if (playerChoice == 'dog') {
                resultTxt.innerHTML = "It's a Tie!";
            } else if (playerChoice == 'mouse')  {
                playerWins++;
                resultTxt.innerHTML = "You Win! <br> Mouse beats Dog";
                win();
            } else {
                computerWins++;
                resultTxt.innerHTML = "You Lose! <br> Dog beats Cat";
                lose();
            }
            break;
    }

    playerScore.textContent = playerWins;
    compScore.textContent = computerWins;
    let textLength = resultTxt.innerText.length;

    // customize pseudo elements of animation & add animation
    root.style.setProperty("--typewriterSpeed", "1.2s");
    root.style.setProperty("--typingSteps", `steps(${textLength})`);
    root.style.setProperty("--typingDelay", "0s");
    resultTxt.classList.add('animation');

    // Remove animation so it can be reused when we re-add animation
    resultTxt.addEventListener('animationend', function () { 
        resultTxt.classList.remove('animation');
    });


    if(playerWins == 5 || computerWins == 5) {
        disableButtons();
        showResetPage();
        if(playerWins == 5) {
            victory.play();
            resetText.innerHTML = "<span class='victory'>VICTORY!</span> <br> Thanks for playing, come again for another round!"
        } else {
            defeat.play();
            resetText.innerHTML = "<span class='defeat'>DEFEAT!</span> <br> Things didn't go our way this time. <br> Well, nothing else to do but to keep moving forward !!"
        }
        resetPage.appendChild(rematchButton);
    }
}

function game() {
    buttons.forEach(button => button.addEventListener('click', playRound));
}

game();



