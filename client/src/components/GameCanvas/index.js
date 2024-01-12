// Get canvas and 2D rendering context
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Set canvas size to match window size
canvas.width = 3840;   //1024
canvas.height = 640;   //576

// Gravity constant
const gravity = 1;

const idleImage = new Image();
idleImage.src = '/client/src/assets/Sprites/Idle.png'

const reversedIdleImage = new Image();
reversedIdleImage.src = '/client/src/assets/Sprites/Idle(reversed).png'

const runImage = new Image();
runImage.src = '/client/src/assets/Sprites/RunningSprite.png'

const reverseRunImage = new Image();
reverseRunImage.src = '/client/src/assets/Sprites/RunningSprite(reversed).png'


function startGame() {
// Player class
class Player {
    constructor() {
        this.speed = 2;
        // Initial position, velocity, and dimensions
        this.position = {
            x: 1500,
            y: 100
        };
        this.velocity = {
            x: 0,
            y: 0
        };

        this.width = 30;
        this.height = 30;

        this.image = idleImage
        this.frames = 0;
        this.sprites = {
            stand: {
             right: idleImage,
             left: reversedIdleImage
            },
            run: {
             right: runImage,
             left: reverseRunImage
            }
        };
        this.currentSprite = this.sprites.stand.right
    }


    // Draw the player on the canvas
    draw() {

        c.drawImage(
            this.currentSprite,
            20 * this.frames,
            0,
            20, 
            20,
            this.position.x,
            this.position.y,
            this.width,
            this.height

        )

    }

    // Update player position and apply gravity
    update() {
        this.frames++
        if (this.frames > 16) this.frames = 0
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        // Apply gravity only if the player is above the ground
        if (this.position.y + this.height < canvas.height) {
            this.velocity.y += gravity;
            this.canJump = false; // Player is in the air, so can't jump
        } else {
            this.velocity.y = 0; // Stop vertical movement when on the ground
            this.canJump = true; // Player is on the ground, allow jumping
        }
    }
}

const terrainImage = new Image();
terrainImage.src = '/client/src/Images/Terrain/Grass Terrain(16x64).jpg';

// Platform class
class Platform {
    constructor({ x, y }) {
        // Initial position and dimensions
        this.position = {
            x,
            y
        };
        this.height = 20;
        this.width = 100;
        this.image = terrainImage;
    }

    // Draw the platform on the canvas
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

let player = new Player();
let platforms = [
    new Platform({
        x: 1500,
        y: 536
    }),
    new Platform({
        x: -400,
        y: 536
    }),
    new Platform({
        x: -800,
        y: 536
    })
];

let currentKey
// Keyboard input state
const keys = {
    right: {
        pressed: false,
    },
    left: {
        pressed: false,
    }
};

let scrollOffset = 0;

function init() {
    // Create player and platform instances
    player = new Player();
    platforms = [
        new Platform({
            x: 0,
            y: 536
        }),
        new Platform({
            x: 400,
            y: 536
        }),
        new Platform({
            x: 800,
            y: 536
        })
    ];
    scrollOffset = 0;
}

// Collision detection function between player and platforms
function detectCollision(player, platform) {
    return (
        player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >= platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width
    );
}
const backgroundImage = new Image();
backgroundImage.src = '/client/src/assets/catnipChroniclesLevel0(copy).jpg';

let offsetX = 1400;
// Animation loop
function animate() {
    requestAnimationFrame(animate);

    const backgroundX = (-scrollOffset + offsetX) % backgroundImage.width;
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(backgroundImage, backgroundX, 0, canvas.width, canvas.height);

    // Update and draw player
    player.update();

    // Draw platforms
    platforms.forEach(platform => {
        platform.draw()
    })

    // Handle horizontal movement based on keyboard input
    if (keys.right.pressed && player.position.x < 1700) {
        player.velocity.x = player.speed;
    } else if (keys.left.pressed && player.position.x > 1500) {
        player.velocity.x = -player.speed;
    } else {
        player.velocity.x = 0;

        // Move platforms horizontally based on keyboard input
        if (keys.right.pressed) {
            scrollOffset += player.speed;
            platforms.forEach(platform => {
                platform.position.x -= player.speed;
            });

        } else if (keys.left.pressed) {
            scrollOffset -= player.speed;
            platforms.forEach(platform => {
                platform.position.x += player.speed;
            });
        }
    }

    // Check for collision with the platform and stop vertical movement if colliding
    platforms.forEach((platform) => {
        if (detectCollision(player, platform)) {
            player.velocity.y = 0;
            player.canJump = true; // Reset jump when player is on a platform
        }
    })

    if (
        keys.right.pressed && currentKey === 'right' && player.currentSprite !== player.sprites.run.right
    ) {
        player.currentSprite = player.sprites.run.right
    } else if (keys.left.pressed && currentKey === 'left' && player.currentSprite !== player.sprites.run.left
    ) {
        player.currentSprite = player.sprites.run.left
    } else if (!keys.left.pressed && currentKey === 'left' && player.currentSprite !== player.sprites.run.left
    ) {
        player.currentSprite = player.sprites.stand.left
    } else if (!keys.right.pressed && currentKey === 'right' && player.currentSprite !== player.sprites.run.left
    ) {
        player.currentSprite = player.sprites.stand.right
    }

    // win Condition
    if (scrollOffset > 3000) {
        console.log('You Win');
    }

    if (player.position.y > canvas.height) {
        init();
        console.log('GG, You kinda suck!');
    }
}

animate();




// Event listeners for keyboard input
window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65: // Left arrow key
            keys.left.pressed = true;
            currentKey = 'left'
            break;

        case 87: // W key for jumping
            if (player.canJump) {
                player.velocity.y = -12; // Apply upward velocity for jumping
                player.canJump = false; // Update jump flag
            }
            break;

        case 68: // Right arrow key
            keys.right.pressed = true
            currentKey = 'right'
            break;

        case 82: // Down arrow key
            break;

        case 32: // Space key
            console.log('space');
            break;
    }
});

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65: // Left arrow key
            keys.left.pressed = false;
            player.currentSprite = player.sprites.stand.left
            break;

        case 87: // W key
            break;

        case 68: // Right arrow key
            keys.right.pressed = false;
            player.currentSprite = player.sprites.stand.right
            break;

        case 82: // Down arrow key
            break;

        case 32: // Space key
            console.log('space');
            break;
    }
});


}

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);