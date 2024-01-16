// BossBattle.js
import React, { useState, useEffect } from 'react';
import './BossBattle.scss'; // Import the SCSS file
const BossBattle = () => {
  const [playerHealth, setPlayerHealth] = useState(5);
  const [bossHealth, setBossHealth] = useState(5);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [status, setStatus] = useState('');
  useEffect(() => {
    updateTurnStatus('Player');
  }, []);
  const playerTurn = (action) => {
    if (isPlayerTurn) {
      performAction('player', action);
      setIsPlayerTurn(false);
      updateTurnStatus('Boss');
      setTimeout(bossTurn, 1000);
    }
  };
  const bossTurn = () => {
    const randomAction = Math.random() < 0.5 ? 'attack' : 'block';
    performAction('boss', randomAction);
    setIsPlayerTurn(true);
    updateTurnStatus('Player');
  };
  const performAction = (entity, action) => {
    const opponent = entity === 'player' ? 'boss' : 'player';
    if (action === 'attack') {
      setStatus(`${entity} attacks ${opponent}!`);
      reduceHealth(opponent, 1);
    } else if (action === 'block') {
      setStatus(`${entity} blocks the attack!`);
    }
    updateHealthDisplay();
    checkGameStatus();
  };
  const reduceHealth = (entity, damage) => {
    if (entity === 'player' && !isPlayerTurn) {
      setPlayerHealth((prevHealth) => prevHealth - damage);
    } else if (entity === 'boss' && isPlayerTurn) {
      setBossHealth((prevHealth) => prevHealth - damage);
    }
  };
  const updateHealthDisplay = () => {
    // Update player health display
    const playerHealthElement = document.getElementById('player-health');
    if (playerHealthElement) {
      playerHealthElement.innerText = `Lucy Purr: ${playerHealth}`;
    }
    // Update boss health display
    const bossHealthElement = document.getElementById('boss-health');
    if (bossHealthElement) {
      bossHealthElement.innerText = `DreadClaw: ${bossHealth}`;
    }
    // Update player health bar
    const playerHealthBarElement = document.getElementById('player-health-bar');
    if (playerHealthBarElement) {
      playerHealthBarElement.style.width = `${(playerHealth / 5) * 100}%`; // Assuming max health is 5
    }
    // Update boss health bar
    const bossHealthBarElement = document.getElementById('boss-health-bar');
    if (bossHealthBarElement) {
      bossHealthBarElement.style.width = `${(bossHealth / 5) * 100}%`; // Assuming max health is 5
    }
  };
  const checkGameStatus = () => {
    if (playerHealth <= 0) {
      endGame('Boss');
    } else if (bossHealth <= 0) {
      endGame('Player');
    }
  };
  const endGame = (winner) => {
    setStatus(`${winner} wins!`);
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
  };
  const updateTurnStatus = (turn) => {
    setStatus(`${turn}'s turn`);
  };
const DeadClawFight = () => {
  return (
    <div className="boss-battle">
      <div className="bottom-container">
        <div className="bottom-left">
          <div className="character-container">
            <p id="player-health">Lucy Purr: {playerHealth}</p>
            <div id="player-health-bar" className="health-bar"></div>
          </div>
        </div>
        <div className="bottom-center">
          <div className="actions-container">
            <button onClick={() => playerTurn('attack')}>Attack</button>
            <button onClick={() => playerTurn('block')}>Block</button>
            <p id="status">{status}</p>
          </div>
        </div>
        <div className="bottom-right">
          <div className="character-container">
            <p id="boss-health">DreadClaw: {bossHealth}</p>
            <div id="boss-health-bar" className="health-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
}
export default BossBattle;





