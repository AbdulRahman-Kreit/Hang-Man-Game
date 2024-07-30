// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let letterContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {
    // Create Span
    let span = document.createElement("span");
    
    // Create Letter Text Node
    let theLetter = document.createTextNode(letter);

    // Append Letter To Span
    span.appendChild(theLetter);

    // To Class "letter-box" To Span
    span.className = "letter-box";

    // Append Span To Letters Container
    letterContainer.appendChild(span);
});

// Object Of Words And Categories
const words = {
    Programming: ["Python", "JavaScript", "PHP", "C sharp", "Pascal", "Fortran"],
    Countries: ["Syria", "Egypt", "Qatar", "Latvia", "USA", "Germany", "Yemen", "Palestine"],
    Anime: ["Naruto", "Attack On Titan", "One Piece", "Monster", "Death Note", "Dr Stone", "Ninja Kamui", "Tokyo Revengers", "Tokyo Ghoul", "Ajin"],
    AnimeCharacters: ["Eren", "Levi", "Naruto", "Itachi", "Madara", "Light", "Kei", "Mikasa", "Luffy", "Mikey", "Baji", "Higan", "Draken", "Tenma"],
    Games: ["Mortal Kombat", "Assassins Creed", "Metro", "Call Of Duty", "Battle Field"],
}

// Get Random Property
let allKeys = Object.keys(words);

// Categories
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];

// Words
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomWord = randomPropValue[randomValueNumber];

// Get Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomWord);

// Create Spans Depend On Word
lettersAndSpace.forEach(letter => {
    // Create Span
    let emptySpan = document.createElement("span");

    // Check If Letter Is Space
    if (letter === " ") {
        // Add Class "has-space"
        emptySpan.className = "has-space";
    }

    // Add Span To Guess Container
    lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw
let theDraw = document.querySelector(".hangman-draw");

// Number Of Clicks
let numOfClicks = 0;

// Rank Of Player
let rank = "";

// Handle Clicking On Letters 
document.addEventListener("click", (e) => {
    // Set Status
    let theStatus = false;

    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
        setTimeout(() => {
            e.target.classList.remove("clicked");
        }, 300);
        
        // Get Clicked Letter
        let clickedLetter = e.target.innerHTML.toLowerCase();

        // Chosen Word
        let chosenWord = Array.from(randomWord.toLowerCase());

        chosenWord.forEach((wordLetter, wordIndex) => {

            // Check If The Clicked Letter Is Equal To The One In Chosen Word
            if (clickedLetter === wordLetter) {
                guessSpans.forEach((span, spanIndex) =>{
                    if (wordIndex === spanIndex) {
                        span.innerHTML = wordLetter;
                        // Set Status To Correct
                        theStatus = true;
                        // Increase Clicks By 1
                        numOfClicks++;
                    }
                });
            }
        });

        // Outside Loop
        

        // If Letter Is Wrong 
        if (theStatus !== true) {

            // Increase Wrong Attempts
            wrongAttempts++;

            // Add Class Wrong To Draw
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            // Play Fail Sound Effect
            document.getElementById("fail").play();

            if (wrongAttempts === 8) {
                // Display Lose Screen
                lose();
                letterContainer.classList.add("finished")
            }
        }
        else {
            // Play Success Sound Effect
            document.getElementById("success").play();
            // Display Win Screen And Play Winner Sound Effect
            if (numOfClicks === chosenWord.length) {
                win();
            }
        }
        
        

        
    }
});

// Lose Function
function lose() {
    // Lose Screen
    let loseDiv = document.createElement("div");
    let loseDevText = document.createTextNode(`Game Over! The word is ${randomWord}`);
    loseDiv.className = "lose-screen";
    loseDiv.appendChild(loseDevText);
    document.body.appendChild(loseDiv);

    // Play Loser Sound Effect
    document.getElementById("loser").play();
}

// Win Function
function win() {
    // Ranking 
    if (wrongAttempts === 0) {
        rank = "Legend";
    }
    else if (wrongAttempts >= 1 && wrongAttempts <= 4) {
        rank = "Clever";
    }
    else if (wrongAttempts >= 5 && wrongAttempts <= 7) {
        rank = "Good";
    }
    // Win Screen
    let winDiv = document.createElement("div");
    let winDevText = document.createTextNode(`You Win! Your rank is ${rank}`);
    winDiv.className = "win-screen";
    winDiv.appendChild(winDevText);
    document.body.appendChild(winDiv);

    // Play Loser Sound Effect
    document.getElementById("winner").play();
}