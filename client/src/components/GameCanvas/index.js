// Get canvas and 2D rendering context
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Set canvas size to match window size
canvas.width = 1024;
canvas.height = 576;

// Gravity constant
const gravity = 2;

// Player class
class Player {
    constructor() {
        // Initial position, velocity, and dimensions
        this.position = {
            x: 100,
            y: 100
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.width = 40;
        this.height = 40;
    }

    // Draw the player on the canvas
    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    // Update player position and apply gravity
    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        // Apply gravity if the player is above the ground
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity;
        else
            this.velocity.y = 0; // Stop falling when reaching the ground
    }
}

const terrainImage = new Image();
terrainImage.src = '/client/src/Images/Terrain/Grass Terrain(16x64).jpg'

// Platform class
class Platform {
    constructor({ x, y }) {
        // Initial position and dimensions
        this.position = {
            x,
            y
        };
        this.height = 40;
        this.width = 400;
        this.image = terrainImage
    }

    // Draw the platform on the canvas
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

// Create player and platform instances
const player = new Player();
const platforms = [
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
]

// Keyboard input state
const keys = {
    right: {
        pressed: false,
    },
    left: {
        pressed: false,
    }
}


let scrollOffset = 0

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw player
    player.update();

    // Draw platforms
    platforms.forEach(platform => {
        platform.draw()
    })

    // Handle horizontal movement based on keyboard input
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5;
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;

        // Move platforms horizontally based on keyboard input
        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })

        } else if (keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
        }
    }
console.log(scrollOffset)
    // Check for collision with the platform and stop vertical movement if colliding
    platforms.forEach((platform) => {
        if (
            player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width
        ) {
            player.velocity.y = 0;
        }
    })
    if (scrollOffset > 3000) {
        console.log('You Win')
    }
}

animate();

// Event listeners for keyboard input
window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65: // Left arrow key
            keys.left.pressed = true;
            break;

        case 87: // Up arrow key
            player.velocity.y -= 25; // Apply upward velocity for jumping
            break;

        case 68: // Right arrow key
            keys.right.pressed = true;
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
            break;

        case 87: // Up arrow key
            break;

        case 68: // Right arrow key
            keys.right.pressed = false;
            break;

        case 82: // Down arrow key
            break;

        case 32: // Space key
            console.log('space');
            break;
    }
});
