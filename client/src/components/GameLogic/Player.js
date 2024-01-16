
import { GRAVITY, PLAYER_DIMENSIONS, PLAYER_START_POSITION, PLAYER_SPEED, FRAME_DELAY } from '../../constants/canvas';

class Player {
  constructor() {
    this.frameDelay = FRAME_DELAY;
    this.currentFrameDelay = 0;
    this.speed = PLAYER_SPEED;
    this.position = { ...PLAYER_START_POSITION };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = PLAYER_DIMENSIONS.width;
    this.height = PLAYER_DIMENSIONS.height;
    this.image = new Image();
    this.frames = 0;
    this.sprites = {
    stand: {
      right: new Image(),
      left: new Image(),
    },
    run: {
      right: new Image(),
      left: new Image(),
    }
    };
    this.image.src = '../../assets/Sprites/sprite_idle.png';
    this.sprites.stand.right.src = this.image.src;
    this.sprites.stand.left.src = '../../assets/Sprites/sprite_idle_reverse.png';
    this.sprites.run.right.src = '../../assets/Sprites/sprite_run.png';
    this.sprites.run.left.src = '../../assets/Sprites/sprite_run_reverse.png';
    this.currentSprite = this.sprites.stand.right;
  }

  setAnimation(direction) {
    if (direction === 'right') {
      if (this.currentSprite === this.sprites.stand.right) {
        this.currentSprite = this.sprites.run.right;
      } else if (this.currentSprite === this.sprites.run.left) {
        this.currentSprite = this.sprites.stand.right;
      }
    } else if (direction === 'left') {
      if (this.currentSprite === this.sprites.stand.left) {
        this.currentSprite = this.sprites.run.left;
      } else if (this.currentSprite === this.sprites.run.right) {
        this.currentSprite = this.sprites.stand.left;
      }
    }
  }

// draw(context) {
//   // Draw the current frame of the animation
//   context.drawImage(
//     this.currentSprite,
//     20 * this.frames,
//     0,
//     20,
//     20,
//     this.position.x,
//     this.position.y,
//     this.width,
//     this.height
//   );
//   }
  
  update() {
    this.currentFrameDelay++;

    if (this.currentFrameDelay >= this.frameDelay) {
      this.frames++;
      if (this.frames > 16) this.frames = 0;
      this.currentFrameDelay = 0;
    }

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    // Apply gravity only if the player is above the ground
    if (this.position.y + this.height < canvas.height) {
      this.velocity.y += GRAVITY;
      this.canJump = false; // Player is in the air, so can't jump
    } else {
      this.velocity.y = 0; // Stop vertical movement when on the ground
      this.canJump = true; // Player is on the ground, allow jumping
    }
  }
}

export default Player;
