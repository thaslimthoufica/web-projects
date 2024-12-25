// Constants
const NUM_DIGITS = 3;
const MAX_GUESSES = 10;

// Variables
let secretNumber;
let numGuesses;
let gameOver = false;

// DOM Elements
const messageEl = document.getElementById("message");
const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const cluesList = document.getElementById("clues-list");

// Generate a secret number with unique digits
function generateSecretNumber() {
    const numbers = "0123456789".split("");
    numbers.sort(() => Math.random() - 0.5);
    return numbers.slice(0, NUM_DIGITS).join("");
}

// Compare guess and generate clues
function getClues(guess, secret) {
    if (guess === secret) {
        return "🎉 You got it!";
    }
    const clues = [];
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === secret[i]) {
            clues.push("Sambar");
        } else if (secret.includes(guess[i])) {
            clues.push("Pongal");
        }
    }
    return clues.length > 0 ? clues.join(", ") : "Vadai";
}

// Initialize the game
function startGame() {
    secretNumber = generateSecretNumber();
    numGuesses = 0;
    gameOver = false;
    messageEl.textContent = "I'm thinking of a number...";
    cluesList.innerHTML = "";
    guessInput.value = "";
    guessInput.disabled = false;
    submitBtn.disabled = false;
    restartBtn.style.display = "none";
}

// Handle the guess submission
submitBtn.addEventListener("click", () => {
    const guess = guessInput.value;

    if (guess.length !== NUM_DIGITS || isNaN(guess)) {
        messageEl.textContent = `Please enter a ${NUM_DIGITS}-digit number.`;
        return;
    }

    numGuesses++;
    const clues = getClues(guess, secretNumber);
    const clueItem = document.createElement("li");
    clueItem.textContent = `Guess #${numGuesses}: ${guess} - ${clues}`;
    cluesList.appendChild(clueItem);

    if (guess === secretNumber) {
        messageEl.textContent = "🎉 Congratulations! You guessed the number!";
        endGame();
    } else if (numGuesses >= MAX_GUESSES) {
        messageEl.textContent = `Game Over! The correct number was ${secretNumber}.`;
        endGame();
    } else {
        messageEl.textContent = "Keep guessing!";
    }

    guessInput.value = "";
});

// End the game
function endGame() {
    gameOver = true;
    guessInput.disabled = true;
    submitBtn.disabled = true;
    restartBtn.style.display = "inline-block";
}

// Restart the game
restartBtn.addEventListener("click", startGame);

// Start the game on load
startGame();
