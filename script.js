const GOAL = 20;
let score = 0, timeLeft = 30, gameActive = false, timerInterval, spawnInterval;
const winMessages = ["Amazing! You're a clean water hero!", "Fantastic! A new well is on the way!"];
const lossMessages = ["Almost there! Every drop counts.", "Try again! The community needs you."];

function startGame() {
  if (gameActive) return;
  score = 0; timeLeft = 30; gameActive = true;
  document.getElementById('current-cans').innerText = score;
  document.getElementById('achievements').innerText = '';
  timerInterval = setInterval(updateTimer, 1000);
  spawnInterval = setInterval(spawnCan, 1000);
}

function spawnCan() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = '';
  for(let i=0; i<9; i++) grid.appendChild(Object.assign(document.createElement('div'), {className: 'grid-cell'}));
  const cells = document.querySelectorAll('.grid-cell');
  const target = cells[Math.floor(Math.random() * 9)];
  target.innerHTML = `<div class="water-can"></div>`;
  target.onclick = () => { score++; document.getElementById('current-cans').innerText = score; target.innerHTML = ''; };
}

function updateTimer() {
  timeLeft--;
  document.getElementById('timer').innerText = timeLeft;
  if (timeLeft <= 0) endGame();
}

function endGame() {
  gameActive = false; clearInterval(timerInterval); clearInterval(spawnInterval);
  const msg = score >= GOAL ? winMessages[Math.floor(Math.random()*winMessages.length)] : lossMessages[Math.floor(Math.random()*lossMessages.length)];
  document.getElementById('achievements').innerText = msg;
  if (score >= GOAL) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
}

document.getElementById('start-game').onclick = startGame;
