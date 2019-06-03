//Interaction with the DOM

let playNowButtonHTML = document.getElementById("playNow");
let blankWordsHTML = document.getElementById("currentWordInput");
let lettersGuessedHTML = document.getElementById("lettersGuessedInput");
let guessesRemainingHTML = document.getElementById("guessesRemainingInput");
let winsHTML = document.getElementById("winsInput");
let lossesHTML = document.getElementById("lossesInput");
let perksCheckHTML = document.getElementById("perksCheck");
let equipmentCheckHTML = document.getElementById("equipmentCheck");
let incorrectLettersHTML = document.getElementById("incorrectLettersInput");

//Words/Arrays
let wordBanks = {
    Perks: ["marathon", "sleight of hand", "scavenger", "bling", "one man army", "stopping power", "lightweight", "hardline", "cold blooded", "danger close", "commando", "steady aim", "scrambler", "ninja", "sitrep", "last stand"],
    Equipment: ["frag", "semtex", "throwing knife", "tactical insertion", "blast sheild", "claymore", "stun grenade", "flash grenade", "smoke grenade"]
};

let randomNumber;
let pickedWord = [];
let pickedWordPlaceholder = [];
let incorrectLetterBank = [];
let guessedLetterBank = [];

let keyPressed = KeyboardEvent.key;

//game stats
let wins = 0;
let losses = 0;
let guessesLeft = 12;

//game starts off
let gameRunning = false;



//selects a random word from one of the two arrays
function getWords(prop) {
    randomNumber = [Math.floor(Math.random() * wordBanks[prop].length)];
    pickedWord = wordBanks[prop][randomNumber];
    return pickedWord;
}


//sets values to default and picks a new word
function newGame(){
    
    gameRunning = true;
    guessesLeft = 12;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholder = [];

if (document.getElementById("equipmentCheck").checked) {
        pickedWord = getWords("Equipment");
        document.getElementById("imThinking").innerHTML = "I'm thinking of a pice of Equipment!";
            } else {
                pickedWord = getWords("Perks");
                document.getElementById("imThinking").innerHTML = "I'm thinking of a Perk!";
            }
        
        //create placeholder underscores for new word, excluding spaces
        for (let i=0; i < pickedWord.length; i++) {
            if (pickedWord[i] === ' ') {
                pickedWordPlaceholder.push("\xa0");
            } else {
            pickedWordPlaceholder.push("_");
        }
    }
        guessesRemainingHTML.textContent = guessesLeft;
        blankWordsHTML.textContent = pickedWordPlaceholder.join(" ");
        lettersGuessedHTML.textContent = guessedLetterBank;
        incorrectLettersHTML.textContent = incorrectLetterBank;
};

playNowButtonHTML.addEventListener("click", () => (gameRunning) ? alert("Please guess the word, or run out of guesses to get a new word.") : newGame());

// Only allows one checkbox to be clicked

function limitCheckbox(id, max, checkId) {
    let count = 0;
    let checkboxes = document.getElementById(id);
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            count++;
		}
	}	 
    if (count > max) {
        // alert("Please select only one Word Bank.");
        document.getElementById(checkId).checked = false;
        if (gameRunning) {
            newGame();
        }
        
        
    }
};

perksCheckHTML.addEventListener("click", () => limitCheckbox("wordBanksHTML", 1, "equipmentCheck"));
equipmentCheckHTML.addEventListener("click", () => limitCheckbox("wordBanksHTML", 1, "perksCheck"));



function userGuessed(letter) {
    
    //pushes letter to guess letter bank if it isn't there already
    if (gameRunning && guessedLetterBank.indexOf(letter) === -1) {
        guessedLetterBank.push(letter);
        lettersGuessedHTML.textContent = guessedLetterBank.join(" ");
    } else if (!gameRunning) {
            alert("Press Play Now to get started!");
    }
    //checks if the complete word is guessed, then array to see if letter matches at any index, if not pushed to incorrect letter bank
    if (pickedWord.indexOf(letter) === -1 && incorrectLetterBank.indexOf(letter) === -1) {
        incorrectLetterBank.push(letter);
        incorrectLettersHTML.textContent = incorrectLetterBank.join(" ");
        guessesLeft--;
        guessesRemainingHTML.textContent = guessesLeft;
            setTimeout(() => {if  (guessesLeft <= 0) {
                alert("You lost! The correct word was: " + pickedWord)
                losses++;
                lossesHTML.textContent = losses;
                newGame();
            }}, 100);
    } else { //iterates through picked word to see if the letter is in it and replaces it
        for (let i=0; i < pickedWord.length; i++) {
            if (pickedWord[i] === letter.toLowerCase()) {
                    pickedWordPlaceholder[i] = letter;
                    blankWordsHTML.textContent = pickedWordPlaceholder.join("");
                };
            }
        }
    
        setTimeout(() => { if (pickedWord === pickedWordPlaceholder.join('').replace(/\xa0/g, '\u0020')) {
        alert('You won!');
        wins++;
        winsHTML.textContent = wins;
        newGame(); 
    }}, 100);


};

// onkeydown event triggers userGuessed
document.onkeydown = function (event) {

    if (event.keyCode > 64 && event.keyCode < 91) {
        userGuessed(event.key);
    } else {
        
    }
}