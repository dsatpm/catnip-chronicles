import React, { useState, useEffect } from 'react';
import { lucypurr, dreadclaw } from '../../assets/index';
import './boss-battle.scss';

const BossBattle = () => {
	// State variables
	const [playerHealth, setPlayerHealth] = useState(5);
	const [bossHealth, setBossHealth] = useState(5);
	const [isPlayerTurn, setIsPlayerTurn] = useState(true);
	const [status, setStatus] = useState('');
	const updateTurnStatus = (turn) => {
		setStatus(`${turn}'s turn!`);
	};

	// Lifecycle hook
	useEffect(() => {
		updateTurnStatus('Player');
	}, []);


	// Game logic functions
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
		// Update health displays and bars
		updateHealthBar(
			'player',
			'Lucy Purr',
			'player-health',
			'player-health-bar'
		);
		updateHealthBar('boss', 'DreadClaw', 'boss-health', 'boss-health-bar');
	};

	const updateHealthBar = (entity, name, healthId, barId) => {
		const healthElement = document.getElementById(healthId);
		const barElement = document.getElementById(barId);
		const health = Math.min(
			5,
			Math.max(0, entity === 'player' ? playerHealth : bossHealth)
		);

		if (healthElement && barElement) {
			healthElement.innerText = `${name}: ${
				entity === 'player' ? playerHealth : bossHealth
			}`;
			barElement.style.width = `${(health / 5) * 100}px`;
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
		const overlay = createOverlay(
			'Congratulations!<br>You have bested DreadClaw! He Has Become DEADCLAW'
		);
		document.body.appendChild(overlay);
		// Remove the overlay after 3 seconds (adjust as needed)
		setTimeout(() => {
			document.body.removeChild(overlay);
		}, 3000);
	};

	const createOverlay = (content) => {
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
		overlay.innerHTML = `<p>${content}</p>`;
		return overlay;
	};

	// Component rendering
	return (
		<section className='boss-battle'>
			<div className='bottom-container'>
				<div>
					<div className='character-container'>
						<img
							src={lucypurr}
							alt='Lucy Purr'
							className='Player'
						/>
						<p id='player-health'>Lucy Purr: {playerHealth}</p>
						<div
							id='player-health-bar'
							className='health-bar'></div>
					</div>
				</div>
				<div>
					<div className='actions-container'>
						<button onClick={() => playerTurn('attack')}>
							Attack
						</button>
						<button onClick={() => playerTurn('block')}>
							Block
						</button>
						<p id='status'>{status}</p>
					</div>
				</div>
				<div>
					<div className='character-container'>
						<img
							src={dreadclaw}
							alt='Dreadclaw'
							className='Boss'
						/>
						<p id='boss-health'>DreadClaw: {bossHealth}</p>
						<div
							id='boss-health-bar'
							className='health-bar'></div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BossBattle;
