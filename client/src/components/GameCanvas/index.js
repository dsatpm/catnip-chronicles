// Get canvas and 2D rendering context
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Set canvas size to match window size
canvas.width = 3840;   //3840
canvas.height = 640;   //640 

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


//function startGame() {
// Player class
class Player {
    constructor() {
        this.speed = 2;
        // Initial position, velocity, and dimensions
        this.position = {
            x: 1425,                //1425 Start position
            y: 470,
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
terrainImage.src = '/catnip-chronicles/client/src/Images/Terrain/Grass Terrain(16x64).jpg';

// Platform class
class Platform {
    constructor({ x, y, width, height, badPlatform = false}) {
        // Initial position and dimensions
        this.position = {
            x,
            y
        };
        this.height = height;
        this.width = width;
        this.badPlatform = badPlatform;
    }

    // Draw the platform on the canvas
    draw() {
        c.fillStyle = 'rgba(0, 0, 0, 0)';        //Clear ->   c.fillStyle = 'rgba(0, 0, 0, 0)';    -> black  c.fillStyle = 'black';  
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

let player = new Player();
let platforms = [
    new Platform({          //Long Boy #1 Area
        x: 1400,
        y: 513,
        height: 29,
        width: 420,
    }),
    new Platform({
        x: 1530,
        y: 487,
        height: 29,
        width: 20,
    }),
    new Platform({
        x: 1557,
        y: 472,
        height: 29,
        width: 20,
    }),
    new Platform({
        x: 1582,
        y: 462,
        height: 29,
        width: 20,
    }),
    new Platform({  //Long boy  Brown Area
        x: 1607,
        y: 449,
        height: 29,
        width: 72,
    }),
    new Platform({
        x: 1684,
        y: 462,
        height: 29,
        width: 20,
    }),
    new Platform({
        x: 1710,
        y: 472,
        height: 29,
        width: 20,
    }),
    new Platform({
        x: 1736,
        y: 487,
        height: 29,
        width: 20,
    }),
    new Platform({          //Floating Platform
        x: 1827,
        y: 487,
        height: 12,
        width: 30,
    }),
    new Platform({          //Floating Platform
        x: 1878,
        y: 462,
        height: 12,
        width: 30,
    }),
    new Platform({          //Floating Platform
        x: 1929,
        y: 436,
        height: 12,
        width: 30,
    }),
    new Platform({          //Floating Platform
        x: 1827,
        y: 487,
        height: 12,
        width: 30,
    }),
    new Platform({          //Floating Platform
        x: 1993,
        y: 449,
        height: 12,
        width: 30,
    }),
    new Platform({          //Floating Platform
        x: 2057,
        y: 462,
        height: 12,
        width: 30,
    }),
    new Platform({          //Floating Platform
        x: 2108,
        y: 486,
        height: 12,
        width: 30,
    }),
    new Platform({          //Long Boy #2 Area
        x: 2145,
        y: 512,
        height: 12,
        width: 380,
    }),
    new Platform({          //Brown Obscure Obstacles
        x: 2249,
        y: 486,
        height: 12,
        width: 60,
    }),
    new Platform({          //Brown Obscure Obstacles Long
        x: 2312,
        y: 473,
        height: 12,
        width: 210,
    }),
    new Platform({          //Brown Obscure Obstacles
        x: 2362,
        y: 449,
        height: 12,
        width: 20,
    }),
    new Platform({          //Brown Obscure Obstacles
        x: 2428,
        y: 449,
        height: 12,
        width: 20,
    }),
    new Platform({          //Brown Obscure Obstacles
        x: 2453,
        y: 423,
        height: 12,
        width: 70,
    }),
    new Platform({          //Brown Obscure Obstacles
        x: 2428,
        y: 372,
        height: 12,
        width: 70,
    }),
    new Platform({          //Brown Obscure Obstacles
        x: 2338,
        y: 334,
        height: 12,
        width: 70,
    }),
    new Platform({          //Brown Obscure Obstacles
        x: 2454,
        y: 295,
        height: 12,
        width: 145,
    }),
    new Platform({          //Brown Obscure Obstacles
        x: 2633,
        y: 346,
        height: 12,
        width: 70,
    }),
    new Platform({          //Brown Obscure Obstacles
        x: 2734,
        y: 397,
        height: 12,
        width: 45,
    }),
    new Platform({          //Brown Obscure Obstacles
        x: 2811,
        y: 435,
        height: 12,
        width: 45,
    }),
    new Platform({          //Long boy area#3
        x: 2658,
        y: 512,
        height: 12,
        width: 658,
    }),
    new Platform({          //Small Platform
        x: 3336,
        y: 500,
        height: 12,
        width: 32,
    }),
    new Platform({          //Small Platform
        x: 2954,
        y: 475,
        height: 10,
        width: 340,
        badPlatform: true
    }),
    new Platform({          //Small Platform
        x: 3400,
        y: 510,
        height: 12,
        width: 300,
    }),
    new Platform({          //Small Platform
        x: 3400,
        y: 487,
        height: 12,
        width: 32,
    }),
    new Platform({          //Small Platform
        x: 3438,
        y: 462,
        height: 12,
        width: 32,
    }),
    new Platform({          //Small Platform
        x: 3477,
        y: 435,
        height: 12,
        width: 32,
    }),
    new Platform({          //Small Platform
        x: 3516,
        y: 410,
        height: 12,
        width: 108,
    }),
    new Platform({          //Small Platform
        x: 3630,
        y: 435,
        height: 12,
        width: 32,
    }),
    new Platform({          //Small Platform
        x: 3669,
        y: 462,
        height: 12,
        width: 32,
    }),
    new Platform({          //Small Platform
        x: 3708,
        y: 487,
        height: 12,
        width: 32,
    }),
    new Platform({          //Small Platform
        x: 3746,
        y: 513,
        height: 12,
        width: 32,
    }),
    new Platform({          //Small Platform
        x: 3784,
        y: 538,
        height: 12,
        width: 32,
    }),
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
function isPlayerBelowHeight(player, height) {
    return player.position.y > height;
}

function init() {
    // Create player and platform instances
    player = new Player();
    platforms = [
        new Platform({          //Long Boy #1 Area
            x: 1400,
            y: 513,
            height: 29,
            width: 420,
        }),
        new Platform({
            x: 1530,
            y: 487,
            height: 29,
            width: 20,
        }),
        new Platform({
            x: 1557,
            y: 472,
            height: 29,
            width: 20,
        }),
        new Platform({
            x: 1582,
            y: 462,
            height: 29,
            width: 20,
        }),
        new Platform({  //Long boy  Brown Area
            x: 1607,
            y: 449,
            height: 29,
            width: 72,
        }),
        new Platform({
            x: 1684,
            y: 462,
            height: 29,
            width: 20,
        }),
        new Platform({
            x: 1710,
            y: 472,
            height: 29,
            width: 20,
        }),
        new Platform({
            x: 1736,
            y: 487,
            height: 29,
            width: 20,
        }),
        new Platform({          //Floating Platform
            x: 1827,
            y: 487,
            height: 12,
            width: 30,
        }),
        new Platform({          //Floating Platform
            x: 1878,
            y: 462,
            height: 12,
            width: 30,
        }),
        new Platform({          //Floating Platform
            x: 1929,
            y: 436,
            height: 12,
            width: 30,
        }),
        new Platform({          //Floating Platform
            x: 1827,
            y: 487,
            height: 12,
            width: 30,
        }),
        new Platform({          //Floating Platform
            x: 1993,
            y: 449,
            height: 12,
            width: 30,
        }),
        new Platform({          //Floating Platform
            x: 2057,
            y: 462,
            height: 12,
            width: 30,
        }),
        new Platform({          //Floating Platform
            x: 2108,
            y: 486,
            height: 12,
            width: 30,
        }),
        new Platform({          //Long Boy #2 Area
            x: 2145,
            y: 512,
            height: 12,
            width: 380,
        }),
        new Platform({          //Brown Obscure Obstacles
            x: 2249,
            y: 486,
            height: 12,
            width: 60,
        }),
        new Platform({          //Brown Obscure Obstacles Long
            x: 2312,
            y: 473,
            height: 12,
            width: 210,
        }),
        new Platform({          //Brown Obscure Obstacles
            x: 2362,
            y: 449,
            height: 12,
            width: 20,
        }),
        new Platform({          //Brown Obscure Obstacles
            x: 2428,
            y: 449,
            height: 12,
            width: 20,
        }),
        new Platform({          //Brown Obscure Obstacles
            x: 2453,
            y: 423,
            height: 12,
            width: 70,
        }),
        new Platform({          //Brown Obscure Obstacles
            x: 2428,
            y: 372,
            height: 12,
            width: 70,
        }),
        new Platform({          //Brown Obscure Obstacles
            x: 2338,
            y: 334,
            height: 12,
            width: 70,
        }),
        new Platform({          //Brown Obscure Obstacles
            x: 2454,
            y: 295,
            height: 12,
            width: 145,
        }),
        new Platform({          //Brown Obscure Obstacles
            x: 2633,
            y: 346,
            height: 12,
            width: 70,
        }),
        new Platform({          //Brown Obscure Obstacles
            x: 2734,
            y: 397,
            height: 12,
            width: 45,
        }),
        new Platform({          //Brown Obscure Obstacles
            x: 2811,
            y: 435,
            height: 12,
            width: 45,
        }),
        new Platform({          //Long boy area#3
            x: 2658,
            y: 512,
            height: 12,
            width: 658,
        }),
        new Platform({          //Small Platform
            x: 3336,
            y: 500,
            height: 12,
            width: 32,
        }),
        new Platform({          //Small Platform
            x: 2954,
            y: 475,
            height: 10,
            width: 340,
            badPlatform: true
        }),
        new Platform({          //Small Platform
            x: 3400,
            y: 510,
            height: 12,
            width: 300,
        }),
        new Platform({          //Small Platform
            x: 3400,
            y: 487,
            height: 12,
            width: 32,
        }),
        new Platform({          //Small Platform
            x: 3438,
            y: 462,
            height: 12,
            width: 32,
        }),
        new Platform({          //Small Platform
            x: 3477,
            y: 435,
            height: 12,
            width: 32,
        }),
        new Platform({          //Small Platform
            x: 3516,
            y: 410,
            height: 12,
            width: 108,
        }),
        new Platform({          //Small Platform
            x: 3630,
            y: 435,
            height: 12,
            width: 32,
        }),
        new Platform({          //Small Platform
            x: 3669,
            y: 462,
            height: 12,
            width: 32,
        }),
        new Platform({          //Small Platform
            x: 3708,
            y: 487,
            height: 12,
            width: 32,
        }),
        new Platform({          //Small Platform
            x: 3746,
            y: 513,
            height: 12,
            width: 32,
        }),
        new Platform({          //Small Platform
            x: 3784,
            y: 538,
            height: 12,
            width: 32,
        }),
    ];



    scrollOffset = 0;
}

// Collision detection function between player and platforms
function detectCollision(player, platform) {
    const isColliding =
        player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >= platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width &&
        (!platform.badPlatform || (platform.badPlatform && player.velocity.y > 0));

    if (isColliding) {
        if (platform.badPlatform) {
            init(); // Call init() if colliding with a badPlatform
        } else {
            player.velocity.y = 0;
            player.canJump = true; // Reset jump when player is on a platform
        }
    }

    return isColliding;
}

const backgroundImage = new Image();

backgroundImage.src = '/client/src/assets/catnipChroniclesLevel0(copy).jpg';

let offsetX = 1400;
// Animation loop
function animate() {
    console.log("player Position:", player.position.y);
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
    platforms.forEach((platform, index) => {
        if (detectCollision(player, platform)) {
            if (platform.badPlatform && player.velocity.y > 0) {
                platform.splice(index, 1);
                init();
            } else {
            player.velocity.y = 0;
            player.canJump = true; // Reset jump when player is on a platform
        }
    }
});

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

    if (isPlayerBelowHeight(player, 610)) {
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
                player.velocity.y = -10; // Apply upward velocity for jumping
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


//}

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);