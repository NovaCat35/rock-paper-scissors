let playerWins = 0;
let computerWins = 0;

let playerScore = document.querySelector('.playerScore');
let compScore = document.querySelector('.compScore');
let result = document.querySelector('.result');
let buttons = document.querySelectorAll('.card-back');
let compChoice = document.querySelector('.compChoice');
let playerChoice = document.querySelector('.playerChoice');

let rematchButton = document.createElement('button');
rematchButton.textContent = "REMATCH?";
rematchButton.classList.add("rematchBtn");
rematchButton.addEventListener('click', rematch);


// Generates random number between 0 - 2 to represent rock, paper, and scissor
function getComputerChoice() {
    const options = ['rock', 'paper', 'scissor'];
    let choice = Math.floor(Math.random() * 3);
    compChoice.textContent = `Dr.Fluffball chooses ${options[choice].toUpperCase()} !!`;

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
    // buttons.forEach(button => button.disabled = true);
    buttons.forEach(button => button.classList.toggle('disable-div'));
}
function activateButtons() {
    // buttons.forEach(button => button.disabled = false);
    buttons.forEach(button => button.classList.toggle('disable-div'));
    result.removeChild(rematchButton);
}

function rematch() {
    playerWins = 0;
    computerWins = 0;
    playerScore.textContent = playerWins;
    compScore.textContent = computerWins;

    result.textContent = "";
    compChoice.textContent = "";
    playerChoice.textContent = "";
    activateButtons();
}

function win() {
    // remove animation after ending
    playerScore.style.animation = 'addScore .5s';
    playerScore.addEventListener('animationend', function () { this.style.animation = '' });
}

function lose() {
    compScore.style.animation = 'addScore .5s';
    compScore.addEventListener('animationend', function() { this.style.animation = '' });
}


// decides the winner base on the two choices 
function playRound(e) {
    let playerChoice = getPlayerChoice(e);
    let computerChoice = getComputerChoice();

    switch (computerChoice) {
        case 'rock':
            if (playerChoice == 'rock') {
                result.textContent =  "It's a Tie!";
            } else if (playerChoice == 'paper')  {
                playerWins++;
                result.textContent = "You Win! Paper beats Rock";
                win();
            } else {
                computerWins++;
                result.textContent = "You Lose! Rock beats Scissor";
                lose();
            }
            break;
        case 'paper':
            if (playerChoice == 'paper') {
                result.textContent = "It's a Tie!";
            } else if (playerChoice == 'scissor')  {
                playerWins++;
                result.textContent = "You Win! Scissor beats Paper";
                win();
            } else {
                computerWins++;
                result.textContent = "You Lose! Paper beats Rock";
                lose();
            }
            break;
        case 'scissor':
            if (playerChoice == 'scissor') {
                result.textContent = "It's a Tie!";
            } else if (playerChoice == 'rock')  {
                playerWins++;
                result.textContent = "You Win! Rock beats Scissor";
                win();
            } else {
                computerWins++;
                result.textContent = "You Lose! Scissor beats Paper";
                lose();
            }
            break;
    }

    playerScore.textContent = playerWins;
    compScore.textContent = computerWins;
    
    if(playerWins == 5 || computerWins == 5) {
        disableButtons();

        if(playerWins == 5) {
            result.textContent = "YOU WON! \n The match fills you with determination to keep moving forward!"
        } else {
            result.textContent = "DEFEAT! \n Things won't always go our way but that's ok! Take things slow, enjoy the journey, and keep moving forward :)"
        }
        result.appendChild(rematchButton);
    }
}

function game() {
    buttons.forEach(button => button.addEventListener('click', playRound));
}

game();



