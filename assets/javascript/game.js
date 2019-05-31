var playNowButtonHTML = document.getElementById("playNow");
var blankWordsHTML = document.getElementById("currentWordInput");
var lettersGuessedHTML = document.getElementById("lettersGuessedInput");
var guessesRemainingHTML = document.getElementById("guessesRemainingInput");
var winsHTML = document.getElementById("winsInput");
var lossesHTML = document.getElementById("lossesInput");
var perksCheckHTML = document.getElementById("perksCheck");
var equipmentCheckHTML = document.getElementById("equipmentCheck");

var wordBanks = {
    Perks: ["Marathon", "Sleight of Hand", "Scavenger", "Bling", "One Man Army", "Stopping Power", "Lightweight", "Hardline", "Cold Blooded", "Danger Close", "Commando", "Steady Aim", "Scrambler", "Ninja", "SitRep", "Last Stand"],
    Equipment: ["Frag", "Semtex", "Throwing Knife", "Tactical Insertion", "Blast Sheild", "Claymore", "C4", "Stun Grenade", "Flash Grenade", "Smoke Grenade"]
};

var randomNumber;
var pickedWord = [];
var pickedWordPlaceholder = [];
var incorrectLetterBank = [];
var guessedLetterBank = [];

var wins = 0;
var losses = 0;
var guessesLeft = 12;

//game starts off
var gameRunning = false;

//count is specifically for the limitCheckbox function

var count;

//selects a random word from one of the two arrays
function getWords(prop) {
    randomNumber = [Math.floor(Math.random() * wordBanks[prop].length)];
    pickedWord = wordBanks[prop][randomNumber];
    return pickedWord;
}


//sets values to default and picks a new word
function newGame(){
    
    gameRunning = true;
    guessesLeft;
    guessedLetterBank;
    incorrectLetterBank;
    pickedWordPlaceholder;

if (document.getElementById("equipmentCheck").checked) {
        pickedWord = getWords("Equipment");
            } else {
                pickedWord = getWords("Perks");
            }
        
        //create placeholder underscores for new word, excluding spaces
        for (let i=0; i < pickedWord.length; i++) {
            if (pickedWord[i] === ' ') {
                pickedWordPlaceholder.push("\xa0\xa0\xa0");
            } else {
            pickedWordPlaceholder.push("_");
        }
    }

        guessesRemainingHTML.textContent = guessesLeft;
        blankWordsHTML.textContent = pickedWordPlaceholder.join(" ");
        lettersGuessedHTML.textContent = guessedLetterBank;
};

playNowButtonHTML.addEventListener("click", newGame);

// Only allows one checkbox to be clicked

function limitCheckbox(id, max, checkId) {
    console.log("I got here 1")
    var count = 0,
        i;
    var checkboxes = document.getElementById(id);
    for (i = 0; i < checkboxes.length; i += 1) {
        console.log("I got here 2")
        if (checkboxes[i].checked) {
            count++;
		}
	}	 
    if (count > max) {
        // alert("Please select only one Word Bank.");
        document.getElementById(checkId).checked = false;
        
    }
};

perksCheckHTML.addEventListener("click", () => limitCheckbox("wordBanksHTML", 1, "equipmentCheck"));
equipmentCheckHTML.addEventListener("click", () => limitCheckbox("wordBanksHTML", 1, "perksCheck"));




