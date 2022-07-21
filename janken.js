
// random number between 0 - 2 to represent rock, paper, and scissor
function getComputerChoice() {
    const options = ['rock', 'paper', 'scissor'];
    let choice = Math.floor(Math.random() * 3);
    return options[choice];
}

// ask user for choice prompt
function getPlayerChoice() {
    let choice = prompt("Rock, paper, or scissor?").toLowerCase()

    while(choice != "rock" && choice != "paper" && choice != "scissor") {
        alert("Not a valid choice, try again.")
        choice = prompt("Rock, Paper, or Scissor?").toLowerCase()
    }  
    return choice;
}

const computerChoice = getComputerChoice();
const playerChoice = getPlayerChoice();

// decides the winner base on the two choices
function playRound(computerChoice, playerChoice) {
    console.log("computer chooses: " + computerChoice);
    switch (computerChoice) {
        case 'rock':
            if (playerChoice == 'rock') {
                return "It's a Tie!";
            } else if (playerChoice == 'paper')  {
                return "You Win! Paper beats Rock";
            } else {
                return "You Lose! Rock beats Scissor";
            }
        case 'paper':
            if (playerChoice == 'rock') {
                return "You Lose! Paper beats Rock";
            } else if (playerChoice == 'paper')  {
                return "It's a Tie!";
            } else {
                return "You Win! Scissor beats Paper";
            }
        case 'scissor':
            if (playerChoice == 'rock') {
                return "You Win! Rock beats Scissor";
            } else if (playerChoice == 'paper')  {
                return "You Lose! Scissor beats Paper";
            } else {
                return "It's a Tie!";
            }
        default :
            return "Not sure what happened..."
    }
}

console.log(playRound(computerChoice, playerChoice));
