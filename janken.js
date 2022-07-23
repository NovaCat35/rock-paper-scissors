
// Generates random number between 0 - 2 to represent rock, paper, and scissor
function getComputerChoice() {
    const options = ['rock', 'paper', 'scissor'];
    let choice = Math.floor(Math.random() * 3);
    return options[choice];
}

// User prompt will determine choice
function getPlayerChoice() {
    let choice = prompt("Dr.Evel & his minions has challenge you to a battle! Pick your weapon: rock, paper, or scissor?").toLowerCase()

    while(choice != "rock" && choice != "paper" && choice != "scissor") {
        alert("Not a valid choice, try again.")
        choice = prompt("Rock, Paper, or Scissor?").toLowerCase()
    }  
    return choice;
}

let player_score = 0;
let computer_score = 0;

// decides the winner base on the two choices 
function playRound(computerChoice, playerChoice) {
    console.log("Dr.Evel chooses: " + computerChoice);
    switch (computerChoice) {
        case 'rock':
            if (playerChoice == 'rock') {
                return "It's a Tie!";
            } else if (playerChoice == 'paper')  {
                player_score++;
                return "You Win! Paper beats Rock";
            } else {
                computer_score++;
                return "You Lose! Rock beats Scissor";
            }
        case 'paper':
            if (playerChoice == 'rock') {
                computer_score++;
                return "You Lose! Paper beats Rock";
            } else if (playerChoice == 'paper')  {
                return "It's a Tie!";
            } else {
                player_score++;
                return "You Win! Scissor beats Paper";
            }
        case 'scissor':
            if (playerChoice == 'rock') {
                player_score++;
                return "You Win! Rock beats Scissor";
            } else if (playerChoice == 'paper')  {
                computer_score++;
                return "You Lose! Scissor beats Paper";
            } else {
                return "It's a Tie!";
            }
        default :
            return "Not sure what happened..."
    }
}

//Plays 5 rounds to determine the winner & keeps tab of score
function game() {
    for(let i = 0; i < 5; i++) {
        console.log("~SCORE~ You: " + player_score +  " Dr.Evel: " + computer_score);
        console.log(playRound(getComputerChoice(), getPlayerChoice()));
    }

    if (player_score < computer_score) {
        console.log("Dr.Evel & his minions have won! We'll get em next time!");
    } else if (player_score > computer_score) {
        console.log("You triumph over Dr.Evel & his minions. Huzzah!!");
    } else {
        console.log("Stalemate! A worthy opponent indeed, your next battle will be legendary!");
    }
}

game();



