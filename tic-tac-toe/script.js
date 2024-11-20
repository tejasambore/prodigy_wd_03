// script.js
const board = document.querySelector("#board");
const cells = document.querySelectorAll("[data-cell]");
const statusMessage = document.querySelector("#statusMessage");
const restartButton = document.querySelector("#restartButton");
const resultModal = document.querySelector("#resultModal");
const resultMessage = document.querySelector("#resultMessage");
const closeModal = document.querySelector("#closeModal");

let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle cell click
const handleCellClick = (e) => {
  const cell = e.target;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin(currentPlayer)) {
    showResult(`${currentPlayer} Wins!`);
  } else if (isDraw()) {
    showResult("It's a Draw!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatusMessage();
  }
};

// Check for a win
const checkWin = (player) => {
  return winningCombinations.some((combination) =>
    combination.every((index) => cells[index].textContent === player)
  );
};

// Check for a draw
const isDraw = () => {
  return [...cells].every((cell) => cell.textContent !== "");
};

// Show result modal
const showResult = (message) => {
  resultMessage.textContent = message;
  resultModal.classList.remove("hidden");
};

// Update status message
const updateStatusMessage = () => {
  statusMessage.textContent = `Player ${currentPlayer}'s Turn`;
};

// Restart the game
const restartGame = () => {
  gameActive = true;
  currentPlayer = "X";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  updateStatusMessage();
  resultModal.classList.add("hidden");
};

// Initialize the game
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick, { once: true });
});
restartButton.addEventListener("click", restartGame);
closeModal.addEventListener("click", restartGame);
updateStatusMessage();
