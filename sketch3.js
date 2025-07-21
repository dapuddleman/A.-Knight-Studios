let particles = [];
const numParticles = 100;
const connectDistance = 100;

function setup() {
    let canvasContainer = document.getElementById('p5-canvas-container');
    let canvas = createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    canvas.parent('p5-canvas-container');

    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(26, 26, 26); // Dark background for the canvas

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].show();
        particles[i].edges();

        for (let j = i + 1; j < particles.length; j++) {
            const d = dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
            if (d < connectDistance) {
                // Map the distance to an opacity value
                let alpha = map(d, 0, connectDistance, 0.5, 0);
                stroke(255, 255, 255, alpha * 255);
                strokeWeight(1);
                line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
            }
        }
    }
}

function windowResized() {
    let canvasContainer = document.getElementById('p5-canvas-container');
    resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
}


class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D().mult(random(0.5, 1.5));
    }

    update() {
        this.pos.add(this.vel);
    }

    show() {
        noStroke();
        fill('rgba(255, 255, 255, 0.8)');
        circle(this.pos.x, this.pos.y, 3);
    }

    edges() {
        if (this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -1;
        }
    }
}