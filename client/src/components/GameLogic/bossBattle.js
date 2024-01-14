let playerHealth = 5;
  let bossHealth = 5;
  let isPlayerTurn = true;

  function playerTurn(action) {
    if (isPlayerTurn) {
      performAction('player', action);
      isPlayerTurn = false;
      updateTurnStatus('Boss');
      setTimeout(bossTurn, 1000);
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
      if (entity === 'player') {
        reduceHealth(opponent);
      }
    } else if (action === 'block') {
      document.getElementById('status').innerText = `${entity} blocks the attack!`;
    }

    updateHealthDisplay();
    checkGameStatus();
  }

  function reduceHealth(entity) {
    if (entity === 'player') {
      if (isPlayerTurn) {
        playerHealth--;
      }
    } else if (entity === 'boss') {
      bossHealth--;
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
  }

  function updateTurnStatus(turn) {
    document.getElementById('status').innerText = `${turn}'s turn`;
  }
