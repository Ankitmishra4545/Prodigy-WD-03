// script.js

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("resetButton");

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusDisplay.textContent = "It's a tie!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusDisplay.textContent = "Player X's turn";
    cells.forEach(cell => (cell.textContent = ""));
}
