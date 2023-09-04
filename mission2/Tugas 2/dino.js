const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
let isJumping = false;
let gravity = 15;
let dinoPosition = 0;
let obstaclePosition = window.innerWidth; // Mulai dari luar layar
let score = 0;
const groundHeight = 10; // Tinggi tanah

// Set dinoPosition sesuai dengan ukuran layar
dino.style.bottom = dinoPosition + 'px';

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) {
        jump();
    }
});

function jump() {
    let jumpCount = 0;
    const jumpInterval = setInterval(() => {
        dinoPosition += 15;
        jumpCount++;

        if (jumpCount === 20) {
            clearInterval(jumpInterval);

            const fallInterval = setInterval(() => {
                dinoPosition -= gravity;
                
                // Batasan agar tidak melewati tanah
                if (dinoPosition <= 0) {
                    clearInterval(fallInterval);
                    dinoPosition = 0;
                    isJumping = false;
                }
                
                dino.style.bottom = dinoPosition + 'px';
            }, 20);
        }

        dino.style.bottom = dinoPosition + 'px';
    }, 20);

    isJumping = true;
}

function moveObstacle() {
    const obstacleSpeed = 10; // Kecepatan rintangan

    if (obstaclePosition < -20) {
        // Rintangan telah mencapai luar layar
        obstaclePosition = window.innerWidth;
        score++; // Tambahkan skor
    } else {
        obstaclePosition -= obstacleSpeed;
        obstacle.style.left = obstaclePosition + 'px';
    }

    requestAnimationFrame(moveObstacle);
}

moveObstacle();

function checkCollision() {
    const dinoLeft = dino.getBoundingClientRect().left;
    const dinoRight = dino.getBoundingClientRect().right;
    const obstacleLeft = obstacle.getBoundingClientRect().left;
    const obstacleRight = obstacle.getBoundingClientRect().right;

    if (
        dinoRight > obstacleLeft &&
        dinoLeft < obstacleRight &&
        dinoPosition <= 0
    ) {
        // Terjadi tabrakan
        alert('Game Over! Skor Anda: ' + score);

        // Mulai ulang permainan
        obstaclePosition = window.innerWidth;
        obstacle.style.left = obstaclePosition + 'px';
        score = 0;
    }

    requestAnimationFrame(checkCollision);
}

checkCollision();