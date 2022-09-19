let playerWins = 0;
let computerWins = 0;

let playerScore = document.querySelector('.playerScore');
let compScore = document.querySelector('.compScore');
let resultTxt = document.querySelector('.result .text');
let resultContainer = document.querySelector('.result');
let buttons = document.querySelectorAll('.card-back');
let compChoice = document.querySelector('.compChoice');
let playerChoice = document.querySelector('.playerChoice');
let root =  document.querySelector(':root');

// Create the contents for REMATCH BUTTON for later use
let rematchButton = document.createElement('button');
rematchButton.textContent = "REMATCH?";
rematchButton.classList.add("rematchBtn");
rematchButton.addEventListener('click', rematch);

// Remove the 1st animation played after animations ends so we can can call it again in playRound()
resultTxt.addEventListener('animationend', function () { 
    resultTxt.style.animation = '';
    resultTxt.classList.remove('animation');
});


// Generates random number between 0 - 2 to represent rock, paper, and scissor
function getComputerChoice() {
    const options = ['rock', 'paper', 'scissor'];
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
    resultContainer.removeChild(rematchButton);
}

function rematch() {
    playerWins = 0;
    computerWins = 0;
    playerScore.textContent = playerWins;
    compScore.textContent = computerWins;

    resultTxt.textContent = "";
    compChoice.textContent = "";
    playerChoice.textContent = "";
    activateButtons();
}

function win() {
    //remove floatUpScore from class
    playerScore.classList.remove('floatUpScore');
    playerScore.style.animation = 'addScore .5s';
    // remove animation after ending
    playerScore.addEventListener('animationend', function () { this.style.animation = '' });
}

function lose() {
    //remove floatUpScore from class
    compScore.classList.remove('floatUpScore');
    compScore.style.animation = 'addScore .5s';
    // remove animation after ending
    compScore.addEventListener('animationend', function() { this.style.animation = '' });
}


// decides the winner base on the two choices (Player & Computer)
function playRound(e) {
    let playerChoice = getPlayerChoice(e);
    let computerChoice = getComputerChoice();

    switch (computerChoice) {
        case 'rock':
            if (playerChoice == 'rock') {
                resultTxt.innerHTML =  "It's a Tie!";
            } else if (playerChoice == 'paper')  {
                playerWins++;
                resultTxt.innerHTML = "You Win! <br> Paper beats Rock";
                win();
            } else {
                computerWins++;
                resultTxt.innerHTML = "You Lose! <br> Rock beats Scissor";
                lose();
            }
            break;
        case 'paper':
            if (playerChoice == 'paper') {
                resultTxt.innerHTML = "It's a Tie!";
            } else if (playerChoice == 'scissor')  {
                playerWins++;
                resultTxt.innerHTML = "You Win! <br> Scissor beats Paper";
                win();
            } else {
                computerWins++;
                resultTxt.innerHTML = "You Lose! <br> Paper beats Rock";
                lose();
            }
            break;
        case 'scissor':
            if (playerChoice == 'scissor') {
                resultTxt.innerHTML = "It's a Tie!";
            } else if (playerChoice == 'rock')  {
                playerWins++;
                resultTxt.innerHTML = "You Win! <br> Rock beats Scissor";
                win();
            } else {
                computerWins++;
                resultTxt.innerHTML = "You Lose! <br> Scissor beats Paper";
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
        resultTxt.style.animation = '';
        resultTxt.classList.remove('animation');
    });


    if(playerWins == 5 || computerWins == 5) {
        disableButtons();

        if(playerWins == 5) {
            resultTxt.innerHTML = "VICTORY! <br> The match fills you with determination to keep moving forward!"
        } else {
            resultTxt.innerHTML = "DEFEAT! <br> Things won't always go our way but that's ok! Take things slow, enjoy the journey, and keep moving forward :)"
        }
        resultContainer.appendChild(rematchButton);
    }
}

function game() {
    buttons.forEach(button => button.addEventListener('click', playRound));
}

game();



