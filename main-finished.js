// Setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Function to generate a random number
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random RGB color value
function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Base Shape class
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Ball class 
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;  // It tracks whether the ball has been eaten by the evil circle
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    console.log(`Updating ball position: (${this.x}, ${this.y}) with velocity (${this.velX}, ${this.velY})`);
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
      this.velX = -(this.velX);
      console.log(`Reversed X velocity: ${this.velX}`);
    }

    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
      this.velY = -(this.velY);
      console.log(`Reversed Y velocity: ${this.velY}`);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball !== this && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          console.log(`Collision detected between balls at (${this.x}, ${this.y}) and (${ball.x}, ${ball.y})`);
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// EvilCircle class 
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = 'white';
    this.size = 10;

    window.addEventListener('mousemove', (e) => {
      console.log(`Mouse move detected: setting EvilCircle position to (${e.clientX}, ${e.clientY})`);
      this.x = e.clientX;
      this.y = e.clientY;
    });
  }

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.stroke();
  }

  checkBounds() {
    console.log(`Checking bounds for EvilCircle at (${this.x}, ${this.y})`);
    if ((this.x + this.size) >= width) {
      this.x -= this.size;
    }

    if ((this.x - this.size) <= 0) {
      this.x += this.size;
    }

    if ((this.y + this.size) >= height) {
      this.y -= this.size;
    }

    if ((this.y - this.size) <= 0) {
      this.y += this.size;
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          console.log(`EvilCircle collided with a ball at (${ball.x}, ${ball.y})`);
          ball.exists = false;
        }
      }
    }
  }
}

const balls = [];
while (balls.length < 25) {
    const size = random(10, 20);
    let ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size
    );
    balls.push(ball);
}

let scoreCounter = document.querySelector('p');
let evilCircle = new EvilCircle(random(0, width), random(0, height));

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  let count = 0;
  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
      count++;
    }
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  scoreCounter.textContent = 'Ball count: ' + count;
  requestAnimationFrame(loop);
}

loop();
