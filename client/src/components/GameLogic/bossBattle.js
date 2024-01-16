let playerHealth = 5;
let bossHealth = 5;
let isPlayerTurn = true;

function playerTurn(action) {
  if (isPlayerTurn) {
    performAction('player', action);
    isPlayerTurn = false;
    updateTurnStatus('Boss');
    setTimeout(bossTurn, 1000); // 1-second delay before the boss's turn
  }
}

function bossTurn() {
  const randomAction = Math.random() < 0.5 ? 'attack' : 'block';
  performAction('boss', randomAction);
  isPlayerTurn = true;
  updateTurnStatus('Player');
}

function performAction(entity, action) {
  const opponent = entity === 'player' ? 'boss' : 'player';

  if (action === 'attack') {
    document.getElementById('status').innerText = `${entity} attacks ${opponent}!`;
    reduceHealth(opponent, 1); // Deal 1 damage to the opponent
  } else if (action === 'block') {
    document.getElementById('status').innerText = `${entity} blocks the attack!`;
    // Block prevents damage during the turn, no HP reduction
  }

  updateHealthDisplay();
  checkGameStatus();
}

function reduceHealth(entity, damage) {
  if (entity === 'player' && !isPlayerTurn) {
    // If the boss attacks during its turn, player takes damage
    playerHealth -= damage;
  } else if (entity === 'boss' && isPlayerTurn) {
    // If the player attacks during its turn, boss takes damage
    bossHealth -= damage;
  }
}

function updateHealthDisplay() {
  document.getElementById('player-health').innerText = `Player Health: ${playerHealth}`;
  document.getElementById('boss-health').innerText = `Boss Health: ${bossHealth}`;
}

function checkGameStatus() {
  if (playerHealth <= 0) {
    endGame('Boss');
  } else if (bossHealth <= 0) {
    endGame('Player');
  }
}

function endGame(winner) {
  document.getElementById('status').innerText = `${winner} wins!`;
  document.querySelectorAll('button').forEach(button => button.disabled = true);

  // Create a full-page overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  overlay.style.color = 'white';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.fontSize = '24px';
  overlay.innerHTML = `<p>Congratulations!<br>You have bested DreadClaw! Now He's DeadClaw</p>`;

  document.body.appendChild(overlay);

  // Remove the overlay after 3 seconds (adjust as needed)
  setTimeout(() => {
    document.body.removeChild(overlay);
  }, 3000);
}

function updateTurnStatus(turn) {
  document.getElementById('status').innerText = `${turn}'s turn`;
}

