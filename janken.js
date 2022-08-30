let playerWins = 0;
let computerWins = 0;
let buttons = document.querySelectorAll('button');


// Generates random number between 0 - 2 to represent rock, paper, and scissor
function getComputerChoice() {
    const options = ['rock', 'paper', 'scissor'];
    let choice = Math.floor(Math.random() * 3);
    document.querySelector('.compChoice').innerText = `Dr.Fluffball chooses ${options[choice].toUpperCase()} !!`;

    return options[choice];
}

function getPlayerChoice(e) {
    let choice = e.target.id;
    document.querySelector('.playerChoice').innerText = `You choose ${choice.toUpperCase()}!!`

    return choice;
}

function disableButtons() {
    buttons.forEach(button => button.disabled = true)
}

function rematch() {

}


// decides the winner base on the two choices 
function playRound(e) {
    let playerChoice = getPlayerChoice(e);
    let computerChoice = getComputerChoice();

    let result = document.querySelector('.result');
    let playerScore = document.querySelector('.playerScore');
    let compScore = document.querySelector('.compScore');

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
        let rematchButton = document.createElement('button');
        rematchButton.innerText = "REMATCH?"
        rematchButton.addEventListener('click', rematch);
        document.body.appendChild(rematchButton);

        disableButtons();

        if(playerWins == 5) {
            result.innerText = "YOU WON! \n The match fills you with determination to keep moving forward!"
        } else {
            result.innerText = "Dr.Fluffball WINS! \n Just like any setback like in life, we must keep moving forward!"
        }
    }
}

//Plays 5 rounds to determine the winner & keeps tab of score
function game() {

    buttons.forEach(button => button.addEventListener('click', playRound));


    // if (playerWins < computerWins) {
    //     console.log("Dr.Fluffball & his minions have won! We'll get em next time!");
    // } else if (playerWins > computerWins) {
    //     console.log("You triumph over Dr.Fluffball & his minions. Huzzah!!");
    // } else {
    //     console.log("Stalemate! A worthy opponent indeed, your next battle will be legendary!");
    // }
}

game();



