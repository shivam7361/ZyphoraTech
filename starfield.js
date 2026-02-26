const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let shootingStars = [];
let mouse = { x: null, y: null };

// Resize handling
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Mouse movement (parallax)
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Star class
class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.2;
    this.speed = Math.random() * 0.5;
  }

  update() {
    this.y += this.speed;

    // Parallax effect
    if (mouse.x) {
      this.x += (mouse.x - canvas.width / 2) * 0.00001;
    }

    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }

    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

// Shooting star
class ShootingStar {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.len = Math.random() * 80 + 10;
    this.speed = Math.random() * 10 + 6;
    this.size = Math.random() * 1 + 0.5;
  }

  update() {
    this.x += this.speed;
    this.y += this.speed;

    if (this.y > canvas.height || this.x > canvas.width) {
      shootingStars.shift();
    }

    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.len, this.y - this.len);
    ctx.strokeStyle = "white";
    ctx.lineWidth = this.size;
    ctx.stroke();
  }
}

// Create stars
function initStars() {
  for (let i = 0; i < 300; i++) {
    stars.push(new Star());
  }
}

initStars();

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => star.update());

  shootingStars.forEach((shootingStar) => shootingStar.update());

  // Random shooting star
  if (Math.random() < 0.002) {
    shootingStars.push(new ShootingStar());
  }

  requestAnimationFrame(animate);
}

animate();