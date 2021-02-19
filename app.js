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
        headerSelectText.textContent = "Select your weapon:";
        pageContent.appendChild(headerSelectText);
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
    console.log(computerWeapon);
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
        window.setTimeout(removeCwClass, 2500);
        
    });

    
    //removes computer choicie stylings
    function removeCwClass () {
        rockImage.classList.remove('computerWeapon');
        paperImage.classList.remove('computerWeapon');
        scissorsImage.classList.remove('computerWeapon');
        rockImage.classList.remove('playerWeapon');
        paperImage.classList.remove('playerWeapon');
        scissorsImage.classList.remove('playerWeapon');
    }

    //Takes the image click information and plays a round using the image clicked
    function imageClicked(eventData) {
        let clickInformation = eventData;
        if ( clickInformation.target.className = 'image') {
            if (clickInformation.target.alt === "rock") {
                let playerSelection = "rock";
                rockImage.classList.add('image','playerWeapon');
                outcome = playRound(playerSelection, computerPlay());
                //Add winning styling
                if (outcome === "playWin") {
                    rockImage.classList.add('image','playerWeapon','winningWeapon');
                } else if (outcome === "compWin") {
                    rockImage.classList.add('image','winningWeapon');
                }
                
                if (playerScore != 5 && compScore != 5) {
                    whoWon(outcome);
                }

            } else if (clickInformation.target.alt === "paper") {
                let playerSelection = "paper";
                paperImage.classList.add('image','playerWeapon');
                outcome = playRound(playerSelection, computerPlay());

                //Add winning styling
                if (outcome === "playWin") {
                    paperImage.classList.add('image','winningWeapon');
                } else if (outcome === "compWin") {
                    paperImage.classList.add('image','winningWeapon');
                }

                if (playerScore != 5 && compScore != 5) {
                    whoWon(outcome);
                }
                
            } else if (clickInformation.target.alt === "scissors") {
                let playerSelection = "scissors";
                scissorsImage.classList.add('image','playerWeapon');
                outcome = playRound(playerSelection, computerPlay());

                //Add winning styling
                if (outcome === "playWin") {
                    scissorsImage.classList.add('image','winningWeapon');
                } else if (outcome === "compWin") {
                    scissorsImage.classList.add('image','winningWeapon');
                }

                if (playerScore != 5 && compScore != 5) {
                    whoWon(outcome);
                }
            }
        }
    
    }
    
    //Adds points depending upon who won the round
    function whoWon(outcome) {
        if (outcome == "playerWin") {
            playerScore++;
            playerScoreText.textContent = `Player:  ${playerScore}`;
            console.log(outcome);
            scoring(playerScore, compScore);
        } else if (outcome == "compWin") {
            compScore++; 
            compScoreText.textContent = `Computer:  ${compScore}`;
            console.log(outcome);
            scoring(playerScore, compScore);
        } else if (outcome == "tie") {
            console.log(outcome);
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

//Determines who the victor is and executes the corresponding function
function gameEnd(victor) {
    
    if (victor === "player") {
        playerVictory();
    } else if (victor === "computer") {
        computerVictory();
    }
} 

function playerVictory() {
    alert('player')
}  

function computerVictory() {
    alert('computer')
} 

//Plays a round
function playRound(playerSelection, computerSelection) { 
    console.log('started playRound');
    
    if (playerSelection == "rock") {
        if (computerSelection == "paper") {
            return "compWin";
        } else if (computerSelection == "scissors") {
            return "playerWin";
        } else (computerSelection == "rock")
            return "tie"; 

    } else if (playerSelection == "paper") {
        if (computerSelection == "paper") {
            return "tie";
        } else if (computerSelection == "scissors") {
            return "compWin";
        } else (computerSelection == "rock")
            return "playerWin";         
    
    }  else if (playerSelection == "scissors") {
        if (computerSelection == "paper") {
            return "playerWin";
        } else if (computerSelection == "scissors") {
            return "tie";
        } else (computerSelection == "rock")
            return "compWin";
        }
}