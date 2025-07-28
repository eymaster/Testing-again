// game.js

// Grab the canvas element and set up the game context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;

// Adjust canvas size dynamically
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8; // 80% of the screen width
    canvas.height = 400; // Fixed height for now
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Game objects
let player = {
    x: 50,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    color: 'red',
    moveSpeed: 5
};

// Draw player on the canvas
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawPlayer();
    updateScore();
    requestAnimationFrame(gameLoop); // Continuously call gameLoop
}

// Start game function
function startGame() {
    score = 0; // Reset score
    gameLoop(); // Start the game loop
}

// Scoreboard update
function updateScore() {
    document.getElementById('score').textContent = score;
}

// Event listener for the start button
document.getElementById('startBtn').addEventListener('click', startGame);
