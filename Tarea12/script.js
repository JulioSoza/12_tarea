// Variables globales
let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;
let targetNumber;

// Elementos del DOM
const roundNumberElement = document.getElementById('round-number');
const targetNumberElement = document.getElementById('target-number');
const computerScoreElement = document.getElementById('computer-score');
const humanScoreElement = document.getElementById('human-score');
const guessInput = document.getElementById('guess-input');
const submitGuessButton = document.getElementById('submit-guess');
const nextRoundButton = document.getElementById('next-round');
const resultMessageElement = document.getElementById('result-message');

// Función para generar un número objetivo aleatorio entre 0 y 9
function generateTarget() {
    return Math.floor(Math.random() * 10);
}

// Función para comparar las conjeturas del humano y la computadora
function compareGuesses(humanGuess, computerGuess, target) {
    const humanDiff = Math.abs(humanGuess - target);
    const computerDiff = Math.abs(computerGuess - target);
    return humanDiff <= computerDiff;
}

// Función para actualizar el puntaje
function updateScore(winner) {
    if (winner === 'human') {
        humanScore++;
    } else if (winner === 'computer') {
        computerScore++;
    }
    humanScoreElement.textContent = humanScore;
    computerScoreElement.textContent = computerScore;
}

// Función para avanzar a la siguiente ronda
function advanceRound() {
    currentRoundNumber++;
    roundNumberElement.textContent = currentRoundNumber;
    targetNumber = generateTarget();
    targetNumberElement.textContent = '?';
    guessInput.value = '';
    resultMessageElement.textContent = '';
    nextRoundButton.disabled = true;
    submitGuessButton.disabled = false;
}

// Función para manejar la conjetura del usuario
function handleGuess() {
    const humanGuess = parseInt(guessInput.value);
    const computerGuess = generateTarget();
    const humanWins = compareGuesses(humanGuess, computerGuess, targetNumber);

    updateScore(humanWins ? 'human' : 'computer');
    resultMessageElement.textContent = humanWins ? '¡Ganaste esta ronda!' : 'La computadora ganó esta ronda.';

    submitGuessButton.disabled = true;
    nextRoundButton.disabled = false;
}

// Inicializar el juego
function initGame() {
    targetNumber = generateTarget();
    roundNumberElement.textContent = currentRoundNumber;
    targetNumberElement.textContent = '?';
    humanScoreElement.textContent = humanScore;
    computerScoreElement.textContent = computerScore;
    guessInput.value = '';
    resultMessageElement.textContent = '';
    nextRoundButton.disabled = true;
}

// Event listeners
submitGuessButton.addEventListener('click', handleGuess);
nextRoundButton.addEventListener('click', advanceRound);

// Iniciar el juego al cargar la página
initGame();