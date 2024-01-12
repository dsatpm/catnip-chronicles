// Function to generate a random choice for the CPU
function getRandomChoice() {
    const choices = ['attack', 'block'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }
  
  // Function to simulate player's turn
  function playerTurn() {
    const playerChoice = prompt("Choose your action: attack or block").toLowerCase();
    if (playerChoice === 'attack' || playerChoice === 'block') {
      return playerChoice;
    } else {
      alert("Invalid choice! Please choose attack or block.");
      return playerTurn();
    }
  }
  
  // Function to simulate CPU's turn
  function cpuTurn() {
    return getRandomChoice();
  }
  
  // Function to simulate a battle round
  function battleRound(playerAction, cpuAction) {
    if (playerAction === 'attack' && cpuAction === 'block') {
      console.log('Player attacks, CPU blocks. Player deals damage!');
      // Perform actions when player attacks and CPU blocks
    } else if (playerAction === 'block' && cpuAction === 'attack') {
      console.log('Player blocks, CPU attacks. CPU deals damage!');
      // Perform actions when player blocks and CPU attacks
    } else if (playerAction === 'attack' && cpuAction === 'attack') {
      console.log('Both attack! Damage is dealt by both sides.');
      // Perform actions when both player and CPU attack
    } else {
      console.log('Both block. No damage dealt.');
      // Perform actions when both player and CPU block
    }
  }
  
