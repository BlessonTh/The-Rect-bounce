const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player character
const player = {
    x: 50,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speedX: 5,
    jumping: false,
    jumpPower: 15,
    jumpLimit: 2, // Number of consecutive jumps allowed
    jumpCount: 0,
};

// Platforms
const platforms = [
    { x: 0, y: canvas.height - 20, width: canvas.width, height: 20 },
    { x: 200, y: canvas.height - 100, width: 150, height: 20 },
    { x: 500, y: canvas.height - 150, width: 150, height: 20 },
    { x: 800, y: canvas.height - 200, width: 150, height: 20 },
];

// Game variables
let gravity = 1;
let score = 0;
let level = 1;

// Handle keyboard input
const keys = {};

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// Game loop
function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply gravity
    player.y += gravity;

    // Check for collisions with platforms
    player.jumpCount = 0; // Reset jump count when on the ground
    platforms.forEach((platform) => {
        if (
            player.x + player.width > platform.x &&
            player.x < platform.x + platform.width &&
            player.y + player.height > platform.y &&
            player.y < platform.y + platform.height
        ) {
            // Collided with a platform
            player.y = platform.y - player.height;
            player.jumping = false;
        }
    });

    // Move player left and right
    if (keys["ArrowLeft"] && player.x > 0) {
        player.x -= player.speedX;
    }
    if (keys["ArrowRight"] && player.x + player.width < canvas.width) {
        player.x += player.speedX;
    }

    // Draw platforms
    ctx.fillStyle = "#333";
    platforms.forEach((platform) => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    // Draw player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Handle jumping
    if (keys["ArrowUp"] && !player.jumping && player.jumpCount < player.jumpLimit) {
        player.y -= player.jumpPower;
        player.jumping = true;
        player.jumpCount++;
    }

    // Update and display score
    score++;
    if (score % 500 === 0) {
        level++;
    }
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 20, 30);
    ctx.fillText(`Level: ${level}`, 20, 60);
}

// Start the game loop
gameLoop();
