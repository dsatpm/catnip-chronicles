import React, { Component } from 'react';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerX: 0,
      playerY: 0,
      isJumping: false,
      jumpHeight: 100, // Adjust jump height as needed
      jumpDuration: 500, // Adjust jump duration (in milliseconds) as needed
      jumpStartY: 0,
      jumpStartTime: 0,
      movementSpeed: 5, // Adjust movement speed as needed
    };

    this.gravity = 0.5; // Adjust gravity as needed
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);

    // Start the game loop
    this.gameLoop();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    cancelAnimationFrame(this.animationFrame);
  }

  handleKeyDown = (event) => {
    switch (event.code) {
      case 'KeyD':
        this.movePlayer('forward');
        break;
      case 'KeyA':
        this.movePlayer('backward');
        break;
      case 'Space':
        if (!this.state.isJumping) {
          this.startJump();
        }
        break;
      default:
        break;
    }
  };

  handleKeyUp = (event) => {
    switch (event.code) {
      case 'KeyD':
      case 'KeyA':
        // Stop player movement or perform any necessary actions
        break;
      default:
        break;
    }
  };

  movePlayer = (direction) => {
    const { playerX, movementSpeed } = this.state;

    if (direction === 'forward') {
      this.setState({ playerX: playerX + movementSpeed });
      // Add logic to prevent moving out of bounds or handle collisions
    } else if (direction === 'backward') {
      this.setState({ playerX: playerX - movementSpeed });
      // Add logic to prevent moving out of bounds or handle collisions
    }
  };

  startJump = () => {
    this.setState({
      isJumping: true,
      jumpStartY: this.state.playerY,
      jumpStartTime: Date.now(),
    });
  };

  updateJump = () => {
    const { isJumping, jumpStartY, jumpHeight, jumpDuration, jumpStartTime } = this.state;

    if (!isJumping) return;

    const timeElapsed = Date.now() - jumpStartTime;
    const normalizedTime = Math.min(1, timeElapsed / jumpDuration);

    const jumpProgress = -4 * (normalizedTime ** 2 - normalizedTime);

    const newY = jumpStartY - jumpHeight * jumpProgress;
    const gravityEffect = this.calculateGravity(timeElapsed);

    const finalY = Math.max(0, newY + gravityEffect);

    if (normalizedTime >= 1) {
      this.setState({
        isJumping: false,
        playerY: 0, // Reset player to ground level
      });
    } else {
      this.setState({
        playerY: finalY,
      });
    }
  };

  calculateGravity = (timeElapsed) => {
    return (this.gravity * timeElapsed) / 100;
  };

  gameLoop = () => {
    this.updateJump();
    // Other game updates and logic can be added here
    this.animationFrame = requestAnimationFrame(this.gameLoop);
  };

  render() {
    const { playerX, playerY } = this.state;

    return (
      <div>
        <h1>Side Scroller Game</h1>
        <div
          style={{
            position: 'relative',
            width: '800px',
            height: '400px',
            backgroundColor: '#ccc',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: playerX,
              bottom: playerY,
              width: '50px',
              height: '50px',
              backgroundColor: 'blue',
            }}
          >
            Player
          </div>
          {/* Other game elements go here */}
        </div>
      </div>
    );
  }
}

export default Game;
