// 1. Detect when the start button is clicked and load the main game page content
document.getElementById("startButton").onclick = loadStart;        
function loadStart () {
    let alreadyClicked = document.getElementById("selectText"); 
    if (alreadyClicked === null) {   
        addSelectText();
        addImages();
        appendScores();
        deleteButton();
        beginGame();
    } else {
        console.log('fail');
    }
}
//End 1.

// 2. Functions to load the main game elements
function addSelectText () {
    const selectText = document.createElement('div');
        selectText.id = "selectText";
        pageContent.appendChild(selectText);
        const headerSelectText = document.createElement('h2');
        headerSelectText.id = "headerSelectText";
        headerSelectText.textContent = "Select your weapon:";
        selectText.appendChild(headerSelectText);
}    

function addImages() {
    const images = document.createElement('div');
    images.id = "images";
    pageContent.appendChild(images);

    const rockImage = document.createElement('img');
    rockImage.id = "rockImage";
    rockImage.src="images/rock.png";
    rockImage.className="image"
    rockImage.alt = "rock";
    images.appendChild(rockImage);

    const paperImage = document.createElement('img');
    paperImage.id = "paperImage";
    paperImage.src = "images/paper.png";
    paperImage.className = "image"
    paperImage.alt = "paper";
    images.appendChild(paperImage);

    const scissorsImage = document.createElement('img');
    scissorsImage.id = "scissorsImage";
    scissorsImage.src = "images/scissors.png";
    scissorsImage.className = "image";
    scissorsImage.alt = "scissors";
    images.appendChild(scissorsImage);
}

function appendScores () {
    const scoreArea = document.createElement('div');
    scoreArea.id = "scoreArea";
    pageContent.appendChild(scoreArea);
    
    const scoreNumbers = document.createElement('div');
    scoreNumbers.id = "scoreNumbers";
    scoreArea.appendChild(scoreNumbers);

    const playerScoreText = document.createElement('h1');
    playerScoreText.id = "playerScoreText";
    playerScoreText.textContent = `Player:  ${0}`;
    scoreNumbers.appendChild(playerScoreText);

    const compScoreText = document.createElement('h1');
    compScoreText.id = "compScoreText";
    compScoreText.textContent = `Computer:  ${0}`;
    scoreNumbers.appendChild(compScoreText);
}

function deleteButton() {
    let deleteMe = document.getElementById("startDiv");
    deleteMe.remove();
}
//End 2.

//Function that outputs a random decision of rock paper or scissors
function computerPlay() {
    let computerOptions = ["rock","paper","scissors"];
    let computerChoice = Math.floor(Math.random() * computerOptions.length);
    computerWeapon = computerOptions[computerChoice]
    if (computerWeapon === "rock") {
        rockImage.classList.add('image','computerWeapon');
    } else if (computerWeapon === "paper") {
        paperImage.classList.add('image', 'computerWeapon');
    } else if (computerWeapon === "scissors") {
        scissorsImage.classList.add('image', 'computerWeapon');
    }
    return computerWeapon;
}


function beginGame () {
    let playerScore = 0;
    let compScore = 0;
    let outcome = "";  
    
    //Detects when an image is clicked
    images.addEventListener('click', event => {
        let eventData = event;
        imageClicked(eventData);
        
    });

    
    //removes computer choicie stylings
    function removeCwClass () {
        let rockCheck = document.getElementById('rockImage');
        if (rockCheck !== null) {
            rockImage.classList.remove('computerWeapon');
            paperImage.classList.remove('computerWeapon');
            scissorsImage.classList.remove('computerWeapon');
            rockImage.classList.remove('playerWeapon');
            paperImage.classList.remove('playerWeapon');
            scissorsImage.classList.remove('playerWeapon');
        }
    }

    //Takes the image click information and plays a round using the image clicked
    function imageClicked(eventData) {
        let clickInformation = eventData;
        if ( clickInformation.target.className = 'image') {
            if (clickInformation.target.alt === "rock") {
                let playerSelection = "rock";
                rockImage.classList.add('image','playerWeapon');
                outcome = playRound(playerSelection, computerPlay());
                
                if (playerScore != 5 && compScore != 5) {
                    whoWon(outcome);
                    
                }

            } else if (clickInformation.target.alt === "paper") {
                let playerSelection = "paper";
                paperImage.classList.add('image','playerWeapon');
                outcome = playRound(playerSelection, computerPlay());

                if (playerScore != 5 && compScore != 5) {
                    whoWon(outcome);
                    
                }
                
            } else if (clickInformation.target.alt === "scissors") {
                let playerSelection = "scissors";
                scissorsImage.classList.add('image','playerWeapon');
                outcome = playRound(playerSelection, computerPlay());

                if (playerScore != 5 && compScore != 5) {
                    whoWon(outcome);
                    
                }
            }
        }
    
    }
    
    //Adds points depending upon who won the round
    function whoWon(outcome) {
        let rockCheck = document.getElementsByName('rockImage');
        if (outcome == "playerWin") {
            playerScore++;
            playerScoreText.textContent = `Player:  ${playerScore}`;
            scoring(playerScore, compScore);
            if (rockCheck != null) {
                window.setTimeout(removeCwClass, 1500);
            } 
            
        } else if (outcome == "compWin") {
            compScore++; 
            compScoreText.textContent = `Computer:  ${compScore}`;
            scoring(playerScore, compScore);
            if (rockCheck != null) {
                window.setTimeout(removeCwClass, 1500);
            } 
        } else if (outcome == "tie") {
            if (rockCheck != null) {
                window.setTimeout(removeCwClass, 1500);
            } 
        }
    }
}


//declares a victor if one score is equal to 5
function scoring(playerScore, compScore) {
    if (playerScore === 5) {
        let victor = "player";
        gameEnd(victor);
    } else if (compScore === 5) {
        let victor = "computer";
        gameEnd(victor);
    } else {
        
    }

    
}

//Capitalizes the first letter
function capitalize(toCap)  {  
    let capitalLetter = toCap.toUpperCase();
    capitalLetter = capitalLetter.slice(0,1);
    
    let lowerLetter = toCap.toLowerCase();
    lowerLetter = toCap.slice(1);
    
    properCap = capitalLetter.concat(lowerLetter);
    return properCap;
}

//Outputs the winner of the round to the screen
function roundWinner (playerSelection, computerSelection, victor) {
    let doesExist = checkForRoundScore();
    if (doesExist = "doesExist") {
        if (victor == "tie") {
            roundOutcome.textContent = `It's a tie, you both chose ${playerSelection}.`;
            roundPlayerChoice.textContent = `Player choice: ${capitalize(playerSelection)}`;
            roundComputerChoice.textContent = `Computer choice: ${capitalize(computerSelection)}`;
        } else if (victor == "compWin") {
            if (playerSelection == "rock" && computerSelection =="paper")  {
                roundOutcome.textContent = `The computer wins. ${capitalize(computerSelection)} beats ${playerSelection}.`;
                roundPlayerChoice.textContent = `Player choice: ${capitalize(playerSelection)}`;
                roundComputerChoice.textContent = `Computer choice: ${capitalize(computerSelection)}`;
            } else if (playerSelection == "paper" && computerSelection == "scissors") {
                roundOutcome.textContent = `The computer wins. ${capitalize(computerSelection)} beat ${playerSelection}.`; 
                roundPlayerChoice.textContent = `Player choice: ${capitalize(playerSelection)}`;
                roundComputerChoice.textContent = `Computer choice: ${capitalize(computerSelection)}`;
            } else if (playerSelection == "scissors" && computerSelection == "rock") {
                    roundOutcome.textContent = `The computer wins. ${capitalize(computerSelection)} beats ${playerSelection}.`;
                    roundPlayerChoice.textContent = `Player choice: ${capitalize(playerSelection)}`;
                    roundComputerChoice.textContent = `Computer choice: ${capitalize(computerSelection)}`;
            }
        } else if (victor == "playerWin") {
            if (playerSelection == "rock" && computerSelection =="scissors")  {
                roundOutcome.textContent = `You win! ${capitalize(playerSelection)} beats ${computerSelection}.`;
                roundPlayerChoice.textContent = `Player choice: ${capitalize(playerSelection)}`;
                roundComputerChoice.textContent = `Computer choice: ${capitalize(computerSelection)}`;
            } else if (playerSelection == "paper" && computerSelection == "rock") {
                roundOutcome.textContent = `You win! ${capitalize(playerSelection)} beats ${computerSelection}.`;
                roundPlayerChoice.textContent = `Player choice: ${capitalize(playerSelection)}`;
                roundComputerChoice.textContent = `Computer choice: ${capitalize(computerSelection)}`;
            } else if (playerSelection == "scissors" && computerSelection == "paper") {
                    roundOutcome.textContent = `You win! ${capitalize(playerSelection)} beat ${computerSelection}.`;
                    roundPlayerChoice.textContent = `Player choice: ${capitalize(playerSelection)}`;
                    roundComputerChoice.textContent = `Computer choice: ${capitalize(computerSelection)}`;
            }
        }
    }
}

//Checks to see if the round scoring content exists and adds the div if it doesn't
function checkForRoundScore () {
    let locateRound = document.getElementById('roundOutcome');
    if (locateRound === null) {
        const outcomeHolder = document.createElement('div');
        outcomeHolder.id = "outcomeHolder";
        pageContent.appendChild(outcomeHolder);  
        
        let roundOutcome = document.createElement('h2');
        roundOutcome.id = 'roundOutcome';
        roundOutcome.textContent = "Test1";
        outcomeHolder.appendChild(roundOutcome);

        let roundPlayerChoice = document.createElement('h2');
        roundPlayerChoice.id = 'roundPlayerChoice';
        roundPlayerChoice.className = 'choiceText';
        roundPlayerChoice.textContent = "Player choice:";
        outcomeHolder.appendChild(roundPlayerChoice);

        let roundComputerChoice = document.createElement('h2');
        roundComputerChoice.id = 'roundComputerChoice';
        roundComputerChoice.className = 'choiceText';
        roundComputerChoice.textContent = "Computer choice:";
        outcomeHolder.appendChild(roundComputerChoice);  

    }  else if (locateRound !== null) {
        let doesExist = "doesExist";
        return doesExist;
    }
}

//Determines who the victor is and executes the corresponding function
function gameEnd(victor) {
    
    if (victor === "player") {
        playerVictory();
    } else if (victor === "computer") {
        computerVictory();
    }
} 

//Executes if the player wins
function playerVictory() {
    deleteGame();
    createEndText ();
    endText.textContent = "Congratulations, you have beaten the machines!"
    createPlayAgain();
}  

//Executes if the computer wins
function computerVictory() {
    deleteGame();
    createEndText ();
    endText.textContent = "The machines have won, the earth is lost..."
    createPlayAgain();
}

//Creates the text that indicates the winner of the game
function createEndText () {
    const endTextHolder = document.createElement('div');
    endTextHolder.id = "endTextHolder";
    pageContent.appendChild(endTextHolder);

    const endText = document.createElement('h1');
    endText.id = "endText";
    endTextHolder.appendChild(endText);
}

//Removes page content at the end of the game
function deleteGame() {
    let deleteMe = document.getElementById("images");
    deleteMe.remove();
    
    deleteMe = document.getElementById("selectText");
    deleteMe.remove();
    
    deleteMe = document.getElementById("outcomeHolder");
    deleteMe.remove();

}

//Creates the play again button
function createPlayAgain () {
    const playAgainHolder = document.createElement('div');
    playAgainHolder.id  = "playAgainHolder";
    playAgainHolder.className = "buttonStyle";
    pageContent.appendChild(playAgainHolder);

    const playAgainButton = document.createElement('button');
    playAgainButton.id = "playAgainButton";
    playAgainButton.className = "button";
    playAgainButton.textContent = "Play Again?"
    playAgainHolder.appendChild(playAgainButton);

    document.getElementById("playAgainButton").onclick = playAgain;
}



function playAgain () {
    resetPage();
}

function resetPage() {
    let deleteMe = document.getElementById("scoreArea");
    deleteMe.remove();

    deleteMe = document.getElementById("endTextHolder");
    deleteMe.remove();

    deleteMe = document.getElementById("playAgainHolder");
    deleteMe.remove();

    const startDiv = document.createElement('div');
    startDiv.id = "startDiv";
    startDiv.className = "buttonStyle";
    pageContent.appendChild(startDiv);

    loadStart();
}

//Plays a round
function playRound(playerSelection, computerSelection) { 
    if (playerSelection == "rock") {
        if (computerSelection == "paper") {
            roundWinner(playerSelection, computerSelection, "compWin");
            return "compWin";
            
        } else if (computerSelection == "scissors") {
            roundWinner(playerSelection, computerSelection, "playerWin");
            return "playerWin";
        } else (computerSelection == "rock")
            roundWinner(playerSelection, computerSelection, "tie");    
            return "tie"; 

    } else if (playerSelection == "paper") {
        if (computerSelection == "paper") {
            roundWinner(playerSelection, computerSelection, "tie");
            return "tie";
        } else if (computerSelection == "scissors") {
            roundWinner(playerSelection, computerSelection, "compWin");
            return "compWin";
        } else (computerSelection == "rock")
            roundWinner(playerSelection, computerSelection, "playerWin");    
            return "playerWin";         
    
    }  else if (playerSelection == "scissors") {
        if (computerSelection == "paper") {
            roundWinner(playerSelection, computerSelection, "playerWin");
            return "playerWin";
        } else if (computerSelection == "scissors") {
            roundWinner(playerSelection, computerSelection, "tie");
            return "tie";
        } else (computerSelection == "rock")
            roundWinner(playerSelection, computerSelection, "compWin");    
            return "compWin";
        }
}