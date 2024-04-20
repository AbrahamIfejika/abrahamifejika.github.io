// Setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Function to generate a random number
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random color
function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Ball class definition
class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }
        if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }
        this.x += this.velX;
        this.y += this.velY;
    }

    




