let playerWins = 0;
let computerWins = 0;

let playerScore = document.querySelector('.playerScore');
let compScore = document.querySelector('.compScore');
let result = document.querySelector('.result');
let buttons = document.querySelectorAll('.card-back');
let compChoice = document.querySelector('.compChoice');
let playerChoice = document.querySelector('.playerChoice');

let rematchButton = document.createElement('button');
rematchButton.innerText = "REMATCH?"
rematchButton.addEventListener('click', rematch);


// Generates random number between 0 - 2 to represent rock, paper, and scissor
function getComputerChoice() {
    const options = ['rock', 'paper', 'scissor'];
    let choice = Math.floor(Math.random() * 3);
    compChoice.innerText = `Dr.Fluffball chooses ${options[choice].toUpperCase()} !!`;

    return options[choice];
}

function getPlayerChoice(e) {
    let choice = e.target.id;
    console.log(e.target);
    playerChoice.innerText = `You choose ${choice.toUpperCase()}!!`

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
    playerScore.innerText = playerWins;
    compScore.innerText = computerWins;

    result.innerText = "";
    compChoice.innerText = "";
    playerChoice.innerText = "";
    activateButtons();
}


// decides the winner base on the two choices 
function playRound(e) {
    let playerChoice = getPlayerChoice(e);
    let computerChoice = getComputerChoice();

    switch (computerChoice) {
        case 'rock':
            if (playerChoice == 'rock') {
                result.innerText =  "It's a Tie!";
            } else if (playerChoice == 'paper')  {
                playerWins++;
                result.innerText = "You Win! Paper beats Rock";
            } else {
                computerWins++;
                result.innerText = "You Lose! Rock beats Scissor";
            }
            break;
        case 'paper':
            if (playerChoice == 'paper') {
                result.innerText = "It's a Tie!";
            } else if (playerChoice == 'scissor')  {
                playerWins++;
                result.innerText = "You Win! Scissor beats Paper";
            } else {
                computerWins++;
                result.innerText = "You Lose! Paper beats Rock";
            }
            break;
        case 'scissor':
            if (playerChoice == 'scissor') {
                result.innerText = "It's a Tie!";
            } else if (playerChoice == 'rock')  {
                playerWins++;
                result.innerText = "You Win! Rock beats Scissor";
            } else {
                computerWins++;
                result.innerText = "You Lose! Scissor beats Paper";
            }
            break;
    }

    playerScore.innerText = playerWins;
    compScore.innerText = computerWins;
    
    if(playerWins == 5 || computerWins == 5) {
        disableButtons();

        if(playerWins == 5) {
            result.innerText = "YOU WON! \n The match fills you with determination to keep moving forward!"
        } else {
            result.innerText = "DEFEAT! \n Things won't always go our way but that's ok! Take things slow, enjoy the journey, and keep moving forward :)"
        }
        result.appendChild(rematchButton);
    }
}

function game() {
    buttons.forEach(button => button.addEventListener('click', playRound));
}

game();



