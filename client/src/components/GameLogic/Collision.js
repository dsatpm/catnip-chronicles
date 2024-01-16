import { AUDIO } from '../../constants/canvas';


export function detectCollision(player, platform) {
  const isColliding =
    player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >= platform.position.y &&
    player.position.x + player.width >= platform.position.x &&
    player.position.x <= platform.position.x + platform.width &&
    (!platform.badPlatform || (platform.badPlatform && player.velocity.y > 0));

  if (isColliding) {
    if (platform.badPlatform) {
      // Assuming you have an initializeGame function
      // and an AUDIO.DEATH object in your main game file
      AUDIO.DEATH.play();
      AUDIO.DEATH.addEventListener('ended', function () {
        initializeGame();
      });
    } else {
      player.velocity.y = 0;
      player.canJump = true; // Reset jump when player is on a platform
    }
  }

  return isColliding;
}
