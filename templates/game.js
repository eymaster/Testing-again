// game.js

// Setup canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 600;
canvas.height = 400;

// Game variables
let player = { x: 50, y: 50, width: 50, height: 50, color: 'red', speed: 5 };
let obstacles = [];
let score = 0;

// Controls (movement)
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

// Add obstacles every 3 seconds
setInterval(createObstacle, 3000);

// Create a new obstacle
function createObstacle() {
    const obstacleWidth = Math.random() * 50 + 20;
    const obstacleHeight = Math.random() * 50 + 20;
    const obstacleX = Math.random() * (canvas.width - obstacleWidth);
    const obstacleY = -obstacleHeight;
    obstacles.push({ x: obstacleX, y: obstacleY, width: obstacleWidth, height: obstacleHeight, color: 'blue' });
}

// Move player
function movePlayer() {
    if (moveLeft && player.x > 0) player.x -= player.speed;
    if (moveRight && player.x < canvas.width - player.width) player.x += player.speed;
    if (moveUp && player.y > 0) player.y -= player.speed;
    if (moveDown && player.y < canvas.height - player.height) player.y += player.speed;
}

// Draw player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw obstacles
function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

// Update obstacles (move them down)
function updateObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += 2;
    });
    obstacles = obstacles.filter(obstacle => obstacle.y <= canvas.height); // Remove obstacles that have passed
}

// Check for collisions
function checkCollisions() {
    obstacles.forEach(obstacle => {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            // Collision detected!
            alert("Game Over! Score: " + score);
            resetGame();
        }
    });
}

// Draw score
function drawScore() {
    document.getElementById('score').textContent = score;
}

// Update game logic
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    movePlayer();
    drawPlayer();
    updateObstacles();
    drawObstacles();
    checkCollisions();
    drawScore();
    score++; // Increment score over time
    requestAnimationFrame(updateGame); // Continuously update the game
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveLeft = true;
    if (e.key === 'ArrowRight') moveRight = true;
    if (e.key === 'ArrowUp') moveUp = true;
    if (e.key === 'ArrowDown') moveDown = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') moveLeft = false;
    if (e.key === 'ArrowRight') moveRight = false;
    if (e.key === 'ArrowUp') moveUp = false;
    if (e.key === 'ArrowDown') moveDown = false;
});

// Reset the game
function resetGame() {
    player.x = 50;
    player.y = 50;
    obstacles = [];
    score = 0;
    updateGame();
}

// Start the game
updateGame();
