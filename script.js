//SAKSHI<*_*>
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const resetBtn = document.querySelector('.reset');
const playerXScoreDisplay = document.getElementById('playerXScore');
const playerOScoreDisplay = document.getElementById('playerOScore');
const playerXNameDisplay = document.getElementById('playerXNameDisplay');
const playerONameDisplay = document.getElementById('playerONameDisplay');
const playerXNameInput = document.getElementById('playerXName');
const playerONameInput = document.getElementById('playerOName');
const restartScoreboardBtn = document.querySelector('.restart-scoreboard');
const pastRecordsList = document.getElementById('pastRecordsList');

//INITIALS
let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let playerXScore = 0;
let playerOScore = 0;
let playerXName = 'Player X';
let playerOName = 'Player O';

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

//DECISION
function handleCellClick(e) {
  const cellIndex = e.target.getAttribute('data-index');

  if (gameState[cellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer === 'X' ? 'neon-red' : 'neon-blue');

  if (checkWin()) {
    statusDisplay.textContent = `${currentPlayer === 'X' ? playerXName : playerOName} wins!`;
    gameActive = false;
    updateScore(currentPlayer);
    addPlayRecord(`${currentPlayer === 'X' ? playerXName : playerOName} wins!`);
    return;
  }

  if (checkDraw()) {
    statusDisplay.textContent = 'Draw!';
    gameActive = false;
    addPlayRecord('Draw!');
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// CHECK FOR WIN
function checkWin() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;

    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return true;
    }
  }

  return false;
}

// CHECK FOR DRAW
function checkDraw() {
  return gameState.every(cell => cell !== '');
}

//RESET
function resetGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('neon-red', 'neon-blue');
  });
}

// UPDATE PLAYER SCORE
function updateScore(winner) {
  if (winner === 'X') {
    playerXScore++;
    playerXScoreDisplay.textContent = playerXScore;
  } else {
    playerOScore++;
    playerOScoreDisplay.textContent = playerOScore;
  }
}

// UPDATE SCOREBOARD OF WINNERS AND DRAW
function addPlayRecord(record) {
  const listItem = document.createElement('li');
  listItem.textContent = record;
  pastRecordsList.appendChild(listItem);
}

//RESTART
function restartScoreboard() {
  playerXScore = 0;
  playerOScore = 0;
  playerXScoreDisplay.textContent = '0';
  playerOScoreDisplay.textContent = '0';
  pastRecordsList.innerHTML = '';
  playerXName = playerXNameInput.value || 'Player X';
  playerOName = playerONameInput.value || 'Player O';
  playerXNameDisplay.textContent = playerXName;
  playerONameDisplay.textContent = playerOName;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
restartScoreboardBtn.addEventListener('click', restartScoreboard);