// Game configuration and state variables
const GOAL_CANS = 20;        // Requirement: Collect 20 items
let currentCans = 0;         
let timeLeft = 30;           // Requirement: 30-second timer
let gameActive = false;      
let spawnInterval;          
let timerInterval;

// Requirement: Arrays for randomized end-game messages
const winMessages = [
  "Incredible! You've funded a clean water project!",
  "Success! You're making a splash for global health!",
  "Amazing! Your speed is bringing clean water to those in need!"
];

const lossMessages = [
  "Don't give up! Every drop counts.",
  "Almost there! Try again to help build the well.",
  "The mission continues. Let's try for 20 again!"
];

// Creates the 3x3 game grid
function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = ''; 
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell'; 
    grid.appendChild(cell);
  }
}

createGrid();

// Spawns a new item and handles the click event
function spawnWaterCan() {
  if (!gameActive) return; 
  const cells = document.querySelectorAll('.grid-cell');
  
  cells.forEach(cell => (cell.innerHTML = ''));

  const randomCell = cells[Math.floor(Math.random() * cells.length)];

  randomCell.innerHTML = `
    <div class="water-can-wrapper">
      <div class="water-can"></div>
    </div>
  `;

  // Requirement: Update score +1 point for each can clicked
  randomCell.querySelector('.water-can').addEventListener('click', function() {
    if (!gameActive) return;
    currentCans++;
    document.getElementById('current-cans').innerText = currentCans;
    this.parentElement.remove(); // Remove can immediately after click
  });
}

// Requirement: Add a 30-second timer
function startCountdown() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// Initializes and starts a new game
function startGame() {
  if (gameActive) return; 
  
  // Reset variables for a fresh game
  currentCans = 0;
  timeLeft = 30;
  gameActive = true;
  
  document.getElementById('current-cans').innerText = currentCans;
  document.getElementById('timer').innerText = timeLeft;
  document.getElementById('achievements').innerText = ''; // Clear old messages
  
  createGrid(); 
  startCountdown();
  spawnInterval = setInterval(spawnWaterCan, 1000); 
}

// Requirement: Display message and handle win/loss logic
function endGame() {
  gameActive = false; 
  clearInterval(spawnInterval); 
  clearInterval(timerInterval);

  const display = document.getElementById('achievements');
  
  // Logic: Score 20+ wins, less than 20 loses
  if (currentCans >= GOAL_CANS) {
    const randomWin = winMessages[Math.floor(Math.random() * winMessages.length)];
    display.innerText = `WIN: ${randomWin}`;
    
    // LevelUp: Celebrate Wins bonus (Confetti)
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  } else {
    const randomLoss = lossMessages[Math.floor(Math.random() * lossMessages.length)];
    display.innerText = `TRY AGAIN: ${randomLoss}`;
  }
}

document.getElementById('start-game').addEventListener('click', startGame);
