const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreEl = document.getElementById('finalScore');

let snake = [{x:160, y:160}];
let food = {x:0, y:0};
let dx = 20, dy = 0;
let score = 0;
let gameInterval;
let gameSpeed = 120;

function randomFood() {
    food.x = Math.floor(Math.random() * 16) * 20;
    food.y = Math.floor(Math.random() * 16) * 20;
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 18, 18));
    
    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x, food.y, 18, 18);
}

function move() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    
    if (head.x < 0 || head.x >= 320 || head.y < 0 || head.y >= 320 || 
        snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }
    
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreEl.textContent = score;
        randomFood();
    } else {
        snake.pop();
    }
    
    draw();
}

function startGame() {
    if (gameInterval) clearInterval(gameInterval);
    snake = [{x:160, y:160}];
    dx = 20; dy = 0;
    score = 0;
    scoreEl.textContent = '0';
    randomFood();
    gameInterval = setInterval(move, gameSpeed);
    gameOverScreen.style.display = 'none';
}

function endGame() {
    clearInterval(gameInterval);
    finalScoreEl.textContent = score;
    gameOverScreen.style.display = 'block';
}

window.resetGame = function() { startGame(); };
window.restartGame = function() { startGame(); };

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && dy !== 20) { dx=0; dy=-20; }
    if (e.key === 'ArrowDown' && dy !== -20) { dx=0; dy=20; }
    if (e.key === 'ArrowLeft' && dx !== 20) { dx=-20; dy=0; }
    if (e.key === 'ArrowRight' && dx !== -20) { dx=20; dy=0; }
});
